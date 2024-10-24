<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
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
            'workspace_id' => 'required|integer',
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
            'city' => 'required|string|max:50',
            'province' => 'required|string|max:50',
            'brs' => 'required|string|max:15',
            'ubn' => 'required|string|max:15',
            'phone' => 'max:15',
            'bank_account' => 'max:25',
            'bank_account_name' => 'max:50',
            'email' => 'max:50',
            'type' =>  'required|string|max:50',
            'bio' => 'required|boolean'
        ];
    }
}
