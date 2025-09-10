<?php

namespace App\Libraries\Excel;

use App\Libraries\UMDL\UMDLCompanyPropertiesWriter;
use App\Libraries\UMDL\UMDLKPIScores;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues; // bevat statische getScores($companyId)
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Settings;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Psr16Cache;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

class Excel_Export
{
    protected array $years = [2022, 2023, 2024];
    protected int $startRow = 19;
    protected string $templatePath = 'excel/empty_export.xlsx';

    // … in class Excel_Export
    private function loadTemplateSpreadsheet(): Spreadsheet
    {
        $full = public_path($this->templatePath);

        Log::info('[excel] loader start', ['path' => $full]);

        // 1) Bestaat template?
        if (!is_file($full)) {
            Log::warning('[excel] Template niet gevonden, val terug op blanco', ['path' => $full]);
            return new Spreadsheet();
        }

        // 2) Vereiste extensie aanwezig?
        if (!class_exists(\ZipArchive::class)) {
            Log::error('[excel] PHP ext-zip ontbreekt; kan .xlsx niet lezen. Val terug op blanco.');
            return new Spreadsheet();
        }

        // 3) Eventueel: memory/caching optimalisaties vóór het laden
        try {
            $cacheDir = storage_path('app/phpss_cache');
            if (!is_dir($cacheDir)) { @mkdir($cacheDir, 0775, true); }
            // Alleen als je eerder symfony/cache + PSR-16 had ingesteld:
            // $pool  = new \Symfony\Component\Cache\Adapter\FilesystemAdapter('phpss', 0, $cacheDir);
            // $psr16 = new \Symfony\Component\Cache\Psr16Cache($pool);
            // Settings::setCache($psr16);
        } catch (\Throwable $e) {
            Log::warning('[excel] kon caching niet instellen: '.$e->getMessage());
        }

        // 4) Probeer direct Xlsx-reader i.p.v. identify() (sneller/robuuster)
        try {
            Log::info('[excel] probeer Xlsx-reader load (readDataOnly=true)');
            $reader = new Xlsx();
            $reader->setReadDataOnly(false);
            if (method_exists($reader, 'setReadEmptyCells')) {
                $reader->setReadEmptyCells(false);
            }
            $spreadsheet = $reader->load($full);
            Log::info('[excel] template geladen met Xlsx-reader');
            return $spreadsheet;
        } catch (\Throwable $e) {
            Log::error('[excel] Xlsx-reader load() faalde: '.$e->getMessage().' — probeer identify() fallback');
        }

        // 5) Fallback: identify() + generic reader (laatste redmiddel)
        try {
            Log::info('[excel] identify() fallback');
            $type   = IOFactory::identify($full);
            $reader = IOFactory::createReader($type);
            if (method_exists($reader, 'setReadDataOnly')) {
                $reader->setReadDataOnly(false);
            }
            $spreadsheet = $reader->load($full);
            Log::info('[excel] template geladen via identify() fallback', ['type' => $type]);
            return $spreadsheet;
        } catch (\Throwable $e) {
            Log::error('[excel] identify()/load() mislukt: '.$e->getMessage().' — gebruik blanco werkboek');
            return new Spreadsheet();
        }
    }

    /**
     * Bouwt één rij-data met skips, en converteert naar een dichte array voor fromArray().
     * @param array $byColumn ['A' => $val, 'B' => $val, ... 'DL' => $val]
     * @param string $lastCol Laatste kolomletter in je layout (hier: 'DL')
     * @return array Rijwaarden inclusief nulls voor overgeslagen kolommen
     */
    function buildDenseRow(array $byColumn, string $lastCol = 'DL'): array
    {
        $lastIndex = Coordinate::columnIndexFromString($lastCol);
        $row = [];
        for ($i = 1; $i <= $lastIndex; $i++) {
            $col = Coordinate::stringFromColumnIndex($i);
            $row[] = array_key_exists($col, $byColumn) ? $byColumn[$col] : null;
        }
        return $row;
    }

