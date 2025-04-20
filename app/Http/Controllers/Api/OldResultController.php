<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOldResultRequest;
use App\Http\Requests\UpdateOldResultRequest;
use App\Http\Resources\OldResultResource;
use App\Libraries\GisParser\GisParser;
use App\Libraries\ResultParser\ResultParser;
use App\Models\GisDump;
use App\Models\OldResult;
use App\Models\RawFile;
use App\Models\SystemLog;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;

class OldResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return OldResultResource::collection(
            OldResult::query()->orderBy('ubn')->get()
        );
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
    public function store(StoreOldResultRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OldResult $oldResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OldResult $oldResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOldResultRequest $request, OldResult $oldResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the result
        $oldresult = OldResult::find($id);

        if ($oldresult) {
            // Remove associated file from uploads
            if ($oldresult->filename !== null && file_exists(public_path('uploads/oldresults/' . $oldresult->filename))) {
                unlink(public_path('uploads/oldresults/'. $oldresult->filename));
            }

            // Remove file from RAW files db
            RawFile::where('dump_id', $oldresult->id)
                ->where('type', 'oldresult')
                ->delete();

            //7. Remove the dump itself.
            $oldresult->delete();

            //Log
            SystemLog::create(array(
                'user_id' => Auth::user()->id,
                'type' => 'DELETE',
                'message' => 'Oude resultaten verwijderd: ' . $oldresult->filename,
            ));

            return response()->json(['message' => 'Old result successfully deleted']);
        } else {
            return response()->json(['message' => 'Old result not found'], 404);
        }
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function upload(Request $request): Response
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // 1. Get the company ID based on the KVK-number
            $resultparser = new ResultParser();

            if (!$resultparser->checkSheetExists($file, 'Eindresultaat')) {
                return response('Er is geen sheet gevonden met de naam "Eindresultaat" in dit bestand', 500);
            } else {
                if (!$resultparser->checkSheetExists($file, 'UMDL invulblad')) {
                    return response('Er is geen sheet gevonden met de naam "UMDL invulblad" in dit bestand', 500);
                } else {
                    // File correct, sheets correct, start the import.
                    // 1. First, create a new dump
                    $originalName = $file->getClientOriginalName();
                    $uniqueId = uniqid();
                    $newFileName = 'oldresult_' . $uniqueId . '_' . $originalName;

                    // 2. Write the actual GIS records
                    $oldresult = $resultparser->getResults($file, $newFileName);

                    // 3. Save the physical file to the GIS uploads

                    $file->move(public_path('uploads/oldresults/'), $newFileName);

                    // 4. Record the file as RawFile to the database
                    RawFile::firstOrCreate(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'oldresult',
                        'dump_id' => $oldresult->id,
                        'filename' => $newFileName,
                    ));

                    //5. Log
                    SystemLog::create(array(
                        'user_id' => Auth::user()->id,
                        'type' => 'CREATE',
                        'message' => 'Oude resultaten toegevoegd: ' . $oldresult->filename,
                    ));

                    // 6. Return response
                    return response('Bestand succesvol ingelezen voor UBN ' . $oldresult->ubn . ' in jaar ' . $oldresult->final_year, 201);
                }
            }
        } else {
            return response('Geen bestand geupload', 500);
        }

    }

}
