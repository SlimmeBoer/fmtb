<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKlwDumpRequest;
use App\Http\Requests\UpdateKlwDumpRequest;
use App\Http\Resources\KlwDumpResource;
use App\Libraries\ExcelParser\ExcelParser;
use App\Libraries\KLWParser\KLWParser;
use App\Models\Audio;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\KvkNumber;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlCollectivePostalcode;
use App\Models\UmdlKpiValues;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class KlwDumpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::all();
        $klwDumps = KlwDump::all();

        return response()->json([
            'companies' => $companies,
            'klwDumps' => KlwDumpResource::collection($klwDumps)
        ]);
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
    public function store(StoreKlwDumpRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KlwDump $klwDump)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KlwDump $klwDump)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKlwDumpRequest $request, KlwDump $klwDump)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KlwDump $klwDump)
    {
        //1. Delete KPI-values for the corresponding company and year
        $umdlKpiValues = UmdlKpiValues::where(['company_id' => $klwDump->company_id, 'year' => $klwDump->year])->first();
        $umdlKpiValues->delete();

        $klwDump->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Upload an array of dumps via bulk-upload
     *
     * @param Request $request
     * @return Response
     */
    public function upload(Request $request): Response
    {
        if ($request->hasFile('file'))
        {
           $file = $request->file('file');

           $klwParser = new KLWParser();
           $companyData = $klwParser->getCompany($file);

           // 1. Store the company as a new one (if it not exists yet)
           $company = Company::firstOrNew(['ubn' => $companyData['ubn']]);

            $company->workspace_id = 1;
            $company->name = $companyData['name'];
            $company->address = $companyData['address'];
            $company->postal_code = $companyData['postal_code'];
            $company->city = $companyData['city'];
            $company->province = $companyData['province'];
            $company->brs = $companyData['brs'];
            $company->type = $companyData['type'];
            $company->bio = $companyData['bio'];
            $company->save();

            // 2. Connect the company to an existing collective
            $ucpc = UmdlCollectivePostalcode::where('postal_code', $company->postal_code)->first();
            $company_collective = UmdlCollectiveCompany::firstOrCreate(array(
                'company_id' => $company->id,
                'collective_id' => $ucpc->collective_id,
            ));

            // 3. Save KVK-number as separate record
            $kvkNr = KvkNumber::firstOrCreate(array(
                'kvk' => $klwParser->getKVK($file),
                'company_id' => $company->id,
            ));

            // 4. Store the dump metadata
            $klwDump = KlwDump::firstOrCreate(array(
                'filename' => $file->getClientOriginalName(),
                'workspace_id' => 1,
                'company_id' => $company->id,
                'year' => $klwParser->getYear($file),
            ));

            // 5. Store all fields and their values into the database.
            $fieldsParsed = $klwParser->importFields($file, $klwDump->id, $klwParser->getYear($file), $company->id);
        }

        return response(201);
    }

    /**
     * Upload an array of Excel-files to add to company data
     *
     * @param Request $request
     * @return Response
     */
    public function uploadexcel(Request $request): Response
    {
        if ($request->hasFile('file'))
        {
            $file = $request->file('file');

            // 1. Get the company ID based on the KVK-number
            $excelParser = new ExcelParser();
            $kvk_number = $excelParser->getKVK($file);

            $kvk = KvkNumber::where('kvk', $kvk_number)->first();
            if ($kvk != null) {
                $company_id = $kvk->company_id;

                // 2, Write all the properties to the database
                $success = $excelParser->writeCompanyData($file, $company_id);
                return response('Data ingevuld voor bedrijf met KVK '.$kvk_number, 201);
            }
            else {

                return response('Geen bedrijf gevonden met KVK-nummer '.$kvk_number, 500);
            }


        }
        else {
            return response('Geen bestand geupload', 500);
        }



    }
}
