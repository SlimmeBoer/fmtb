<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUmdlKpiValuesRequest extends FormRequest
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
            'year' => 'required|integer|max:4',
            'kpi1a' => 'float',
            'kpi1b' => 'float',
            'kpi2' => 'float',
            'kpi3' => 'float',
            'kpi4' => 'float',
            'kpi5' => 'float',
            'kpi6a' => 'float',
            'kpi6b' => 'float',
            'kpi6c' => 'float',
            'kpi6d' => 'float',
            'kpi7' => 'float',
            'kpi8' => 'float',
            'kpi9' => 'float',
            'kpi10' => 'float',
            'kpi11' => 'float',
            'kpi12' => 'float',
            'kpi3a' => 'float',
            'kpi3b' => 'float',
            'kpi14' => 'float',
            'kpi15' => 'float',
        ];
    }
}
