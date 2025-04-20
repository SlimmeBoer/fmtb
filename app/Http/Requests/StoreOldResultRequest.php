<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOldResultRequest extends FormRequest
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
            'ubn' => 'required|integer',
            'final_year' => 'required|integer',
            'filename' => 'required|string',
            'result_kpi1a' => 'float',
            'result_kpi1b' => 'float',
            'result_kpi2' => 'float',
            'result_kpi3' => 'float',
            'result_kpi4' => 'float',
            'result_kpi5' => 'float',
            'result_kpi6a' => 'float',
            'result_kpi6b' => 'float',
            'result_kpi6c' => 'float',
            'result_kpi6d' => 'float',
            'result_kpi7' => 'float',
            'result_kpi8' => 'string',
            'result_kpi9' => 'float',
            'result_kpi10' => 'float',
            'result_kpi11' => 'float',
            'result_kpi12' => 'float',
            'result_kpi13a' => 'float',
            'result_kpi13b' => 'float',
            'result_kpi14' => 'float',
            'result_kpi15' => 'string',
            'score_kpi1' => 'integer',
            'score_kpi2' => 'integer',
            'score_kpi3' => 'integer',
            'score_kpi4' => 'integer',
            'score_kpi5' => 'integer',
            'score_kpi6' => 'integer',
            'score_kpi7' => 'integer',
            'score_kpi8' => 'integer',
            'score_kpi9' => 'integer',
            'score_kpi10' => 'integer',
            'score_kpi11' => 'integer',
            'score_kpi12' => 'integer',
            'score_kpi13' => 'integer',
            'score_kpi14' => 'integer',
            'score_kpi15' => 'integer',
            'total_score' => 'integer',
            'total_money' => 'integer',
        ];
    }
}
