<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\KlwField;
use App\Models\KlwValue;
use App\Models\KvkNumber;
use App\Models\UmdlCollective;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use Illuminate\Http\Request;
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
        // 1. Get all data
        $company = Company::where('id', $id)->first();

        // 2. Add KVK-numbers
        $kvk_string = "";
        $kvks = KvkNumber::where('company_id', $id)->get();

        foreach ($kvks as $kvk) {
            $kvk_string .= $kvk->kvk . ", ";
        }

        if ($kvk_string != "") {
            $kvk_string = substr($kvk_string, 0, -2);
        }
        $company->kvks = $kvk_string;

        // 3. Add collectieven
        $collectief_companies = UmdlCollectiveCompany::where('company_id', $id)->get();
        $collectieven_data = array();
        foreach ($collectief_companies as $collectief_company) {

            $collectief = UmdlCollective::where('id', $collectief_company->collective_id)->first();
            $collectieven_data[] = array(
                'id' => $collectief->id,
                'name'=> $collectief->name,
            );
        }

        $company->collectieven = $collectieven_data;

        return $company;
    }

    /**
     * Get UMDL-specific properties of a company
     */
    public function getproperties($id): UmdlCompanyProperties
    {
        return UmdlCompanyProperties::where('company_id', $id)->first();
    }

    public function saveproperties(Request $request)
    {
        $properties = UmdlCompanyProperties::where('company_id', $request['id'])->first();

        $properties->name = $request['name'];
        $properties->save();

        return response()->json(['success' => true]);
    }

    public function getCompanyFields(Request $request)
    {
        // Get the fieldnames from the request
        $fieldNames = $request->input('fields');

        // Fetch the fields by the provided fieldnames
        $fields = KlwField::whereIn('fieldname', $fieldNames)->get();
        $fieldIds = $fields->pluck('id')->toArray();

        // Fetch companies with their related dumps
        $companies = Company::select('companies.id', 'companies.name')
            ->with('klwDumps')
            ->get();

        // Prepare the response data
        $data = [];

        foreach ($companies as $company) {
            foreach ($company->klwDumps as $dump) {
                $companyData = [
                    'row_id' => $company->id . '-' . $dump->id,  // Unique identifier for the row
                    'id' => $company->id,
                    'name' => $company->name,
                    'year' => $dump->year,  // Include the dump year
                ];

                // Fetch all values for this dump in a key-value format (field_id => value)
                $klwValues = KlwValue::where('dump_id', $dump->id)
                    ->whereIn('field_id', $fieldIds)
                    ->get()
                    ->keyBy('field_id');

                // For each field, get the corresponding value from this dump
                foreach ($fields as $field) {
                    $companyData[$field->fieldname] = isset($klwValues[$field->id])
                        ? $klwValues[$field->id]->value
                        : null;
                }

                // Add this dump's data to the result
                $data[] = $companyData;
            }
        }

        return response()->json($data);
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
        $data = $request->validated();
        $company->update($data);
        return new CompanyResource($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //1. Delete KPI-values for the corresponding company
        UmdlKpiValues::where('company_id', $company->id)->delete();

        // 2. Remove all connections to collectives
        UmdlCollectiveCompany::where('company_id', $company->id)->delete();

        // 3. Remove all KVK-numbers associated to this company
        KvkNumber::where('company_id', $company->id)->delete();

        // 4. Delete company properties for the corresponding company
        UmdlCompanyProperties::where('company_id', $company->id)->delete();

        // 5. Get all dumps for this company
        $dumps = KlwDump::where('company_id', $company->id)->get();

        foreach ($dumps as $dump)
        {
            // 6. Delete all Klw values associated with this dump
            KlwValue::where('dump_id', $dump->id)->delete();
        }

        //7. Remove the dumps themselves.
        KlwDump::where('company_id', $company->id)->delete();

        // 8. Finally, remove the company itself.
        $company->delete();

        return response()->json(['success' => true]);
    }
}
