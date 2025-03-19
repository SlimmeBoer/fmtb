<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSignalRequest extends FormRequest
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
            'dump_id' => 'required|integer',
            'item_nummer' => 'required|integer',
            'signaal_nummer' => 'required|integer',
            'signaal_code' => 'string',
            'categorie' => 'string',
            'onderwerp' => 'string',
            'soort' => 'string',
            'kengetal' => 'string',
            'waarde' => 'string',
            'kenmerk' => 'string',
            'actie' => 'string',
        ];

    }
}
