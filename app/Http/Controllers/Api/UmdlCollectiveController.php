<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUmdlCollectiveRequest;
use App\Http\Requests\UpdateUmdlCollectiveRequest;
use App\Http\Resources\UmdlCollectiveResource;
use App\Models\UmdlCollective;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UmdlCollectiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return UmdlCollectiveResource::collection(
            UmdlCollective::query()->orderBy('name')->get()
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
    public function store(StoreUmdlCollectiveRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UmdlCollective $umdlCollective)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UmdlCollective $umdlCollective)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUmdlCollectiveRequest $request, UmdlCollective $umdlCollective)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UmdlCollective $umdlCollective)
    {
        //
    }
}
