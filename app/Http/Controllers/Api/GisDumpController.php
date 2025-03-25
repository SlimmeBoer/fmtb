<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGisDumpRequest;
use App\Http\Requests\UpdateGisDumpRequest;
use App\Libraries\GisParser\GisParser;
use App\Models\GisDump;
use App\Models\GisRecord;
use App\Models\KvkNumber;
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
                    // File correct, sheet correct and headers correct, start the import.
                    // First, create a new dump
                    $gisDump = GisDump::firstOrNew(array(
                        'filename' => $file->getClientOriginalName(),
                        'year' => $request['year'],
                    ));
                    $gisDump->save();

                    //Log
                    SystemLog::firstOrCreate(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'create',
                        'message' => 'GIS-dump toegevoegd: ' . $gisDump->filename,
                    ));

                    $num_records = $gisParser->writeGisRecords($file, $gisDump->id);
                    Log::info($num_records);
                    return response('Bestand succesvol ingelezen, in totaal zijn ' . $num_records . ' records aangemaakt.', 201);
                }
            }
        } else {
            return response('Geen bestand geupload', 500);
        }

    }
}
