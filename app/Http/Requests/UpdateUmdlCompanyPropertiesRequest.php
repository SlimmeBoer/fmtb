<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUmdlCompanyPropertiesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => 'required|integer',
            'mbp' => 'integer',
            'website' => 'boolean',
            'ontvangstruimte' => 'boolean',
            'winkel' => 'boolean',
            'educatie' => 'boolean',
            'meerjarige_monitoring' => 'boolean',
            'open_dagen' => 'boolean',
            'wandelpad' => 'boolean',
            'erkend_demobedrijf' => 'boolean',
            'bed_and_breakfast' => 'boolean',
            'opp_totaal' => 'numeric',
            'melkkoeien' => 'numeric',
            'meetmelk_per_koe' => 'numeric',
            'meetmelk_per_ha' => 'numeric',
            'jongvee_per_10mk' => 'numeric',
            'gve_per_ha' => 'numeric',
            'kunstmest_per_ha' => 'numeric',
            'opbrengst_grasland_per_ha' => 'numeric',
            're_kvem' => 'numeric',
            'krachtvoer_per_100kg_melk' => 'numeric',
            'veebenutting_n' => 'numeric',
            'bodembenutting_n' => 'numeric',
            'bedrijfsbenutting_n' => 'numeric',
        ];
    }
}
