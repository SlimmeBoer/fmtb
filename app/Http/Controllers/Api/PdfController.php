<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Libraries\UMDL\UMDLCompanyPropertiesWriter;
use App\Libraries\UMDL\UMDLKPIScores;
use App\Models\Company;
use App\Models\UmdlCompanyProperties;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PdfController extends Controller
{
    /**
     * Gets a PDF for the company with the provied ID.
     * @param $company
     * @return mixed
     */
    public function generatePdf($company)
    {
        $company_data = Company::find($company);
        $company_properties = UmdlCompanyProperties::where('company_id',$company)->first();

        $umdlscores = new UMDLKPIScores();
        $scores = array_merge($umdlscores->getScores($company),
            $umdlscores->collectiveAverages($company),
            $umdlscores->totalAverages());

        // Example data for the PDF
        $data = [
            'title' => 'Eindrapport UMDL',
            'company_data' => $company_data,
            'company_properties' => $company_properties,
            'scores' => $scores,
            'date' => now()->format('d-m-Y'),
            'logos' => [
                'umbb' => public_path('images/logo_umbb.png'),
                'alblasserwaard' => public_path('images/logo_alblasserwaard.png'),
                'eemland' => public_path('images/logo_eemland.png'),
                'lopikerwaard' => public_path('images/logo_lopikerwaard.png'),
                'rvv' => public_path('images/logo_rijn_vecht_venen.png'),
                'utrecht_oost' => public_path('images/logo_utrecht_oost.png'),
                ],
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.report', $data)->setPaper('a4', 'landscape')
            ->set_option('margin_top', 0)
            ->set_option('margin_right', 0)
            ->set_option('margin_bottom', 0)
            ->set_option('margin_left', 0);

        // Option 1: Download the PDF
        return $pdf->download('Certificaat UMDL 2025.pdf');

    }

    /**
     * Gets a PDF for the company of the currently logged in user.
     * @return mixed
     */
    public function generatePdfCurrentCompany()
    {
        $company_data = Company::where('ubn',Auth::user()->ubn)->first();
        $company_properties = UmdlCompanyProperties::where('company_id',$company_data->id)->first();

        $umdlscores = new UMDLKPIScores();
        $scores = array_merge($umdlscores->getScores($company_data->id),
            $umdlscores->collectiveAverages($company_data->id),
            $umdlscores->totalAverages());

        // Example data for the PDF
        $data = [
            'title' => 'Eindrapport UMDL',
            'company_data' => $company_data,
            'company_properties' => $company_properties,
            'scores' => $scores,
            'date' => now()->format('d-m-Y'),
            'logos' => [
                'umbb' => public_path('images/logo_umbb.png'),
                'alblasserwaard' => public_path('images/logo_alblasserwaard.png'),
                'eemland' => public_path('images/logo_eemland.png'),
                'lopikerwaard' => public_path('images/logo_lopikerwaard.png'),
                'rvv' => public_path('images/logo_rijn_vecht_venen.png'),
                'utrecht_oost' => public_path('images/logo_utrecht_oost.png'),
            ],
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.report', $data)->setPaper('a4', 'landscape')
            ->set_option('margin_top', 0)
            ->set_option('margin_right', 0)
            ->set_option('margin_bottom', 0)
            ->set_option('margin_left', 0);

        // Option 1: Download the PDF
        return $pdf->download('Certificaat UMDL 2025.pdf');

    }

}
