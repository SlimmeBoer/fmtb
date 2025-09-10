<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCollectiveRequest;
use App\Http\Requests\UpdateCollectiveRequest;
use App\Http\Resources\CollectiveResource;
use App\Models\KlwDump;
use App\Models\Collective;
use App\Models\CompanyProperties;
use App\Models\KpiValues;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class CollectiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return CollectiveResource::collection(
            Collective::query()->orderBy('name')->get()
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
    public function store(StoreCollectiveRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Collective $collective)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collective $collective)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectiveRequest $request, Collective $collective)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collective $collective)
    {
        //
    }

    /**
     * Gets the collective of the currently logged in user.
     * @return mixed
     */
    public function getCurrent() {
        $user = User::where('id', Auth::id())->first();
        return $user->collectives()->first();
    }

    /**
     * Returns an array for the completion gauges of a collective
     * @return array[]|\Illuminate\Http\JsonResponse
     */
    public function getCompletion()
    {
        $user = User::where('id', Auth::id())->first();

        if (!$user) {
            return ['collective_data' => []];
        }

        $collective_data = array();

        foreach ($user->collectives as $collective) {

            $bedrijfUsers = $collective->users()->whereHas('roles', function ($query) {
                $query->where('name', 'bedrijf');
            })->get();

            $collective_data["total_klw"] = count($bedrijfUsers);
            $collective_data["total_mbp"] = count($bedrijfUsers);
            $collective_data["total_sma"] = count($bedrijfUsers);
            $collective_data["total_kpi"] = count($bedrijfUsers);
            $collective_data["total_klw_completed"] = 0;
            $collective_data["total_mpb_completed"] = 0;
            $collective_data["total_sma_completed"] = 0;
            $collective_data["total_kpi_completed"] = 0;

            foreach ($collective->companies as $company)
            {
                // 1. Als een bedrijf 1 of meer Dumps heeft, dan telt hij als compleet
                if (count(KlwDump::where('company_id', $company->id)->get()) > 0)
                {
                    $collective_data["total_klw_completed"] += 1;
                }

                $company_properties = CompanyProperties::where('company_id', $company->id)->first();

                // 2. MBP niet ingevuld
                if ($company_properties->mbp != 0) {
                    $collective_data["total_mpb_completed"] += 1;
                }

                // 3. SMA's zijn niet ingevuld
                if (($company_properties->website == 1 || $company_properties->ontvangstruimte == 1 ||
                    $company_properties->winkel == 1 || $company_properties->educatie == 1 ||
                    $company_properties->meerjarige_monitoring == 1 || $company_properties->open_dagen == 1 ||
                    $company_properties->wandelpad == 1 || $company_properties->erkend_demobedrijf == 1 ||
                    $company_properties->bed_and_breakfast == 1) || $company_properties->geen_sma == 1)
                {
                    $collective_data["total_sma_completed"] += 1;
                }

                // 4. NatuurKPI's niet compleet.
                $kpivalues = KpiValues::where('company_id', $company->id)->orderBy('year', 'DESC')->first();

                if ($kpivalues && ($kpivalues->kpi10 != 0 || $kpivalues->kpi11 != 0 || $kpivalues->kpi12 != 0)) {
                    $collective_data["total_kpi_completed"] += 1;
                }

            }
        }
        return response()->json([
            'collective_data' => $collective_data,
        ]);
    }
}
