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
            'mbp' => 'required|integer',
            'website' => 'required|boolean',
            'ontvangstruimte' => 'required|boolean',
            'winkel' => 'required|boolean',
            'educatie' => 'required|boolean',
            'meerjarige_monitoring' => 'required|boolean',
            'open_dagen' => 'required|boolean',
            'wandelpad' => 'required|boolean',
            'erkend_demobedrijf' => 'required|boolean',
            'bed_and_breakfast' => 'required|boolean',
        ];
    }
}
