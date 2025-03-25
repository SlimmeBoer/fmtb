<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SystemLogResource;
use App\Models\SystemLog;

class SystemLogController extends Controller
{
    public function index()
    {
        // Get 'perPage' and 'page' from query parameters, default to 50 and page 1
        $perPage = request()->input('perPage', 50);
        $page = request()->input('page', 1);

        // Fetch the dump by ID and its associated records with pagination
        $logs = SystemLog::with('user:id,first_name,middle_name,last_name')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($logs);
    }
}
