<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyPropertiesRequest;
use App\Http\Requests\UpdateCompanyPropertiesRequest;
use App\Http\Resources\CompanyPropertiesResource;
use App\Models\Company;
use App\Models\SystemLog;
use App\Models\CompanyProperties;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CompanyPropertiesController extends Controller
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
    public function store(StoreCompanyPropertiesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyProperties $companyproperties)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompanyProperties $companyproperties)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyPropertiesRequest $request, CompanyProperties $companyproperties)
    {
        $data = $request->validated();

        $companyproperties->update($data);

        $company = Company::where('id',$companyproperties->company_id)->first();

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Bedrijfsmanagementinformatie aangepast: ' . $company->name,
        ));


        return new CompanyPropertiesResource($companyproperties);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyProperties $companyproperties)
    {
        //
    }
}
