<?php

namespace App\Libraries\Monitor;

use App\Models\Area;
use App\Models\Company;
use App\Models\Collective;
use Illuminate\Support\Facades\Log;

class KPITotals
{
    /**
     * @param $collective_id
     * @return array|array[]
     */
    public function getTotalsCollective($collective_id): array
    {
        // 1. Get settings
        $settings = parse_ini_file('config/FMTB.ini', true);

        // Make empty array
        $totals_array = array(
            'kpi1' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi1_klei"])),
            'kpi2a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2a"])),
            'kpi2b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2b"])),
            'kpi2c' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2c"])),
            'kpi2d' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2d"])),
            'kpi3' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi3"])),
            'kpi4' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi4"])),
            'kpi5' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi5"])),
            'kpi6a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6a"])),
            'kpi6b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6b"])),
            'kpi6c' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6c"])),
            'kpi7' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi7"])),
            'kpi8' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi8"])),
            'kpi9' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi9"])),
            'kpi11' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi11"])),
            'kpi12a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi12a"])),
            'kpi12b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi12b"])),
            'kpi13' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi13"])),
            'kpi14' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi14"])),
        );

        $scores = new KPIScores();

        if ($collective_id == 0) {
            $companies = Company::has('klwDumps')->get();
        } else {
            $collective = Collective::find($collective_id);
            $companies = $collective->companies()->has('klwDumps')->get();
        }

        foreach ($companies as $company) {
            $company_scores = $scores->getScores($company->id);

            $totals_array['year']['year1'][$company->name] = $company_scores['year1']['kpi1b'];

            $totals_array['kpi1']['year1'][$company->name] = $company_scores['year1']['kpi1b'];
            $totals_array['kpi2a']['year1'][$company->name] = $company_scores['year1']['kpi2a'];
            $totals_array['kpi2b']['year1'][$company->name] = $company_scores['year1']['kpi2b'];
            $totals_array['kpi2c']['year1'][$company->name] = $company_scores['year1']['kpi2c'];
            $totals_array['kpi2d']['year1'][$company->name] = $company_scores['year1']['kpi2d'];
            $totals_array['kpi3']['year1'][$company->name] = $company_scores['year1']['kpi3'];
            $totals_array['kpi4']['year1'][$company->name] = $company_scores['year1']['kpi4'];
            $totals_array['kpi5']['year1'][$company->name] = $company_scores['year1']['kpi5b'];
            $totals_array['kpi6a']['year1'][$company->name] = $company_scores['year1']['kpi6a'];
            $totals_array['kpi6b']['year1'][$company->name] = $company_scores['year1']['kpi6b'];
            $totals_array['kpi6c']['year1'][$company->name] = $company_scores['year1']['kpi6c'];
            $totals_array['kpi8']['year1'][$company->name] = $company_scores['year1']['kpi8'];
            $totals_array['kpi9']['year1'][$company->name] = $company_scores['year1']['kpi9'];
            $totals_array['kpi11']['year1'][$company->name] = $company_scores['year1']['kpi11'];
            $totals_array['kpi12a']['year1'][$company->name] = $company_scores['year1']['kpi12a'];
            $totals_array['kpi12b']['year1'][$company->name] = $company_scores['year1']['kpi12b'];
            $totals_array['kpi13']['year1'][$company->name] = $company_scores['year1']['kpi13'];

            $totals_array['kpi1']['year2'][$company->name] = $company_scores['year2']['kpi1b'];
            $totals_array['kpi2a']['year2'][$company->name] = $company_scores['year2']['kpi2a'];
            $totals_array['kpi2b']['year2'][$company->name] = $company_scores['year2']['kpi2b'];
            $totals_array['kpi2c']['year2'][$company->name] = $company_scores['year2']['kpi2c'];
            $totals_array['kpi2d']['year2'][$company->name] = $company_scores['year2']['kpi2d'];
            $totals_array['kpi3']['year2'][$company->name] = $company_scores['year2']['kpi3'];
            $totals_array['kpi4']['year2'][$company->name] = $company_scores['year2']['kpi4'];
            $totals_array['kpi5']['year2'][$company->name] = $company_scores['year2']['kpi5b'];
            $totals_array['kpi6a']['year2'][$company->name] = $company_scores['year2']['kpi6a'];
            $totals_array['kpi6b']['year2'][$company->name] = $company_scores['year2']['kpi6b'];
            $totals_array['kpi6c']['year2'][$company->name] = $company_scores['year2']['kpi6c'];
            $totals_array['kpi8']['year2'][$company->name] = $company_scores['year2']['kpi8'];
            $totals_array['kpi9']['year2'][$company->name] = $company_scores['year2']['kpi9'];
            $totals_array['kpi11']['year2'][$company->name] = $company_scores['year2']['kpi11'];
            $totals_array['kpi12a']['year2'][$company->name] = $company_scores['year2']['kpi12a'];
            $totals_array['kpi12b']['year2'][$company->name] = $company_scores['year2']['kpi12b'];
            $totals_array['kpi13']['year2'][$company->name] = $company_scores['year2']['kpi13'];

            $totals_array['kpi1']['year3'][$company->name] = $company_scores['year3']['kpi1b'];
            $totals_array['kpi2a']['year3'][$company->name] = $company_scores['year3']['kpi2a'];
            $totals_array['kpi2b']['year3'][$company->name] = $company_scores['year3']['kpi2b'];
            $totals_array['kpi2c']['year3'][$company->name] = $company_scores['year3']['kpi2c'];
            $totals_array['kpi2d']['year3'][$company->name] = $company_scores['year3']['kpi2d'];
            $totals_array['kpi3']['year3'][$company->name] = $company_scores['year3']['kpi3'];
            $totals_array['kpi4']['year3'][$company->name] = $company_scores['year3']['kpi4'];
            $totals_array['kpi5']['year3'][$company->name] = $company_scores['year3']['kpi5b'];
            $totals_array['kpi6a']['year3'][$company->name] = $company_scores['year3']['kpi6a'];
            $totals_array['kpi6b']['year3'][$company->name] = $company_scores['year3']['kpi6b'];
            $totals_array['kpi6c']['year3'][$company->name] = $company_scores['year3']['kpi6c'];
            $totals_array['kpi8']['year3'][$company->name] = $company_scores['year3']['kpi8'];
            $totals_array['kpi9']['year3'][$company->name] = $company_scores['year3']['kpi9'];
            $totals_array['kpi11']['year3'][$company->name] = $company_scores['year3']['kpi11'];
            $totals_array['kpi12a']['year3'][$company->name] = $company_scores['year3']['kpi12a'];
            $totals_array['kpi12b']['year3'][$company->name] = $company_scores['year3']['kpi12b'];
            $totals_array['kpi13']['year3'][$company->name] = $company_scores['year3']['kpi13'];

            $totals_array['kpi1']['avgs'][$company->name] = $company_scores['avg']['kpi1b'];
            $totals_array['kpi2a']['avgs'][$company->name] = $company_scores['avg']['kpi2a'];
            $totals_array['kpi2b']['avgs'][$company->name] = $company_scores['avg']['kpi2b'];
            $totals_array['kpi2c']['avgs'][$company->name] = $company_scores['avg']['kpi2d'];
            $totals_array['kpi2d']['avgs'][$company->name] = $company_scores['avg']['kpi2d'];
            $totals_array['kpi3']['avgs'][$company->name] = $company_scores['avg']['kpi3'];
            $totals_array['kpi4']['avgs'][$company->name] = $company_scores['avg']['kpi4'];
            $totals_array['kpi5']['avgs'][$company->name] = $company_scores['avg']['kpi5b'];
            $totals_array['kpi6a']['avgs'][$company->name] = $company_scores['avg']['kpi6a'];
            $totals_array['kpi6b']['avgs'][$company->name] = $company_scores['avg']['kpi6b'];
            $totals_array['kpi6c']['avgs'][$company->name] = $company_scores['avg']['kpi6c'];
            $totals_array['kpi7']['avgs'][$company->name] = $company_scores['avg']['kpi7'];
            $totals_array['kpi8']['avgs'][$company->name] = $company_scores['avg']['kpi8'];
            $totals_array['kpi9']['avgs'][$company->name] = $company_scores['avg']['kpi9'];
            $totals_array['kpi11']['avgs'][$company->name] = $company_scores['avg']['kpi11'];
            $totals_array['kpi12a']['avgs'][$company->name] = $company_scores['avg']['kpi12a'];
            $totals_array['kpi12b']['avgs'][$company->name] = $company_scores['avg']['kpi12b'];
            $totals_array['kpi13']['avgs'][$company->name] = $company_scores['avg']['kpi13'];
            $totals_array['kpi14']['avgs'][$company->name] = $company_scores['avg']['kpi14'];


            $totals_array['kpi1']['scores'] = $this->addScore($totals_array['kpi1']['scores'], $company_scores['weighted_score']['kpi1b']);
            $totals_array['kpi2a']['scores'] = $this->addScore($totals_array['kpi2a']['scores'], $company_scores['weighted_score']['kpi2a']);
            $totals_array['kpi2b']['scores'] = $this->addScore($totals_array['kpi2b']['scores'], $company_scores['weighted_score']['kpi2b']);
            $totals_array['kpi2c']['scores'] = $this->addScore($totals_array['kpi2c']['scores'], $company_scores['weighted_score']['kpi2c']);
            $totals_array['kpi2d']['scores'] = $this->addScore($totals_array['kpi2d']['scores'], $company_scores['weighted_score']['kpi2d']);
            $totals_array['kpi3']['scores'] = $this->addScore($totals_array['kpi3']['scores'], $company_scores['weighted_score']['kpi3']);
            $totals_array['kpi4']['scores'] = $this->addScore($totals_array['kpi4']['scores'], $company_scores['weighted_score']['kpi4']);
            $totals_array['kpi5']['scores'] = $this->addScore($totals_array['kpi5']['scores'], $company_scores['weighted_score']['kpi5b']);
            $totals_array['kpi6a']['scores'] = $this->addScore($totals_array['kpi6a']['scores'], $company_scores['weighted_score']['kpi6a']);
            $totals_array['kpi6b']['scores'] = $this->addScore($totals_array['kpi6b']['scores'], $company_scores['weighted_score']['kpi6b']);
            $totals_array['kpi6c']['scores'] = $this->addScore($totals_array['kpi6c']['scores'], $company_scores['weighted_score']['kpi6c']);
            $totals_array['kpi7']['scores'] = $this->addScore($totals_array['kpi7']['scores'], $company_scores['weighted_score']['kpi7']);
            $totals_array['kpi8']['scores'] = $this->addScore($totals_array['kpi8']['scores'], $company_scores['weighted_score']['kpi8']);
            $totals_array['kpi9']['scores'] = $this->addScore($totals_array['kpi9']['scores'], $company_scores['weighted_score']['kpi9']);
            $totals_array['kpi11']['scores'] = $this->addScore($totals_array['kpi11']['scores'], $company_scores['weighted_score']['kpi11']);
            $totals_array['kpi12a']['scores'] = $this->addScore($totals_array['kpi12a']['scores'], $company_scores['weighted_score']['kpi12a']);
            $totals_array['kpi12b']['scores'] = $this->addScore($totals_array['kpi12b']['scores'], $company_scores['weighted_score']['kpi12b']);
            $totals_array['kpi13']['scores'] = $this->addScore($totals_array['kpi13']['scores'], $company_scores['weighted_score']['kpi13']);
            $totals_array['kpi14']['scores'] = $this->addScore($totals_array['kpi14']['scores'], $company_scores['weighted_score']['kpi14']);
        }

        return $totals_array;
    }

