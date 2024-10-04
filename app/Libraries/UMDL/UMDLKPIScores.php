<?php

namespace App\Libraries\UMDL;

use App\Models\KlwValue;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UMDLKPIScores
{
    public function getScores($company_id) : array {

        $scoresArray = array();
        $settings = parse_ini_file('config/UMDL.ini', true);
        Log::info(print_r($settings,true));

        $scores = UmdlKpiValues::where('company_id', $company_id)
            ->orderByDesc('year')
            ->take(3)
            ->get();

        $companyproperties = UmdlCompanyProperties::where('company_id', $company_id)
            ->first();

        $mbp_string = $this->getMBPstring($companyproperties->mbp);
        $sma_total = $companyproperties->website +
            $companyproperties->ontvangstruimte +
            $companyproperties->winkel +
            $companyproperties->educatie +
            $companyproperties->meerjarige_monitoring +
            $companyproperties->open_dagen +
            $companyproperties->wandelpad +
            $companyproperties->erkend_demobedrijf +
            $companyproperties->bed_and_breakfast;
        $sma_string = $this->getSMAstring($companyproperties);

        $total_kpi1a = 0;
        $total_kpi1b = 0;
        $total_kpi2 = 0;
        $total_kpi3 = 0;
        $total_kpi4 = 0;
        $total_kpi5 = 0;
        $total_kpi6a = 0;
        $total_kpi6b = 0;
        $total_kpi6c = 0;
        $total_kpi6d = 0;
        $total_kpi7 = 0;
        $total_kpi8 = 0;
        $total_kpi9 = 0;
        $total_kpi10 = 0;
        $total_kpi11 = 0;
        $total_kpi12 = 0;
        $total_kpi13a = 0;
        $total_kpi13b = 0;
        $total_kpi14 = 0;
        $total_kpi15 = 0;

        $index = 3;
        foreach ($scores as $year_score) {

            $yearArray = array("year".$index => array (
                'year' => $year_score->year,
                'kpi1a' => round($year_score->kpi1a),
                'kpi1b' => round($year_score->kpi1b),
                'kpi2' => round($year_score->kpi2),
                'kpi3' => round($year_score->kpi3),
                'kpi4' => round($year_score->kpi4),
                'kpi5' => round($year_score->kpi5),
                'kpi6a' => round($year_score->kpi6a),
                'kpi6b' => round($year_score->kpi6b),
                'kpi6c' => round($year_score->kpi6c),
                'kpi6d' => round($year_score->kpi6d),
                'kpi7' => round($year_score->kpi7),
                'kpi9' => round($year_score->kpi9),
                'kpi10' => round($year_score->kpi10),
                'kpi11' => round($year_score->kpi11),
                'kpi12' => round($year_score->kpi12),
                'kpi13a' => $year_score->kpi13a,
                'kpi13b' => round($year_score->kpi13b),
                'kpi14' => round($year_score->kpi14),
            ));

            $total_kpi1a += $year_score->kpi1a;
            $total_kpi1b += $year_score->kpi1b;
            $total_kpi2 += $year_score->kpi2;
            $total_kpi3 += $year_score->kpi3;
            $total_kpi4 += $year_score->kpi4;
            $total_kpi5 += $year_score->kpi5;
            $total_kpi6a += $year_score->kpi6a;
            $total_kpi6b += $year_score->kpi6b;
            $total_kpi6c += $year_score->kpi6c;
            $total_kpi6d += $year_score->kpi6d;
            $total_kpi7 += $year_score->kpi7;
            $total_kpi9 += $year_score->kpi9;
            $total_kpi10 = $year_score->kpi10;
            $total_kpi11 = $year_score->kpi11;
            $total_kpi12 = $year_score->kpi12;
            $total_kpi13a = $year_score->kpi13a;
            $total_kpi13b = $year_score->kpi13b;
            $total_kpi14 += $year_score->kpi14;

            $index = $index-1;

            $scoresArray = array_merge($scoresArray, $yearArray);
        }
         // Add averages
        $avgArray = array("avg" => array (
            'kpi1a' => round($total_kpi1a / count($scores)),
            'kpi1b' => round($total_kpi1b / count($scores)),
            'kpi2' => round($total_kpi2 / count($scores)),
            'kpi3' => round($total_kpi3 / count($scores)),
            'kpi4' => round($total_kpi4 / count($scores)),
            'kpi5' => round($total_kpi5/ count($scores)),
            'kpi6a' =>round($total_kpi6a / count($scores)),
            'kpi6b' => round($total_kpi6b / count($scores)),
            'kpi6c' => round($total_kpi6c / count($scores)),
            'kpi6d' => round($total_kpi6d / count($scores)),
            'kpi7' => round($total_kpi7 / count($scores)),
            'kpi8' => $mbp_string,
            'kpi9' => round($total_kpi9 / count($scores)),
            'kpi10' => $total_kpi10,
            'kpi11' => $total_kpi11,
            'kpi12' => $total_kpi12,
            'kpi13a' => $scoresArray["year3"]["kpi13a"],
            'kpi13b' => $scoresArray["year3"]["kpi13b"],
            'kpi14' => round($total_kpi14 / count($scores)),
            'kpi15' => $sma_string,
        ));
        $scoresArray = array_merge($scoresArray, $avgArray);

        // Add scores
        $totalArray = array("score" => array (
            'kpi1a' => '-',
            'kpi1b' => $this->calculateScore($settings["kpi_scores"]["kpi1"], round($total_kpi1b / count($scores))),
            'kpi2' => $this->calculateScore($settings["kpi_scores"]["kpi2"], round($total_kpi2 / count($scores))),
            'kpi3' => $this->calculateScore($settings["kpi_scores"]["kpi3"], round($total_kpi3 / count($scores))),
            'kpi4' => $this->calculateScore($settings["kpi_scores"]["kpi4"], round($total_kpi4 / count($scores))),
            'kpi5' => $this->calculateScore($settings["kpi_scores"]["kpi5"], round($total_kpi5 / count($scores))),
            'kpi6a' => '-',
            'kpi6b' => $this->calculateScore($settings["kpi_scores"]["kpi6"], round($total_kpi6b / count($scores))),
            'kpi6c' => '-',
            'kpi6d' => '-',
            'kpi7' => $this->calculateScore($settings["kpi_scores"]["kpi7"], round($total_kpi7 / count($scores))),
            'kpi8' => $this->calculateScore($settings["kpi_scores"]["kpi8"], $companyproperties->mbp),
            'kpi9' => $this->calculateScore($settings["kpi_scores"]["kpi9"], round($total_kpi9 / count($scores))),
            'kpi10' => $this->calculateScore($settings["kpi_scores"]["kpi10"], $total_kpi10),
            'kpi11' => $this->calculateScore($settings["kpi_scores"]["kpi11"], $total_kpi11),
            'kpi12' => $this->calculateScore($settings["kpi_scores"]["kpi12"], $total_kpi12),
            'kpi13a' => $this->calculateScore($settings["kpi_scores"]["kpi13a"], $scoresArray["year3"]["kpi13a"]),
            'kpi13b' => $this->calculateScore($settings["kpi_scores"]["kpi13b"], $scoresArray["year3"]["kpi13b"]),
            'kpi14' => $this->calculateScore($settings["kpi_scores"]["kpi14"], round($total_kpi14 / count($scores))),
            'kpi15' => $this->calculateScore($settings["kpi_scores"]["kpi15"], $sma_total),
        ));

        $totalScore = $totalArray["score"]["kpi1b"] + $totalArray["score"]["kpi2"] + $totalArray["score"]["kpi3"] +
            $totalArray["score"]["kpi4"] + $totalArray["score"]["kpi5"] +$totalArray["score"]["kpi6b"] +
            $totalArray["score"]["kpi7"] + $totalArray["score"]["kpi8"] + $totalArray["score"]["kpi9"] +
            $totalArray["score"]["kpi10"]+ $totalArray["score"]["kpi11"] + $totalArray["score"]["kpi12"] +
            max($totalArray["score"]["kpi13a"], $totalArray["score"]["kpi13b"]) +
            $totalArray["score"]["kpi14"] + $totalArray["score"]["kpi15"];

        $overviewArray = array("total" => array (
            'score' => $totalScore,
             'money' => $totalScore + $this->calculateScore($settings["kpi_money"]["bonus"], $totalScore),
        ));

        $scoresArray = array_merge($scoresArray, $totalArray);
        $scoresArray = array_merge($scoresArray, $overviewArray);

        return $scoresArray;
    }

    /**
     * @param $settings
     * @param $value
     * @return int
     */
    public function calculateScore($settings, $value): int
    {
        $score = 0;

        foreach ($settings as $setting_key => $setting_value)
        {
            Log::info(print_r($settings,true));

            if ($value >= $setting_key)
            {
                $score = $setting_value;
            }
        }

        return $score;
    }

    /**
     * @param $mbp
     * @return string
     */
    public function getMBPString($mbp) : string
    {
        return match ($mbp) {
            1 => "Volvelds gewasbeschermingsmiddelen",
            2 => "Ingevulde MBP",
            3 => "Ingevulde Milieumaatlat",
            4 => "Pleksgewijs grasland, volvelds maisland",
            5 => "Geen Pleksgewijs hele bedrijf",
            6 => "On the way to Planet Proof / AH programma",
            7 => "Beterlevnen Keurmerk",
            8 => "Biologisch",
            9 => "Geen middelen",
            default => "Onbekend",
        };
    }

    public function getSMAstring($properties) : string
    {
        $smastring = "";

        if ($properties->website == 1) {$smastring .= "Website, ";}
        if ($properties->ontvangstruimte == 1) {$smastring .= "Ontvangstruimte, ";}
        if ($properties->winkel == 1) {$smastring .= "Winkel, ";}
        if ($properties->educatie == 1) {$smastring .= "Educatie, ";}
        if ($properties->meerjarige_monitoring == 1) {$smastring .= "Meerjarige monitoring, ";}
        if ($properties->open_dagen == 1) {$smastring .= "Open dagen, ";}
        if ($properties->wandelpad == 1) {$smastring .= "Wandelpad, ";}
        if ($properties->erkend_demobedrijf == 1) {$smastring .= "Erkend demobedrijf, ";}
        if ($properties->bed_and_breakfast == 1) {$smastring .= "Bed & Breakfast, ";}

        if ($smastring == "") {
            $smastring = "Geen sociaal-maatschappelijke activiteiten";
        }
        else {
            $smastring = substr($smastring,0,-2);
        }

        return $smastring;
    }

}
