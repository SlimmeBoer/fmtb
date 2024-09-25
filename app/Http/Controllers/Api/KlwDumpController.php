<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKlwDumpRequest;
use App\Http\Requests\UpdateKlwDumpRequest;
use App\Libraries\KLWParser\KLWParser;
use App\Models\Audio;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\KvkNumber;
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
        //
    }

    /**
     * Upload an array of images via bulk-upload
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

           $company = Company::firstOrNew(array(
               'workspace_id' => 1,
               'name' => $companyData['name'],
               'address' => $companyData['address'],
               'postal_code' => $companyData['postal_code'],
               'city' => $companyData['city'],
               'province' => $companyData['province'],
               'ubn' => $companyData['ubn'],
               'type' => $companyData['type'],
               'bio' => $companyData['bio']));

            $company->brs = $companyData['brs'];
            $company->save();

            $kvkNr = KvkNumber::firstOrCreate(array(
                'kvk' => $klwParser->getKVK($file),
                'company_id' => $company->id,
            ));

            $klwDump = KlwDump::firstOrCreate(array(
                'filename' => $file->getClientOriginalName(),
                'workspace_id' => 1,
                'company_id' => $company->id,
                'year' => $klwParser->getYear($file),
            ));

            $fieldsParsed = $klwParser->importFields($file, $klwDump->id);

        }


        return response(201);
    }
}
