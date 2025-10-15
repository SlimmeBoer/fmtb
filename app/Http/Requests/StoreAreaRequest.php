<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAreaRequest extends FormRequest
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
            'description' => 'required|string',
            'weight_kpi1' => 'required|integer',
            'weight_kpi2a' => 'required|integer',
            'weight_kpi2b' => 'required|integer',
            'weight_kpi2c' => 'required|integer',
            'weight_kpi2d' => 'required|integer',
            'weight_kpi2e' => 'required|integer',
            'weight_kpi3' => 'required|integer',
            'weight_kpi4' => 'required|integer',
            'weight_kpi5' => 'required|integer',
            'weight_kpi6' => 'required|integer',
            'weight_kpi7' => 'required|integer',
            'weight_kpi8' => 'required|integer',
            'weight_kpi9' => 'required|integer',
            'weight_kpi11' => 'required|integer',
            'weight_kpi12a' => 'required|integer',
            'weight_kpi12b' => 'required|integer',
            'weight_kpi13' => 'required|integer',
            'weight_kpi14' => 'required|integer',
        ];
    }
}
