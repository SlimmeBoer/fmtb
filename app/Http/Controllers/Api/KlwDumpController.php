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
use App\Models\CompanyProperties;
use App\Models\KpiValues;
use App\Models\User;
use Illuminate\Database\QueryException;
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
            $query->where('collectives.id', $collective_id);
        })->get();

        $klwDumps = KlwDump::whereHas('company', function ($query) use ($collective_id) {
            $query->whereHas('collectives', function ($subQuery) use ($collective_id) {
                $subQuery->where('collectives.id', $collective_id);
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
        $company = Company::where('user_id',Auth::user()->id)->first();

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
        KpiValues::where('company_id', $klwDump->company_id)
            ->where('year', $klwDump->year)
            ->delete();

        //2. Delete all Klw values associated with this dump
        KlwValue::where('dump_id', $klwDump->id)->delete();

        //3. Delete all signals associated with this dump
        Signal::where('dump_id', $klwDump->id)->delete();

        //4. Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'KLW-dump verwijderd: ' . $klwDump->filename,
        ));

        // 5. Remove associated file from uploads
        if ($klwDump->filename !== null && file_exists(public_path('uploads/klw/' . $klwDump->filename))) {
            unlink(public_path('uploads/klw/'. $klwDump->filename));
        }

        //6. Remove file from RAW files db
        RawFile::where('dump_id', $klwDump->id)
            ->where('type', 'klw')
            ->delete();


        //7. Remove the dump itself. Store the company id beforehand for later checks.
        $company_id = $klwDump->company_id;
        $klwDump->delete();

        // HOTFIX 0.8.7 - Deletes the associated company if there are no more dumps, to prevent "ghost"-entries in the DB
        $company = Company::find($company_id);

        if ($company) {
            // Count all klwDumps related to this company
            $klwDumpCount = $company->klwDumps()->count();

            // If only one (the current one), then we can delete the company after this klwDump is deleted
            if ($klwDumpCount <= 1) {
                //1. Delete KPI-values for the corresponding company
                KpiValues::where('company_id', $company->id)->delete();

                // 2. Remove all KVK-numbers associated to this company
                KvkNumber::where('company_id', $company->id)->delete();

                // 3. Delete company properties for the corresponding company
                CompanyProperties::where('company_id', $company->id)->delete();

                // 4. Log
                SystemLog::create(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'DELETE',
                    'message' => 'Bedrijf verwijderd: ' . $company->name,
                ));

                // 6. Finally, remove the company itself.
                $company->delete();
            }
        }


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

                $targetUser = $request->filled('user_id')
                    ? User::findOrFail((int) $request->input('user_id'))
                    : auth()->user();

                $company->name = $companyData['name'];
                $company->address = $companyData['address'];
                $company->postal_code = $companyData['postal_code'];
                $company->city = $companyData['city'];
                $company->province = $companyData['province'];
                $company->brs = $companyData['brs'];
                $company->type = $companyData['type'];
                $company->bio = $companyData['bio'];
                $company->user_id = $targetUser->id;
                $company->save();

                // Log
                if ($company->wasRecentlyCreated) {
                    SystemLog::create(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'CREATE',
                        'message' => 'Bedrijf toegevoegd: ' . $company->name,
                    ));
                }

                // 2. Connect the company to an existing collective (only if company did not exist)
                $collective_id = optional(
                    $targetUser?->collectives()->select('collectives.id')->first()
                )->id ?? 99;

                if (! $company->collectives()->whereKey($collective_id)->exists()) {
                    $company->collectives()->attach($collective_id);
                }

                // 3. Connect the company to an existing area (only if company did not exist)
                $area_id = optional(
                    $targetUser?->areas()->select('areas.id')->first()
                )->id ?? 99;

                if (! $company->areas()->whereKey($area_id)->exists()) {
                    $company->areas()->attach($area_id);
                }


                // 4. Save KVK-number as separate record
                try {
                    $kvkNr = KvkNumber::firstOrCreate(array(
                        'kvk' => $klwParser->getKVK($file),
                        'company_id' => $company->id,
                    ));
                } catch (QueryException $e) {
                    // If a duplicate entry error occurs, retrieve the existing record
                    $kvkNr = KvkNumber::where(array(
                        'kvk' => $klwParser->getKVK($file),
                        'company_id' => $company->id,
                    ))->first();
                }

                $originalName = $file->getClientOriginalName();
                $uniqueId = uniqid();
                $newFileName = 'klw_' . $company->id . '_' . $uniqueId . '_' . $originalName;

                // 5. Store the dump metadata
                $klwDump = KlwDump::firstOrCreate(array(
                    'company_id' => $company->id,
                    'year' => $klwParser->getYear($file),
                ));
                $klwDump->filename = $newFileName;
                $klwDump->save();

                // 6. Store all fields and their values into the database.
                $fieldsParsed = $klwParser->importFields($file, $klwDump->id, $klwParser->getYear($file), $company->id, true);

                // 7. Import signals
                $signalsParsed = $klwParser->importSignals($file, $klwDump->id, $klwParser->getYear($file), $company->id);

                // 8. Log
                SystemLog::create(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'CREATE',
                    'message' => 'KLW-dump geupload : ' . $company->name . ' (jaar ' . $klwParser->getYear($file) . ')',
                ));

                // 8. Save the physical file to the GIS uploads
                $file->move(public_path('uploads/klw/'), $newFileName);

                // 9. Record the file as RawFile to the database
                RawFile::firstOrCreate(array(
                    'user_id' => Auth::user()->id,
                    'type' => 'klw',
                    'dump_id' => $klwDump->id,
                    'filename' => $newFileName,
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
        $authUser = auth()->user();

        // Pak de "eerste" collective van de ingelogde user
        $firstCollective = $authUser?->collectives()->orderBy('id')->first();

        if (!$firstCollective) {
            // Geen collective bij ingelogde user: niets te matchen
            return response()->json([
                'users'    => collect(), // lege collectie voor consistentie
                'klwDumps' => [],
            ]);
        }

        $collectiveId = $firstCollective->id;

        // Haal alleen users met rol 'bedrijf' binnen die óók in hetzelfde (eerste) collective zitten
        $users = User::query()
            ->role('bedrijf') // Spatie Laravel Permission
            ->whereHas('collectives', function ($q) use ($collectiveId) {
                $q->where('collectives.id', $collectiveId);
            })
            ->with([
                'company' => function ($q) {
                    $q->withExists(['oldResultByBrs as old_data'])
                        ->with([
                            'klwDumps' => fn ($dumps) => $dumps->withCount('signals'),
                        ]);
                },
            ])
            ->get();

        // Flatten alle klwDumps (alleen voor users die wél een company hebben)
        $klwDumps = [];

        foreach ($users as $user) {
            $company = $user->company; // kan null zijn
            if (!$company) {
                continue; // sla users zonder company over voor klwDumps
            }

            foreach ($company->klwDumps as $klwDump) {
                $klwDumps[] = array_merge($klwDump->toArray(), [
                    'signal_count' => $klwDump->signals_count, // uit withCount()
                    'user_id'      => $user->id,
                    'company_id'   => $company->id,
                    'old_data'     => (bool) $company->old_data,
                ]);
            }
        }

        return response()->json([
            'users'    => $users,
            'klwDumps' => $klwDumps,
        ]);
    }

    /**
     * Gets all dumps from all companies with all signals.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDumps()
    {
        $users = User::query()
            ->role('bedrijf') // alleen users met rol 'bedrijf'
            ->with([
                'company' => function ($q) {
                    $q->withExists(['oldResultByBrs as old_data'])
                        ->with([
                            'klwDumps' => fn ($dumps) => $dumps->withCount('signals'),
                        ]);
                },
            ])
            ->get();

        $klwDumps = [];

        foreach ($users as $user) {
            $company = $user->company;
            if (!$company) {
                continue;
            }

            foreach ($company->klwDumps as $klwDump) {
                $klwDumps[] = array_merge($klwDump->toArray(), [
                    'signal_count' => $klwDump->signals_count,
                    'user_id'      => $user->id,
                    'company_id'   => $company->id,
                    'old_data'     => (bool) $company->old_data,
                ]);
            }
        }

        return response()->json([
            'users'    => $users,
            'klwDumps' => $klwDumps,
        ]);
    }


}
