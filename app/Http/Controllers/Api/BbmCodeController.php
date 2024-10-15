<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBbmCodeRequest;
use App\Http\Requests\UpdateBbmCodeRequest;
use App\Http\Resources\BbmCodeResource;
use App\Models\BbmCode;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BbmCode $bbmCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BbmCode $bbmCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBbmCodeRequest $request, BbmCode $bbmCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BbmCode $bbmCode)
    {
        //
    }
}
