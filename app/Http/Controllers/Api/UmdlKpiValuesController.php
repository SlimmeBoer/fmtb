<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUmdlKpiValuesRequest;
use App\Http\Requests\UpdateUmdlKpiValuesRequest;
use App\Libraries\UMDL\UMDLKPICollector;
use App\Libraries\UMDL\UMDLKPIScores;
use App\Models\UmdlKpiValues;

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
        $umdlscores = new UMDLKPIScores();
        return $umdlscores->getScores($company);
    }
}
