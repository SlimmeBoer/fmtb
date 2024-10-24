<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUmdlCompanyPropertiesRequest;
use App\Http\Requests\UpdateUmdlCompanyPropertiesRequest;
use App\Http\Resources\UmdlCompanyPropertiesResource;
use App\Models\UmdlCompanyProperties;

class UmdlCompanyPropertiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreUmdlCompanyPropertiesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUmdlCompanyPropertiesRequest $request, UmdlCompanyProperties $umdlcompanyproperties)
    {
        $data = $request->validated();
        $umdlcompanyproperties->update($data);
        return new UmdlCompanyPropertiesResource($umdlcompanyproperties);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UmdlCompanyProperties $umdlcompanyproperties)
    {
        //
    }
}
