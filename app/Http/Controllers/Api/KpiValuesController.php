<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKpiValuesRequest;
use App\Http\Requests\UpdateKpiValuesRequest;
use App\Libraries\Monitor\KPICollector;
use App\Libraries\Monitor\KPIScores;
use App\Libraries\Monitor\KPITotals;
use App\Models\Area;
use App\Models\Company;
use App\Models\Collective;
use App\Models\KpiValues;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class KpiValuesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKpiValuesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KpiValues $kpiValues)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KpiValues $kpiValues)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKpiValuesRequest $request, KpiValues $kpiValues)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KpiValues $kpiValues)
    {
        //
    }

    public function getscores($company) : array
    {
        //1./ Get individual scores
        $scores = new KPIScores();
        return array_merge($scores->getScores($company),
            $scores->collectiveAverages($company),
            $scores->totalAverages());


    }

    /**
     * Gets the scores for the company of the currently logged in user.
     * @return array
     */
    public function getscorescurrentcompany() : array
    {
        $company = Company::where('user_id',Auth::user()->id)->first();

        if (!$company) {
            return array("total" => ["score" => 0, "money" => 0]);
        }
        else {
            //1. Get individual scores
            $scores = new KPIScores();
            return array_merge($scores->getScores($company->id),
                $scores->collectiveAverages($company->id),
                $scores->totalAverages());
        }
    }

    public function getcollectivescores($collective_id) : array
    {
        $scores = new KPIScores();
        $collectiveTotals = array();

        // Gets data for a specific collective by ID
        if ($collective_id == 0) {
            $collective_id = Auth::user()->collectives()->first()->id;
        }

        $companies = Collective::findOrFail($collective_id)
            ->companies()
            ->has('klwDumps')
            ->get();

        foreach ($companies as $company)
        {
            $company_scores = $scores->getScores($company->id);
            $companyArray = array($company->id => array (
                'company_id' => $company->id,
                'company_name' => $company->name,
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
                'old_data'     => (bool) $company->old_data, // hier de boolean
            ));
            $collectiveTotals = array_merge($collectiveTotals, $companyArray);
        }

        $this->sortByPointsDesc($collectiveTotals);
        return $collectiveTotals;
    }

    public function getareascores($area_id) : array
    {
        $scores = new KPIScores();
        $areaTotals = array();

        // Gets data for a specific area by ID
        if ($area_id == 0) {
            $area_id = Auth::user()->areas()->first()->id;
        }

        $companies = Area::findOrFail($area_id)
            ->companies()
            ->has('klwDumps')
            ->get();

        foreach ($companies as $company)
        {
            $company_scores = $scores->getScores($company->id);
            $companyArray = array($company->id => array (
                'company_id' => $company->id,
                'company_name' => $company->name,
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
                'old_data'     => (bool) $company->old_data, // hier de boolean
            ));
            $areaTotals = array_merge($areaTotals, $companyArray);
        }

        $this->sortByPointsDesc($areaTotals);
        return $areaTotals;
    }


    public function getallscores() : array
    {
        $scores = new KPIScores();
        $allTotals = array();
        $companies = Company::has('klwDumps')->get();

        foreach ($companies as $company)
        {
            $company_scores = $scores->getScores($company->id);
            $companyArray = array($company->id => array (
                'company_id' => $company->id,
                'company_name' => $company->name,
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
                'old_data'     => (bool) $company->old_data,
            ));
            $allTotals = array_merge($allTotals, $companyArray);
        }
        $this->sortByPointsDesc($allTotals);
        return $allTotals;
    }

    public function getallscoresanon() : array
    {
        $scores = new KPIScores();
        $allTotals = array();
        $companies = Company::has('klwDumps')->get();

        foreach ($companies as $company)
        {
            $company_scores = $scores->getScores($company->id);
            $companyArray = array($company->id => array (
                'company_id' => $company->id,
                'company_name' => "...",
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
            ));
            $allTotals = array_merge($allTotals, $companyArray);
        }
        $this->sortByPointsDesc($allTotals);
        return $allTotals;
    }

    public function totalsperkpicollective($collective_id) : array
    {
        $totals = new KPITotals();

        // Gets data for a specific collective by ID
        if ($collective_id == 0) {
            $collective_id = Auth::user()->collectives()->first()->id;
        }
        return $totals->getTotalsCollective($collective_id);
    }

    public function totalsperkpiarea($area_id) : array
    {
        $totals = new KPITotals();

        // Gets data for a specific collective by ID
        if ($area_id == 0) {
            $area_id = Auth::user()->areas()->first()->id;
        }
        return $totals->getTotalsArea($area_id);
    }

    public function totalsperkpi() : array
    {
        $totals = new KPITotals();
        return $totals->getTotalsCollective(0);
    }


    private function sortByPointsDesc(&$array)
    {
        usort($array, function($a, $b) {
            return $b['points'] <=> $a['points'];
        });
    }
}
