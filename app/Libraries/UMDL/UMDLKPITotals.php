<?php

namespace App\Libraries\UMDL;

use App\Models\Company;
use App\Models\UmdlCollective;
use Illuminate\Support\Facades\Log;

class UMDLKPITotals
{
    /**
     * @param $collective_id
     * @return array|array[]
     */
    public function getTotals($collective_id): array
    {
        // 1. Get settings
        $settings = parse_ini_file('config/UMDL.ini', true);

        // Make empty array
        $totals_array = array(
            'kpi1' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi1"])),
            'kpi2' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi2"])),
            'kpi3' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi3"])),
            'kpi4' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi4"])),
            'kpi5' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi5"])),
            'kpi6' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi6"])),
            'kpi7' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi7"])),
            'kpi8' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi8"])),
            'kpi9' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi9"])),
            'kpi10' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi10"])),
            'kpi11' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi11"])),
            'kpi12' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi12"])),
            'kpi13a' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi13a"])),
            'kpi13b' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi13b"])),
            'kpi14' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi14"])),
            'kpi15' => array('year1' => array(), 'year2' => array(), 'year3' => array(), 'avgs' => array(), "scores" => $this->getSettingArray($settings["kpi_scores"]["kpi15"])),
        );

        $umdl_scores = new UMDLKPIScores();

        if ($collective_id == 0) {
            $companies = Company::all();
        }
        else {
            $collective = UmdlCollective::find($collective_id);
            $companies = $collective->companies;
        }

        foreach ($companies as $company) {
            $company_scores = $umdl_scores->getScores($company->id);

            $totals_array['year']['year1'][$company->name] = $company_scores['year1']['kpi1b'];
            $totals_array['kpi1']['year1'][$company->name] = $company_scores['year1']['kpi1b'];
            $totals_array['kpi2']['year1'][$company->name] = $company_scores['year1']['kpi2'];
            $totals_array['kpi3']['year1'][$company->name] = $company_scores['year1']['kpi3'];
            $totals_array['kpi4']['year1'][$company->name] = $company_scores['year1']['kpi4'];
            $totals_array['kpi5']['year1'][$company->name] = $company_scores['year1']['kpi5'];
            $totals_array['kpi6']['year1'][$company->name] = $company_scores['year1']['kpi6b'];
            $totals_array['kpi7']['year1'][$company->name] = $company_scores['year1']['kpi7'];
            $totals_array['kpi9']['year1'][$company->name] = $company_scores['year1']['kpi9'];
            $totals_array['kpi10']['year1'][$company->name] = $company_scores['year1']['kpi10'];
            $totals_array['kpi11']['year1'][$company->name] = $company_scores['year1']['kpi11'];
            $totals_array['kpi12']['year1'][$company->name] = $company_scores['year1']['kpi12'];
            $totals_array['kpi13a']['year1'][$company->name] = $company_scores['year1']['kpi13a'];
            $totals_array['kpi13b']['year1'][$company->name] = $company_scores['year1']['kpi13b'];
            $totals_array['kpi14']['year1'][$company->name] = $company_scores['year1']['kpi14'];

            $totals_array['kpi1']['year2'][$company->name] = $company_scores['year2']['kpi1b'];
            $totals_array['kpi2']['year2'][$company->name] = $company_scores['year2']['kpi2'];
            $totals_array['kpi3']['year2'][$company->name] = $company_scores['year2']['kpi3'];
            $totals_array['kpi4']['year2'][$company->name] = $company_scores['year2']['kpi4'];
            $totals_array['kpi5']['year2'][$company->name] = $company_scores['year2']['kpi5'];
            $totals_array['kpi6']['year2'][$company->name] = $company_scores['year2']['kpi6b'];
            $totals_array['kpi7']['year2'][$company->name] = $company_scores['year2']['kpi7'];
            $totals_array['kpi9']['year2'][$company->name] = $company_scores['year2']['kpi9'];
            $totals_array['kpi10']['year2'][$company->name] = $company_scores['year2']['kpi10'];
            $totals_array['kpi11']['year2'][$company->name] = $company_scores['year2']['kpi11'];
            $totals_array['kpi12']['year2'][$company->name] = $company_scores['year2']['kpi12'];
            $totals_array['kpi13a']['year2'][$company->name] = $company_scores['year2']['kpi13a'];
            $totals_array['kpi13b']['year2'][$company->name] = $company_scores['year2']['kpi13b'];
            $totals_array['kpi14']['year2'][$company->name] = $company_scores['year2']['kpi14'];

            $totals_array['kpi1']['year3'][$company->name] = $company_scores['year3']['kpi1b'];
            $totals_array['kpi2']['year3'][$company->name] = $company_scores['year3']['kpi2'];
            $totals_array['kpi3']['year3'][$company->name] = $company_scores['year3']['kpi3'];
            $totals_array['kpi4']['year3'][$company->name] = $company_scores['year3']['kpi4'];
            $totals_array['kpi5']['year3'][$company->name] = $company_scores['year3']['kpi5'];
            $totals_array['kpi6']['year3'][$company->name] = $company_scores['year3']['kpi6b'];
            $totals_array['kpi7']['year3'][$company->name] = $company_scores['year3']['kpi7'];
            $totals_array['kpi9']['year3'][$company->name] = $company_scores['year3']['kpi9'];
            $totals_array['kpi10']['year3'][$company->name] = $company_scores['year3']['kpi10'];
            $totals_array['kpi11']['year3'][$company->name] = $company_scores['year3']['kpi11'];
            $totals_array['kpi12']['year3'][$company->name] = $company_scores['year3']['kpi12'];
            $totals_array['kpi13a']['year3'][$company->name] = $company_scores['year3']['kpi13a'];
            $totals_array['kpi13b']['year3'][$company->name] = $company_scores['year3']['kpi13b'];
            $totals_array['kpi14']['year3'][$company->name] = $company_scores['year3']['kpi14'];

            $totals_array['kpi1']['avgs'][$company->name] = $company_scores['avg']['kpi1b'];
            $totals_array['kpi2']['avgs'][$company->name] = $company_scores['avg']['kpi2'];
            $totals_array['kpi3']['avgs'][$company->name] = $company_scores['avg']['kpi3'];
            $totals_array['kpi4']['avgs'][$company->name] = $company_scores['avg']['kpi4'];
            $totals_array['kpi5']['avgs'][$company->name] = $company_scores['avg']['kpi5'];
            $totals_array['kpi6']['avgs'][$company->name] = $company_scores['avg']['kpi6b'];
            $totals_array['kpi7']['avgs'][$company->name] = $company_scores['avg']['kpi7'];
            $totals_array['kpi8']['avgs'][$company->name] = $company_scores['avg']['kpi8'];
            $totals_array['kpi9']['avgs'][$company->name] = $company_scores['avg']['kpi9'];
            $totals_array['kpi10']['avgs'][$company->name] = $company_scores['avg']['kpi10'];
            $totals_array['kpi11']['avgs'][$company->name] = $company_scores['avg']['kpi11'];
            $totals_array['kpi12']['avgs'][$company->name] = $company_scores['avg']['kpi12'];
            $totals_array['kpi13a']['avgs'][$company->name] = $company_scores['avg']['kpi13a'];
            $totals_array['kpi13b']['avgs'][$company->name] = $company_scores['avg']['kpi13b'];
            $totals_array['kpi14']['avgs'][$company->name] = $company_scores['avg']['kpi14'];
            $totals_array['kpi15']['avgs'][$company->name] = $company_scores['avg']['kpi15'];

            $totals_array['kpi1']['avgs'][$company->name] = $company_scores['avg']['kpi1b'];
            $totals_array['kpi2']['avgs'][$company->name] = $company_scores['avg']['kpi2'];
            $totals_array['kpi3']['avgs'][$company->name] = $company_scores['avg']['kpi3'];
            $totals_array['kpi4']['avgs'][$company->name] = $company_scores['avg']['kpi4'];
            $totals_array['kpi5']['avgs'][$company->name] = $company_scores['avg']['kpi5'];
            $totals_array['kpi6']['avgs'][$company->name] = $company_scores['avg']['kpi6b'];
            $totals_array['kpi7']['avgs'][$company->name] = $company_scores['avg']['kpi7'];
            $totals_array['kpi8']['avgs'][$company->name] = $company_scores['avg']['kpi8'];
            $totals_array['kpi9']['avgs'][$company->name] = $company_scores['avg']['kpi9'];
            $totals_array['kpi10']['avgs'][$company->name] = $company_scores['avg']['kpi10'];
            $totals_array['kpi11']['avgs'][$company->name] = $company_scores['avg']['kpi11'];
            $totals_array['kpi12']['avgs'][$company->name] = $company_scores['avg']['kpi12'];
            $totals_array['kpi13a']['avgs'][$company->name] = $company_scores['avg']['kpi13a'];
            $totals_array['kpi13b']['avgs'][$company->name] = $company_scores['avg']['kpi13b'];
            $totals_array['kpi14']['avgs'][$company->name] = $company_scores['avg']['kpi14'];
            $totals_array['kpi15']['avgs'][$company->name] = $company_scores['avg']['kpi15'];

            $totals_array['kpi1']['scores'] = $this->addScore($totals_array['kpi1']['scores'], $company_scores['score']['kpi1b']);
            $totals_array['kpi2']['scores'] = $this->addScore($totals_array['kpi2']['scores'], $company_scores['score']['kpi2']);
            $totals_array['kpi3']['scores'] = $this->addScore($totals_array['kpi3']['scores'], $company_scores['score']['kpi3']);
            $totals_array['kpi4']['scores'] = $this->addScore($totals_array['kpi4']['scores'], $company_scores['score']['kpi4']);
            $totals_array['kpi5']['scores'] = $this->addScore($totals_array['kpi5']['scores'], $company_scores['score']['kpi5']);
            $totals_array['kpi6']['scores'] = $this->addScore($totals_array['kpi6']['scores'], $company_scores['score']['kpi6b']);
            $totals_array['kpi7']['scores'] = $this->addScore($totals_array['kpi7']['scores'], $company_scores['score']['kpi7']);
            $totals_array['kpi8']['scores'] = $this->addScore($totals_array['kpi8']['scores'], $company_scores['score']['kpi8']);
            $totals_array['kpi9']['scores'] = $this->addScore($totals_array['kpi9']['scores'], $company_scores['score']['kpi9']);
            $totals_array['kpi10']['scores'] = $this->addScore($totals_array['kpi10']['scores'], $company_scores['score']['kpi10']);
            $totals_array['kpi11']['scores'] = $this->addScore($totals_array['kpi11']['scores'], $company_scores['score']['kpi11']);
            $totals_array['kpi12']['scores'] = $this->addScore($totals_array['kpi12']['scores'], $company_scores['score']['kpi12']);
            $totals_array['kpi13a']['scores'] = $this->addScore($totals_array['kpi13a']['scores'], $company_scores['score']['kpi13a']);
            $totals_array['kpi13b']['scores'] = $this->addScore($totals_array['kpi13b']['scores'], $company_scores['score']['kpi13b']);
            $totals_array['kpi14']['scores'] = $this->addScore($totals_array['kpi14']['scores'], $company_scores['score']['kpi14']);
            $totals_array['kpi15']['scores'] = $this->addScore($totals_array['kpi15']['scores'], $company_scores['score']['kpi15']);
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
