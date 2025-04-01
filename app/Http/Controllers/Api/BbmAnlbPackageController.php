<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmAnlbPackageRequest;
use App\Http\Requests\UpdateBbmAnlbPackageRequest;
use App\Http\Resources\BbmAnlbPackageResource;
use App\Models\BbmAnlbPackage;
use App\Models\SystemLog;
use Illuminate\Support\Facades\Auth;

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
     * Display a listing of the resource with the BBM-code written out
     */
    public function getOverview(): \Illuminate\Http\JsonResponse
    {
        $packages = BbmAnlbPackage::with('code:id,code')->get()->map(function ($package) {
            return [
                'id' => $package->id,
                'anlb_number' => $package->anlb_number,
                'anlb_letters' => $package->anlb_letters,
                'code' => $package->code ? $package->code->code : null,
            ];
        });

        return response()->json($packages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBbmAnlbPackageRequest $request)
    {
        $data = $request->validated();
        $bbmAnlbPackage = BbmAnlbPackage::create($data);

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'CREATE',
            'message' => 'Maakte een nieuwe ANLb-pakket aan: ' . $bbmAnlbPackage->anlb_number . $bbmAnlbPackage->anlb_letters,
        ));

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

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Werkte ANLB-pakket bij: ' . $bbmanlbpackage->anlb_number . $bbmanlbpackage->anlb_letters,
        ));

        return new BbmAnlbPackageResource($bbmanlbpackage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmAnlbPackage $bbmanlbpackage)
    {
        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'DELETE',
            'message' => 'Verwijderde ANLB-pakket: ' . $bbmanlbpackage->anlb_number . $bbmanlbpackage->anlb_letters,
        ));

        $bbmanlbpackage->delete();
        return response('', 204);
    }
}
