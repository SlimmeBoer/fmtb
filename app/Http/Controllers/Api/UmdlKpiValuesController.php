<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUmdlKpiValuesRequest;
use App\Http\Requests\UpdateUmdlKpiValuesRequest;
use App\Libraries\UMDL\UMDLKPICollector;
use App\Libraries\UMDL\UMDLKPIScores;
use App\Libraries\UMDL\UMDLKPITotals;
use App\Models\Company;
use App\Models\UmdlCollective;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UmdlKpiValuesController extends Controller
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
    public function store(StoreUmdlKpiValuesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UmdlKpiValues $umdlKpiValues)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UmdlKpiValues $umdlKpiValues)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUmdlKpiValuesRequest $request, UmdlKpiValues $umdlKpiValues)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UmdlKpiValues $umdlKpiValues)
    {
        //
    }

    public function getscores($company) : array
    {
        //1./ Get individual scores
        $umdlscores = new UMDLKPIScores();
        return array_merge($umdlscores->getScores($company),
            $umdlscores->collectiveAverages($company),
            $umdlscores->totalAverages());


    }

    /**
     * Gets the scores for the company of the currently logged in user.
     * @return array
     */
    public function getscorescurrentcompany() : array
    {
        $company = Company::where('ubn',Auth::user()->ubn)->first();

        if (!$company) {
            return array();
        }
        else {
            //1. Get individual scores
            $umdlscores = new UMDLKPIScores();
            return array_merge($umdlscores->getScores($company->id),
                $umdlscores->collectiveAverages($company->id),
                $umdlscores->totalAverages());
        }
    }

    public function getcollectivescores($collective_id) : array
    {
        $umdl_scores = new UMDLKPIScores();
        $collectiveTotals = array();

        // Gets data for a specific collective by ID
        if ($collective_id == 0) {
            $collective_id = Auth::user()->collectives()->first()->id;
        }

        $collective_companies = UmdlCollectiveCompany::where('collective_id',$collective_id)->get();

        foreach ($collective_companies as $collective_company)
        {
            $company = Company::where('id', $collective_company->company_id)->first();

            $company_scores = $umdl_scores->getScores($collective_company->company_id);
            $companyArray = array($collective_company->company_id => array (
                'company_id' => $company->id,
                'company_name' => $company->name,
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
            ));
            $collectiveTotals = array_merge($collectiveTotals, $companyArray);
        }

        $this->sortByPointsDesc($collectiveTotals);
        return $collectiveTotals;
    }


    public function getallscores() : array
    {
        $umdl_scores = new UMDLKPIScores();
        $allTotals = array();
        $companies = Company::all();

        foreach ($companies as $company)
        {
            $company_scores = $umdl_scores->getScores($company->id);
            $companyArray = array($company->id => array (
                'company_id' => $company->id,
                'company_name' => $company->name,
                'points' => $company_scores['total']['score'],
                'money' => $company_scores['total']['money'],
            ));
            $allTotals = array_merge($allTotals, $companyArray);
        }
        $this->sortByPointsDesc($allTotals);
        return $allTotals;
    }

    public function getallscoresanon() : array
    {
        $umdl_scores = new UMDLKPIScores();
        $allTotals = array();
        $companies = Company::all();

        foreach ($companies as $company)
        {
            $company_scores = $umdl_scores->getScores($company->id);
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
        $totals = new UMDLKPITotals();

        // Gets data for a specific collective by ID
        if ($collective_id == 0) {
            $collective_id = Auth::user()->collectives()->first()->id;
        }
        return $totals->getTotals($collective_id);
    }

    public function totalsperkpi() : array
    {
        $totals = new UMDLKPITotals();
        return $totals->getTotals(0);
    }


    private function sortByPointsDesc(&$array)
    {
        usort($array, function($a, $b) {
            return $b['points'] <=> $a['points'];
        });
    }
}
