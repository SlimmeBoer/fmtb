<?php

namespace App\Libraries\UMDL;

use App\Models\KlwValue;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UMDLCompanyPropertiesWriter
{

    public array $vars = array (
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
    );
    /**
     * @param $company_id
     * @return int
     */
    public function saveProperties($company_id) : int
    {
        $opp_totaal  =
            $this->vars["opp_prgras"] + $this->vars["opp_mais"] + $this->vars["opp_natuur"] + $this->vars["opp_overig"];

        $umdlcompanyproperties = UmdlCompanyProperties::firstOrNew(array(
            'company_id' => $company_id,
        ));

        if (!$umdlcompanyproperties->exists || $umdlcompanyproperties->year < $this->vars["jaartal"])
        {
            $umdlcompanyproperties->year = $this->vars["jaartal"];

            // All KPI-scoring properties to zero or false (has to be set manually)
            $umdlcompanyproperties->mbp = 0;
            $umdlcompanyproperties->website = false;
            $umdlcompanyproperties->ontvangstruimte = false;
            $umdlcompanyproperties->winkel = false;
            $umdlcompanyproperties->educatie = false;
            $umdlcompanyproperties->meerjarige_monitoring = false;
            $umdlcompanyproperties->open_dagen = false;
            $umdlcompanyproperties->wandelpad = false;
            $umdlcompanyproperties->erkend_demobedrijf = false;
            $umdlcompanyproperties->bed_and_breakfast = false;
            $umdlcompanyproperties->zorg = false;
            $umdlcompanyproperties->geen_sma = false;

            $umdlcompanyproperties->opp_totaal= round($opp_totaal,1);
            $umdlcompanyproperties->opp_totaal_subsidiabel = round($opp_totaal,1);
            $umdlcompanyproperties->melkkoeien = $this->vars["nkoe"];
            $umdlcompanyproperties->meetmelk_per_koe = $this->vars["fpcmpkoe"];
            $umdlcompanyproperties->meetmelk_per_ha = round($this->vars["bkg_prod_fpcm"] / $opp_totaal,0);
            $umdlcompanyproperties->jongvee_per_10mk = $this->vars["jvper10mk"];
            $umdlcompanyproperties->gve_per_ha = round($this->vars["gve_melkvee"] / $opp_totaal,1);
            $umdlcompanyproperties->kunstmest_per_ha = $this->vars["kring1_bodaan_km"];
            $umdlcompanyproperties->opbrengst_grasland_per_ha = $this->vars["opb_graspr_ds"];
            $umdlcompanyproperties->re_kvem = $this->vars["rants_re_kvem"];
            $umdlcompanyproperties->krachtvoer_per_100kg_melk = $this->vars["kvbpper100kgmelk"];
            $umdlcompanyproperties->veebenutting_n = str_replace(' %','',$this->vars["kring1_benut_vee"]);
            $umdlcompanyproperties->bodembenutting_n = str_replace(' %','',$this->vars["kring1_benut_bod"]);
            $umdlcompanyproperties->bedrijfsbenutting_n = str_replace(' %','',$this->vars["kring1_benut_tot"]);
            $umdlcompanyproperties->g_co2_per_kg_meetmelk = $this->vars["cgrond_melk_emi"];
            $umdlcompanyproperties->kg_co2_per_ha = $this->vars["cgrond_bedr_emi"];
            $umdlcompanyproperties->grondsoort = $this->rangschikBodem($this->vars["bodem_pcveen"],
                $this->vars["bodem_pcklei"],
                $this->vars["bodem_pczand1"],
                $this->vars["bodem_pczand2"],
                $this->vars["bodem_pczand3"] );

            $umdlcompanyproperties->save();
            }

        return $umdlcompanyproperties->id;
    }

    /**
     * @param $veen
     * @param $klei
     * @param $zand1
     * @param $zand2
     * @param $zand3
     * @return string
     */
    public function rangschikBodem($veen, $klei, $zand1, $zand2, $zand3) : string
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

}
