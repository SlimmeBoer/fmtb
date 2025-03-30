<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKlwDumpRequest;
use App\Http\Requests\UpdateKlwDumpRequest;
use App\Http\Resources\KlwDumpResource;
use App\Libraries\ExcelParser\ExcelParser;
use App\Libraries\ExcelParser\GisParser;
use App\Libraries\KLWParser\KLWParser;
use App\Models\Audio;
use App\Models\Company;
use App\Models\KlwDump;
use App\Models\KlwValue;
use App\Models\KvkNumber;
use App\Models\RawFile;
use App\Models\Signal;
use App\Models\SystemLog;
use App\Models\UmdlCollectiveCompany;
use App\Models\UmdlCollectivePostalcode;
use App\Models\UmdlKpiValues;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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
     * Gets a list of all companies, dumps in the current collective
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentcollective()
    {
        $collective_id = Auth::user()->collectives()->first()->id;

        $companies = Company::whereHas('collectives', function ($query) use ($collective_id) {
            $query->where('umdl_collectives.id', $collective_id);
        })->get();

        $klwDumps = KlwDump::whereHas('company', function ($query) use ($collective_id) {
            $query->whereHas('collectives', function ($subQuery) use ($collective_id) {
                $subQuery->where('umdl_collectives.id', $collective_id);
            });
        })->get();

        return response()->json([
            'companies' => $companies,
            'klwDumps' => $klwDumps
        ]);
    }

    /**
     * Gets a list of all dumps for the current company
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentcompany()
    {
        $company = Company::where('ubn',Auth::user()->ubn)->first();

        if ($company)
        {
            return response()->json(['klwDumps' => $company->klwDumps]);
        }
        else
        {
            return response()->json(['message' => 'Bedrijf niet gevonden'], 404);
        }
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

        //2. Delete all Klw values associated with this dump
        KlwValue::where('dump_id', $klwDump->id)->delete();

        //3. Delete all signals associated with this dump
        Signal::where('dump_id', $klwDump->id)->delete();

        //4. Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'KLW-dump verwijderd: ' . $klwDump->filename,
        ));

        // 5. Remove associated file from uploads
        if ($klwDump->filename !== null && file_exists(public_path('uploads/klw/' . $klwDump->filename))) {
            unlink(public_path('uploads/klw/'. $klwDump->filename));
        }

        // Remove file from RAW files db
        $rawfile = RawFile::where('filename', $klwDump->filename)->first();

        if ($rawfile) {
            $rawfile->delete();
        }

        //7. Remove the dump itself.
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

            if (!$klwParser->checkValid($file)) {
                return response('De XML-file is niet geldig. Controleer of het mogelijk een input-file is.', 500);
            } else {
                $companyData = $klwParser->getCompany($file);

                // 1. Store the company as a new one (if it not exists yet)
                $company = Company::firstOrNew(['ubn' => $companyData['ubn']]);

                $company->name = $companyData['name'];
                $company->address = $companyData['address'];
                $company->postal_code = $companyData['postal_code'];
                $company->city = $companyData['city'];
                $company->province = $companyData['province'];
                $company->brs = $companyData['brs'];
                $company->type = $companyData['type'];
                $company->bio = $companyData['bio'];
                $company->save();

                // Log
                SystemLog::firstOrCreate(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'CREATE',
                    'message' => 'Bedrijf toegevoegd: ' . $company->name,
                ));

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
                    'company_id' => $company->id,
                    'year' => $klwParser->getYear($file),
                ));

                // 5. Store all fields and their values into the database.
                $fieldsParsed = $klwParser->importFields($file, $klwDump->id, $klwParser->getYear($file), $company->id, true);

                // 6. Import signals
                $signalsParsed = $klwParser->importSignals($file, $klwDump->id, $klwParser->getYear($file), $company->id);

                // 7. Log
                SystemLog::firstOrCreate(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'CREATE',
                    'message' => 'KLW-dump geupload : ' . $company->name . ' (jaar ' . $klwParser->getYear($file) . ')',
                ));

                // 8. Save the physical file to the GIS uploads
                $file->move(public_path('uploads/klw/'), $file->getClientOriginalName());

                // 9. Record the file as RawFile to the database
                RawFile::firstOrCreate(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'klw',
                    'filename' => $file->getClientOriginalName(),
                ));

                return response('KLW succesvol ingelezen, in totaal zijn ' . $fieldsParsed . ' velden aangemaakt en ' . $signalsParsed . ' signalen.', 201);
            }
        }
        else {
            return response('Geen bestand geupload', 500);
        }


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

    /**
     * Display a listing of the resource.
     */
    public function dumpscollective()
    {
        $user = User::where('id', Auth::id())
            ->with([
                'collectives.companies.klwDumps' => function ($query) {
                    $query->withCount('signals'); // Get only the count of signals
                }
            ])
            ->first();

        if (!$user) {
            return ['companies' => [], 'klw_dumps' => []];
        }

        $companies = [];
        $klwDumps = [];

        foreach ($user->collectives as $collective) {
            foreach ($collective->companies as $company) {
                $companies[] = $company; // Collect company data

                foreach ($company->klwDumps as $klwDump) {
                    // Convert KlwDump to array and add only the signal count
                    $klwDumps[] = array_merge($klwDump->toArray(), [
                        'signal_count' => $klwDump->signals_count, // signals_count comes from withCount()
                    ]);
                }
            }
        }

        return response()->json([
            'companies' => $companies,
            'klwDumps' => $klwDumps,
        ]);
    }

    /**
     * Gets all dumps from all companies with all signals.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDumps()
    {
        // Get all companies with their associated klwDumps and signal count
        $companies = Company::with([
            'klwDumps' => function ($query) {
                $query->withCount('signals'); // Get only the count of signals for each dump
            }
        ])->get();

        $klwDumps = [];

        // Extract klwDumps and include signal count
        foreach ($companies as $company) {
            foreach ($company->klwDumps as $klwDump) {
                $klwDumps[] = array_merge($klwDump->toArray(), [
                    'signal_count' => $klwDump->signals_count, // signals_count comes from withCount()
                ]);
            }
        }

        return response()->json([
            'companies' => $companies,
            'klwDumps' => $klwDumps,
        ]);
    }

}
