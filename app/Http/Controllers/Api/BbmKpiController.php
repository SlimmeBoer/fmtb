<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmKpiRequest;
use App\Http\Requests\UpdateBbmKpiRequest;
use App\Http\Resources\BbmCodeResource;
use App\Http\Resources\BbmKpiResource;
use App\Models\BbmCode;
use App\Models\BbmKpi;
use App\Models\SystemLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BbmKpiController extends Controller
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

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($kpi, $bbm_code)
    {
        $bbm = BbmCode::where('code', $bbm_code)->first();
        $bbmkpi = BbmKpi::create(array('kpi' => $kpi, 'code_id' => $bbm->id));

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'BBM-code aan KPI toegekend: ' . $bbm_code . ' aan KPI#' . $kpi,
        ));

        return response(new BbmKpiResource($bbmkpi), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BbmKpi $bbmkpi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BbmKpi $bbmkpi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBbmKpiRequest $request, BbmKpi $bbmkpi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmKpi $bbmkpi)
    {
        $bbm = BbmCode::where('ID', $bbmkpi->code_id)->first();

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'BBM-code toekenning verwijderd: ' . $bbm->code . ' aan KPI#' . $bbmkpi->kpi,
        ));

        $bbmkpi->delete();
        return response('', 204);
    }

    /**
     * Returns all elements that are selected in a certain KPI
     */
    public function getselected($kpi)
    {
        // Get selected
        $selected_records = BbmKpi::where('kpi', $kpi)->get();
        $selectedArray = array();

        foreach ($selected_records as $record) {

            $bbm_code = BbmCode::where('id', $record->code_id)->first();

            $selectedArray[] = array(
                'id' => $record->id,
                'kpi' => $kpi,
                'bbm_code' => $bbm_code->code,
                );
        }

        // Sort on order
        usort($selectedArray, function($a, $b) {
            return strcmp($a["bbm_code"], $b["bbm_code"]);
        });


        return $selectedArray;
    }

    /**
     * Returns all elements that are not selected in a certain KPI
     */
    public function getnotselected($kpi)
    {
        $bbmCodesWithoutKpi = BbmCode::whereDoesntHave('bbmKpis', function ($query) use ($kpi) {
            $query->where('kpi', $kpi);
        })->get();

        $notSelectedArray = array();

        foreach ($bbmCodesWithoutKpi as $bbm_code) {

            $notSelectedArray[] = array(
                'kpi' => $kpi,
                'bbm_code' => $bbm_code->code,
            );
        }
        // Sort on order
        usort($notSelectedArray, function($a, $b) {
            return strcmp($a["bbm_code"], $b["bbm_code"]);
        });

        return $notSelectedArray;
    }
}
