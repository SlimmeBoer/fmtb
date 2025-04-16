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

        // All KPI-scoring properties to zero or false (has to be set manually)php artisan serve --host 0.0.0.0:8000
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

        $umdlcompanyproperties->opp_totaal= $opp_totaal;
        $umdlcompanyproperties->opp_totaal_subsidiabel = $opp_totaal;
        $umdlcompanyproperties->melkkoeien = $this->vars["nkoe"];
        $umdlcompanyproperties->meetmelk_per_koe = $this->vars["fpcmpkoe"];
        $umdlcompanyproperties->meetmelk_per_ha = $this->vars["bkg_prod_fpcm"] / $opp_totaal;
        $umdlcompanyproperties->jongvee_per_10mk = $this->vars["jvper10mk"];
        $umdlcompanyproperties->gve_per_ha = $this->vars["gve_melkvee"] / $opp_totaal;
        $umdlcompanyproperties->kunstmest_per_ha = $this->vars["kring1_bodaan_km"];
        $umdlcompanyproperties->opbrengst_grasland_per_ha = $this->vars["opb_graspr_ds"];
        $umdlcompanyproperties->re_kvem = $this->vars["rants_re_kvem"];
        $umdlcompanyproperties->krachtvoer_per_100kg_melk = $this->vars["kvbpper100kgmelk"];
        $umdlcompanyproperties->veebenutting_n = str_replace(' %','',$this->vars["kring1_benut_vee"]);
        $umdlcompanyproperties->bodembenutting_n = str_replace(' %','',$this->vars["kring1_benut_bod"]);
        $umdlcompanyproperties->bedrijfsbenutting_n = str_replace(' %','',$this->vars["kring1_benut_tot"]);

        $umdlcompanyproperties->save();

        return $umdlcompanyproperties->id;
    }

}
