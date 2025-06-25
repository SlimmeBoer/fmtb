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
            'ubn' => 'required|string|max:35',
            'phone' => 'max:15',
            'bank_account' => 'required|regex:/^NL[0-9]{2}[A-z0-9]{4}[0-9]{10}$/',
            'bank_account_name' => 'max:50',
            'email' => 'max:50',
            'type' =>  'required|string|max:50',
            'bio' => 'required|boolean',
            'data_compleet' => 'required|boolean'
        ];

    }

    public function messages(): array
    {
        return [
            'bank_account.regex' => 'Bankrekeningnummer is geen geldig IBAN-formaat (gebruik geen spaties)',
        ];
    }
}
