<?php

namespace App\Libraries\UMDL;

use App\Models\KlwValue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UMDLKPI
{
    /**
     * @param $kpi_name
     * @param $year
     * @param $company_id
     * @return float
     */
    public function getKPI($kpi_name, $company_id): array
    {
        if ($kpi_name == "UMDL1a")
        {
            $dzhm_nbodem_over = $this->getField("'dzhm_nbodem_over'", $company_id);
            $avg = ($dzhm_nbodem_over[0]->value + $dzhm_nbodem_over[1]->value + $dzhm_nbodem_over[2]->value) / 3;

            return array (
                "text" => "KPI 1a: Stikstofbalans bodemoverschot (kg N-totaal per ha) ",
                "value2021" => $dzhm_nbodem_over[0]->value,
                "value2022" => $dzhm_nbodem_over[1]->value,
                "value2023" => $dzhm_nbodem_over[2]->value,
                "avg" => round($avg, 1),
                "score" => round($avg, 1)
            );
        }

        if ($kpi_name == "UMDL1b")
        {
            $dzhm_nbodem_over = $this->getField("'dzhm_nbodem_over'", $company_id);
            $bodemn_pcveen = $this->getField("'bodemn_pcveen'", $company_id);

            $avg = ($dzhm_nbodem_over[0]->value - (1.99 * $bodemn_pcveen[0]->value) +
                    $dzhm_nbodem_over[1]->value - (1.99 * $bodemn_pcveen[1]->value) +
                    $dzhm_nbodem_over[2]->value - (1.99 * $bodemn_pcveen[2]->value)) / 3;


            return array (
                "text" => "Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen",
                "value2021" => $dzhm_nbodem_over[0]->value - (1.99 * $bodemn_pcveen[0]->value),
                "value2022" => $dzhm_nbodem_over[1]->value - (1.99 * $bodemn_pcveen[1]->value),
                "value2023" => $dzhm_nbodem_over[2]->value - (1.99 * $bodemn_pcveen[2]->value),
                "avg" => round($avg, 1),
                "score" => round($avg, 1)
            );
        }
        if ($kpi_name == "UMDL2")
        {
            $verl_bodbal2_ha = $this->getField("'verl_bodbal2_ha'", $company_id);
            $avg = ($verl_bodbal2_ha[0]->value + $verl_bodbal2_ha[1]->value + $verl_bodbal2_ha[2]->value) / 3;

            return array (
                "text" => "KPI 2: Fosfaatbalansbodemoverschot (kg P2O5 per ha)
 ",
                "value2021" => $verl_bodbal2_ha[0]->value,
                "value2022" => $verl_bodbal2_ha[1]->value,
                "value2023" => $verl_bodbal2_ha[2]->value,
                "avg" => round($avg, 1),
                "score" => round($avg, 1)
            );
        }
    }

    /**
     * @param $field_name
     * @param $year
     * @param $company
     * @return string
     */
    public function getField($field_name, $company): array
    {
        return DB::select("select v.value, d.year from `klw_fields` f, `klw_dumps` d, `klw_values` v
                                   where (f.id = v.field_id and  d.id = v.dump_id and
                                                  d.company_id = " . $company . "
                                                       and f.fieldname = " . $field_name . ") ORDER BY d.year ASC");

    }
}
