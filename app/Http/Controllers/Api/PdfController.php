<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function generatePdf()
    {
        // Example data for the PDF
        $data = [
            'title' => 'Sample PDF Report',
            'date' => now()->format('d-m-Y'),
            'tableData' => [
                ['name' => 'John Doe', 'email' => 'john@example.com', 'status' => 'Active'],
                ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'status' => 'Inactive'],
            ],
            'logo' => public_path('images/logo.png'), // Make sure the image exists
            'signature' => public_path('images/signature.png') // Path to a signature image
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.report', $data);

        // Option 1: Download the PDF
        return $pdf->download('report.pdf');

    }
}
