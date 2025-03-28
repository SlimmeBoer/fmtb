<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGisDumpRequest;
use App\Http\Requests\UpdateGisDumpRequest;
use App\Libraries\GisParser\GisParser;
use App\Libraries\GisParser\GisRunner;
use App\Models\Company;
use App\Models\GisDump;
use App\Models\GisRecord;
use App\Models\KvkNumber;
use App\Models\RawFile;
use App\Models\SystemLog;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;

class GisDumpController extends Controller
{
    public function index()
    {
        $dumps = GisDump::withCount('gisRecords')->get();
        return response()->json($dumps);
    }

    /**
     * Gets a list of all companies, dumps in the current collective
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentcollective()
    {
        $collective_id = Auth::user()->collectives()->first()->id;
        $dumps = GisDump::where('collective_id',$collective_id)->get();
        return response()->json($dumps);
    }

    // Fetch records associated with a dump
    public function show($id)
    {
        // Get 'perPage' and 'page' from query parameters, default to 50 and page 1
        $perPage = request()->input('perPage', 50);
        $page = request()->input('page', 1);

        // Fetch the dump by ID and its associated records with pagination
        $records = GisRecord::where('dump_id', $id)
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($records);
    }

    // Delete a dump
    public function destroy($id)
    {
        // First, remove all GIS records associated to the dump
        GisRecord::where('dump_id',$id)->delete();

        // Then, remove the dump itself
        $dump = GisDump::find($id);

        if ($dump) {
            //Log
            SystemLog::firstOrCreate(array(
                'user_id' => Auth::user()->id,
                'type' => 'DELETE',
                'message' => 'GIS-dump verwijderd: ' . $dump->filename,
            ));

            // Remove associated file from uploads
            if ($dump->filename !== null && file_exists(public_path('uploads/gis/' . $dump->filename))) {
                unlink(public_path('uploads/gis/'. $dump->filename));
            }

            // Remove file from RAW files db
            $rawfile = RawFile::where('filename', $dump->filename)->first();

            if ($rawfile) {
                $rawfile->delete();
            }

            // Deelte the actual dum record from DB
            $dump->delete();

            return response()->json(['message' => 'Dump successfully deleted']);
        } else {
            return response()->json(['message' => 'Dump not found'], 404);
        }
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function uploadexcel(Request $request): Response
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // 1. Get the company ID based on the KVK-number
            $gisParser = new GisParser();

            if (!$gisParser->checkCorrectSheet($file)) {
                return response('Er is geen sheet gevonden met de naam "Beheereenheden Collectief" in dit bestand', 500);
            } else {
                if (!$gisParser->checkCorrectHeaders($file)) {
                    return response('De kolomheaders in de sheet bevatten niet de juiste informatie.', 500);
                } else {
                    // Gets the collective ID of the current user. If an admin, then it returns 0.
                    if (Auth::user()->hasRole('collectief'))
                    {
                        $collective_id = Auth::user()->collectives()->first()->id;
                    }
                    else {
                        $collective_id = 0;
                    }

                    // File correct, sheet correct and headers correct, start the import.
                    // 1. First, create a new dump
                    $gisDump = GisDump::firstOrNew(array(
                        'filename' => $file->getClientOriginalName(),
                        'collective_id' => $collective_id,
                        'year' => $request['year'],
                    ));
                    $gisDump->save();

                    // 2. Write the actual GIS records
                    $num_records = $gisParser->writeGisRecords($file, $gisDump->id);

                    // 3. Save the physical file to the GIS uploads
                    $file->move(public_path('uploads/gis/'), $file->getClientOriginalName());

                    // 4. Record the file as RawFile to the database
                    RawFile::firstOrCreate(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'gis',
                        'filename' => $file->getClientOriginalName(),
                    ));

                    //5. Log
                    SystemLog::firstOrCreate(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'create',
                        'message' => 'GIS-dump toegevoegd: ' . $gisDump->filename,
                    ));

                    // 6. Return response
                    return response('Bestand succesvol ingelezen, in totaal zijn ' . $num_records . ' records aangemaakt.', 201);
                }
            }
        } else {
            return response('Geen bestand geupload', 500);
        }

    }

    /**
     * Calculates the natureKPI's for all companies in the database.
     * @return Response
     */
    public function runall(): Response
    {
        // 1. First, get alle companies in the DB.
        $companies = Company::all();
        $gisrunner = new GisRunner();

        foreach ($companies as $company)
        {
            // Get KVK's of the company
            $kvks = KvkNumber::where('company_id',$company->id)->get();
            $kvkValues = collect($kvks)->pluck('kvk')->toArray();

            // Get all GIS-records associated with the company based on KVK's.
            $total_gis_records = GisRecord::whereIn('kvk', $kvkValues)->get();

            $bbm_values = $gisrunner->getValues();
            $non_found_records = array();

            // Get the bbm code for each gis record in the company and add the value to the set.
            foreach ($total_gis_records as $gis_record) {
                $bbmcode = $gisrunner->getBbmCode($gis_record->eenheid_code);

                // Non-empty string, then code has been found. add totals
                if ($bbmcode !== "") {
                    $bbm_values = $gisrunner->updateValues($bbm_values, $bbmcode, $gis_record);
                }
                else {
                    $non_found_records[] = $gis_record->kvk . ' met code ' .$gis_record->eenheid_code;
                }
            }

            // All records processed? Then, update the companyproperties.
            $gisrunner->processKPIs($bbm_values, $company);
        }
        return response('Run succesvol uitgevoerd. De volgende records konden niet gevonden worden:', 201);
    }

    /**
     * Calculates the natureKPI's for all companies in the database.
     * @return Response
     */
    public function runcollective(): Response
    {
        // 1. First, get alle companies in the DB.
        $collectiveId = Auth::user()->collectives()->first()->id;

        $companies = Company::whereHas('collectives', function ($query) use ($collectiveId) {
            $query->where('umdl_collectives.id', $collectiveId);
        })->orderBy('name')->get();

        $gisrunner = new GisRunner();

        foreach ($companies as $company)
        {
            // Get KVK's of the company
            $kvks = KvkNumber::where('company_id',$company->id)->get();
            $kvkValues = collect($kvks)->pluck('kvk')->toArray();

            // Get all GIS-records associated with the company based on KVK's.
            $total_gis_records = GisRecord::whereIn('kvk', $kvkValues)->get();

            $bbm_values = $gisrunner->getValues();
            $non_found_records = array();

            // Get the bbm code for each gis record in the company and add the value to the set.
            foreach ($total_gis_records as $gis_record) {
                $bbmcode = $gisrunner->getBbmCode($gis_record->eenheid_code);

                // Non-empty string, then code has been found. add totals
                if ($bbmcode !== "") {
                    $bbm_values = $gisrunner->updateValues($bbm_values, $bbmcode, $gis_record);
                }
                else {
                    $non_found_records[] = $gis_record->kvk . ' met code ' .$gis_record->eenheid_code;
                }
            }

            // All records processed? Then, update the companyproperties.
            $gisrunner->processKPIs($bbm_values, $company);
        }
        return response('Run succesvol uitgevoerd. De volgende records konden niet gevonden worden:', 201);
    }

}
