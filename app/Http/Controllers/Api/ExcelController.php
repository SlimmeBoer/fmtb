<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Libraries\Excel\Excel_Export;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExcelController extends Controller
{

    public function download()
    {
        @set_time_limit(0);

        $r = app(\App\Libraries\Excel\Excel_Export::class)->run(static fn() => null);

        $disk     = $r['disk']     ?? 'public';
        $relPath  = $r['path']     ?? null;                       // e.g. exports/export_20250827_143412.xlsx
        $filename = $r['filename'] ?? 'export.xlsx';

        abort_unless($relPath && Storage::disk($disk)->exists($relPath), 404, 'Exportbestand niet gevonden');

        $size   = Storage::disk($disk)->size($relPath);
        $stream = Storage::disk($disk)->readStream($relPath);

        // Als er nog output-buffers open staan: sluiten
        while (ob_get_level() > 0) { @ob_end_clean(); }

        return response()->streamDownload(function () use ($stream) {
            fpassthru($stream);
            if (is_resource($stream)) { @fclose($stream); }
        }, $filename, [
            'Content-Type'        => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Length'      => (string) $size,
            'Content-Disposition' => 'attachment; filename="'.$filename.'"; filename*=UTF-8\'\''.rawurlencode($filename),
            // extra exposed fallback
            'X-Filename'          => $filename,
        ]);
    }
}
