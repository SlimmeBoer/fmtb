<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKpiValuesRequest extends FormRequest
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
            'kpi2a' => 'float',
            'kpi2b' => 'float',
            'kpi2c' => 'float',
            'kpi2d' => 'float',
            'kpi3' => 'float',
            'kpi4' => 'float',
            'kpi5a' => 'float',
            'kpi5b' => 'float',
            'kpi5c' => 'float',
            'kpi5d' => 'float',
            'kpi6a' => 'float',
            'kpi6b' => 'float',
            'kpi6c' => 'float',
            'kpi7' => 'float',
            'kpi8' => 'float',
            'kpi9' => 'float',
            'kpi11' => 'float',
            'kpi12a' => 'float',
            'kpi12b' => 'float',
            'kpi13' => 'float',
            'kpi14' => 'float',
        ];
    }
}
