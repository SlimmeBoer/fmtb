<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KpiScore;

class KpiScoreController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $groupedScores = KpiScore::all()
            ->groupBy('kpi')
            ->map(function ($scores) {
                return [
                    'kpi' => $scores->first()->kpi,
                    'data' => $scores->map(fn($score) => [
                        'range' => $score->range,
                        'score' => $score->score,
                    ])->values(),
                ];
            })
            ->values();

        return response()->json($groupedScores);
    }
}
