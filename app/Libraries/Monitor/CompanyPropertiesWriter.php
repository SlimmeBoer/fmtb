<?php

namespace App\Libraries\Monitor;

use App\Models\KlwValue;
use App\Models\CompanyProperties;
use App\Models\KpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompanyPropertiesWriter
{

    public array $vars = array(
        "opp_prgras" => 0.0,
        "opp_mais" => 0.0,
        "opp_natuur" => 0.0,
        "opp_overig" => 0.0,
        "jaartal" => 0.0,
        "enespec_elek_kwh" => 0.0,
        "nkoe" => 0.0,
        "fpcmpkoe" => 0.0,
        "bkg_prod_fpcm" => 0.0,
        "jvper10mk" => 0.0,
        "gve_melkvee" => 0.0,
        "kring1_bodaan_km" => 0.0,
        "opb_graspr_ds" => 0.0,
        "rants_re_kvem" => 0.0,
        "kvbpper100kgmelk" => 0.0,
        "kring1_benut_vee" => 0.0,
        "kring1_benut_bod" => 0.0,
        "kring1_benut_tot" => 0.0,
        "cgrond_bedr_emi" => 0.0,
        "cgrond_melk_emi" => 0.0,
        "bodem_pcveen" => 0.0,
        "bodem_pcklei" => 0.0,
        "bodem_pczand1" => 0.0,
        "bodem_pczand2" => 0.0,
        "bodem_pczand3" => 0.0,
        "verl_bedbal1_ha" => 0.0,
        "benut_p_bod" => 0.0,
        "benut_n_bod" => 0.0,
    );

    /**
     * @param $company_id
     * @return int
     */
    public function saveProperties($company_id): int
    {
        $opp_totaal =
            $this->vars["opp_prgras"] + $this->vars["opp_mais"] + $this->vars["opp_natuur"] + $this->vars["opp_overig"];

        $companyproperties = CompanyProperties::firstOrNew(array(
            'company_id' => $company_id,
        ));

        if (!$companyproperties->exists || $companyproperties->year < $this->vars["jaartal"]) {
            $companyproperties->year = $this->vars["jaartal"];

            // All KPI-scoring properties to zero or false (has to be set manually)
            $companyproperties->mbp = 0;
            $companyproperties->ontvangstruimte = false;
            $companyproperties->winkel = false;
            $companyproperties->educatie = false;
            $companyproperties->meerjarige_monitoring = false;
            $companyproperties->open_dagen = false;
            $companyproperties->wandelpad = false;
            $companyproperties->erkend_demobedrijf = false;
            $companyproperties->bedrijfsgebonden_recreatie = false;
            $companyproperties->zorg = false;
            $companyproperties->geen_sma = false;

            $companyproperties->opp_totaal = round($opp_totaal, 1);
            $companyproperties->opp_totaal_subsidiabel = round($opp_totaal, 1);
            $companyproperties->melkkoeien = $this->vars["nkoe"];
            $companyproperties->meetmelk_per_koe = $this->vars["fpcmpkoe"];
            $companyproperties->meetmelk_per_ha = round($this->vars["bkg_prod_fpcm"] / $opp_totaal, 0);
            $companyproperties->jongvee_per_10mk = $this->vars["jvper10mk"];
            $companyproperties->gve_per_ha = round($this->vars["gve_melkvee"] / $opp_totaal, 1);
            $companyproperties->kunstmest_per_ha = $this->vars["kring1_bodaan_km"];
            $companyproperties->opbrengst_grasland_per_ha = $this->vars["opb_graspr_ds"];
            $companyproperties->re_kvem = $this->vars["rants_re_kvem"];
            $companyproperties->krachtvoer_per_100kg_melk = $this->vars["kvbpper100kgmelk"];
            $companyproperties->veebenutting_n = str_replace(' %', '', $this->vars["kring1_benut_vee"]);
            $companyproperties->bodembenutting_n = str_replace(' %', '', $this->vars["kring1_benut_bod"]);
            $companyproperties->bedrijfsbenutting_n = str_replace(' %', '', $this->vars["kring1_benut_tot"]);
            $companyproperties->g_co2_per_kg_meetmelk = $this->vars["cgrond_melk_emi"];
            $companyproperties->kg_co2_per_ha = $this->vars["cgrond_bedr_emi"];
            $companyproperties->grondsoort = $this->rangschikBodem($this->vars["bodem_pcveen"],
                $this->vars["bodem_pcklei"],
                $this->vars["bodem_pczand1"],
                $this->vars["bodem_pczand2"],
                $this->vars["bodem_pczand3"]);

            $companyproperties->grondsoort_dominant = $this->dominantBodem($this->vars["bodem_pcveen"],
                $this->vars["bodem_pcklei"],
                $this->vars["bodem_pczand1"],
                $this->vars["bodem_pczand2"],
                $this->vars["bodem_pczand3"]);

            $companyproperties->stikstofbedrijfsoverschot = $this->vars["verl_bedbal1_ha"];
            $companyproperties->bodembenutting_stikstof = $this->vars["benut_n_bod"];
            $companyproperties->bodembenutting_fosfaat = $this->vars["benut_p_bod"];

            $companyproperties->save();
        }

        return $companyproperties->id;
    }

    /**
     * @param $veen
     * @param $klei
     * @param $zand1
     * @param $zand2
     * @param $zand3
     * @return string
     */
    public function rangschikBodem($veen, $klei, $zand1, $zand2, $zand3): string
    {
        $zand = $zand1 + $zand2 + $zand3;

        $waarden = [
            'veen' => $veen,
            'klei' => $klei,
            'zand' => $zand
        ];

        // Sorteer van groot naar klein
        arsort($waarden);

        // Bouw de string op
        $resultaat = [];
        foreach ($waarden as $soort => $waarde) {
            $resultaat[] = "{$waarde}% {$soort}";
        }

        return implode(", ", $resultaat);
    }

    /**
     * @param $veen
     * @param $klei
     * @param $zand1
     * @param $zand2
     * @param $zand3
     * @return string
     */
    public function dominantBodem($veen, $klei, $zand1, $zand2, $zand3): string
    {
        $zand = $zand1 + $zand2 + $zand3;

        if ($zand > $klei && $zand > $veen) {
            return "zand";
        } elseif ($klei > $zand && $klei > $veen) {
            return "klei";
        } elseif ($veen > $zand && $veen > $klei) {
            return "veen";
        } else {
            return "klei";
        }
    }
}
