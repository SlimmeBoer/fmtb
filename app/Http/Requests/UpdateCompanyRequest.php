<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'brs' => 'required|string|max:15',
            'ubn' => 'required|string|max:15',
            'type' =>  'required|string|max:50',
            'bio' => 'required|boolean'
        ];
    }
}
