<?php

namespace App\Libraries\Monitor;

use App\Models\Company;
use App\Models\KlwValue;
use App\Models\CompanyProperties;
use App\Models\KpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class KPIScores
{
    public function getScores($company_id): array
    {

        $scoresArray = array();
        $settings = parse_ini_file(public_path('config/FMTB.ini'), true);

        $scores = KpiValues::where('company_id', $company_id)
            ->orderByDesc('year')
            ->take(3)
            ->get();

        $companyproperties = CompanyProperties::where('company_id', $company_id)
            ->first();

        $company = Company::where('id',$company_id)->first();
        $area = $company->areas->first();

        $mbp_string = $this->getMBPstring($companyproperties->mbp);
        $sma_total = $companyproperties->ontvangstruimte +
            $companyproperties->winkel +
            $companyproperties->educatie +
            $companyproperties->meerjarige_monitoring +
            $companyproperties->open_dagen +
            $companyproperties->wandelpad +
            $companyproperties->erkend_demobedrijf +
            $companyproperties->bedrijfsgebonden_recreatie +
            $companyproperties->zorg;
        $sma_string = $this->getSMAstring($companyproperties);

        $total_kpi1a = 0;
        $total_kpi1b = 0;
        $total_kpi2a = 0;
        $total_kpi2b = 0;
        $total_kpi2c = 0;
        $total_kpi2d = 0;
        $total_kpi2e = 0;
        $total_kpi3 = 0;
        $total_kpi4 = 0;
        $total_kpi5a = 0;
        $total_kpi5b = 0;
        $total_kpi6a = 0;
        $total_kpi6b = 0;
        $total_kpi7 = 0;
        $total_kpi8 = 0;
        $total_kpi9 = 0;
        $total_kpi11 = 0;
        $total_kpi12a = 0;
        $total_kpi12b = 0;
        $total_kpi13 = 0;
        $total_kpi14 = 0;

        $index = 3;
        foreach ($scores as $year_score) {

            $yearArray = array("year" . $index => array(
                'year' => $year_score->year,
                'kpi1a' => round($year_score->kpi1a),
                'kpi1b' => round($year_score->kpi1b),
                'kpi2a' => round($year_score->kpi2a),
                'kpi2b' => $year_score->kpi2b,
                'kpi2c' => round($year_score->kpi2c),
                'kpi2d' => round($year_score->kpi2d),
                'kpi2e' => round($year_score->kpi2e),
                'kpi3' => round($year_score->kpi3),
                'kpi4' => round($year_score->kpi4),
                'kpi5a' => round($year_score->kpi5a),
                'kpi5b' => round($year_score->kpi5b),
                'kpi6a' => round($year_score->kpi6a),
                'kpi6b' =>$year_score->kpi6b,
                'kpi8' => round($year_score->kpi8),
                'kpi9' => round($year_score->kpi9),
                'kpi11' => round($year_score->kpi11),
                'kpi12a' => round($year_score->kpi12a),
                'kpi12b' => round($year_score->kpi12b),
                'kpi13' => round($year_score->kpi13),
            ));

            $total_kpi1a += $year_score->kpi1a;
            $total_kpi1b += $year_score->kpi1b;
            $total_kpi2a += $year_score->kpi2a;
            $total_kpi2b += $year_score->kpi2b;
            $total_kpi2c += $year_score->kpi2c;
            $total_kpi2d += $year_score->kpi2d;
            $total_kpi2e += $year_score->kpi2e;
            $total_kpi3 += $year_score->kpi3;
            $total_kpi4 += $year_score->kpi4;
            $total_kpi5a += $year_score->kpi5a;
            $total_kpi5b += $year_score->kpi5b;
            $total_kpi6a += $year_score->kpi6a;
            $total_kpi6b += $year_score->kpi6b;
            $total_kpi8 += $year_score->kpi8;
            $total_kpi9 += $year_score->kpi9;
            $total_kpi11 = $year_score->kpi11;
            $total_kpi12a = $year_score->kpi12a;
            $total_kpi12b = $year_score->kpi12b;
            $total_kpi13 += $year_score->kpi13;

            $index = $index - 1;

            $scoresArray = array_merge($scoresArray, $yearArray);
        }

        // Add empty years if not found
        if (count($scores) == 1) {
            $scoresArray = array_merge($scoresArray, $this->emptyYear("year1"));
            $scoresArray = array_merge($scoresArray, $this->emptyYear("year2"));
        }
        if (count($scores) == 2) {
            $scoresArray = array_merge($scoresArray, $this->emptyYear("year1"));
        }

        // Add averages
        $avgArray = array("avg" => array(
            'kpi1a' => round($total_kpi1a / count($scores)),
            'kpi1b' => round($total_kpi1b / count($scores)),
            'kpi2a' => round($total_kpi2a / count($scores)),
            'kpi2b' => round($total_kpi2b / count($scores),1),
            'kpi2c' => round($total_kpi2c / count($scores)),
            'kpi2d' => round($total_kpi2d / count($scores)),
            'kpi2e' => round($total_kpi2e / count($scores)),
            'kpi3' => round($total_kpi3 / count($scores)),
            'kpi4' => round($total_kpi4 / count($scores)),
            'kpi5a' => round($total_kpi5a / count($scores)),
            'kpi5b' => round($total_kpi5b / count($scores)),
            'kpi6a' => round($total_kpi6a / count($scores)),
            'kpi6b' => $total_kpi6b / count($scores),
            'kpi7' => $mbp_string,
            'kpi8' => round($total_kpi8 / count($scores)),
            'kpi9' => round($total_kpi9 / count($scores)),
            'kpi11' => $total_kpi11,
            'kpi12a' => $total_kpi12a,
            'kpi12b' => $total_kpi12b,
            'kpi13' => round($total_kpi13 / count($scores)),
            'kpi14' => $sma_string,
        ));
        $scoresArray = array_merge($scoresArray, $avgArray);

        // Add scores
        $totalArray = array("score" => array(
            'kpi1a' => '-',
            'kpi1b' => $this->calculateScore($settings["kpi_scores"]["kpi1_" . $companyproperties->grondsoort_dominant], round($total_kpi1b / count($scores))),
            'kpi2a' => $this->calculateScore($settings["kpi_scores"]["kpi2a"], round($total_kpi2a / count($scores))),
            'kpi2b' => $this->calculateScore($settings["kpi_scores"]["kpi2b"], $total_kpi2b / count($scores)),
            'kpi2c' => $this->calculateScore($settings["kpi_scores"]["kpi2c"], round($total_kpi2c / count($scores))),
            'kpi2d' => $this->calculateScore($settings["kpi_scores"]["kpi2d"], round($total_kpi2d / count($scores))),
            'kpi2e' => $this->calculateScore($settings["kpi_scores"]["kpi2e"], round($total_kpi2e / count($scores))),
            'kpi3' => $this->calculateScore($settings["kpi_scores"]["kpi3"], round($total_kpi3 / count($scores))),
            'kpi4' => $this->calculateScore($settings["kpi_scores"]["kpi4"], round($total_kpi4 / count($scores))),
            'kpi5a' => '-',
            'kpi5b' => $this->calculateScore($settings["kpi_scores"]["kpi5"], round($total_kpi5b / count($scores))),
            'kpi6a' => $this->calculateScore($settings["kpi_scores"]["kpi6a"], round($total_kpi6a / count($scores))),
            'kpi6b' => $this->calculateScore($settings["kpi_scores"]["kpi6b"], $total_kpi6b / count($scores)),
            'kpi7' => $this->calculateScore($settings["kpi_scores"]["kpi7"], $companyproperties->mbp),
            'kpi8' => $this->calculateScore($settings["kpi_scores"]["kpi8"], round($total_kpi8 / count($scores))),
            'kpi9' => $this->calculateScore($settings["kpi_scores"]["kpi9"], round($total_kpi9 / count($scores))),
            'kpi11' => $this->calculateScore($settings["kpi_scores"]["kpi11"], $total_kpi11),
            'kpi12a' => $this->calculateScore($settings["kpi_scores"]["kpi12a"], $total_kpi12a),
            'kpi12b' => $this->calculateScore($settings["kpi_scores"]["kpi12b"], $total_kpi12b),
            'kpi13' => $this->calculateScore($settings["kpi_scores"]["kpi13"], round($total_kpi13 / count($scores))),
            'kpi14' => $this->calculateScore($settings["kpi_scores"]["kpi14"], $sma_total),
        ));

        $totalWeightedArray = array("weighted_score" => array(
            'kpi1a' => '-',
            'kpi1b' => $totalArray["score"]["kpi1b"] * $area->weight_kpi1,
            'kpi2a' => $totalArray["score"]["kpi2a"] * $area->weight_kpi2a,
            'kpi2b' => $totalArray["score"]["kpi2b"] * $area->weight_kpi2b,
            'kpi2c' => $totalArray["score"]["kpi2c"] * $area->weight_kpi2c,
            'kpi2d' => $totalArray["score"]["kpi2d"] * $area->weight_kpi2d,
            'kpi2e' => $totalArray["score"]["kpi2e"] * $area->weight_kpi2e,
            'kpi3' => $totalArray["score"]["kpi3"] * $area->weight_kpi3,
            'kpi4' => $totalArray["score"]["kpi4"] * $area->weight_kpi4,
            'kpi5a' => '-',
            'kpi5b' => $totalArray["score"]["kpi5b"] * $area->weight_kpi5,
            'kpi6a' => $totalArray["score"]["kpi6a"] * $area->weight_kpi6,
            'kpi6b' => $totalArray["score"]["kpi6b"] * $area->weight_kpi6,
            'kpi7' => $totalArray["score"]["kpi7"] * $area->weight_kpi7,
            'kpi8' => $totalArray["score"]["kpi8"] * $area->weight_kpi8,
            'kpi9' => $totalArray["score"]["kpi9"] * $area->weight_kpi9,
            'kpi11' => $totalArray["score"]["kpi11"] * $area->weight_kpi11,
            'kpi12a' => $totalArray["score"]["kpi12a"] * $area->weight_kpi12a,
            'kpi12b' => $totalArray["score"]["kpi12b"] * $area->weight_kpi12b,
            'kpi13' => $totalArray["score"]["kpi13"] * $area->weight_kpi13,
            'kpi14' => $totalArray["score"]["kpi14"] * $area->weight_kpi14,
        ));

        $totalScore = $totalArray["score"]["kpi1b"] + $totalArray["score"]["kpi2a"] + $totalArray["score"]["kpi2b"] +
            + $totalArray["score"]["kpi2c"] + $totalArray["score"]["kpi2d"] + $totalArray["score"]["kpi2e"] + $totalArray["score"]["kpi3"] +
            $totalArray["score"]["kpi4"] + $totalArray["score"]["kpi5b"] + max($totalArray["score"]["kpi6a"],$totalArray["score"]["kpi6b"]) +
            $totalArray["score"]["kpi7"] + $totalArray["score"]["kpi8"] + $totalArray["score"]["kpi9"] +
            $totalArray["score"]["kpi11"] + $totalArray["score"]["kpi12a"] + $totalArray["score"]["kpi12b"] +
            $totalArray["score"]["kpi13"] + $totalArray["score"]["kpi14"];

        $totalWeightedScore = $totalWeightedArray["weighted_score"]["kpi1b"] + $totalWeightedArray["weighted_score"]["kpi2a"] + $totalWeightedArray["weighted_score"]["kpi2b"] +
            + $totalWeightedArray["weighted_score"]["kpi2c"] + $totalWeightedArray["weighted_score"]["kpi2d"] + $totalWeightedArray["weighted_score"]["kpi2e"] + $totalWeightedArray["weighted_score"]["kpi3"] +
            $totalWeightedArray["weighted_score"]["kpi4"] + $totalWeightedArray["weighted_score"]["kpi5b"] +
            max($totalWeightedArray["weighted_score"]["kpi6a"], $totalWeightedArray["weighted_score"]["kpi6b"]) +
            $totalWeightedArray["weighted_score"]["kpi7"] + $totalWeightedArray["weighted_score"]["kpi8"] + $totalWeightedArray["weighted_score"]["kpi9"] +
            $totalWeightedArray["weighted_score"]["kpi11"] + $totalWeightedArray["weighted_score"]["kpi12a"] + $totalWeightedArray["weighted_score"]["kpi12b"] +
            $totalWeightedArray["weighted_score"]["kpi13"] + $totalWeightedArray["weighted_score"]["kpi14"];

        $maximumReward = $settings["maximum_reward"]["reward"];
        $possibleMaximumScore =
            (5 * $area->weight_kpi1) + (5 * $area->weight_kpi2a) + (5 * $area->weight_kpi2b) + (5 * $area->weight_kpi2c) +
            (5 * $area->weight_kpi2d) + (5 * $area->weight_kpi2e) + (5 * $area->weight_kpi3) + (5 * $area->weight_kpi4) +
            (5 * $area->weight_kpi5) + (5 * $area->weight_kpi6) + (5 * $area->weight_kpi7) +
            (5 * $area->weight_kpi8) + (5 * $area->weight_kpi9) + (5 * $area->weight_kpi11) + (5 * $area->weight_kpi12a) +
            (5 * $area->weight_kpi12b) + (5 * $area->weight_kpi13) + (5 * $area->weight_kpi14);

            $overviewArray = array("total" => array(
            'score' => $totalWeightedScore,
            'money' => round(min(array($totalWeightedScore / (0.8 *$possibleMaximumScore), 1)) * $maximumReward),
        ));

        $scoresArray = array_merge($scoresArray, $totalArray);
        $scoresArray = array_merge($scoresArray, $totalWeightedArray);
        $scoresArray = array_merge($scoresArray, $overviewArray);

        return $scoresArray;
    }


    /**
     * Gets the average of averages plus the average of scores of all companies in the collective
     * @param $company_id
     * @return array
     */
    public function collectiveAverages($company_id): array
    {
        $averageAveragesArray = array(
            'kpi1a' => 0,
            'kpi1b' => 0,
            'kpi2a' => 0,
            'kpi2b' => 0,
            'kpi2c' => 0,
            'kpi2d' => 0,
            'kpi2e' => 0,
            'kpi3' => 0,
            'kpi4' => 0,
            'kpi5a' => 0,
            'kpi5b' => 0,
            'kpi6a' => 0,
            'kpi6b' => 0,
            'kpi8' => 0,
            'kpi9' => 0,
            'kpi11' => 0,
            'kpi12a' => 0,
            'kpi12b' => 0,
            'kpi13' => 0,
        );

        $scoreAveragesArray = array(
            'kpi1b' => 0,
            'kpi2a' => 0,
            'kpi2b' => 0,
            'kpi2c' => 0,
            'kpi2d' => 0,
            'kpi2e' => 0,
            'kpi3' => 0,
            'kpi4' => 0,
            'kpi5b' => 0,
            'kpi6a' => 0,
            'kpi6b' => 0,
            'kpi7' => 0,
            'kpi8' => 0,
            'kpi9' => 0,
            'kpi11' => 0,
            'kpi12a' => 0,
            'kpi12b' => 0,
            'kpi13' => 0,
            'kpi14' => 0,
        );

        $totalAveragesArray = array(
            'score' => 0,
            'money' => 0,
        );

        $company = Company::findOrFail($company_id);

        // Step 1: first collective for this company
        $collective = $company->collectives()->select('collectives.id')->first();

        if ($collective) {
            // Step 2 + 3: companies in that collective that have klwDumps
            $companies = $collective->companies()
                ->has('klwDumps')
                ->get();
        } else {
            $companies = collect(); // empty collection if no collective found
        }

        if (count($companies) > 0) {

            // Add each indidivual company score to the grand total
            foreach ($companies as $company) {
                $company_scores = $this->getScores($company->id);

                foreach ($averageAveragesArray as $key => $value) {
                    $averageAveragesArray[$key] += $company_scores['avg'][$key];
                }

                foreach ($scoreAveragesArray as $key => $value) {
                    $scoreAveragesArray[$key] += $company_scores['weighted_score'][$key];
                }

                foreach ($totalAveragesArray as $key => $value) {
                    $totalAveragesArray[$key] += $company_scores['total'][$key];
                }
            }


            // Then, divide the totals by the number of companies
            foreach ($averageAveragesArray as $key => $value) {
                if ($key == 'kpi2b' || $key == 'kpi6b' || $key == 'kpi11' || $key == 'kpi12a' || $key == 'kpi12b') {
                    $averageAveragesArray[$key] = $averageAveragesArray[$key] / count($companies);
                } else {
                    $averageAveragesArray[$key] = round($averageAveragesArray[$key] / count($companies), 0);
                }
            }

            foreach ($scoreAveragesArray as $key => $value) {

                $scoreAveragesArray[$key] = round($scoreAveragesArray[$key] / count($companies), 0);
            }

            foreach ($totalAveragesArray as $key => $value) {

                $totalAveragesArray[$key] = round($totalAveragesArray[$key] / count($companies), 0);
            }
        }


        return array(
            'avg_col' => $averageAveragesArray,
            'score_col' => $scoreAveragesArray,
            'total_col' => $totalAveragesArray,
        );
    }

    /**
     * Gets the average of averages plus the average of scores of all companies
     * @return array
     */
    public function totalAverages(): array
    {
        $averageAveragesArray = array(
            'kpi1a' => 0,
            'kpi1b' => 0,
            'kpi2a' => 0,
            'kpi2b' => 0,
            'kpi2c' => 0,
            'kpi2d' => 0,
            'kpi2e' => 0,
            'kpi3' => 0,
            'kpi4' => 0,
            'kpi5a' => 0,
            'kpi5b' => 0,
            'kpi6a' => 0,
            'kpi6b' => 0,
            'kpi8' => 0,
            'kpi9' => 0,
            'kpi11' => 0,
            'kpi12a' => 0,
            'kpi12b' => 0,
            'kpi13' => 0
        );

        $scoreAveragesArray = array(
            'kpi1b' => 0,
            'kpi2a' => 0,
            'kpi2b' => 0,
            'kpi2c' => 0,
            'kpi2d' => 0,
            'kpi2e' => 0,
            'kpi3' => 0,
            'kpi4' => 0,
            'kpi5b' => 0,
            'kpi6a' => 0,
            'kpi6b' => 0,
            'kpi7' => 0,
            'kpi8' => 0,
            'kpi9' => 0,
            'kpi11' => 0,
            'kpi12a' => 0,
            'kpi12b' => 0,
            'kpi13' => 0,
            'kpi14' => 0,
        );

        $totalAveragesArray = array(
            'score' => 0,
            'money' => 0,
        );

        $companies = Company::has('klwDumps')->get();

        if (count($companies) > 0) {
            // Add each indidivual company score to the grand total
            foreach ($companies as $company) {
                $company_scores = $this->getScores($company->id);

                foreach ($averageAveragesArray as $key => $value) {
                    $averageAveragesArray[$key] += $company_scores['avg'][$key];
                }

                foreach ($scoreAveragesArray as $key => $value) {
                    $scoreAveragesArray[$key] += $company_scores['weighted_score'][$key];
                }

                foreach ($totalAveragesArray as $key => $value) {
                    $totalAveragesArray[$key] += $company_scores['total'][$key];
                }
            }


            // Then, divide the totals by the number of companies
            foreach ($averageAveragesArray as $key => $value) {
                if ($key == 'kpi2b' || $key == 'kpi6b' || $key == 'kpi11' || $key == 'kpi12a' || $key == 'kpi12b') {
                    $averageAveragesArray[$key] = $averageAveragesArray[$key] / count($companies);
                } else {
                    $averageAveragesArray[$key] = round($averageAveragesArray[$key] / count($companies), 0);
                }
            }

            foreach ($scoreAveragesArray as $key => $value) {

                $scoreAveragesArray[$key] = round($scoreAveragesArray[$key] / count($companies), 0);
            }

            foreach ($totalAveragesArray as $key => $value) {

                $totalAveragesArray[$key] = round($totalAveragesArray[$key] / count($companies), 0);
            }
        }

        return array(
            'avg_tot' => $averageAveragesArray,
            'score_tot' => $scoreAveragesArray,
            'total_tot' => $totalAveragesArray,
        );
    }

    /**
     * @param $settings
     * @param $value
     * @return int
     */
    public function calculateScore($settings, $value): int
    {
        $score = 0;

        foreach ($settings as $setting_key => $setting_value) {

            if ($value >= $setting_key) {
                $score = $setting_value;
            }
        }

        return $score;
    }

    /**
     * @param $mbp
     * @return string
     */
    public function getMBPString($mbp): string
    {
        return match ($mbp) {
            1 => "Volvelds gewasbeschermingsmiddelen",
            2 => "Ingevulde MBP",
            3 => "Ingevulde Milieumaatlat",
            4 => "Pleksgewijs hele bedrijf",
            5 => "On the way to Planet Proof",
            6 => "Beterleven Keurmerk",
            7 => "Geen middelen",
            default => "Onbekend",
        };
    }

    /**
     * @param $properties
     * @return string
     */
    public function getSMAstring($properties): string
    {
        $smastring = "";

        if ($properties->ontvangstruimte == 1) {
            $smastring .= "Ontvangstruimte, ";
        }
        if ($properties->winkel == 1) {
            $smastring .= "Winkel, ";
        }
        if ($properties->educatie == 1) {
            $smastring .= "Educatie, ";
        }
        if ($properties->meerjarige_monitoring == 1) {
            $smastring .= "Meerjarige monitoring, ";
        }
        if ($properties->open_dagen == 1) {
            $smastring .= "Open dagen, ";
        }
        if ($properties->wandelpad == 1) {
            $smastring .= "Wandelpad, ";
        }
        if ($properties->erkend_demobedrijf == 1) {
            $smastring .= "Erkend demobedrijf, ";
        }
        if ($properties->bedrijfsgebonden_recreatie == 1) {
            $smastring .= "Bedrijfsgebonden recreatie, ";
        }
        if ($properties->zorg == 1) {
            $smastring .= "Zorg, ";
        }

        if ($smastring == "") {
            $smastring = "Geen sociaal-maatschappelijke activiteiten";
        } else {
            $smastring = substr($smastring, 0, -2);
        }

        return $smastring;
    }

    private function emptyYear($year)
    {
        return array($year => array(
            'year' => '-',
            'kpi1a' => "-",
            'kpi1b' => "-",
            'kpi2a' => "-",
            'kpi2b' => "-",
            'kpi2c' => "-",
            'kpi2d' => "-",
            'kpi2e' => "-",
            'kpi3' => "-",
            'kpi4' => "-",
            'kpi5a' => "-",
            'kpi5b' => "-",
            'kpi6a' => "-",
            'kpi6b' => "-",
            'kpi7' => "-",
            'kpi8' => "-",
            'kpi9' => "-",
            'kpi11' => "-",
            'kpi12a' => "-",
            'kpi12b' => "-",
            'kpi13' => "-",
            'kpi14' => "-",
        ));
    }

}