    /**
     * @param callable(int $current) $progress
     * @return array{url:string,path:string,filename:string}
     */
    public function run(callable $progress): array
    {
        $current = 0;

        // ---- Cell caching naar filesystem (RAM besparen) ----
        $cacheDir = storage_path('app/phpss_cache');
        if (!is_dir($cacheDir)) { @mkdir($cacheDir, 0775, true); }
        $pool   = new FilesystemAdapter('phpss', 0, $cacheDir); // TTL=0 (geen expiry)
        $psr16  = new Psr16Cache($pool);
        Settings::setCache($psr16); // activeren vóór je de workbook aanmaakt of laadt

        // 1) Spreadsheet + sheets
        $spreadsheet = $this->loadTemplateSpreadsheet();

        $this->ensureSheets($spreadsheet, array_merge($this->years, ['2022-2024', 'Totaal']));
        Log::info('start export');

        // 2) Data ophalen
        try {
            DB::statement('SET SESSION MAX_EXECUTION_TIME=60000');

            $latestIds = KlwDump::query()
                ->whereIn('year', $this->years)
                ->selectRaw("
        company_id,
        year,
        SUBSTRING_INDEX(
            GROUP_CONCAT(id ORDER BY created_at DESC, id DESC),
            ',', 1
        ) AS latest_id
    ")
                ->groupBy('company_id', 'year');

            $dumps = KlwDump::query()
                ->joinSub($latestIds, 'latest', function ($join) {
                    $join->on('klw_dumps.company_id', '=', 'latest.company_id')
                        ->on('klw_dumps.year', '=', 'latest.year')
                        ->on('klw_dumps.id', '=', 'latest.latest_id');
                })
                ->whereIn('klw_dumps.year', $this->years)
                ->orderBy('klw_dumps.company_id')
                ->orderBy('klw_dumps.year')
                ->select('klw_dumps.*')
                ->get();

        } catch (\Throwable $e) {
            Log::info('Failed to load data'.$e->getMessage());
        }

        Log::info('data loaded');
        // Helpers
        $getFieldValue = function ($values, $fieldName, $default = null) {
            foreach ($values as $v) {
                if ($v->fieldname === $fieldName) {
                    return $v->value;
                }
            }
            return $default;
        };

        // 3) Rij-administratie
        $nextRowByYear = [];
        foreach ($this->years as $y) {
            $sheet = $this->sheet($spreadsheet, (string)$y);
            $nextRowByYear[$y] = $this->nextEmptyRow($sheet, $this->startRow);
        }
        $sheet2022   = $this->sheet($spreadsheet, '2022');
        $sheet2023   = $this->sheet($spreadsheet, '2023');
        $sheet2024   = $this->sheet($spreadsheet, '2024');
        $sheetTotal = $this->sheet($spreadsheet, 'Totaal');
        $sheetAll   = $this->sheet($spreadsheet, '2022-2024');
        $sheetTotal = $this->sheet($spreadsheet, 'Totaal');
        $nextRowAll = $this->nextEmptyRow($sheetAll, $this->startRow);
        $nextRowTot = $this->nextEmptyRow($sheetTotal, $this->startRow);

        // 4) Verzamel per bedrijf: meta + som voor gemiddelde
        $avgOpp       = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgNkoe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgJvper10mk = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgMelkperha = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgMelkBedr = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgWeidemkTot = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmNbodemOver = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgVerlBodbal2Ha = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmNh3Landha = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmEiwitPcrants = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmEiwitRants = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgEiwitAankoop = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsoenRe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Melkprod = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbGrasDs = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbMaisDs = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOppPrgras = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOppNatuur = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOppMais = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOppOverig = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOppTotaal = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgPercentageGras = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmBlijgrasAand = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgNpink = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgNkalf = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgGveHa = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgWeidmkDgn = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgWeidmkUrn = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgWeidpiDgn = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgZstv = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgMelkprod = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgFcpmHa = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgVet = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgEiwit = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgUreum = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgFosfor = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgMelkpkoe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgFcpmHaKoe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsGehRe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsGehP = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsGehVem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsReKvem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRantsPKvem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKvGehRe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKvbpper100kgmelk = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKvKoeJaar = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgGrAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgGkAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgSmAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgRvAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBpAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKvAandeel = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgVoordeelBex1 = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgVoordeelBex2 = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgExcrSpec1Permelk = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgExcrSpec2Permelk = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgExcrSpec1Perkoe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgExcrSpec1Spec2 = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgVoereffFpcm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring1BenutVee = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring2BenutVee = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbGrasprDs = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbGrasprKvem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbGrasprN = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOpbGrasprP2o5 = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAanlegGkRe = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAanlegGkP = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAanlegGkVem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAanlegSmHoevOppmais = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAanlegSmVem = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgSnijmaisKgN = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgSnijmaisKgP2o5 = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgGebrnorm1Opptotaal = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgGebrnorm2Opptotaal = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring1BenutTot = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring2BenutTot = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring1BenutBod = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgKring2BenutBod = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOrgMestGras = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal1GrasprAanom = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal1GrasprAanwm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal1GrasprAankm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgStikstofTotaalGras = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal2GrasprAanom = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal2GrasprAanwm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal2GrasprAankm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgFosfaatTotaalGras = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgOrgMestMais = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal1MaisOmWm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal1MaisAankm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgStikstofTotaalMais = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal2MaisOmWm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgBodbal2MaisAankm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgFosfaatTotaalMais = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgEmnh3StlGve = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmNh3Bedrgve = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAmmOpslag = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmNh3Bedrha = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Pensferm = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Mestopsl = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Voerprod = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Energie = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Aanvoer = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgDzhmCo2Allocmelk = []; // [company_id => ['sum'=>float,'n'=>int]]
        $avgAllocVlees = []; // [company_id => ['sum'=>float,'n'=>int]]
        $companyMeta  = []; // [company_id => ['veehouder'=>..., 'kvk'=>...]]
        $companySet   = []; // set voor alle bedrijven die voorkomen (ook als er bv. alleen 2023 is)

        // Extra velden voor Harm
        $avgPcKlaver           = [];
        $avgOppKlaver          = [];
        $avgBodbal1GrasprAanvlb = [];
        $avgBodbal1NatuurAanvlb = [];
        $avgKring1BedbalAanKlv = [];
        $avgDzhNbodemAankm = [];
        $avgDzhmNbodemAankm = [];
        $avgVgPerMk = [];
        $avgCgrondBedrEmi = [];
        $avgCgrondFpcmEmi = [];
        $avgCgrondMelkEmi = [];

        $dumpcounter = 1;
        $ucpw = new UMDLCompanyPropertiesWriter();

        // 5) Verwerk dumps → schrijf in jaarsheet + Totaal, bouw meta/avg op
        foreach ($dumps as $dump) {

            $dumpValues = DB::table('klw_values as v')
                ->join('klw_fields as f', 'f.id', '=', 'v.field_id')
                ->where('v.dump_id', $dump->id)
                ->select([
                    'v.id',
                    'v.dump_id',
                    'v.field_id',
                    'v.value',
                    'f.fieldname',
                ])
                ->get(); // => Collection van stdClass objecten

            $year = (int)$dump->year;

            $veehouder          = $getFieldValue($dumpValues, 'veehouder', '');
            $kvk                = $getFieldValue($dumpValues, 'kvk_nummer', '');
            $opp                = (float)($getFieldValue($dumpValues, 'opp_totaal', 0) ?: 0);
            $nkoe               = (float)($getFieldValue($dumpValues, 'nkoe', 0) ?: 0);
            $jvper10mk          = (float)($getFieldValue($dumpValues, 'jvper10mk', 0) ?: 0);
            $melkperha          = (float)($getFieldValue($dumpValues, 'melkperha', 0) ?: 0);
            $melk_bedr          = (float)($getFieldValue($dumpValues, 'melk_bedr', 0) ?: 0);
            $WEIDEMK_TOT        = (float)($getFieldValue($dumpValues, 'weidmk_dgn', 0) ?: 0) *
                                  (float)($getFieldValue($dumpValues, 'weidmk_urn', 0) ?: 0);

            $dzhm_nbodem_over   = (float)($getFieldValue($dumpValues, 'dzhm_nbodem_over', 0) ?: 0);
            $verl_bodbal2_ha    = (float)($getFieldValue($dumpValues, 'verl_bodbal2_ha', 0) ?: 0);
            $dzhm_nh3_landha    = (float)($getFieldValue($dumpValues, 'dzhm_nh3_landha', 0) ?: 0);
            $dzhm_eiwit_pcrants = (float)($getFieldValue($dumpValues, 'dzhm_eiwit_pcrants', 0) ?: 0);
            $dzhm_eiwit_rants   = (float)($getFieldValue($dumpValues, 'dzhm_eiwit_rants', 0) ?: 0);
            $EIWIT_AANKOOP      = (float)($getFieldValue($dumpValues, 'dzhm_eiwit_verbr', 0) ?: 0) -
                                  (float)($getFieldValue($dumpValues, 'dzhm_eiwit_rants', 0) ?: 0);

            $rantsoen_re        = (float)($getFieldValue($dumpValues, 'rantsoen_re', 0) ?: 0);
            $dzhm_co2_melkprod  = (float)($getFieldValue($dumpValues, 'dzhm_co2_melkprod', 0) ?: 0);
            $opb_gras_ds        = (float)($getFieldValue($dumpValues, 'opb_gras_ds', 0) ?: 0);
            $opb_mais_ds        = (float)($getFieldValue($dumpValues, 'opb_mais_ds', 0) ?: 0);
            $opp_prgras         = (float)($getFieldValue($dumpValues, 'opp_prgras', 0) ?: 0);
            $opp_natuur         = (float)($getFieldValue($dumpValues, 'opp_natuur', 0) ?: 0);
            $opp_mais           = (float)($getFieldValue($dumpValues, 'opp_mais', 0) ?: 0);
            $opp_overig         = (float)($getFieldValue($dumpValues, 'opp_overig', 0) ?: 0);
            $opp_totaal         = (float)($getFieldValue($dumpValues, 'opp_totaal', 0) ?: 0);
            $PERCENTAGE_GRAS    = (($opp_prgras + $opp_natuur) / $opp_totaal) * 100;
            $dzhm_blijgras_aand = (float)($getFieldValue($dumpValues, 'dzhm_blijgras_aand', 0) ?: 0);

            $bodemg_pcveen        = (float)($getFieldValue($dumpValues, 'bodemg_pcveen', 0) ?: 0);
            $bodemg_pcklei        = (float)($getFieldValue($dumpValues, 'bodemg_pcklei', 0) ?: 0);
            $bodemg_pczand1       = (float)($getFieldValue($dumpValues, 'bodemg_pczand1', 0) ?: 0);
            $bodemg_pczand2       = (float)($getFieldValue($dumpValues, 'bodemg_pczand2', 0) ?: 0);
            $bodemg_pczand3       = (float)($getFieldValue($dumpValues, 'bodemg_pczand3', 0) ?: 0);
            $GROND_SOORT        = $ucpw->rangschikBodem($bodemg_pcveen, $bodemg_pcklei, $bodemg_pczand1, $bodemg_pczand2, $bodemg_pczand3);

            $npink              = (float)($getFieldValue($dumpValues, 'npink', 0) ?: 0);
            $nkalf              = (float)($getFieldValue($dumpValues, 'nkalf', 0) ?: 0);
            $GVE_HA             = (float)($getFieldValue($dumpValues, 'gve_melkvee', 0) ?: 0) / $opp_totaal;
            $weidmk_dgn         = (float)($getFieldValue($dumpValues, 'weidmk_dgn', 0) ?: 0);
            $weidmk_urn         = (float)($getFieldValue($dumpValues, 'weidmk_urn', 0) ?: 0);
            $weidpi_dgn         = (float)($getFieldValue($dumpValues, 'weidpi_dgn', 0) ?: 0);

            $dgnzstvb           = (float)($getFieldValue($dumpValues, 'dgnzstvb', 0) ?: 0);
            $dgnzstvo           = (float)($getFieldValue($dumpValues, 'dgnzstvo', 0) ?: 0);
            $dgncombio           = (float)($getFieldValue($dumpValues, 'dgncombio', 0) ?: 0);
            $dgncombib          = (float)($getFieldValue($dumpValues, 'dgncombib', 0) ?: 0);
            $ZSTV               = $dgnzstvb + $dgnzstvo + $dgncombio + $dgncombib;

            $melkprod           = (float)($getFieldValue($dumpValues, 'melkprod', 0) ?: 0);
            $FCPM_HA            = (float)($getFieldValue($dumpValues, 'bkg_prod_fpcm', 0) ?: 0) / $opp_totaal;
            $vet                = (float)($getFieldValue($dumpValues, 'vet', 0) ?: 0);
            $eiwit              = (float)($getFieldValue($dumpValues, 'eiwit', 0) ?: 0);
            $ureum              = (float)($getFieldValue($dumpValues, 'ureum', 0) ?: 0);
            $fosfor             = (float)($getFieldValue($dumpValues, 'fosfor', 0) ?: 0);
            $melkpkoe           = (float)($getFieldValue($dumpValues, 'melkpkoe', 0) ?: 0);
            $FCPM_HA_KOE        = (float)($getFieldValue($dumpValues, 'bkg_prod_fpcm', 0) ?: 0) / $nkoe;
            $rants_geh_re       = (float)($getFieldValue($dumpValues, 'rants_geh_re', 0) ?: 0);
            $rants_geh_p        = (float)($getFieldValue($dumpValues, 'rants_geh_p', 0) ?: 0);
            $rants_geh_vem      = (float)($getFieldValue($dumpValues, 'rants_geh_vem', 0) ?: 0);
            $rants_re_kvem      = (float)($getFieldValue($dumpValues, 'rants_re_kvem', 0) ?: 0);
            $rants_p_kvem       = (float)($getFieldValue($dumpValues, 'rants_p_kvem', 0) ?: 0);
            $kv_geh_re          = (float)($getFieldValue($dumpValues, 'kv_geh_re', 0) ?: 0);
            $kvbpper100kgmelk   = (float)($getFieldValue($dumpValues, 'kvbpper100kgmelk', 0) ?: 0);
            $KV_KOE_JAAR        = ($kvbpper100kgmelk * $melkpkoe) / 100;
            $gr_aandeel         = (float)($getFieldValue($dumpValues, 'gr_aandeel', 0) ?: 0);
            $gk_aandeel         = (float)($getFieldValue($dumpValues, 'gk_aandeel', 0) ?: 0);
            $sm_aandeel         = (float)($getFieldValue($dumpValues, 'sm_aandeel', 0) ?: 0);
            $rv_aandeel         = (float)($getFieldValue($dumpValues, 'rv_aandeel', 0) ?: 0);
            $bp_aandeel         = (float)($getFieldValue($dumpValues, 'bp_aandeel', 0) ?: 0);
            $kv_aandeel         = (float)($getFieldValue($dumpValues, 'kv_aandeel', 0) ?: 0);
            $voordeel_bex1      = (float)($getFieldValue($dumpValues, 'voordeel_bex1', 0) ?: 0);
            $voordeel_bex2      = (float)($getFieldValue($dumpValues, 'voordeel_bex2', 0) ?: 0);
            $EXCR_SPEC1_PERMELK = ((float)($getFieldValue($dumpValues, 'excr_spec1', 0) ?: 0) / $melk_bedr) * 1000;
            $EXCR_SPEC2_PERMELK = ((float)($getFieldValue($dumpValues, 'excr_spec2', 0) ?: 0) / $melk_bedr) * 1000;
            $EXCR_SPEC1_PERKOE  = (float)($getFieldValue($dumpValues, 'excr_spec1', 0) ?: 0) / $nkoe;
            $EXCR_SPEC1_SPEC2   = (float)($getFieldValue($dumpValues, 'excr_spec1', 0) ?: 0) /
                                  (float)($getFieldValue($dumpValues, 'excr_spec2', 0) ?: 0);
            $voereff_fpcm       = (float)($getFieldValue($dumpValues, 'voereff_fpcm', 0) ?: 0);
            $kring1_benut_vee   = (float)($getFieldValue($dumpValues, 'kring1_benut_vee', 0) ?: 0);
            $kring2_benut_vee   = (float)($getFieldValue($dumpValues, 'kring2_benut_vee', 0) ?: 0);
            $opb_graspr_ds      = (float)($getFieldValue($dumpValues, 'opb_graspr_ds', 0) ?: 0);
            $opb_graspr_kvem    = (float)($getFieldValue($dumpValues, 'opb_graspr_kvem', 0) ?: 0);
            $opb_graspr_n       = (float)($getFieldValue($dumpValues, 'opb_graspr_n', 0) ?: 0);
            $opb_graspr_p2o5    = (float)($getFieldValue($dumpValues, 'opb_graspr_p2o5', 0) ?: 0);
            $aanleg_gk_re       = (float)($getFieldValue($dumpValues, 'aanleg_gk_re', 0) ?: 0);
            $aanleg_gk_p        = (float)($getFieldValue($dumpValues, 'aanleg_gk_p', 0) ?: 0);
            $aanleg_gk_vem      = (float)($getFieldValue($dumpValues, 'aanleg_gk_vem', 0) ?: 0);

            if ($opp_mais > 0) {
                $AANLEG_SM_HOEV_OPPMAIS = (float)($getFieldValue($dumpValues, 'opb_mais_ds', 0) ?: 0);
            } else {
                $AANLEG_SM_HOEV_OPPMAIS = 0;
            }

            $aanleg_sm_vem      = (float)($getFieldValue($dumpValues, 'aanleg_sm_vem', 0) ?: 0);
            $SNIJMAIS_KG_N      = (float)($getFieldValue($dumpValues, 'bodbal1_mais_afvgew', 0) ?: 0);
            $SNIJMAIS_KG_P2O5   = (float)($getFieldValue($dumpValues, 'bodbal2_mais_afvtot', 0) ?: 0);
            $GEBRNORM1_OPPTOTAAL = (float)($getFieldValue($dumpValues, 'gebrnorm1', 0) ?: 0) / $opp_totaal;
            $GEBRNORM2_OPPTOTAAL = (float)($getFieldValue($dumpValues, 'gebrnorm2', 0) ?: 0)  / $opp_totaal;
            $kring1_benut_tot   = (float)($getFieldValue($dumpValues, 'kring1_benut_tot', 0) ?: 0);
            $kring2_benut_tot   = (float)($getFieldValue($dumpValues, 'kring2_benut_tot', 0) ?: 0);
            $kring1_benut_bod   = (float)($getFieldValue($dumpValues, 'kring1_benut_bod', 0) ?: 0);
            $kring2_benut_bod   = (float)($getFieldValue($dumpValues, 'kring2_benut_bod', 0) ?: 0);

            $dmgraasvrdeind_gh1      = (float)($getFieldValue($dumpValues, 'dmgraasvrdeind_gh1', 0) ?: 0);
            $bodbal1_graspr_aanom = (float)($getFieldValue($dumpValues, 'bodbal1_graspr_aanom', 0) ?: 0);
            $bodbal1_graspr_aanwm = (float)($getFieldValue($dumpValues, 'bodbal1_graspr_aanwm', 0) ?: 0);
            $bodbal1_graspr_aankm = (float)($getFieldValue($dumpValues, 'bodbal1_graspr_aankm', 0) ?: 0);

            if ($dmgraasvrdeind_gh1 == 0) {
                $ORG_MEST_GRAS = 0;
            } else {
                $ORG_MEST_GRAS = ($bodbal1_graspr_aanom + $bodbal1_graspr_aanwm) / $dmgraasvrdeind_gh1;
            }

            $STIKSTOF_TOTAAL_GRAS = ($bodbal1_graspr_aanom + $bodbal1_graspr_aanwm +  $bodbal1_graspr_aankm);

            $bodbal2_graspr_aanom = (float)($getFieldValue($dumpValues, 'bodbal2_graspr_aanom', 0) ?: 0);
            $bodbal2_graspr_aanwm = (float)($getFieldValue($dumpValues, 'bodbal2_graspr_aanwm', 0) ?: 0);
            $bodbal2_graspr_aankm = (float)($getFieldValue($dumpValues, 'bodbal2_graspr_aankm', 0) ?: 0);
            $FOSFAAT_TOTAAL_GRAS  = ($bodbal2_graspr_aanom + $bodbal2_graspr_aanwm +  $bodbal2_graspr_aankm);


            $bodbal1_mais_aanom = (float)($getFieldValue($dumpValues, 'bodbal1_mais_aanom', 0) ?: 0);
            $bodbal1_mais_aanwm = (float)($getFieldValue($dumpValues, 'bodbal1_mais_aanwm', 0) ?: 0);
            $bodbal1_mais_aankm = (float)($getFieldValue($dumpValues, 'bodbal1_mais_aankm', 0) ?: 0);

            if ($dmgraasvrdeind_gh1 == 0) {
                $ORG_MEST_MAIS = 0;
            } else {
                $ORG_MEST_MAIS = ($bodbal1_mais_aanom + $bodbal1_mais_aanwm) / $dmgraasvrdeind_gh1;
            }

            $BODBAL1_MAIS_OM_WM = ($bodbal1_mais_aanom + $bodbal1_mais_aanwm);
            $STIKSTOF_TOTAAL_MAIS = ($bodbal1_mais_aanom + $bodbal1_mais_aanwm + $bodbal1_mais_aankm);


            $bodbal2_mais_aanom = (float)($getFieldValue($dumpValues, 'bodbal2_mais_aanom', 0) ?: 0);
            $bodbal2_mais_aanwm = (float)($getFieldValue($dumpValues, 'bodbal2_mais_aanwm', 0) ?: 0);
            $bodbal2_mais_aankm = (float)($getFieldValue($dumpValues, 'bodbal2_mais_aankm', 0) ?: 0);
            $BODBAL2_MAIS_OM_WM = ($bodbal2_mais_aanom + $bodbal2_mais_aanwm);
            $FOSFAAT_TOTAAL_MAIS = ($bodbal2_mais_aanom + $bodbal2_mais_aanwm + $bodbal2_mais_aankm);

            $emnh3_stl_gve      = (float)($getFieldValue($dumpValues, 'emnh3_stl_gve', 0) ?: 0);
            $dzhm_nh3_bedrgve   = (float)($getFieldValue($dumpValues, 'dzhm_nh3_bedrgve', 0) ?: 0);
            $dzhm_nh3_bedrha    = (float)($getFieldValue($dumpValues, 'dzhm_nh3_bedrha', 0) ?: 0);
            $AMM_OPSLAG         = $dzhm_nh3_bedrha - $dzhm_nh3_landha;
            $dzhm_co2_pensferm  = (float)($getFieldValue($dumpValues, 'dzhm_co2_pensferm', 0) ?: 0);
            $dzhm_co2_mestopsl  = (float)($getFieldValue($dumpValues, 'dzhm_co2_mestopsl', 0) ?: 0);
            $dzhm_co2_voerprod  = (float)($getFieldValue($dumpValues, 'dzhm_co2_voerprod', 0) ?: 0);
            $dzhm_co2_energie   = (float)($getFieldValue($dumpValues, 'dzhm_co2_energie', 0) ?: 0);
            $dzhm_co2_aanvoer   = (float)($getFieldValue($dumpValues, 'dzhm_co2_aanvoer', 0) ?: 0);
            $dzhm_co2_allocmelk = (float)($getFieldValue($dumpValues, 'dzhm_co2_allocmelk', 0) ?: 0);
            $ALLOC_VLEES        = 1 - $dzhm_co2_allocmelk;
            $postcode           = (string)($getFieldValue($dumpValues, 'postcode', '') ?: '');
            $biobedrijf         = (bool)($getFieldValue($dumpValues, 'biobedrijf', false) ?: false);
            $cid       = $dump->company_id;

            // Extra velden voor Harm
            $pcklaver           = (float)($getFieldValue($dumpValues, 'pcklaver', 0) ?: 0);
            $oppklaver          = (float)($getFieldValue($dumpValues, 'oppklaver', 0) ?: 0);
            $bodbal1_graspr_aanvlb = (float)($getFieldValue($dumpValues, 'bodbal1_graspr_aanvlb', 0) ?: 0);
            $bodbal1_natuur_aanvlb = (float)($getFieldValue($dumpValues, 'bodbal1_natuur_aanvlb', 0) ?: 0);
            $kring1_bedbal_aanklv = (float)($getFieldValue($dumpValues, 'kring1_bedbal_aanklv', 0) ?: 0);
            $dzh_nbodem_aankm  = (float)($getFieldValue($dumpValues, 'dzh_nbodem_aankm', 0) ?: 0);
            $dzhm_nbodem_aankm = (float)($getFieldValue($dumpValues, 'dzhm_nbodem_aankm', 0) ?: 0);
            $vgpermk           = (float)($getFieldValue($dumpValues, 'vgpermk', 0) ?: 0);
            $cgrond_bedr_emi   = (float)($getFieldValue($dumpValues, 'cgrond_bedr_emi', 0) ?: 0);
            $cgrond_fpcm_emi   = (float)($getFieldValue($dumpValues, 'cgrond_fpcm_emi', 0) ?: 0);
            $cgrond_melk_emi   = (float)($getFieldValue($dumpValues, 'cgrond_melk_emi', 0) ?: 0);


            // meta vastleggen (eerste bekende pakt ie)
            if (!isset($companyMeta[$cid])) {
                $companyMeta[$cid] = ['veehouder' => $veehouder, 'kvk' => $kvk,  'postcode' => $postcode, 'biobedrijf' => $biobedrijf];
            } else {
                // indien leeg in meta en nu wél waarde
                if ($companyMeta[$cid]['veehouder'] === '' && $veehouder !== '') {
                    $companyMeta[$cid]['veehouder'] = $veehouder;
                }
                if ($companyMeta[$cid]['kvk'] === '' && $kvk !== '') {
                    $companyMeta[$cid]['kvk'] = $kvk;
                }
                if ($companyMeta[$cid]['postcode'] === '' && $postcode !== '') {
                    $companyMeta[$cid]['postcode'] = $postcode;
                }
                if ($companyMeta[$cid]['biobedrijf'] === '' && $biobedrijf !== '') {
                    $companyMeta[$cid]['biobedrijf'] = $biobedrijf;
                }
            }

            // jaarsheet
            $sheetYear = $this->sheet($spreadsheet, (string)$year);
            $rowYear   = $nextRowByYear[$year];


// 1) Definieer de waarden per kolomletter (alleen de kolommen die je vult)
            $rowByCol = [
                'A'  => $veehouder,
                'B'  => $kvk,
                'C'  => $year,
                'D'  => $opp,
                'E'  => $nkoe,
                'F'  => $jvper10mk,
                'G'  => $melkperha,
                'H'  => $melk_bedr,
                'I'  => $WEIDEMK_TOT,
                'J'  => $dzhm_nbodem_over,
                'K'  => $verl_bodbal2_ha,
                'L'  => $dzhm_nh3_landha,
                'M'  => $dzhm_eiwit_pcrants,
                'N'  => $dzhm_eiwit_rants,
                'O'  => $EIWIT_AANKOOP,
                'P'  => $rantsoen_re,
                'Q'  => $dzhm_co2_melkprod,
                'R'  => $opb_gras_ds,
                'S'  => $opb_mais_ds,
                'T'  => $opp_prgras,
                'U'  => $opp_natuur,
                'V'  => $opp_mais,
                'W'  => $opp_overig,
                'X'  => $opp_totaal,
                'Y'  => $PERCENTAGE_GRAS,
                'Z'  => $dzhm_blijgras_aand,
                'AA'=> $GROND_SOORT,
                'AB'=> $nkoe,
                'AC' => $npink,
                'AD' => $nkalf,
                'AE' => $jvper10mk,
                'AF' => $GVE_HA,
                'AG' => $weidmk_dgn,
                'AH' => $weidmk_urn,
                'AI' => $WEIDEMK_TOT,
                'AJ' => $weidpi_dgn,
                'AK' => $ZSTV,
                'AL' => $melkprod,
                'AM' => $FCPM_HA,
                'AN' => $vet,
                'AO' => $eiwit,
                'AP' => $ureum,
                'AQ' => $fosfor,
                'AR' => $melkpkoe,
                'AS' => $FCPM_HA_KOE,
                'AT' => $rants_geh_re,
                'AU' => $rants_geh_p,
                'AV' => $rants_geh_vem,
                'AW' => $rants_re_kvem,
                'AX' => $rants_p_kvem,
                'AY' => $kv_geh_re,
                'AZ' => $kvbpper100kgmelk,
                'BA' => $KV_KOE_JAAR,
                'BB' => $gr_aandeel,
                'BC' => $gk_aandeel,
                'BD' => $sm_aandeel,
                'BE' => $rv_aandeel,
                'BF' => $bp_aandeel,
                'BG' => $kv_aandeel,
                'BH' => $voordeel_bex1,
                'BI' => $voordeel_bex2,
                'BJ' => $EXCR_SPEC1_PERMELK,
                'BK' => $EXCR_SPEC2_PERMELK,
                'BL' => $EXCR_SPEC1_PERKOE,
                'BM' => $EXCR_SPEC1_SPEC2,
                'BN' => $EXCR_SPEC1_SPEC2,
                'BO' => $voereff_fpcm,
                'BP' => $kring1_benut_vee,
                'BQ' => $kring2_benut_vee,
                'BR' => $opb_graspr_ds,
                'BS' => $opb_graspr_kvem,
                'BT' => $opb_graspr_n,
                'BU' => $opb_graspr_p2o5,
                'BV' => $aanleg_gk_re,
                'BW' => $aanleg_gk_p,
                'BX' => $aanleg_gk_vem,
                'BY' => $AANLEG_SM_HOEV_OPPMAIS,
                'BZ' => $aanleg_sm_vem,
                'CA' => $SNIJMAIS_KG_N,
                'CB' => $SNIJMAIS_KG_P2O5,
                'CC' => $GEBRNORM1_OPPTOTAAL,
                'CD' => $GEBRNORM2_OPPTOTAAL,
                'CE' => $kring1_benut_tot,
                'CF' => $kring2_benut_tot,
                'CG' => $kring1_benut_bod,
                'CH' => $kring2_benut_bod,
                'CI' => $ORG_MEST_GRAS,
                'CJ' => $bodbal1_graspr_aanom,
                'CK' => $bodbal1_graspr_aanwm,
                'CL' => $bodbal1_graspr_aankm,
                'CM' => $STIKSTOF_TOTAAL_GRAS,
                'CN' => $bodbal2_graspr_aanom,
                'CO' => $bodbal2_graspr_aanwm,
                'CP' => $bodbal2_graspr_aankm,
                'CQ' => $FOSFAAT_TOTAAL_GRAS,
                'CR' => $ORG_MEST_MAIS,
                'CS' => $BODBAL1_MAIS_OM_WM,
                'CT' => $bodbal1_mais_aankm,
                'CU' => $STIKSTOF_TOTAAL_MAIS,
                'CV' => $BODBAL2_MAIS_OM_WM,
                'CW' => $bodbal2_mais_aankm,
                'CX' => $FOSFAAT_TOTAAL_MAIS,
                'CY' => $dzhm_nbodem_over,
                'CZ' => $emnh3_stl_gve,
                'DA' => $dzhm_nh3_bedrgve,
                'DB' => $AMM_OPSLAG,
                'DC' => $dzhm_nh3_landha,
                'DD' => $dzhm_nh3_bedrha,
                'DE' => $dzhm_co2_pensferm,
                'DF' => $dzhm_co2_mestopsl,
                'DG' => $dzhm_co2_voerprod,
                'DH' => $dzhm_co2_energie,
                'DI' => $dzhm_co2_aanvoer,
                'DJ' => $dzhm_co2_melkprod,
                'DK' => $dzhm_co2_allocmelk,
                'DL' => $ALLOC_VLEES,
            ];

            // 2) Converteer naar dichte array (met nulls voor AA, AB, AE, AI, …)
            $denseRow = $this->buildDenseRow($rowByCol, 'DL');

            // 3) Schrijf dezelfde rij naar beide sheets
            $sheetYear->fromArray($denseRow, null, "A{$rowYear}");
            $rowTot = $nextRowTot;
            $sheetTotal->fromArray($denseRow, null, "A{$rowTot}");

            // 4) Update je rijtellers
            $nextRowByYear[$year] = $rowYear + 1;
            $nextRowTot++;


            // gemiddelde opbouwen
            if (!isset($avgOpp[$cid])) $avgOpp[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpp[$cid]['sum'] += $opp;
            $avgOpp[$cid]['n']++;

            if (!isset($avgNkoe[$cid])) $avgNkoe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgNkoe[$cid]['sum'] += $nkoe;
            $avgNkoe[$cid]['n']++;

            if (!isset($avgJvper10mk[$cid])) $avgJvper10mk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgJvper10mk[$cid]['sum'] += $jvper10mk;
            $avgJvper10mk[$cid]['n']++;

            if (!isset($avgMelkperha[$cid])) $avgMelkperha[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgMelkperha[$cid]['sum'] += $melkperha;
            $avgMelkperha[$cid]['n']++;

            if (!isset($avgMelkBedr[$cid])) $avgMelkBedr[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgMelkBedr[$cid]['sum'] += $melk_bedr;
            $avgMelkBedr[$cid]['n']++;

            if (!isset($avgWeidemkTot[$cid])) $avgWeidemkTot[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgWeidemkTot[$cid]['sum'] += $WEIDEMK_TOT;
            $avgWeidemkTot[$cid]['n']++;

            if (!isset($avgDzhmNbodemOver[$cid])) $avgDzhmNbodemOver[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmNbodemOver[$cid]['sum'] += $dzhm_nbodem_over;
            $avgDzhmNbodemOver[$cid]['n']++;

            if (!isset($avgVerlBodbal2Ha[$cid])) $avgVerlBodbal2Ha[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVerlBodbal2Ha[$cid]['sum'] += $verl_bodbal2_ha;
            $avgVerlBodbal2Ha[$cid]['n']++;

            if (!isset($avgDzhmNh3Landha[$cid])) $avgDzhmNh3Landha[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmNh3Landha[$cid]['sum'] += $dzhm_nh3_landha;
            $avgDzhmNh3Landha[$cid]['n']++;

            if (!isset($avgDzhmEiwitPcrants[$cid])) $avgDzhmEiwitPcrants[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmEiwitPcrants[$cid]['sum'] += $dzhm_eiwit_pcrants;
            $avgDzhmEiwitPcrants[$cid]['n']++;

            if (!isset($avgDzhmEiwitRants[$cid])) $avgDzhmEiwitRants[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmEiwitRants[$cid]['sum'] += $dzhm_eiwit_rants;
            $avgDzhmEiwitRants[$cid]['n']++;

            if (!isset($avgEiwitAankoop[$cid])) $avgEiwitAankoop[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgEiwitAankoop[$cid]['sum'] += $EIWIT_AANKOOP;
            $avgEiwitAankoop[$cid]['n']++;

            if (!isset($avgRantsoenRe[$cid])) $avgRantsoenRe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsoenRe[$cid]['sum'] += $rantsoen_re;
            $avgRantsoenRe[$cid]['n']++;

            if (!isset($avgDzhmCo2Melkprod[$cid])) $avgDzhmCo2Melkprod[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Melkprod[$cid]['sum'] += $dzhm_co2_melkprod;
            $avgDzhmCo2Melkprod[$cid]['n']++;

            if (!isset($avgOpbGrasDs[$cid])) $avgOpbGrasDs[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbGrasDs[$cid]['sum'] += $opb_gras_ds;
            $avgOpbGrasDs[$cid]['n']++;

            if (!isset($avgOpbMaisDs[$cid])) $avgOpbMaisDs[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbMaisDs[$cid]['sum'] += $opb_mais_ds;
            $avgOpbMaisDs[$cid]['n']++;

            if (!isset($avgOppPrgras[$cid])) $avgOppPrgras[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppPrgras[$cid]['sum'] += $opp_prgras;
            $avgOppPrgras[$cid]['n']++;

            if (!isset($avgOppNatuur[$cid])) $avgOppNatuur[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppNatuur[$cid]['sum'] += $opp_natuur;
            $avgOppNatuur[$cid]['n']++;

            if (!isset($avgOppMais[$cid])) $avgOppMais[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppMais[$cid]['sum'] += $opp_mais;
            $avgOppMais[$cid]['n']++;

            if (!isset($avgOppOverig[$cid])) $avgOppOverig[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppOverig[$cid]['sum'] += $opp_overig;
            $avgOppOverig[$cid]['n']++;

            if (!isset($avgOppTotaal[$cid])) $avgOppTotaal[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppTotaal[$cid]['sum'] += $opp_totaal;
            $avgOppTotaal[$cid]['n']++;

            if (!isset($avgPercentageGras[$cid])) $avgPercentageGras[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgPercentageGras[$cid]['sum'] += $PERCENTAGE_GRAS;
            $avgPercentageGras[$cid]['n']++;

            if (!isset($avgDzhmBlijgrasAand[$cid])) $avgDzhmBlijgrasAand[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmBlijgrasAand[$cid]['sum'] += $dzhm_blijgras_aand;
            $avgDzhmBlijgrasAand[$cid]['n']++;

            if (!isset($avgNpink[$cid])) $avgNpink[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgNpink[$cid]['sum'] += $npink;
            $avgNpink[$cid]['n']++;

            if (!isset($avgNkalf[$cid])) $avgNkalf[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgNkalf[$cid]['sum'] += $nkalf;
            $avgNkalf[$cid]['n']++;

            if (!isset($avgGveHa[$cid])) $avgGveHa[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgGveHa[$cid]['sum'] += $GVE_HA;
            $avgGveHa[$cid]['n']++;

            if (!isset($avgWeidmkDgn[$cid])) $avgWeidmkDgn[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgWeidmkDgn[$cid]['sum'] += $weidmk_dgn;
            $avgWeidmkDgn[$cid]['n']++;

            if (!isset($avgWeidmkUrn[$cid])) $avgWeidmkUrn[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgWeidmkUrn[$cid]['sum'] += $weidmk_urn;
            $avgWeidmkUrn[$cid]['n']++;

            if (!isset($avgWeidpiDgn[$cid])) $avgWeidpiDgn[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgWeidpiDgn[$cid]['sum'] += $weidpi_dgn;
            $avgWeidpiDgn[$cid]['n']++;

            if (!isset($avgZstv[$cid])) $avgZstv[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgZstv[$cid]['sum'] += $ZSTV;
            $avgZstv[$cid]['n']++;

            if (!isset($avgMelkprod[$cid])) $avgMelkprod[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgMelkprod[$cid]['sum'] += $melkprod;
            $avgMelkprod[$cid]['n']++;

            if (!isset($avgFcpmHa[$cid])) $avgFcpmHa[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgFcpmHa[$cid]['sum'] += $FCPM_HA;
            $avgFcpmHa[$cid]['n']++;

            if (!isset($avgVet[$cid])) $avgVet[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVet[$cid]['sum'] += $vet;
            $avgVet[$cid]['n']++;

            if (!isset($avgEiwit[$cid])) $avgEiwit[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgEiwit[$cid]['sum'] += $eiwit;
            $avgEiwit[$cid]['n']++;

            if (!isset($avgUreum[$cid])) $avgUreum[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgUreum[$cid]['sum'] += $ureum;
            $avgUreum[$cid]['n']++;

            if (!isset($avgFosfor[$cid])) $avgFosfor[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgFosfor[$cid]['sum'] += $fosfor;
            $avgFosfor[$cid]['n']++;

            if (!isset($avgMelkpkoe[$cid])) $avgMelkpkoe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgMelkpkoe[$cid]['sum'] += $melkpkoe;
            $avgMelkpkoe[$cid]['n']++;

            if (!isset($avgFcpmHaKoe[$cid])) $avgFcpmHaKoe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgFcpmHaKoe[$cid]['sum'] += $FCPM_HA_KOE;
            $avgFcpmHaKoe[$cid]['n']++;

            if (!isset($avgRantsGehRe[$cid])) $avgRantsGehRe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsGehRe[$cid]['sum'] += $rants_geh_re;
            $avgRantsGehRe[$cid]['n']++;

            if (!isset($avgRantsGehP[$cid])) $avgRantsGehP[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsGehP[$cid]['sum'] += $rants_geh_p;
            $avgRantsGehP[$cid]['n']++;

            if (!isset($avgRantsGehVem[$cid])) $avgRantsGehVem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsGehVem[$cid]['sum'] += $rants_geh_vem;
            $avgRantsGehVem[$cid]['n']++;

            if (!isset($avgRantsReKvem[$cid])) $avgRantsReKvem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsReKvem[$cid]['sum'] += $rants_re_kvem;
            $avgRantsReKvem[$cid]['n']++;

            if (!isset($avgRantsPKvem[$cid])) $avgRantsPKvem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRantsPKvem[$cid]['sum'] += $rants_p_kvem;
            $avgRantsPKvem[$cid]['n']++;

            if (!isset($avgKvGehRe[$cid])) $avgKvGehRe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKvGehRe[$cid]['sum'] += $kv_geh_re;
            $avgKvGehRe[$cid]['n']++;

            if (!isset($avgKvbpper100kgmelk[$cid])) $avgKvbpper100kgmelk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKvbpper100kgmelk[$cid]['sum'] += $kvbpper100kgmelk;
            $avgKvbpper100kgmelk[$cid]['n']++;

            if (!isset($avgKvKoeJaar[$cid])) $avgKvKoeJaar[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKvKoeJaar[$cid]['sum'] += $KV_KOE_JAAR;
            $avgKvKoeJaar[$cid]['n']++;

            if (!isset($avgGrAandeel[$cid])) $avgGrAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgGrAandeel[$cid]['sum'] += $gr_aandeel;
            $avgGrAandeel[$cid]['n']++;

            if (!isset($avgGkAandeel[$cid])) $avgGkAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgGkAandeel[$cid]['sum'] += $gk_aandeel;
            $avgGkAandeel[$cid]['n']++;

            if (!isset($avgSmAandeel[$cid])) $avgSmAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgSmAandeel[$cid]['sum'] += $sm_aandeel;
            $avgSmAandeel[$cid]['n']++;

            if (!isset($avgRvAandeel[$cid])) $avgRvAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgRvAandeel[$cid]['sum'] += $rv_aandeel;
            $avgRvAandeel[$cid]['n']++;

            if (!isset($avgBpAandeel[$cid])) $avgBpAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBpAandeel[$cid]['sum'] += $bp_aandeel;
            $avgBpAandeel[$cid]['n']++;

            if (!isset($avgKvAandeel[$cid])) $avgKvAandeel[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKvAandeel[$cid]['sum'] += $kv_aandeel;
            $avgKvAandeel[$cid]['n']++;

            if (!isset($avgVoordeelBex1[$cid])) $avgVoordeelBex1[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVoordeelBex1[$cid]['sum'] += $voordeel_bex1;
            $avgVoordeelBex1[$cid]['n']++;

            if (!isset($avgVoordeelBex2[$cid])) $avgVoordeelBex2[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVoordeelBex2[$cid]['sum'] += $voordeel_bex2;
            $avgVoordeelBex2[$cid]['n']++;

            if (!isset($avgExcrSpec1Permelk[$cid])) $avgExcrSpec1Permelk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgExcrSpec1Permelk[$cid]['sum'] += $EXCR_SPEC1_PERMELK;
            $avgExcrSpec1Permelk[$cid]['n']++;

            if (!isset($avgExcrSpec2Permelk[$cid])) $avgExcrSpec2Permelk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgExcrSpec2Permelk[$cid]['sum'] += $EXCR_SPEC2_PERMELK;
            $avgExcrSpec2Permelk[$cid]['n']++;

            if (!isset($avgExcrSpec1Perkoe[$cid])) $avgExcrSpec1Perkoe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgExcrSpec1Perkoe[$cid]['sum'] += $EXCR_SPEC1_PERKOE;
            $avgExcrSpec1Perkoe[$cid]['n']++;

            if (!isset($avgExcrSpec1Spec2[$cid])) $avgExcrSpec1Spec2[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgExcrSpec1Spec2[$cid]['sum'] += $EXCR_SPEC1_SPEC2;
            $avgExcrSpec1Spec2[$cid]['n']++;

            if (!isset($avgVoereffFpcm[$cid])) $avgVoereffFpcm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVoereffFpcm[$cid]['sum'] += $voereff_fpcm;
            $avgVoereffFpcm[$cid]['n']++;

            if (!isset($avgKring1BenutVee[$cid])) $avgKring1BenutVee[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring1BenutVee[$cid]['sum'] += $kring1_benut_vee;
            $avgKring1BenutVee[$cid]['n']++;

            if (!isset($avgKring2BenutVee[$cid])) $avgKring2BenutVee[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring2BenutVee[$cid]['sum'] += $kring2_benut_vee;
            $avgKring2BenutVee[$cid]['n']++;

            if (!isset($avgOpbGrasprDs[$cid])) $avgOpbGrasprDs[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbGrasprDs[$cid]['sum'] += $opb_graspr_ds;
            $avgOpbGrasprDs[$cid]['n']++;

            if (!isset($avgOpbGrasprKvem[$cid])) $avgOpbGrasprKvem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbGrasprKvem[$cid]['sum'] += $opb_graspr_kvem;
            $avgOpbGrasprKvem[$cid]['n']++;

            if (!isset($avgOpbGrasprN[$cid])) $avgOpbGrasprN[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbGrasprN[$cid]['sum'] += $opb_graspr_n;
            $avgOpbGrasprN[$cid]['n']++;

            if (!isset($avgOpbGrasprP2o5[$cid])) $avgOpbGrasprP2o5[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOpbGrasprP2o5[$cid]['sum'] += $opb_graspr_p2o5;
            $avgOpbGrasprP2o5[$cid]['n']++;

            if (!isset($avgAanlegGkRe[$cid])) $avgAanlegGkRe[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAanlegGkRe[$cid]['sum'] += $aanleg_gk_re;
            $avgAanlegGkRe[$cid]['n']++;

            if (!isset($avgAanlegGkP[$cid])) $avgAanlegGkP[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAanlegGkP[$cid]['sum'] += $aanleg_gk_p;
            $avgAanlegGkP[$cid]['n']++;

            if (!isset($avgAanlegGkVem[$cid])) $avgAanlegGkVem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAanlegGkVem[$cid]['sum'] += $aanleg_gk_vem;
            $avgAanlegGkVem[$cid]['n']++;

            if (!isset($avgAanlegSmHoevOppmais[$cid])) $avgAanlegSmHoevOppmais[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAanlegSmHoevOppmais[$cid]['sum'] += $AANLEG_SM_HOEV_OPPMAIS;
            $avgAanlegSmHoevOppmais[$cid]['n']++;

            if (!isset($avgAanlegSmVem[$cid])) $avgAanlegSmVem[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAanlegSmVem[$cid]['sum'] += $aanleg_sm_vem;
            $avgAanlegSmVem[$cid]['n']++;

            if (!isset($avgSnijmaisKgN[$cid])) $avgSnijmaisKgN[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgSnijmaisKgN[$cid]['sum'] += $SNIJMAIS_KG_N;
            $avgSnijmaisKgN[$cid]['n']++;

            if (!isset($avgSnijmaisKgP2o5[$cid])) $avgSnijmaisKgP2o5[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgSnijmaisKgP2o5[$cid]['sum'] += $SNIJMAIS_KG_P2O5;
            $avgSnijmaisKgP2o5[$cid]['n']++;

            if (!isset($avgGebrnorm1Opptotaal[$cid])) $avgGebrnorm1Opptotaal[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgGebrnorm1Opptotaal[$cid]['sum'] += $GEBRNORM1_OPPTOTAAL;
            $avgGebrnorm1Opptotaal[$cid]['n']++;

            if (!isset($avgGebrnorm2Opptotaal[$cid])) $avgGebrnorm2Opptotaal[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgGebrnorm2Opptotaal[$cid]['sum'] += $GEBRNORM2_OPPTOTAAL;
            $avgGebrnorm2Opptotaal[$cid]['n']++;

            if (!isset($avgKring1BenutTot[$cid])) $avgKring1BenutTot[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring1BenutTot[$cid]['sum'] += $kring1_benut_tot;
            $avgKring1BenutTot[$cid]['n']++;

            if (!isset($avgKring2BenutTot[$cid])) $avgKring2BenutTot[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring2BenutTot[$cid]['sum'] += $kring2_benut_tot;
            $avgKring2BenutTot[$cid]['n']++;

            if (!isset($avgKring1BenutBod[$cid])) $avgKring1BenutBod[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring1BenutBod[$cid]['sum'] += $kring1_benut_bod;
            $avgKring1BenutBod[$cid]['n']++;

            if (!isset($avgKring2BenutBod[$cid])) $avgKring2BenutBod[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring2BenutBod[$cid]['sum'] += $kring2_benut_bod;
            $avgKring2BenutBod[$cid]['n']++;

            if (!isset($avgOrgMestGras[$cid])) $avgOrgMestGras[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOrgMestGras[$cid]['sum'] += $ORG_MEST_GRAS;
            $avgOrgMestGras[$cid]['n']++;

            if (!isset($avgBodbal1GrasprAanom[$cid])) $avgBodbal1GrasprAanom[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1GrasprAanom[$cid]['sum'] += $bodbal1_graspr_aanom;
            $avgBodbal1GrasprAanom[$cid]['n']++;

            if (!isset($avgBodbal1GrasprAanwm[$cid])) $avgBodbal1GrasprAanwm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1GrasprAanwm[$cid]['sum'] += $bodbal1_graspr_aanwm;
            $avgBodbal1GrasprAanwm[$cid]['n']++;

            if (!isset($avgBodbal1GrasprAankm[$cid])) $avgBodbal1GrasprAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1GrasprAankm[$cid]['sum'] += $bodbal1_graspr_aankm;
            $avgBodbal1GrasprAankm[$cid]['n']++;

            if (!isset($avgStikstofTotaalGras[$cid])) $avgStikstofTotaalGras[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgStikstofTotaalGras[$cid]['sum'] += $STIKSTOF_TOTAAL_GRAS;
            $avgStikstofTotaalGras[$cid]['n']++;

            if (!isset($avgBodbal2GrasprAanom[$cid])) $avgBodbal2GrasprAanom[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal2GrasprAanom[$cid]['sum'] += $bodbal2_graspr_aanom;
            $avgBodbal2GrasprAanom[$cid]['n']++;

            if (!isset($avgBodbal2GrasprAanwm[$cid])) $avgBodbal2GrasprAanwm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal2GrasprAanwm[$cid]['sum'] += $bodbal2_graspr_aanwm;
            $avgBodbal2GrasprAanwm[$cid]['n']++;

            if (!isset($avgBodbal2GrasprAankm[$cid])) $avgBodbal2GrasprAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal2GrasprAankm[$cid]['sum'] += $bodbal2_graspr_aankm;
            $avgBodbal2GrasprAankm[$cid]['n']++;

            if (!isset($avgFosfaatTotaalGras[$cid])) $avgFosfaatTotaalGras[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgFosfaatTotaalGras[$cid]['sum'] += $FOSFAAT_TOTAAL_GRAS;
            $avgFosfaatTotaalGras[$cid]['n']++;

            if (!isset($avgOrgMestMais[$cid])) $avgOrgMestMais[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOrgMestMais[$cid]['sum'] += $ORG_MEST_MAIS;
            $avgOrgMestMais[$cid]['n']++;

            if (!isset($avgBodbal1MaisOmWm[$cid])) $avgBodbal1MaisOmWm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1MaisOmWm[$cid]['sum'] += $BODBAL1_MAIS_OM_WM;
            $avgBodbal1MaisOmWm[$cid]['n']++;

            if (!isset($avgBodbal1MaisAankm[$cid])) $avgBodbal1MaisAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1MaisAankm[$cid]['sum'] += $bodbal1_mais_aankm;
            $avgBodbal1MaisAankm[$cid]['n']++;

            if (!isset($avgStikstofTotaalMais[$cid])) $avgStikstofTotaalMais[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgStikstofTotaalMais[$cid]['sum'] += $STIKSTOF_TOTAAL_MAIS;
            $avgStikstofTotaalMais[$cid]['n']++;

            if (!isset($avgBodbal2MaisOmWm[$cid])) $avgBodbal2MaisOmWm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal2MaisOmWm[$cid]['sum'] += $BODBAL2_MAIS_OM_WM;
            $avgBodbal2MaisOmWm[$cid]['n']++;

            if (!isset($avgBodbal2MaisAankm[$cid])) $avgBodbal2MaisAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal2MaisAankm[$cid]['sum'] += $bodbal2_mais_aankm;
            $avgBodbal2MaisAankm[$cid]['n']++;

            if (!isset($avgFosfaatTotaalMais[$cid])) $avgFosfaatTotaalMais[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgFosfaatTotaalMais[$cid]['sum'] += $FOSFAAT_TOTAAL_MAIS;
            $avgFosfaatTotaalMais[$cid]['n']++;

            if (!isset($avgEmnh3StlGve[$cid])) $avgEmnh3StlGve[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgEmnh3StlGve[$cid]['sum'] += $emnh3_stl_gve;
            $avgEmnh3StlGve[$cid]['n']++;

            if (!isset($avgDzhmNh3Bedrgve[$cid])) $avgDzhmNh3Bedrgve[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmNh3Bedrgve[$cid]['sum'] += $dzhm_nh3_bedrgve;
            $avgDzhmNh3Bedrgve[$cid]['n']++;

            if (!isset($avgAmmOpslag[$cid])) $avgAmmOpslag[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAmmOpslag[$cid]['sum'] += $AMM_OPSLAG;
            $avgAmmOpslag[$cid]['n']++;

            if (!isset($avgDzhmNh3Bedrha[$cid])) $avgDzhmNh3Bedrha[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmNh3Bedrha[$cid]['sum'] += $dzhm_nh3_bedrha;
            $avgDzhmNh3Bedrha[$cid]['n']++;

            if (!isset($avgDzhmCo2Pensferm[$cid])) $avgDzhmCo2Pensferm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Pensferm[$cid]['sum'] += $dzhm_co2_pensferm;
            $avgDzhmCo2Pensferm[$cid]['n']++;

            if (!isset($avgDzhmCo2Mestopsl[$cid])) $avgDzhmCo2Mestopsl[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Mestopsl[$cid]['sum'] += $dzhm_co2_mestopsl;
            $avgDzhmCo2Mestopsl[$cid]['n']++;

            if (!isset($avgDzhmCo2Voerprod[$cid])) $avgDzhmCo2Voerprod[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Voerprod[$cid]['sum'] += $dzhm_co2_voerprod;
            $avgDzhmCo2Voerprod[$cid]['n']++;

            if (!isset($avgDzhmCo2Energie[$cid])) $avgDzhmCo2Energie[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Energie[$cid]['sum'] += $dzhm_co2_energie;
            $avgDzhmCo2Energie[$cid]['n']++;

            if (!isset($avgDzhmCo2Aanvoer[$cid])) $avgDzhmCo2Aanvoer[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Aanvoer[$cid]['sum'] += $dzhm_co2_aanvoer;
            $avgDzhmCo2Aanvoer[$cid]['n']++;

            if (!isset($avgDzhmCo2Allocmelk[$cid])) $avgDzhmCo2Allocmelk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmCo2Allocmelk[$cid]['sum'] += $dzhm_co2_allocmelk;
            $avgDzhmCo2Allocmelk[$cid]['n']++;

            if (!isset($avgAllocVlees[$cid])) $avgAllocVlees[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgAllocVlees[$cid]['sum'] += $ALLOC_VLEES;
            $avgAllocVlees[$cid]['n']++;

            // EXTRA VELDEN VAN HARM
            if (!isset($avgPcKlaver[$cid])) $avgPcKlaver[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgPcKlaver[$cid]['sum'] += $pcklaver;
            $avgPcKlaver[$cid]['n']++;

            if (!isset($avgOppKlaver[$cid])) $avgOppKlaver[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgOppKlaver[$cid]['sum'] += $oppklaver;
            $avgOppKlaver[$cid]['n']++;

            if (!isset($avgBodbal1GrasprAanvlb[$cid])) $avgBodbal1GrasprAanvlb[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1GrasprAanvlb[$cid]['sum'] += $bodbal1_graspr_aanvlb;
            $avgBodbal1GrasprAanvlb[$cid]['n']++;

            if (!isset($avgBodbal1NatuurAanvlb[$cid])) $avgBodbal1NatuurAanvlb[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgBodbal1NatuurAanvlb[$cid]['sum'] += $bodbal1_natuur_aanvlb;
            $avgBodbal1NatuurAanvlb[$cid]['n']++;

            if (!isset($avgKring1BedbalAanKlv[$cid])) $avgKring1BedbalAanKlv[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgKring1BedbalAanKlv[$cid]['sum'] += $kring1_bedbal_aanklv;
            $avgKring1BedbalAanKlv[$cid]['n']++;

            if (!isset($avgDzhNbodemAankm[$cid])) $avgDzhNbodemAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhNbodemAankm[$cid]['sum'] += $dzh_nbodem_aankm;
            $avgDzhNbodemAankm[$cid]['n']++;

            if (!isset($avgDzhmNbodemAankm[$cid])) $avgDzhmNbodemAankm[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgDzhmNbodemAankm[$cid]['sum'] += $dzhm_nbodem_aankm;
            $avgDzhmNbodemAankm[$cid]['n']++;

            if (!isset($avgVgPerMk[$cid])) $avgVgPerMk[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgVgPerMk[$cid]['sum'] += $vgpermk;
            $avgVgPerMk[$cid]['n']++;

            if (!isset($avgCgrondBedrEmi[$cid])) $avgCgrondBedrEmi[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgCgrondBedrEmi[$cid]['sum'] += $cgrond_bedr_emi;
            $avgCgrondBedrEmi[$cid]['n']++;

            if (!isset($avgCgrondFpcmEmi[$cid])) $avgCgrondFpcmEmi[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgCgrondFpcmEmi[$cid]['sum'] += $cgrond_fpcm_emi;
            $avgCgrondFpcmEmi[$cid]['n']++;

            if (!isset($avgCgrondMelkEmi[$cid])) $avgCgrondMelkEmi[$cid] = ['sum' => 0.0, 'n' => 0];
            $avgCgrondMelkEmi[$cid]['sum'] += $cgrond_melk_emi;
            $avgCgrondMelkEmi[$cid]['n']++;

            $companySet[$cid] = true;

            // progress +1 per dump
            Log::info("Weggeschreven: ".$veehouder." (".$year.") - ".$dumpcounter);
            $dumpcounter++;
            $dump = null;
        }

        $companyIds = array_keys($companySet);

        // 6) We maken één rij per bedrijf in "2022-2024" en vullen die stap-voor-stap
        //    We bewaren de rij-index per company zodat KPI/properties in dezelfde rij komen.
        $rowIndexByCompany = []; // [company_id => row int]
        $totalcounter = 0;

        foreach ($companyIds as $cid) {
            $row = $nextRowAll;
            $rowIndexByCompany[$cid] = $row;

            $meta = $companyMeta[$cid] ?? ['veehouder' => '', 'kvk' => '', 'postcode' => '', 'biobedrijf' => ''];

            $avgOppW  = isset($avgOpp[$cid]) && $avgOpp[$cid]['n'] > 0
                ? $avgOpp[$cid]['sum'] / $avgOpp[$cid]['n']
                : 0;

            $avgNkoeW  = isset($avgNkoe[$cid]) && $avgNkoe[$cid]['n'] > 0
                ? $avgNkoe[$cid]['sum'] / $avgNkoe[$cid]['n']
                : 0;

            $avgJvper10mkW  = isset($avgJvper10mk[$cid]) && $avgJvper10mk[$cid]['n'] > 0
                ? $avgJvper10mk[$cid]['sum'] / $avgJvper10mk[$cid]['n']
                : 0;

            $avgMelkperhaW  = isset($avgMelkperha[$cid]) && $avgMelkperha[$cid]['n'] > 0
                ? $avgMelkperha[$cid]['sum'] / $avgMelkperha[$cid]['n']
                : 0;

            $avgMelkBedrW  = isset($avgMelkBedr[$cid]) && $avgMelkBedr[$cid]['n'] > 0
                ? $avgMelkBedr[$cid]['sum'] / $avgMelkBedr[$cid]['n']
                : 0;

            $avgWeidemkTotW  = isset($avgWeidemkTot[$cid]) && $avgWeidemkTot[$cid]['n'] > 0
                ? $avgWeidemkTot[$cid]['sum'] / $avgWeidemkTot[$cid]['n']
                : 0;

            $avgDzhmNbodemOverW  = isset($avgDzhmNbodemOver[$cid]) && $avgDzhmNbodemOver[$cid]['n'] > 0
                ? $avgDzhmNbodemOver[$cid]['sum'] / $avgDzhmNbodemOver[$cid]['n']
                : 0;

            $avgVerlBodbal2HaW  = isset($avgVerlBodbal2Ha[$cid]) && $avgVerlBodbal2Ha[$cid]['n'] > 0
                ? $avgVerlBodbal2Ha[$cid]['sum'] / $avgVerlBodbal2Ha[$cid]['n']
                : 0;

            $avgDzhmNh3LandhaW  = isset($avgDzhmNh3Landha[$cid]) && $avgDzhmNh3Landha[$cid]['n'] > 0
                ? $avgDzhmNh3Landha[$cid]['sum'] / $avgDzhmNh3Landha[$cid]['n']
                : 0;

            $avgDzhmEiwitPcrantsW  = isset($avgDzhmEiwitPcrants[$cid]) && $avgDzhmEiwitPcrants[$cid]['n'] > 0
                ? $avgDzhmEiwitPcrants[$cid]['sum'] / $avgDzhmEiwitPcrants[$cid]['n']
                : 0;

            $avgDzhmEiwitRantsW  = isset($avgDzhmEiwitRants[$cid]) && $avgDzhmEiwitRants[$cid]['n'] > 0
                ? $avgDzhmEiwitRants[$cid]['sum'] / $avgDzhmEiwitRants[$cid]['n']
                : 0;

            $avgEiwitAankoopW  = isset($avgEiwitAankoop[$cid]) && $avgEiwitAankoop[$cid]['n'] > 0
                ? $avgEiwitAankoop[$cid]['sum'] / $avgEiwitAankoop[$cid]['n']
                : 0;

            $avgRantsoenReW  = isset($avgRantsoenRe[$cid]) && $avgRantsoenRe[$cid]['n'] > 0
                ? $avgRantsoenRe[$cid]['sum'] / $avgRantsoenRe[$cid]['n']
                : 0;

            $avgDzhmCo2MelkprodW  = isset($avgDzhmCo2Melkprod[$cid]) && $avgDzhmCo2Melkprod[$cid]['n'] > 0
                ? $avgDzhmCo2Melkprod[$cid]['sum'] / $avgDzhmCo2Melkprod[$cid]['n']
                : 0;

            $avgOpbGrasDsW  = isset($avgOpbGrasDs[$cid]) && $avgOpbGrasDs[$cid]['n'] > 0
                ? $avgOpbGrasDs[$cid]['sum'] / $avgOpbGrasDs[$cid]['n']
                : 0;

            $avgOpbMaisDsW  = isset($avgOpbMaisDs[$cid]) && $avgOpbMaisDs[$cid]['n'] > 0
                ? $avgOpbMaisDs[$cid]['sum'] / $avgOpbMaisDs[$cid]['n']
                : 0;

            $avgOppPrgrasW  = isset($avgOppPrgras[$cid]) && $avgOppPrgras[$cid]['n'] > 0
                ? $avgOppPrgras[$cid]['sum'] / $avgOppPrgras[$cid]['n']
                : 0;

            $avgOppNatuurW  = isset($avgOppNatuur[$cid]) && $avgOppNatuur[$cid]['n'] > 0
                ? $avgOppNatuur[$cid]['sum'] / $avgOppNatuur[$cid]['n']
                : 0;

            $avgOppMaisW  = isset($avgOppMais[$cid]) && $avgOppMais[$cid]['n'] > 0
                ? $avgOppMais[$cid]['sum'] / $avgOppMais[$cid]['n']
                : 0;

            $avgOppOverigW  = isset($avgOppOverig[$cid]) && $avgOppOverig[$cid]['n'] > 0
                ? $avgOppOverig[$cid]['sum'] / $avgOppOverig[$cid]['n']
                : 0;

            $avgOppTotaalW  = isset($avgOppTotaal[$cid]) && $avgOppTotaal[$cid]['n'] > 0
                ? $avgOppTotaal[$cid]['sum'] / $avgOppTotaal[$cid]['n']
                : 0;

            $avgPercentageGrasW  = isset($avgPercentageGras[$cid]) && $avgPercentageGras[$cid]['n'] > 0
                ? $avgPercentageGras[$cid]['sum'] / $avgPercentageGras[$cid]['n']
                : 0;

            $avgDzhmBlijgrasAandW  = isset($avgDzhmBlijgrasAand[$cid]) && $avgDzhmBlijgrasAand[$cid]['n'] > 0
                ? $avgDzhmBlijgrasAand[$cid]['sum'] / $avgDzhmBlijgrasAand[$cid]['n']
                : 0;

            $avgNpinkW  = isset($avgNpink[$cid]) && $avgNpink[$cid]['n'] > 0
                ? $avgNpink[$cid]['sum'] / $avgNpink[$cid]['n']
                : 0;

            $avgNkalfW  = isset($avgNkalf[$cid]) && $avgNkalf[$cid]['n'] > 0
                ? $avgNkalf[$cid]['sum'] / $avgNkalf[$cid]['n']
                : 0;

            $avgGveHaW  = isset($avgGveHa[$cid]) && $avgGveHa[$cid]['n'] > 0
                ? $avgGveHa[$cid]['sum'] / $avgGveHa[$cid]['n']
                : 0;

            $avgWeidmkDgnW  = isset($avgWeidmkDgn[$cid]) && $avgWeidmkDgn[$cid]['n'] > 0
                ? $avgWeidmkDgn[$cid]['sum'] / $avgWeidmkDgn[$cid]['n']
                : 0;

            $avgWeidmkUrnW  = isset($avgWeidmkUrn[$cid]) && $avgWeidmkUrn[$cid]['n'] > 0
                ? $avgWeidmkUrn[$cid]['sum'] / $avgWeidmkUrn[$cid]['n']
                : 0;

            $avgWeidpiDgnW  = isset($avgWeidpiDgn[$cid]) && $avgWeidpiDgn[$cid]['n'] > 0
                ? $avgWeidpiDgn[$cid]['sum'] / $avgWeidpiDgn[$cid]['n']
                : 0;

            $avgZstvW  = isset($avgZstv[$cid]) && $avgZstv[$cid]['n'] > 0
                ? $avgZstv[$cid]['sum'] / $avgZstv[$cid]['n']
                : 0;

            $avgMelkprodW  = isset($avgMelkprod[$cid]) && $avgMelkprod[$cid]['n'] > 0
                ? $avgMelkprod[$cid]['sum'] / $avgMelkprod[$cid]['n']
                : 0;

            $avgFcpmHaW  = isset($avgFcpmHa[$cid]) && $avgFcpmHa[$cid]['n'] > 0
                ? $avgFcpmHa[$cid]['sum'] / $avgFcpmHa[$cid]['n']
                : 0;

            $avgVetW  = isset($avgVet[$cid]) && $avgVet[$cid]['n'] > 0
                ? $avgVet[$cid]['sum'] / $avgVet[$cid]['n']
                : 0;

            $avgEiwitW  = isset($avgEiwit[$cid]) && $avgEiwit[$cid]['n'] > 0
                ? $avgEiwit[$cid]['sum'] / $avgEiwit[$cid]['n']
                : 0;

            $avgUreumW  = isset($avgUreum[$cid]) && $avgUreum[$cid]['n'] > 0
                ? $avgUreum[$cid]['sum'] / $avgUreum[$cid]['n']
                : 0;

            $avgFosforW  = isset($avgFosfor[$cid]) && $avgFosfor[$cid]['n'] > 0
                ? $avgFosfor[$cid]['sum'] / $avgFosfor[$cid]['n']
                : 0;

            $avgMelkpkoeW  = isset($avgMelkpkoe[$cid]) && $avgMelkpkoe[$cid]['n'] > 0
                ? $avgMelkpkoe[$cid]['sum'] / $avgMelkpkoe[$cid]['n']
                : 0;

            $avgFcpmHaKoeW  = isset($avgFcpmHaKoe[$cid]) && $avgFcpmHaKoe[$cid]['n'] > 0
                ? $avgFcpmHaKoe[$cid]['sum'] / $avgFcpmHaKoe[$cid]['n']
                : 0;

            $avgRantsGehReW  = isset($avgRantsGehRe[$cid]) && $avgRantsGehRe[$cid]['n'] > 0
                ? $avgRantsGehRe[$cid]['sum'] / $avgRantsGehRe[$cid]['n']
                : 0;

            $avgRantsGehPW  = isset($avgRantsGehP[$cid]) && $avgRantsGehP[$cid]['n'] > 0
                ? $avgRantsGehP[$cid]['sum'] / $avgRantsGehP[$cid]['n']
                : 0;

            $avgRantsGehVemW  = isset($avgRantsGehVem[$cid]) && $avgRantsGehVem[$cid]['n'] > 0
                ? $avgRantsGehVem[$cid]['sum'] / $avgRantsGehVem[$cid]['n']
                : 0;

            $avgRantsReKvemW  = isset($avgRantsReKvem[$cid]) && $avgRantsReKvem[$cid]['n'] > 0
                ? $avgRantsReKvem[$cid]['sum'] / $avgRantsReKvem[$cid]['n']
                : 0;

            $avgRantsPKvemW  = isset($avgRantsPKvem[$cid]) && $avgRantsPKvem[$cid]['n'] > 0
                ? $avgRantsPKvem[$cid]['sum'] / $avgRantsPKvem[$cid]['n']
                : 0;

            $avgKvGehReW  = isset($avgKvGehRe[$cid]) && $avgKvGehRe[$cid]['n'] > 0
                ? $avgKvGehRe[$cid]['sum'] / $avgKvGehRe[$cid]['n']
                : 0;

            $avgKvbpper100kgmelkW  = isset($avgKvbpper100kgmelk[$cid]) && $avgKvbpper100kgmelk[$cid]['n'] > 0
                ? $avgKvbpper100kgmelk[$cid]['sum'] / $avgKvbpper100kgmelk[$cid]['n']
                : 0;

            $avgKvKoeJaarW  = isset($avgKvKoeJaar[$cid]) && $avgKvKoeJaar[$cid]['n'] > 0
                ? $avgKvKoeJaar[$cid]['sum'] / $avgKvKoeJaar[$cid]['n']
                : 0;

            $avgGrAandeelW  = isset($avgGrAandeel[$cid]) && $avgGrAandeel[$cid]['n'] > 0
                ? $avgGrAandeel[$cid]['sum'] / $avgGrAandeel[$cid]['n']
                : 0;

            $avgGkAandeelW  = isset($avgGkAandeel[$cid]) && $avgGkAandeel[$cid]['n'] > 0
                ? $avgGkAandeel[$cid]['sum'] / $avgGkAandeel[$cid]['n']
                : 0;

            $avgSmAandeelW  = isset($avgSmAandeel[$cid]) && $avgSmAandeel[$cid]['n'] > 0
                ? $avgSmAandeel[$cid]['sum'] / $avgSmAandeel[$cid]['n']
                : 0;

            $avgRvAandeelW  = isset($avgRvAandeel[$cid]) && $avgRvAandeel[$cid]['n'] > 0
                ? $avgRvAandeel[$cid]['sum'] / $avgRvAandeel[$cid]['n']
                : 0;

            $avgBpAandeelW  = isset($avgBpAandeel[$cid]) && $avgBpAandeel[$cid]['n'] > 0
                ? $avgBpAandeel[$cid]['sum'] / $avgBpAandeel[$cid]['n']
                : 0;

            $avgKvAandeelW  = isset($avgKvAandeel[$cid]) && $avgKvAandeel[$cid]['n'] > 0
                ? $avgKvAandeel[$cid]['sum'] / $avgKvAandeel[$cid]['n']
                : 0;

            $avgVoordeelBex1W  = isset($avgVoordeelBex1[$cid]) && $avgVoordeelBex1[$cid]['n'] > 0
                ? $avgVoordeelBex1[$cid]['sum'] / $avgVoordeelBex1[$cid]['n']
                : 0;

            $avgVoordeelBex2W  = isset($avgVoordeelBex2[$cid]) && $avgVoordeelBex2[$cid]['n'] > 0
                ? $avgVoordeelBex2[$cid]['sum'] / $avgVoordeelBex2[$cid]['n']
                : 0;

            $avgExcrSpec1PermelkW  = isset($avgExcrSpec1Permelk[$cid]) && $avgExcrSpec1Permelk[$cid]['n'] > 0
                ? $avgExcrSpec1Permelk[$cid]['sum'] / $avgExcrSpec1Permelk[$cid]['n']
                : 0;

            $avgExcrSpec2PermelkW  = isset($avgExcrSpec2Permelk[$cid]) && $avgExcrSpec2Permelk[$cid]['n'] > 0
                ? $avgExcrSpec2Permelk[$cid]['sum'] / $avgExcrSpec2Permelk[$cid]['n']
                : 0;

            $avgExcrSpec1PerkoeW  = isset($avgExcrSpec1Perkoe[$cid]) && $avgExcrSpec1Perkoe[$cid]['n'] > 0
                ? $avgExcrSpec1Perkoe[$cid]['sum'] / $avgExcrSpec1Perkoe[$cid]['n']
                : 0;

            $avgExcrSpec1Spec2W  = isset($avgExcrSpec1Spec2[$cid]) && $avgExcrSpec1Spec2[$cid]['n'] > 0
                ? $avgExcrSpec1Spec2[$cid]['sum'] / $avgExcrSpec1Spec2[$cid]['n']
                : 0;

            $avgVoereffFpcmW  = isset($avgVoereffFpcm[$cid]) && $avgVoereffFpcm[$cid]['n'] > 0
                ? $avgVoereffFpcm[$cid]['sum'] / $avgVoereffFpcm[$cid]['n']
                : 0;

            $avgKring1BenutVeeW  = isset($avgKring1BenutVee[$cid]) && $avgKring1BenutVee[$cid]['n'] > 0
                ? $avgKring1BenutVee[$cid]['sum'] / $avgKring1BenutVee[$cid]['n']
                : 0;

            $avgKring2BenutVeeW  = isset($avgKring2BenutVee[$cid]) && $avgKring2BenutVee[$cid]['n'] > 0
                ? $avgKring2BenutVee[$cid]['sum'] / $avgKring2BenutVee[$cid]['n']
                : 0;

            $avgOpbGrasprDsW  = isset($avgOpbGrasprDs[$cid]) && $avgOpbGrasprDs[$cid]['n'] > 0
                ? $avgOpbGrasprDs[$cid]['sum'] / $avgOpbGrasprDs[$cid]['n']
                : 0;

            $avgOpbGrasprKvemW  = isset($avgOpbGrasprKvem[$cid]) && $avgOpbGrasprKvem[$cid]['n'] > 0
                ? $avgOpbGrasprKvem[$cid]['sum'] / $avgOpbGrasprKvem[$cid]['n']
                : 0;

            $avgOpbGrasprNW  = isset($avgOpbGrasprN[$cid]) && $avgOpbGrasprN[$cid]['n'] > 0
                ? $avgOpbGrasprN[$cid]['sum'] / $avgOpbGrasprN[$cid]['n']
                : 0;

            $avgOpbGrasprP2o5W  = isset($avgOpbGrasprP2o5[$cid]) && $avgOpbGrasprP2o5[$cid]['n'] > 0
                ? $avgOpbGrasprP2o5[$cid]['sum'] / $avgOpbGrasprP2o5[$cid]['n']
                : 0;

            $avgAanlegGkReW  = isset($avgAanlegGkRe[$cid]) && $avgAanlegGkRe[$cid]['n'] > 0
                ? $avgAanlegGkRe[$cid]['sum'] / $avgAanlegGkRe[$cid]['n']
                : 0;

            $avgAanlegGkPW  = isset($avgAanlegGkP[$cid]) && $avgAanlegGkP[$cid]['n'] > 0
                ? $avgAanlegGkP[$cid]['sum'] / $avgAanlegGkP[$cid]['n']
                : 0;

            $avgAanlegGkVemW  = isset($avgAanlegGkVem[$cid]) && $avgAanlegGkVem[$cid]['n'] > 0
                ? $avgAanlegGkVem[$cid]['sum'] / $avgAanlegGkVem[$cid]['n']
                : 0;

            $avgAanlegSmHoevOppmaisW  = isset($avgAanlegSmHoevOppmais[$cid]) && $avgAanlegSmHoevOppmais[$cid]['n'] > 0
                ? $avgAanlegSmHoevOppmais[$cid]['sum'] / $avgAanlegSmHoevOppmais[$cid]['n']
                : 0;

            $avgAanlegSmVemW  = isset($avgAanlegSmVem[$cid]) && $avgAanlegSmVem[$cid]['n'] > 0
                ? $avgAanlegSmVem[$cid]['sum'] / $avgAanlegSmVem[$cid]['n']
                : 0;

            $avgSnijmaisKgNW  = isset($avgSnijmaisKgN[$cid]) && $avgSnijmaisKgN[$cid]['n'] > 0
                ? $avgSnijmaisKgN[$cid]['sum'] / $avgSnijmaisKgN[$cid]['n']
                : 0;

            $avgSnijmaisKgP2o5W  = isset($avgSnijmaisKgP2o5[$cid]) && $avgSnijmaisKgP2o5[$cid]['n'] > 0
                ? $avgSnijmaisKgP2o5[$cid]['sum'] / $avgSnijmaisKgP2o5[$cid]['n']
                : 0;

            $avgGebrnorm1OpptotaalW  = isset($avgGebrnorm1Opptotaal[$cid]) && $avgGebrnorm1Opptotaal[$cid]['n'] > 0
                ? $avgGebrnorm1Opptotaal[$cid]['sum'] / $avgGebrnorm1Opptotaal[$cid]['n']
                : 0;

            $avgGebrnorm2OpptotaalW  = isset($avgGebrnorm2Opptotaal[$cid]) && $avgGebrnorm2Opptotaal[$cid]['n'] > 0
                ? $avgGebrnorm2Opptotaal[$cid]['sum'] / $avgGebrnorm2Opptotaal[$cid]['n']
                : 0;

            $avgKring1BenutTotW  = isset($avgKring1BenutTot[$cid]) && $avgKring1BenutTot[$cid]['n'] > 0
                ? $avgKring1BenutTot[$cid]['sum'] / $avgKring1BenutTot[$cid]['n']
                : 0;

            $avgKring2BenutTotW  = isset($avgKring2BenutTot[$cid]) && $avgKring2BenutTot[$cid]['n'] > 0
                ? $avgKring2BenutTot[$cid]['sum'] / $avgKring2BenutTot[$cid]['n']
                : 0;

            $avgKring1BenutBodW  = isset($avgKring1BenutBod[$cid]) && $avgKring1BenutBod[$cid]['n'] > 0
                ? $avgKring1BenutBod[$cid]['sum'] / $avgKring1BenutBod[$cid]['n']
                : 0;

            $avgKring2BenutBodW  = isset($avgKring2BenutBod[$cid]) && $avgKring2BenutBod[$cid]['n'] > 0
                ? $avgKring2BenutBod[$cid]['sum'] / $avgKring2BenutBod[$cid]['n']
                : 0;

            $avgOrgMestGrasW  = isset($avgOrgMestGras[$cid]) && $avgOrgMestGras[$cid]['n'] > 0
                ? $avgOrgMestGras[$cid]['sum'] / $avgOrgMestGras[$cid]['n']
                : 0;

            $avgBodbal1GrasprAanomW  = isset($avgBodbal1GrasprAanom[$cid]) && $avgBodbal1GrasprAanom[$cid]['n'] > 0
                ? $avgBodbal1GrasprAanom[$cid]['sum'] / $avgBodbal1GrasprAanom[$cid]['n']
                : 0;

            $avgBodbal1GrasprAanwmW  = isset($avgBodbal1GrasprAanwm[$cid]) && $avgBodbal1GrasprAanwm[$cid]['n'] > 0
                ? $avgBodbal1GrasprAanwm[$cid]['sum'] / $avgBodbal1GrasprAanwm[$cid]['n']
                : 0;

            $avgBodbal1GrasprAankmW  = isset($avgBodbal1GrasprAankm[$cid]) && $avgBodbal1GrasprAankm[$cid]['n'] > 0
                ? $avgBodbal1GrasprAankm[$cid]['sum'] / $avgBodbal1GrasprAankm[$cid]['n']
                : 0;

            $avgStikstofTotaalGrasW  = isset($avgStikstofTotaalGras[$cid]) && $avgStikstofTotaalGras[$cid]['n'] > 0
                ? $avgStikstofTotaalGras[$cid]['sum'] / $avgStikstofTotaalGras[$cid]['n']
                : 0;

            $avgBodbal2GrasprAanomW  = isset($avgBodbal2GrasprAanom[$cid]) && $avgBodbal2GrasprAanom[$cid]['n'] > 0
                ? $avgBodbal2GrasprAanom[$cid]['sum'] / $avgBodbal2GrasprAanom[$cid]['n']
                : 0;

            $avgBodbal2GrasprAanwmW  = isset($avgBodbal2GrasprAanwm[$cid]) && $avgBodbal2GrasprAanwm[$cid]['n'] > 0
                ? $avgBodbal2GrasprAanwm[$cid]['sum'] / $avgBodbal2GrasprAanwm[$cid]['n']
                : 0;

            $avgBodbal2GrasprAankmW  = isset($avgBodbal2GrasprAankm[$cid]) && $avgBodbal2GrasprAankm[$cid]['n'] > 0
                ? $avgBodbal2GrasprAankm[$cid]['sum'] / $avgBodbal2GrasprAankm[$cid]['n']
                : 0;

            $avgFosfaatTotaalGrasW  = isset($avgFosfaatTotaalGras[$cid]) && $avgFosfaatTotaalGras[$cid]['n'] > 0
                ? $avgFosfaatTotaalGras[$cid]['sum'] / $avgFosfaatTotaalGras[$cid]['n']
                : 0;

            $avgOrgMestMaisW  = isset($avgOrgMestMais[$cid]) && $avgOrgMestMais[$cid]['n'] > 0
                ? $avgOrgMestMais[$cid]['sum'] / $avgOrgMestMais[$cid]['n']
                : 0;

            $avgBodbal1MaisOmWmW  = isset($avgBodbal1MaisOmWm[$cid]) && $avgBodbal1MaisOmWm[$cid]['n'] > 0
                ? $avgBodbal1MaisOmWm[$cid]['sum'] / $avgBodbal1MaisOmWm[$cid]['n']
                : 0;

            $avgBodbal1MaisAankmW  = isset($avgBodbal1MaisAankm[$cid]) && $avgBodbal1MaisAankm[$cid]['n'] > 0
                ? $avgBodbal1MaisAankm[$cid]['sum'] / $avgBodbal1MaisAankm[$cid]['n']
                : 0;

            $avgStikstofTotaalMaisW  = isset($avgStikstofTotaalMais[$cid]) && $avgStikstofTotaalMais[$cid]['n'] > 0
                ? $avgStikstofTotaalMais[$cid]['sum'] / $avgStikstofTotaalMais[$cid]['n']
                : 0;

            $avgBodbal2MaisOmWmW  = isset($avgBodbal2MaisOmWm[$cid]) && $avgBodbal2MaisOmWm[$cid]['n'] > 0
                ? $avgBodbal2MaisOmWm[$cid]['sum'] / $avgBodbal2MaisOmWm[$cid]['n']
                : 0;

            $avgBodbal2MaisAankmW  = isset($avgBodbal2MaisAankm[$cid]) && $avgBodbal2MaisAankm[$cid]['n'] > 0
                ? $avgBodbal2MaisAankm[$cid]['sum'] / $avgBodbal2MaisAankm[$cid]['n']
                : 0;

            $avgFosfaatTotaalMaisW  = isset($avgFosfaatTotaalMais[$cid]) && $avgFosfaatTotaalMais[$cid]['n'] > 0
                ? $avgFosfaatTotaalMais[$cid]['sum'] / $avgFosfaatTotaalMais[$cid]['n']
                : 0;

            $avgEmnh3StlGveW  = isset($avgEmnh3StlGve[$cid]) && $avgEmnh3StlGve[$cid]['n'] > 0
                ? $avgEmnh3StlGve[$cid]['sum'] / $avgEmnh3StlGve[$cid]['n']
                : 0;

            $avgDzhmNh3BedrgveW  = isset($avgDzhmNh3Bedrgve[$cid]) && $avgDzhmNh3Bedrgve[$cid]['n'] > 0
                ? $avgDzhmNh3Bedrgve[$cid]['sum'] / $avgDzhmNh3Bedrgve[$cid]['n']
                : 0;

            $avgAmmOpslagW  = isset($avgAmmOpslag[$cid]) && $avgAmmOpslag[$cid]['n'] > 0
                ? $avgAmmOpslag[$cid]['sum'] / $avgAmmOpslag[$cid]['n']
                : 0;

            $avgDzhmNh3BedrhaW  = isset($avgDzhmNh3Bedrha[$cid]) && $avgDzhmNh3Bedrha[$cid]['n'] > 0
                ? $avgDzhmNh3Bedrha[$cid]['sum'] / $avgDzhmNh3Bedrha[$cid]['n']
                : 0;

            $avgDzhmCo2PensfermW  = isset($avgDzhmCo2Pensferm[$cid]) && $avgDzhmCo2Pensferm[$cid]['n'] > 0
                ? $avgDzhmCo2Pensferm[$cid]['sum'] / $avgDzhmCo2Pensferm[$cid]['n']
                : 0;

            $avgDzhmCo2MestopslW  = isset($avgDzhmCo2Mestopsl[$cid]) && $avgDzhmCo2Mestopsl[$cid]['n'] > 0
                ? $avgDzhmCo2Mestopsl[$cid]['sum'] / $avgDzhmCo2Mestopsl[$cid]['n']
                : 0;

            $avgDzhmCo2VoerprodW  = isset($avgDzhmCo2Voerprod[$cid]) && $avgDzhmCo2Voerprod[$cid]['n'] > 0
                ? $avgDzhmCo2Voerprod[$cid]['sum'] / $avgDzhmCo2Voerprod[$cid]['n']
                : 0;

            $avgDzhmCo2EnergieW  = isset($avgDzhmCo2Energie[$cid]) && $avgDzhmCo2Energie[$cid]['n'] > 0
                ? $avgDzhmCo2Energie[$cid]['sum'] / $avgDzhmCo2Energie[$cid]['n']
                : 0;

            $avgDzhmCo2AanvoerW  = isset($avgDzhmCo2Aanvoer[$cid]) && $avgDzhmCo2Aanvoer[$cid]['n'] > 0
                ? $avgDzhmCo2Aanvoer[$cid]['sum'] / $avgDzhmCo2Aanvoer[$cid]['n']
                : 0;

            $avgDzhmCo2AllocmelkW  = isset($avgDzhmCo2Allocmelk[$cid]) && $avgDzhmCo2Allocmelk[$cid]['n'] > 0
                ? $avgDzhmCo2Allocmelk[$cid]['sum'] / $avgDzhmCo2Allocmelk[$cid]['n']
                : 0;

            $avgAllocVleesW  = isset($avgAllocVlees[$cid]) && $avgAllocVlees[$cid]['n'] > 0
                ? $avgAllocVlees[$cid]['sum'] / $avgAllocVlees[$cid]['n']
                : 0;

            // Extra velden
            $avgPcKlaverW  = isset($avgPcKlaver[$cid]) && $avgPcKlaver[$cid]['n'] > 0
                ? $avgPcKlaver[$cid]['sum'] / $avgPcKlaver[$cid]['n']
                : 0;

            $avgOppKlaverW  = isset($avgOppKlaver[$cid]) && $avgOppKlaver[$cid]['n'] > 0
                ? $avgOppKlaver[$cid]['sum'] / $avgOppKlaver[$cid]['n']
                : 0;

            $avgBodbal1GrasprAanvlbW  = isset($avgBodbal1GrasprAanvlb[$cid]) && $avgBodbal1GrasprAanvlb[$cid]['n'] > 0
                ? $avgBodbal1GrasprAanvlb[$cid]['sum'] / $avgBodbal1GrasprAanvlb[$cid]['n']
                : 0;

            $avgBodbal1NatuurAanvlbW  = isset($avgBodbal1NatuurAanvlb[$cid]) && $avgBodbal1NatuurAanvlb[$cid]['n'] > 0
                ? $avgBodbal1NatuurAanvlb[$cid]['sum'] / $avgBodbal1NatuurAanvlb[$cid]['n']
                : 0;

            $avgKring1BedbalAanKlvW  = isset($avgKring1BedbalAanKlv[$cid]) && $avgKring1BedbalAanKlv[$cid]['n'] > 0
                ? $avgKring1BedbalAanKlv[$cid]['sum'] / $avgKring1BedbalAanKlv[$cid]['n']
                : 0;

            $avgDzhNbodemAankmW  = isset($avgDzhNbodemAankm[$cid]) && $avgDzhNbodemAankm[$cid]['n'] > 0
                ? $avgDzhNbodemAankm[$cid]['sum'] / $avgDzhNbodemAankm[$cid]['n']
                : 0;

            $avgDzhmNbodemAankmW  = isset($avgDzhmNbodemAankm[$cid]) && $avgDzhmNbodemAankm[$cid]['n'] > 0
                ? $avgDzhmNbodemAankm[$cid]['sum'] / $avgDzhmNbodemAankm[$cid]['n']
                : 0;

            $avgVgPerMkW  = isset($avgVgPerMk[$cid]) && $avgVgPerMk[$cid]['n'] > 0
                ? $avgVgPerMk[$cid]['sum'] / $avgVgPerMk[$cid]['n']
                : 0;

            $avgCgrondBedrEmiW  = isset($avgCgrondBedrEmi[$cid]) && $avgCgrondBedrEmi[$cid]['n'] > 0
                ? $avgCgrondBedrEmi[$cid]['sum'] / $avgCgrondBedrEmi[$cid]['n']
                : 0;

            $avgCgrondFpcmEmiW  = isset($avgCgrondFpcmEmi[$cid]) && $avgCgrondFpcmEmi[$cid]['n'] > 0
                ? $avgCgrondFpcmEmi[$cid]['sum'] / $avgCgrondFpcmEmi[$cid]['n']
                : 0;

            $avgCgrondMelkEmiW  = isset($avgCgrondMelkEmi[$cid]) && $avgCgrondMelkEmi[$cid]['n'] > 0
                ? $avgCgrondMelkEmi[$cid]['sum'] / $avgCgrondMelkEmi[$cid]['n']
                : 0;


            // Schrijf basis + gemiddelde
            $sheetAll->setCellValue("A{$row}", $meta['veehouder']);
            $sheetAll->setCellValue("B{$row}", $meta['kvk']);
            $sheetAll->setCellValue("C{$row}", "2022-2024");
            $sheetAll->setCellValue("D{$row}", $avgOppW);
            $sheetAll->setCellValue("E" . $row, $avgNkoeW);
            $sheetAll->setCellValue("F" . $row, $avgJvper10mkW);
            $sheetAll->setCellValue("G" . $row, $avgMelkperhaW);
            $sheetAll->setCellValue("H" . $row, $avgMelkBedrW);
            $sheetAll->setCellValue("I" . $row, $avgWeidemkTotW);
            $sheetAll->setCellValue("J" . $row, $avgDzhmNbodemOverW);
            $sheetAll->setCellValue("K" . $row, $avgVerlBodbal2HaW);
            $sheetAll->setCellValue("L" . $row, $avgDzhmNh3LandhaW);
            $sheetAll->setCellValue("M" . $row, $avgDzhmEiwitPcrantsW);
            $sheetAll->setCellValue("N" . $row, $avgDzhmEiwitRantsW);
            $sheetAll->setCellValue("O" . $row, $avgEiwitAankoopW);
            $sheetAll->setCellValue("P" . $row, $avgRantsoenReW);
            $sheetAll->setCellValue("Q" . $row, $avgDzhmCo2MelkprodW);
            $sheetAll->setCellValue("R" . $row, $avgOpbGrasDsW);
            $sheetAll->setCellValue("S" . $row, $avgOpbMaisDsW);
            $sheetAll->setCellValue("T" . $row, $avgOppPrgrasW);
            $sheetAll->setCellValue("U" . $row, $avgOppNatuurW);
            $sheetAll->setCellValue("V" . $row, $avgOppMaisW);
            $sheetAll->setCellValue("W" . $row, $avgOppOverigW);
            $sheetAll->setCellValue("X" . $row, $avgOppTotaalW);
            $sheetAll->setCellValue("Y" . $row, $avgPercentageGrasW);
            $sheetAll->setCellValue("Z" . $row, $avgDzhmBlijgrasAandW);
            $sheetAll->setCellValue("AA" . $row, "n.v.t. (geen gem. voor grondsoort)");
            $sheetAll->setCellValue("AB" . $row, $avgNkoeW);
            $sheetAll->setCellValue("AC" . $row, $avgNpinkW);
            $sheetAll->setCellValue("AD" . $row, $avgNkalfW);
            $sheetAll->setCellValue("AE" . $row, $avgJvper10mkW);
            $sheetAll->setCellValue("AF" . $row, $avgGveHaW);
            $sheetAll->setCellValue("AG" . $row, $avgWeidmkDgnW);
            $sheetAll->setCellValue("AH" . $row, $avgWeidmkUrnW);
            $sheetAll->setCellValue("AI" . $row, $avgWeidemkTotW);
            $sheetAll->setCellValue("AJ" . $row, $avgWeidpiDgnW);
            $sheetAll->setCellValue("AK" . $row, $avgZstvW);
            $sheetAll->setCellValue("AL" . $row, $avgMelkprodW);
            $sheetAll->setCellValue("AM" . $row, $avgFcpmHaW);
            $sheetAll->setCellValue("AN" . $row, $avgVetW);
            $sheetAll->setCellValue("AO" . $row, $avgEiwitW);
            $sheetAll->setCellValue("AP" . $row, $avgUreumW);
            $sheetAll->setCellValue("AQ" . $row, $avgFosforW);
            $sheetAll->setCellValue("AR" . $row, $avgMelkpkoeW);
            $sheetAll->setCellValue("AS" . $row, $avgFcpmHaKoeW);
            $sheetAll->setCellValue("AT" . $row, $avgRantsGehReW);
            $sheetAll->setCellValue("AU" . $row, $avgRantsGehPW);
            $sheetAll->setCellValue("AV" . $row, $avgRantsGehVemW);
            $sheetAll->setCellValue("AW" . $row, $avgRantsReKvemW);
            $sheetAll->setCellValue("AX" . $row, $avgRantsPKvemW);
            $sheetAll->setCellValue("AY" . $row, $avgKvGehReW);
            $sheetAll->setCellValue("AZ" . $row, $avgKvbpper100kgmelkW);
            $sheetAll->setCellValue("BA" . $row, $avgKvKoeJaarW);
            $sheetAll->setCellValue("BB" . $row, $avgGrAandeelW);
            $sheetAll->setCellValue("BC" . $row, $avgGkAandeelW);
            $sheetAll->setCellValue("BD" . $row, $avgSmAandeelW);
            $sheetAll->setCellValue("BE" . $row, $avgRvAandeelW);
            $sheetAll->setCellValue("BF" . $row, $avgBpAandeelW);
            $sheetAll->setCellValue("BG" . $row, $avgKvAandeelW);
            $sheetAll->setCellValue("BH" . $row, $avgVoordeelBex1W);
            $sheetAll->setCellValue("BI" . $row, $avgVoordeelBex2W);
            $sheetAll->setCellValue("BJ" . $row, $avgExcrSpec1PermelkW);
            $sheetAll->setCellValue("BK" . $row, $avgExcrSpec2PermelkW);
            $sheetAll->setCellValue("BL" . $row, $avgExcrSpec1PerkoeW);
            $sheetAll->setCellValue("BM" . $row, $avgExcrSpec1Spec2W);
            $sheetAll->setCellValue("BO" . $row, $avgVoereffFpcmW);
            $sheetAll->setCellValue("BP" . $row, $avgKring1BenutVeeW);
            $sheetAll->setCellValue("BQ" . $row, $avgKring2BenutVeeW);
            $sheetAll->setCellValue("BR" . $row, $avgOpbGrasprDsW);
            $sheetAll->setCellValue("BS" . $row, $avgOpbGrasprKvemW);
            $sheetAll->setCellValue("BT" . $row, $avgOpbGrasprNW);
            $sheetAll->setCellValue("BU" . $row, $avgOpbGrasprP2o5W);
            $sheetAll->setCellValue("BV" . $row, $avgAanlegGkReW);
            $sheetAll->setCellValue("BW" . $row, $avgAanlegGkPW);
            $sheetAll->setCellValue("BX" . $row, $avgAanlegGkVemW);
            $sheetAll->setCellValue("BY" . $row, $avgAanlegSmHoevOppmaisW);
            $sheetAll->setCellValue("BZ" . $row, $avgAanlegSmVemW);
            $sheetAll->setCellValue("CA" . $row, $avgSnijmaisKgNW);
            $sheetAll->setCellValue("CB" . $row, $avgSnijmaisKgP2o5W);
            $sheetAll->setCellValue("CC" . $row, $avgGebrnorm1OpptotaalW);
            $sheetAll->setCellValue("CD" . $row, $avgGebrnorm2OpptotaalW);
            $sheetAll->setCellValue("CE" . $row, $avgKring1BenutTotW);
            $sheetAll->setCellValue("CF" . $row, $avgKring2BenutTotW);
            $sheetAll->setCellValue("CG" . $row, $avgKring1BenutBodW);
            $sheetAll->setCellValue("CH" . $row, $avgKring2BenutBodW);
            $sheetAll->setCellValue("CI" . $row, $avgOrgMestGrasW);
            $sheetAll->setCellValue("CJ" . $row, $avgBodbal1GrasprAanomW);
            $sheetAll->setCellValue("CK" . $row, $avgBodbal1GrasprAanwmW);
            $sheetAll->setCellValue("CL" . $row, $avgBodbal1GrasprAankmW);
            $sheetAll->setCellValue("CM" . $row, $avgStikstofTotaalGrasW);
            $sheetAll->setCellValue("CN" . $row, $avgBodbal2GrasprAanomW);
            $sheetAll->setCellValue("CO" . $row, $avgBodbal2GrasprAanwmW);
            $sheetAll->setCellValue("CP" . $row, $avgBodbal2GrasprAankmW);
            $sheetAll->setCellValue("CQ" . $row, $avgFosfaatTotaalGrasW);
            $sheetAll->setCellValue("CR" . $row, $avgOrgMestMaisW);
            $sheetAll->setCellValue("CS" . $row, $avgBodbal1MaisOmWmW);
            $sheetAll->setCellValue("CT" . $row, $avgBodbal1MaisAankmW);
            $sheetAll->setCellValue("CU" . $row, $avgStikstofTotaalMaisW);
            $sheetAll->setCellValue("CV" . $row, $avgBodbal2MaisOmWmW);
            $sheetAll->setCellValue("CW" . $row, $avgBodbal2MaisAankmW);
            $sheetAll->setCellValue("CX" . $row, $avgFosfaatTotaalMaisW);
            $sheetAll->setCellValue("CY" . $row, $avgDzhmNbodemOverW);
            $sheetAll->setCellValue("CZ" . $row, $avgEmnh3StlGveW);
            $sheetAll->setCellValue("DA" . $row, $avgDzhmNh3BedrgveW);
            $sheetAll->setCellValue("DB" . $row, $avgAmmOpslagW);
            $sheetAll->setCellValue("DC" . $row, $avgDzhmNh3LandhaW);
            $sheetAll->setCellValue("DD" . $row, $avgDzhmNh3BedrhaW);
            $sheetAll->setCellValue("DE" . $row, $avgDzhmCo2PensfermW);
            $sheetAll->setCellValue("DF" . $row, $avgDzhmCo2MestopslW);
            $sheetAll->setCellValue("DG" . $row, $avgDzhmCo2VoerprodW);
            $sheetAll->setCellValue("DH" . $row, $avgDzhmCo2EnergieW);
            $sheetAll->setCellValue("DI" . $row, $avgDzhmCo2AanvoerW);
            $sheetAll->setCellValue("DJ" . $row, $avgDzhmCo2MelkprodW);
            $sheetAll->setCellValue("DK" . $row, $avgDzhmCo2AllocmelkW);
            $sheetAll->setCellValue("DL" . $row, $avgAllocVleesW);

            $sheetAll->setCellValue("FG{$row}", $meta['postcode']);

            // Heeft oude data? Dan startjaar -> 2024. ander 2025.
            $starting_year = Company::findOrFail($cid)->old_data ? '2024' : '2025';
            $sheetAll->setCellValue("FL" . $row, $starting_year);

            $sheetAll->setCellValue("FM" . $row, $avgPcKlaverW);
            $sheetAll->setCellValue("FN" . $row, $avgOppKlaverW);
            $sheetAll->setCellValue("FO" . $row, $avgBodbal1GrasprAanvlbW);
            $sheetAll->setCellValue("FP" . $row, $avgBodbal1NatuurAanvlbW);
            $sheetAll->setCellValue("FQ" . $row, $avgKring1BedbalAanKlvW);
            $sheetAll->setCellValue("FR" . $row, $avgDzhNbodemAankmW);
            $sheetAll->setCellValue("FS" . $row, $avgDzhmNbodemAankmW);
            $sheetAll->setCellValue("FT" . $row, $avgVgPerMkW);
            $sheetAll->setCellValue("FU" . $row, $avgCgrondBedrEmiW);
            $sheetAll->setCellValue("FV" . $row, $avgCgrondFpcmEmiW);
            $sheetAll->setCellValue("FW" . $row, $avgCgrondMelkEmiW);


            // KPI’s (DM/DN/DO) in dezelfde rij
            $umdlkpiscores = new UMDLKPIScores();
            $scores = $umdlkpiscores->getScores($cid);
            $kpi1a_avg   = data_get($scores, 'avg.kpi1a', null);
            $kpi1b_avg   = data_get($scores, 'avg.kpi1b', null);
            $kpi1_score = data_get($scores, 'score.kpi1b', null);
            $kpi2_avg = data_get($scores, 'avg.kpi2', null);
            $kpi2_score = data_get($scores, 'score.kpi2', null);
            $kpi3_avg = data_get($scores, 'avg.kpi3', null);
            $kpi3_score = data_get($scores, 'score.kpi3', null);
            $kpi4_avg = data_get($scores, 'avg.kpi4', null);
            $kpi4_score = data_get($scores, 'score.kpi4', null);
            $kpi5_avg = data_get($scores, 'avg.kpi5', null);
            $kpi5_score = data_get($scores, 'score.kpi5', null);
            $kpi6a_avg   = data_get($scores, 'avg.kpi6a', null);
            $kpi6b_avg   = data_get($scores, 'avg.kpi6b', null);
            $kpi6c_avg   = data_get($scores, 'avg.kpi6c', null);
            $kpi6d_avg   = data_get($scores, 'avg.kpi6d', null);
            $kpi6_score = data_get($scores, 'score.kpi6b', null);
            $kpi7_avg = data_get($scores, 'avg.kpi7', null);
            $kpi7_score = data_get($scores, 'score.kpi7', null);
            $kpi8_avg = data_get($scores, 'avg.kpi8', null);
            $kpi8_score = data_get($scores, 'score.kpi8', null);
            $kpi9_avg = data_get($scores, 'avg.kpi9', null);
            $kpi9_score = data_get($scores, 'score.kpi9', null);
            $kpi10_avg = data_get($scores, 'avg.kpi10', null);
            $kpi10_score = data_get($scores, 'score.kpi10', null);
            $kpi11_avg = data_get($scores, 'avg.kpi11', null);
            $kpi11_score = data_get($scores, 'score.kpi11', null);
            $kpi12_avg = data_get($scores, 'avg.kpi12', null);
            $kpi12_score = data_get($scores, 'score.kpi12', null);
            $kpi13a_avg   = data_get($scores, 'avg.kpi13a', null);
            $kpi13b_avg   = data_get($scores, 'avg.kpi13b', null);
            $kpi13a_score = data_get($scores, 'score.kpi13a', null);
            $kpi13b_score = data_get($scores, 'score.kpi13b', null);
            $kpi14_avg = data_get($scores, 'avg.kpi14', null);
            $kpi14_score = data_get($scores, 'score.kpi14', null);
            $kpi15_score = data_get($scores, 'score.kpi15', null);
            $total_score = data_get($scores, 'total.score', null);
            $total_money = data_get($scores, 'total.money', null);

            $sheetAll->setCellValue("DM{$row}", $kpi1a_avg);
            $sheetAll->setCellValue("DN{$row}", $kpi1b_avg);
            $sheetAll->setCellValue("DO{$row}", $kpi1_score);
            $sheetAll->setCellValue("DP{$row}", $kpi2_avg);
            $sheetAll->setCellValue("DQ{$row}", $kpi2_score);
            $sheetAll->setCellValue("DR{$row}", $kpi3_avg);
            $sheetAll->setCellValue("DS{$row}", $kpi3_score);
            $sheetAll->setCellValue("DT{$row}", $kpi4_avg);
            $sheetAll->setCellValue("DU{$row}", $kpi4_score);
            $sheetAll->setCellValue("DV{$row}", $kpi5_avg);
            $sheetAll->setCellValue("DW{$row}", $kpi5_score);
            $sheetAll->setCellValue("DX{$row}", $kpi6a_avg);
            $sheetAll->setCellValue("DY{$row}", $kpi6b_avg);
            $sheetAll->setCellValue("DZ{$row}", $kpi6c_avg);
            $sheetAll->setCellValue("EA{$row}", $kpi6d_avg);
            $sheetAll->setCellValue("EB{$row}", $kpi6_score);
            $sheetAll->setCellValue("EC{$row}", $kpi7_avg);
            $sheetAll->setCellValue("ED{$row}", $kpi7_score);
            $sheetAll->setCellValue("EE{$row}", $kpi8_avg);
            $sheetAll->setCellValue("EF{$row}", $kpi8_score);
            $sheetAll->setCellValue("EG{$row}", $kpi9_avg);
            $sheetAll->setCellValue("EH{$row}", $kpi9_score);
            $sheetAll->setCellValue("EI{$row}", $kpi10_avg);
            $sheetAll->setCellValue("EJ{$row}", $kpi10_score);
            $sheetAll->setCellValue("EK{$row}", $kpi11_avg);
            $sheetAll->setCellValue("EL{$row}", $kpi11_score);
            $sheetAll->setCellValue("EM{$row}", $kpi12_avg);
            $sheetAll->setCellValue("EN{$row}", $kpi12_score);
            $sheetAll->setCellValue("EO{$row}", $kpi13a_avg);
            $sheetAll->setCellValue("EP{$row}", $kpi13b_avg);
            $sheetAll->setCellValue("EQ{$row}", max($kpi13a_score,$kpi13b_score));
            $sheetAll->setCellValue("ER{$row}", $kpi14_avg);
            $sheetAll->setCellValue("ES{$row}", $kpi14_score);
            $sheetAll->setCellValue("FD{$row}", $kpi15_score);
            $sheetAll->setCellValue("FE{$row}", $total_score);
            $sheetAll->setCellValue("FF{$row}", $total_money);

            $sheetAll->setCellValue("FH{$row}", Company::find($cid)->collectives->pluck('name')->join(', '));
            $sheetAll->setCellValue("FI{$row}", (bool)Company::find($cid)->bio);


            // Properties (ET) in dezelfde rij
            $props   = UmdlCompanyProperties::query()->where('company_id', $cid)->first();
            $sheetAll->setCellValue("ET{$row}", (bool)$props?->website);
            $sheetAll->setCellValue("EU{$row}", (bool)$props?->ontvangstruimte);
            $sheetAll->setCellValue("EV{$row}", (bool)$props?->winkel);
            $sheetAll->setCellValue("EW{$row}", (bool)$props?->educatie);
            $sheetAll->setCellValue("EX{$row}", (bool)$props?->meerjarige_monitoring);
            $sheetAll->setCellValue("EY{$row}", (bool)$props?->open_dagen);
            $sheetAll->setCellValue("EZ{$row}", (bool)$props?->wandelpad);
            $sheetAll->setCellValue("FA{$row}", (bool)$props?->erkend_demobedrijf);
            $sheetAll->setCellValue("FB{$row}", (bool)$props?->bed_and_breakfast );
            $sheetAll->setCellValue("FC{$row}", (bool)$props?->zorg);
            $sheetAll->setCellValue("FX{$row}", $props->opp_totaal_subsidiabel);

            // pas NA alle drie stappen de nextRowAll verhogen
            $nextRowAll++;
            $totalcounter++;

            Log::info("Gemiddelde weggeschreven: ".$meta['veehouder']." - ".$totalcounter);
        }

        // 7) Opslaan en publiek maken
        Log::info("Beginnen met saven");
        $fileName = 'export_' . now()->format('Ymd_His') . '.xlsx';
        $tmpPath  = storage_path("app/exports/{$fileName}");
        @mkdir(dirname($tmpPath), 0775, true);

        Log::info("Pad aangemaakt");

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->setPreCalculateFormulas(false);
        $writer->setUseDiskCaching(true, storage_path('app/phpss_cache'));

        ini_set('memory_limit', '1024M');   // of hoger naar behoefte
        set_time_limit(0);
        $writer->save($tmpPath);

        Log::info("Bestand opgeslagen");

        $spreadsheet->disconnectWorksheets();
        unset($spreadsheet);
        gc_collect_cycles();

        // STREAM i.p.v. file_get_contents
        $stream = fopen($tmpPath, 'rb');
        if ($stream === false) {
            throw new \RuntimeException("Kon $tmpPath niet openen");
        }
        Storage::disk('public')->put("exports/{$fileName}", $stream);
        fclose($stream);
        @unlink($tmpPath);

        Log::info("Bestand gekopieerd");

        return [
            'disk'     => 'public',
            'path'     => "exports/{$fileName}",               // relatieve pad op de disk
            'filename' => $fileName,
            'url'   => Storage::disk('public')->url("exports/{$fileName}"), // optioneel
        ];
    }

    // ————— helpers —————

    protected function ensureSheets(Spreadsheet $spreadsheet, array $names): void
    {
        foreach ($names as $name) {
            if (!$this->sheet($spreadsheet, $name)) {
                $spreadsheet->createSheet()->setTitle($name);
            }
        }
    }

    protected function sheet(Spreadsheet $spreadsheet, string $name): ?Worksheet
    {
        $s = $spreadsheet->getSheetByName($name);
        return $s ?: null;
    }

    protected function nextEmptyRow(Worksheet $sheet, int $startRow): int
    {
        $row = $startRow;
        while (
            $this->cellHasValue($sheet, "A{$row}") ||
            $this->cellHasValue($sheet, "B{$row}") ||
            $this->cellHasValue($sheet, "C{$row}") ||
            $this->cellHasValue($sheet, "D{$row}")
        ) {
            $row++;
            if ($row > 100000) break;
        }
        return $row;
    }

    protected function cellHasValue(Worksheet $sheet, string $cell): bool
    {
        $v = $sheet->getCell($cell)->getValue();
        return !is_null($v) && $v !== '';
    }
}

