<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Libraries\UMDL\UMDLKPI;
use App\Models\KlwField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KlwFieldController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KlwField $klwField)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KlwField $klwField)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KlwField $klwField)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KlwField $klwField)
    {
        //
    }
    public function getkpi($kpi, $company) : array
    {
        $umdl_kpi = new UMDLKPI();
        return $umdl_kpi->getKPI($kpi, $company);
    }

}
