<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;
use App\Http\Resources\AreaResource;
use App\Models\Area;
use App\Models\Company;
use App\Models\SystemLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AreaResource::collection(
            Area::query()->orderBy('id')->get()
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
    public function store(StoreAreaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Area $area)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Area $area)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAreaRequest $request, Area $area)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Area $area)
    {
        //
    }
    public function getByCompany($company_id)
    {
        $company = Company::where('id', $company_id)->first();
        return $company->areas->first();
    }

    public function updateWeights(Request $request)
    {
        $data = $request->input('values', []);

        if (!is_array($data)) {
            return response()->json(['message' => 'Invalid payload'], 422);
        }

        $updated = [];

        foreach ($data as $areaId => $weights) {
            $area = Area::find($areaId);
            if (!$area) {
                continue; // of return 404 als je strenger wilt zijn
            }

            // Filter alleen de velden die ook fillable zijn in Area
            $fillable = $area->getFillable();
            $toUpdate = [];

            foreach ($weights as $key => $value) {
                if (in_array($key, $fillable)) {
                    // validatie: numeriek of null
                    if ($value === null || is_numeric($value)) {
                        $toUpdate[$key] = $value;
                    }
                }
            }

            if (!empty($toUpdate)) {
                $area->update($toUpdate);
                $updated[] = $area->id;
            }
        }

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE WEIGHTS',
            'message' => 'Gewichten bijgewerkt voor gebieden.',
        ));

        return response()->json([
            'message' => 'Gewichten succesvol bijgewerkt',
            'updated_ids' => $updated,
        ]);
    }
}
