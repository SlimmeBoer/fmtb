<?php

namespace App\Libraries\Monitor;

use App\Models\KlwValue;
use App\Models\KpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class KPICollector
{

    public array $vars = array (
        "bodemg_pcveen" => 0.0,
        "bodemm_pcveen" => 0.0,
        "bodemn_pcveen" => 0.0,
        "bodema_pcveen" => 0.0,
        "opp_prgras" => 0.0,
        "opp_mais" => 0.0,
        "opp_natuur" => 0.0,
        "opp_overig" => 0.0,
        "opp_totaal" => 0.0,
        "dzhm_nbodem_over" => 0.0,
        "verl_bodbal2_ha" => 0.0,
        "dzhm_nh3_bedrha" => 0.0,
        "dzhm_nh3_landha" => 0.0,
        "emnh3_stl_gve" => 0.0,
        "rants_geh_re" => 0.0,
        "weidmk_dgn" => 0.0,
        "weidmk_urn" => 0.0,
        "ureum" => 0.0,
        "bkg_prod_fpcm" => 0.0,
        "dzhm_co2_melkprod" => 0.0,
        "dzhm_co2i_melkprod" => 0.0,
        "dzhm_eiwit_pcrants" => 0.0,
        "dzhm_blijgras_aand" => 0.0,
        "cgrond_bedr_eos" => 0.0,
        "cgrond_gras_eos" => 0.0,
        "elek_prod_kwh" => 0.0,
        "enespec_elek_kwh" => 0.0,
        "nkoe" => 0.0,
        "lftkoe_vk" => 0.0,
    );
    /**
     * @param $kpi_name
     * @param $year
     * @param $company_id
     * @return float
     */
    public function saveKPIs($company_id, $year) : int
    {
        $opp_totaal  =
            $this->vars["opp_prgras"] + $this->vars["opp_mais"] + $this->vars["opp_natuur"] + $this->vars["opp_overig"];

        $percentage_veen  = floatval((($this->vars["opp_prgras"] * $this->vars["bodemg_pcveen"]) +
            ($this->vars["opp_mais"] * $this->vars["bodemm_pcveen"]) +
            ($this->vars["opp_natuur"] * $this->vars["bodemn_pcveen"]) +
            ($this->vars["opp_overig"] * $this->vars["bodema_pcveen"])) /
            $opp_totaal);

        $kpivalues = KpiValues::firstOrNew(array(
            'company_id' => $company_id,
            'year' => $year,
        ));
        $kpivalues->kpi1a = $this->vars["dzhm_nbodem_over"];
        $kpivalues->kpi1b = $this->vars["dzhm_nbodem_over"] - (1.99 * $percentage_veen);
        $kpivalues->kpi2a = $this->vars["dzhm_nh3_landha"];
        $kpivalues->kpi2b = $this->vars["emnh3_stl_gve"];
        $kpivalues->kpi2c = $this->vars["rants_geh_re"];
        $kpivalues->kpi2d = $this->vars["ureum"];
        $kpivalues->kpi2e = $this->vars["weidmk_dgn"] * $this->vars["weidmk_urn"];
        $kpivalues->kpi3 = $this->vars["verl_bodbal2_ha"];
        $kpivalues->kpi4 = $this->vars["dzhm_eiwit_pcrants"];

        // Kpi 5a
        if ($year === '2024') {
            $kpivalues->kpi5a = ($this->vars["bkg_prod_fpcm"] * $this->vars["dzhm_co2i_melkprod"]) / $opp_totaal / 1000;
        } else {
            $kpivalues->kpi5a = ($this->vars["bkg_prod_fpcm"] * $this->vars["dzhm_co2_melkprod"]) / $opp_totaal / 1000;
        }

        // Kpi 5b
        if ($year === '2024') {
            $kpivalues->kpi5b = ($this->vars["bkg_prod_fpcm"] * $this->vars["dzhm_co2_melkprod"]) / $opp_totaal / 1000;
        } else {
            $kpivalues->kpi5b = ($this->vars["bkg_prod_fpcm"] * ($this->vars["dzhm_co2_melkprod"] - (3.5 * $percentage_veen))) / $opp_totaal / 1000;
        }

        $kpivalues->kpi6a = $this->vars["enespec_elek_kwh"] / $this->vars["nkoe"];
        $kpivalues->kpi6b = $this->vars["elek_prod_kwh"] / $this->vars["enespec_elek_kwh"];
        $kpivalues->kpi7 = 0;
        $kpivalues->kpi8 = $this->vars["cgrond_bedr_eos"];
        $kpivalues->kpi9 = $this->vars["dzhm_blijgras_aand"];
        $kpivalues->kpi11 = 0;
        $kpivalues->kpi12a = 0;
        $kpivalues->kpi12b = 0;
        $kpivalues->kpi13 = $this->vars["lftkoe_vk"];
        $kpivalues->kpi14 = 0;

        $kpivalues->save();

        return $kpivalues->id;
    }

}
