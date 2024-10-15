<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Models\KvkNumber;
use App\Models\UmdlCollective;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlCompanyProperties;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return CompanyResource::collection(
            Company::query()->orderBy('name')->get()
        );
    }

    /**
     * Get standard properties of a company
     */
    public function getcompany($id): Company
    {
        $company = Company::where('id', $id)->first();

        // Add KVK-numbers
        $kvk_string = "";
        $kvks = KvkNumber::where('company_id', $id)->get();

        foreach ($kvks as $kvk) {
            $kvk_string .= $kvk->kvk . ", ";
        }

        if ($kvk_string != "") {
            $kvk_string = substr($kvk_string, 0, -2);
        }
        $company->kvks = $kvk_string;

        // Add collectieven
        $collectief_string = "";
        $collectief_companies = UmdlCollectiveCompany::where('company_id', $id)->get();

        foreach ($collectief_companies as $collectief_company) {
            $collectief = UmdlCollective::where('id', $collectief_company->collective_id)->first();
            $collectief_string .= $collectief->name . ", ";
        }

        if ($collectief_string != "") {
            $collectief_string = substr($collectief_string, 0, -2);
        }
        $company->collectieven = $collectief_string;

        return $company;
    }

    /**
     * Get UMDL-specific properties of a company
     */
    public function getproperties($id): UmdlCompanyProperties
    {
        return UmdlCompanyProperties::where('company_id', $id)->first();
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
    public function store(StoreCompanyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
