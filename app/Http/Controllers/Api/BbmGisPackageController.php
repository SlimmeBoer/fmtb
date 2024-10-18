<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmGisPackageRequest;
use App\Http\Requests\UpdateBbmGisPackageRequest;
use App\Http\Resources\BbmCodeResource;
use App\Http\Resources\BbmGisPackageResource;
use App\Models\BbmGisPackage;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BbmGisPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BbmGisPackageResource::collection(
            BbmGisPackage::query()->orderBy('package')->get()
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
    public function store(StoreBbmGisPackageRequest $request)
    {
        $data = $request->validated();
        $bbmGisPackage = BbmGisPackage::create($data);
        return response(new BbmGisPackageResource($bbmGisPackage), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BbmGisPackage $bbmgispackage)
    {
        return new BbmGisPackageResource($bbmgispackage);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BbmGisPackage $bbmgispackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBbmGisPackageRequest $request, BbmGisPackage $bbmgispackage): BbmGisPackageResource
    {
        $data = $request->validated();
        $bbmgispackage->update($data);
        return new BbmGisPackageResource($bbmgispackage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmGisPackage $bbmgispackage) : Response
    {
        $bbmgispackage->delete();
        return response('', 204);
    }
}
