<?php

namespace App\Libraries\UMDL;

use App\Models\KlwValue;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UMDLKPIScores
{
    public function getScores($company_id) : array {

        $scores = UmdlKpiValues::where('company_id', $company_id)
            ->orderByDesc('year')
            ->limit(3);

        Log::info(print_r($scores, true));

        return $scores;
    }

}
