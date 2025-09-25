<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

/**
 * @property mixed $id
 */
class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:55',
            'middle_name' => 'max:20',
            'last_name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'role_id' => 'required|integer|exists:roles,id',
            'collective_id' => 'required|integer',
            'area_id' => 'required|integer',
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }
}