    public function getTotalsArea($area_id): array
    {
        // 1. Get settings
        $settings = parse_ini_file('config/FMTB.ini', true);

        // Make empty array
        $totals_array = array(
            'kpi1' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi1b_klei"])),
            'kpi2a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2a"])),
            'kpi2b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2b"])),
            'kpi2c' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2c"])),
            'kpi2d' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2d"])),
            'kpi3' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi3"])),
            'kpi4' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi4"])),
            'kpi5' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi5"])),
            'kpi6a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6a"])),
            'kpi6b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6b"])),
            'kpi6c' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6c"])),
            'kpi7' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi7"])),
            'kpi8' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi8"])),
            'kpi9' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi9"])),
            'kpi11' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi11"])),
            'kpi12a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi12a"])),
            'kpi12b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi12b"])),
            'kpi13' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi13"])),
            'kpi14' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi14"])),

        );

        $scores = new KPIScores();

        if ($area_id == 0) {
            $companies = Company::has('klwDumps')->get();
        } else {
            $area = Area::find($area_id);
            $companies = $area->companies()->has('klwDumps')->get();
        }

        foreach ($companies as $company) {
            $company_scores = $scores->getScores($company->id);

            $totals_array['year']['year1'][$company->name] = $company_scores['year1']['kpi1b'];

            $totals_array['kpi1']['year1'][$company->name] = $company_scores['year1']['kpi1b'];
            $totals_array['kpi2a']['year1'][$company->name] = $company_scores['year1']['kpi2a'];
            $totals_array['kpi2b']['year1'][$company->name] = $company_scores['year1']['kpi2b'];
            $totals_array['kpi2c']['year1'][$company->name] = $company_scores['year1']['kpi2c'];
            $totals_array['kpi2d']['year1'][$company->name] = $company_scores['year1']['kpi2d'];
            $totals_array['kpi3']['year1'][$company->name] = $company_scores['year1']['kpi3'];
            $totals_array['kpi4']['year1'][$company->name] = $company_scores['year1']['kpi4'];
            $totals_array['kpi5']['year1'][$company->name] = $company_scores['year1']['kpi5b'];
            $totals_array['kpi6a']['year1'][$company->name] = $company_scores['year1']['kpi6a'];
            $totals_array['kpi6b']['year1'][$company->name] = $company_scores['year1']['kpi6b'];
            $totals_array['kpi6c']['year1'][$company->name] = $company_scores['year1']['kpi6c'];
            $totals_array['kpi8']['year1'][$company->name] = $company_scores['year1']['kpi8'];
            $totals_array['kpi9']['year1'][$company->name] = $company_scores['year1']['kpi9'];
            $totals_array['kpi11']['year1'][$company->name] = $company_scores['year1']['kpi11'];
            $totals_array['kpi12a']['year1'][$company->name] = $company_scores['year1']['kpi12a'];
            $totals_array['kpi12b']['year1'][$company->name] = $company_scores['year1']['kpi12b'];
            $totals_array['kpi13']['year1'][$company->name] = $company_scores['year1']['kpi13'];

            $totals_array['kpi1']['year2'][$company->name] = $company_scores['year2']['kpi1b'];
            $totals_array['kpi2a']['year2'][$company->name] = $company_scores['year2']['kpi2a'];
            $totals_array['kpi2b']['year2'][$company->name] = $company_scores['year2']['kpi2b'];
            $totals_array['kpi2c']['year2'][$company->name] = $company_scores['year2']['kpi2c'];
            $totals_array['kpi2d']['year2'][$company->name] = $company_scores['year2']['kpi2d'];
            $totals_array['kpi3']['year2'][$company->name] = $company_scores['year2']['kpi3'];
            $totals_array['kpi4']['year2'][$company->name] = $company_scores['year2']['kpi4'];
            $totals_array['kpi5']['year2'][$company->name] = $company_scores['year2']['kpi5b'];
            $totals_array['kpi6a']['year2'][$company->name] = $company_scores['year2']['kpi6a'];
            $totals_array['kpi6b']['year2'][$company->name] = $company_scores['year2']['kpi6b'];
            $totals_array['kpi6c']['year2'][$company->name] = $company_scores['year2']['kpi6c'];
            $totals_array['kpi8']['year2'][$company->name] = $company_scores['year2']['kpi8'];
            $totals_array['kpi9']['year2'][$company->name] = $company_scores['year2']['kpi9'];
            $totals_array['kpi11']['year2'][$company->name] = $company_scores['year2']['kpi11'];
            $totals_array['kpi12a']['year2'][$company->name] = $company_scores['year2']['kpi12a'];
            $totals_array['kpi12b']['year2'][$company->name] = $company_scores['year2']['kpi12b'];
            $totals_array['kpi13']['year2'][$company->name] = $company_scores['year2']['kpi13'];

            $totals_array['kpi1']['year3'][$company->name] = $company_scores['year3']['kpi1b'];
            $totals_array['kpi2a']['year3'][$company->name] = $company_scores['year3']['kpi2a'];
            $totals_array['kpi2b']['year3'][$company->name] = $company_scores['year3']['kpi2b'];
            $totals_array['kpi2c']['year3'][$company->name] = $company_scores['year3']['kpi2c'];
            $totals_array['kpi2d']['year3'][$company->name] = $company_scores['year3']['kpi2d'];
            $totals_array['kpi3']['year3'][$company->name] = $company_scores['year3']['kpi3'];
            $totals_array['kpi4']['year3'][$company->name] = $company_scores['year3']['kpi4'];
            $totals_array['kpi5']['year3'][$company->name] = $company_scores['year3']['kpi5b'];
            $totals_array['kpi6a']['year3'][$company->name] = $company_scores['year3']['kpi6a'];
            $totals_array['kpi6b']['year3'][$company->name] = $company_scores['year3']['kpi6b'];
            $totals_array['kpi6c']['year3'][$company->name] = $company_scores['year3']['kpi6c'];
            $totals_array['kpi8']['year3'][$company->name] = $company_scores['year3']['kpi8'];
            $totals_array['kpi9']['year3'][$company->name] = $company_scores['year3']['kpi9'];
            $totals_array['kpi11']['year3'][$company->name] = $company_scores['year3']['kpi11'];
            $totals_array['kpi12a']['year3'][$company->name] = $company_scores['year3']['kpi12a'];
            $totals_array['kpi12b']['year3'][$company->name] = $company_scores['year3']['kpi12b'];
            $totals_array['kpi13']['year3'][$company->name] = $company_scores['year3']['kpi13'];

            $totals_array['kpi1']['avgs'][$company->name] = $company_scores['avg']['kpi1b'];
            $totals_array['kpi2a']['avgs'][$company->name] = $company_scores['avg']['kpi2a'];
            $totals_array['kpi2b']['avgs'][$company->name] = $company_scores['avg']['kpi2b'];
            $totals_array['kpi2c']['avgs'][$company->name] = $company_scores['avg']['kpi2d'];
            $totals_array['kpi2d']['avgs'][$company->name] = $company_scores['avg']['kpi2d'];
            $totals_array['kpi3']['avgs'][$company->name] = $company_scores['avg']['kpi3'];
            $totals_array['kpi4']['avgs'][$company->name] = $company_scores['avg']['kpi4'];
            $totals_array['kpi5']['avgs'][$company->name] = $company_scores['avg']['kpi5b'];
            $totals_array['kpi6a']['avgs'][$company->name] = $company_scores['avg']['kpi6a'];
            $totals_array['kpi6b']['avgs'][$company->name] = $company_scores['avg']['kpi6b'];
            $totals_array['kpi6c']['avgs'][$company->name] = $company_scores['avg']['kpi6c'];
            $totals_array['kpi7']['avgs'][$company->name] = $company_scores['avg']['kpi7'];
            $totals_array['kpi8']['avgs'][$company->name] = $company_scores['avg']['kpi8'];
            $totals_array['kpi9']['avgs'][$company->name] = $company_scores['avg']['kpi9'];
            $totals_array['kpi11']['avgs'][$company->name] = $company_scores['avg']['kpi11'];
            $totals_array['kpi12a']['avgs'][$company->name] = $company_scores['avg']['kpi12a'];
            $totals_array['kpi12b']['avgs'][$company->name] = $company_scores['avg']['kpi12b'];
            $totals_array['kpi13']['avgs'][$company->name] = $company_scores['avg']['kpi13'];
            $totals_array['kpi14']['avgs'][$company->name] = $company_scores['avg']['kpi14'];


            $totals_array['kpi1']['scores'] = $this->addScore($totals_array['kpi1']['scores'], $company_scores['weighted_score']['kpi1b']);
            $totals_array['kpi2a']['scores'] = $this->addScore($totals_array['kpi2a']['scores'], $company_scores['weighted_score']['kpi2a']);
            $totals_array['kpi2b']['scores'] = $this->addScore($totals_array['kpi2b']['scores'], $company_scores['weighted_score']['kpi2b']);
            $totals_array['kpi2c']['scores'] = $this->addScore($totals_array['kpi2c']['scores'], $company_scores['weighted_score']['kpi2c']);
            $totals_array['kpi2d']['scores'] = $this->addScore($totals_array['kpi2d']['scores'], $company_scores['weighted_score']['kpi2d']);
            $totals_array['kpi3']['scores'] = $this->addScore($totals_array['kpi3']['scores'], $company_scores['weighted_score']['kpi3']);
            $totals_array['kpi4']['scores'] = $this->addScore($totals_array['kpi4']['scores'], $company_scores['weighted_score']['kpi4']);
            $totals_array['kpi5']['scores'] = $this->addScore($totals_array['kpi5']['scores'], $company_scores['weighted_score']['kpi5b']);
            $totals_array['kpi6a']['scores'] = $this->addScore($totals_array['kpi6a']['scores'], $company_scores['weighted_score']['kpi6a']);
            $totals_array['kpi6b']['scores'] = $this->addScore($totals_array['kpi6b']['scores'], $company_scores['weighted_score']['kpi6b']);
            $totals_array['kpi6c']['scores'] = $this->addScore($totals_array['kpi6c']['scores'], $company_scores['weighted_score']['kpi6c']);
            $totals_array['kpi7']['scores'] = $this->addScore($totals_array['kpi7']['scores'], $company_scores['weighted_score']['kpi7']);
            $totals_array['kpi8']['scores'] = $this->addScore($totals_array['kpi8']['scores'], $company_scores['weighted_score']['kpi8']);
            $totals_array['kpi9']['scores'] = $this->addScore($totals_array['kpi9']['scores'], $company_scores['weighted_score']['kpi9']);
            $totals_array['kpi11']['scores'] = $this->addScore($totals_array['kpi11']['scores'], $company_scores['weighted_score']['kpi11']);
            $totals_array['kpi12a']['scores'] = $this->addScore($totals_array['kpi12a']['scores'], $company_scores['weighted_score']['kpi12a']);
            $totals_array['kpi12b']['scores'] = $this->addScore($totals_array['kpi12b']['scores'], $company_scores['weighted_score']['kpi12b']);
            $totals_array['kpi13']['scores'] = $this->addScore($totals_array['kpi13']['scores'], $company_scores['weighted_score']['kpi13']);
            $totals_array['kpi14']['scores'] = $this->addScore($totals_array['kpi14']['scores'], $company_scores['weighted_score']['kpi14']);
        }

        return $totals_array;
    }


    /**
     * @param $settings
     * @return array
     */
    public function getSettingArray($settings): array
    {
        $setting_array = array();

        foreach ($settings as $setting_key => $setting_value) {
            $setting_array[$setting_value] = 0;
        }
        ksort($setting_array);
        return $setting_array;
    }


    /**
     * @param $score_array
     * @param $score
     * @return void
     */
    public function addScore($score_array, $score): array
    {
        foreach ($score_array as $score_key => $score_value) {
            if ($score_key == $score)
            {
                $score_array[$score_key] = $score_value + 1;
            }
        }

        return $score_array;
    }


}
