<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use App\Models\SystemLog;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return SettingResource::collection(
            Setting::query()->orderBy('key')->get()
        );
    }

    /**
     * Returns one specific setting by key (using for checking system stats)
     * @param $key
     * @return Setting
     */
    public function getByKey($key): Setting
    {
        return Setting::where('key', $key)->first();
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting): SettingResource
    {
        $data = $request->validated();
        $setting->update($data);

        // Log
        SystemLog::create(array(
            'user_id' => Auth::user()->id,
            'type' => 'UPDATE',
            'message' => 'Werkte systeeminstelling bij: ' . $setting->key . ' naar ' . $setting->value,
        ));

        return new SettingResource($setting);


    }
}
