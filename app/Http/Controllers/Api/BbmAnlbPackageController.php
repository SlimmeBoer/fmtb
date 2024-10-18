<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmAnlbPackageRequest;
use App\Http\Requests\UpdateBbmAnlbPackageRequest;
use App\Http\Resources\BbmAnlbPackageResource;
use App\Models\BbmAnlbPackage;

class BbmAnlbPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BbmAnlbPackageResource::collection(
            BbmAnlbPackage::query()->orderBy('anlb_number')->get()
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
    public function store(StoreBbmAnlbPackageRequest $request)
    {
        $data = $request->validated();
        $bbmAnlbPackage = BbmAnlbPackage::create($data);
        return response(new BbmAnlbPackageResource($bbmAnlbPackage), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BbmAnlbPackage $bbmanlbpackage)
    {
        return new BbmAnlbPackageResource($bbmanlbpackage);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BbmAnlbPackage $bbmAnlbPackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBbmAnlbPackageRequest $request, BbmAnlbPackage $bbmanlbpackage)
    {
        $data = $request->validated();
        $bbmanlbpackage->update($data);
        return new BbmAnlbPackageResource($bbmanlbpackage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmAnlbPackage $bbmanlbpackage)
    {
        $bbmanlbpackage->delete();
        return response('', 204);
    }
}
