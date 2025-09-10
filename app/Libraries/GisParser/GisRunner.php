<?php

namespace App\Libraries\GisParser;

use App\Models\BbmAnlbPackage;
use App\Models\BbmCode;
use App\Models\BbmGisPackage;
use App\Models\BbmKpi;
use App\Models\Company;
use App\Models\GisRecord;
use App\Models\CompanyProperties;
use App\Models\KpiValues;
use Illuminate\Support\Facades\Log;

class GisRunner
{
    /**
     * Gets an array of all BBM-codes and ses the value of them to zero so they can be calculated later on.
     * @return array
     */
    public function getValues(): array
    {
        $bbm_values = array();
        $bbmcodes = BbmCode::all();

        foreach ($bbmcodes as $bbmcode) {
            $bbm_values[] = array(
                'code' => $bbmcode->code,
                'waarde' => 0,
            );
        }
        return $bbm_values;
    }

    /**
     * Returns a BBM-code as string based on the supplied eenheid_code.
     * @param string $eenheid_code
     * @return string
     */
    public function getBbmCode(string $eenheid_code): string
    {
        $bbmcode = "";

        // 1. Direct BBM-code
        if (str_starts_with($eenheid_code, 'BBM')) {
            $bbmcode = $eenheid_code;
        }
        // 2. Four characters, means it's an ANLB-package
        elseif (strlen($eenheid_code) >= 4 && preg_match('/^[A-Za-z]\d{2}[A-Za-z]$/', substr($eenheid_code, 0, 4)))
        {
            $anlb_numbers = substr($eenheid_code, 1, 2);
            $anlb_letter = substr($eenheid_code, 3, 1);

            $anlb_packages = BbmAnlbPackage::all();
            foreach ($anlb_packages as $anlb_package)
            {
                if ($anlb_package->anlb_number == $anlb_numbers && str_contains($anlb_package->anlb_letters, $anlb_letter))
                {
                    $bbm = BbmCode::where('id', $anlb_package->code_id)->first();
                    $bbmcode = $bbm->code;
                }
            }
        }
        else {
            // 3. Check if the package is a Z-package.
            $z_packages = BbmGisPackage::all();
            foreach ($z_packages as $z_package)
            {
                if ($z_package->package == $eenheid_code)
                {
                    $bbm = BbmCode::where('id', $z_package->code_id)->first();
                    $bbmcode = $bbm->code;
                }
            }
        }
        return $bbmcode;
    }

    /**
     * Udates an the value array with the contents of a certain gis_rec
     * @param array $bbm_values
     * @param string $bbmcode
     * @param GisRecord $gis_record
     * @return array
     */
    public function updateValues(array $bbm_values, string $bbmcode, GisRecord $gis_record): array
    {
        foreach ($bbm_values as &$bbm_value) { // Use reference '&'
            if ($bbm_value['code'] == $bbmcode) {
                if ($bbmcode == "BBM121" || $bbmcode == "BBM146") {
                    $bbm_value['waarde'] += $gis_record->eenheden * 0.0001;
                } elseif ($bbmcode == "BBM112" || $bbmcode == "BBM132") {
                    if ($gis_record->oppervlakte > 0){
                        $bbm_value['waarde'] += $gis_record->oppervlakte;
                    } else {
                        $bbm_value['waarde'] += $gis_record->lengte * 0.0001;
                    }
                } else {
                    $bbm_value['waarde'] += $gis_record->oppervlakte ;
                }
            }
        }
        unset($bbm_value); // Unset reference after loop to avoid unintended modifications

        return $bbm_values;
    }

    /**
     * Upates the company with the newly set bbm-values
     * @param array $bbm_values
     * @param Company $company
     * @return void
     */
    public function processKPIs(array $bbm_values, Company $company)
    {

        // Initialize data
        $kpi10 = 0;
        $kpi11 = 0;
        $kpi12 = 0;

        // Load all BBMKPI-connections
        $bbmkpis = BbmKpi::all();

        // First, update the scores with all the data from the BBM-values
        foreach ($bbm_values as $bbm_value)
        {
            $bbm = BbmCode::where('code', $bbm_value['code'])->first();

            foreach ($bbmkpis as $bbmkpi)
            {
                if ($bbmkpi->kpi == 10 && $bbmkpi->code_id == $bbm->id)
                {
                    $kpi10 += ($bbm_value['waarde'] * $bbm->weight);
                }
                if ($bbmkpi->kpi == 11 && $bbmkpi->code_id == $bbm->id)
                {
                    $kpi11 += ($bbm_value['waarde'] * $bbm->weight);
                }
                if ($bbmkpi->kpi == 12 && $bbmkpi->code_id == $bbm->id)
                {
                    $kpi12 += ($bbm_value['waarde'] * $bbm->weight);
                }
            }
        }

        // KPIs are now set with all weighted data. Now, divide by the total surface of the company.
        $company_properties = CompanyProperties::where('company_id',$company->id)->first();
        $kpi10 = $kpi10 / $company_properties->opp_totaal_subsidiabel;
        $kpi11 = $kpi11 / $company_properties->opp_totaal_subsidiabel;
        $kpi12 = $kpi12 / $company_properties->opp_totaal_subsidiabel;

        // Final action, store the percentage in all KpiValues
        $kpivalues = KpiValues::where('company_id',$company->id)->get();

        foreach ($kpivalues as $kpivalue)
        {
            $kpivalue->kpi10 = $kpi10;
            $kpivalue->kpi11 = $kpi11;
            $kpivalue->kpi12 = $kpi12;
            $kpivalue->save();
        }

    }
}
