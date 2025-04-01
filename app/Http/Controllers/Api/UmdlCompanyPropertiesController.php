<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUmdlCompanyPropertiesRequest;
use App\Http\Requests\UpdateUmdlCompanyPropertiesRequest;
use App\Http\Resources\UmdlCompanyPropertiesResource;
use App\Models\Company;
use App\Models\SystemLog;
use App\Models\UmdlCompanyProperties;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UmdlCompanyPropertiesController extends Controller
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
    public function store(StoreUmdlCompanyPropertiesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUmdlCompanyPropertiesRequest $request, UmdlCompanyProperties $umdlcompanyproperties)
    {
        Log::info($umdlcompanyproperties);
        $data = $request->validated();

        Log::info($data);
        $umdlcompanyproperties->update($data);

        $company = Company::where('id',$umdlcompanyproperties->company_id)->first();

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Bedrijfsmanagementinformatie aangepast: ' . $company->name,
        ));


        return new UmdlCompanyPropertiesResource($umdlcompanyproperties);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }
}
