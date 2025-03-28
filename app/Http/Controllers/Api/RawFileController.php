<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRawFileRequest;
use App\Http\Requests\UpdateRawFileRequest;
use App\Models\RawFile;

class RawFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get 'perPage' and 'page' from query parameters, default to 50 and page 1
        $perPage = request()->input('perPage', 50);
        $page = request()->input('page', 1);

        // Fetch the dump by ID and its associated records with pagination
        $files = RawFile::with('user:id,first_name,middle_name,last_name')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($files);
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
    public function store(StoreRawFileRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RawFile $rawFile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RawFile $rawFile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRawFileRequest $request, RawFile $rawFile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RawFile $rawFile)
    {
        //
    }
}
