<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmCodeRequest;
use App\Http\Requests\UpdateBbmCodeRequest;
use App\Http\Resources\BbmCodeResource;
use App\Models\BbmAnlbPackage;
use App\Models\BbmCode;
use App\Models\BbmGisPackage;
use App\Models\BbmKpi;
use App\Models\SystemLog;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BbmCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return BbmCodeResource::collection(
            BbmCode::query()->orderBy('code')->get()
        );
    }

    public function getByKpi($kpi)
    {
        $bbmCodes = BbmCode::whereHas('bbmKpis', function ($query) use ($kpi) {
            $query->where('kpi', $kpi);
        })->get();

        return response()->json($bbmCodes);
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
    public function store(StoreBbmCodeRequest $request)
    {
        $data = $request->validated();
        $bbmCode = BbmCode::create($data);

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'Maakte een nieuwe BBM-code aan: ' . $bbmCode->code ,
        ));

        return response(new BbmCodeResource($bbmCode), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BbmCode $bbmcode): BbmCodeResource
    {
        return new BbmCodeResource($bbmcode);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BbmCode $bbmcode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBbmCodeRequest $request, BbmCode $bbmcode): BbmCodeResource
    {
        $data = $request->validated();
        $bbmcode->update($data);

        // Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Werkte BBM-code bij: ' . $bbmcode->code ,
        ));

        return new BbmCodeResource($bbmcode);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmCode $bbmcode) : Response
    {
        // 1. Remove all the associated BBM-KPI-connections
        BbmKpi::where('code_id',$bbmcode->id)->delete();

        // 2. Remove all the associated GIS packages
        BbmGisPackage::where('code_id',$bbmcode->id)->delete();

        // 3. Remove all the associated ANLb packages
        BbmAnlbPackage::where('code_id',$bbmcode->id)->delete();

        // 4. Log
        SystemLog::firstOrCreate(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'Verwijderde BBM-code: ' . $bbmcode->code ,
        ));
        // 5. Lastly, remove the code itself.
        $bbmcode->delete();

        return response("", 204);
    }
}
