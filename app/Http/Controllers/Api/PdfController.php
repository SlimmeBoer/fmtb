<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Libraries\Monitor\CompanyPropertiesWriter;
use App\Libraries\Monitor\KPIScores;
use App\Models\Company;
use App\Models\CompanyProperties;
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
        $company_properties = CompanyProperties::where('company_id',$company)->first();

        $scores = new KPIScores();
        $scores = array_merge($scores->getScores($company),
            $scores->collectiveAverages($company),
            $scores->totalAverages());

        // Example data for the PDF
        $data = [
            'title' => 'Paspoort FMTB',
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
                'provincie' => public_path('images/logo_provincie_utrecht.png'),
                ],
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.report', $data)->setPaper('a4', 'landscape')
            ->set_option('margin_top', 0)
            ->set_option('margin_right', 0)
            ->set_option('margin_bottom', 0)
            ->set_option('margin_left', 0);

        // Option 1: Download the PDF
        return $pdf->download('Paspoort FMTB 2025.pdf');

    }

    /**
     * Gets a PDF for the company of the currently logged in user.
     * @return mixed
     */
    public function generatePdfCurrentCompany()
    {
        $company_data = Company::where('brs',Auth::user()->brs)->first();
        $company_properties = CompanyProperties::where('company_id',$company_data->id)->first();

        $scores = new KPIScores();
        $scores = array_merge($scores->getScores($company_data->id),
            $scores->collectiveAverages($company_data->id),
            $scores->totalAverages());

        // Example data for the PDF
        $data = [
            'title' => 'Paspoort FMTB',
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
                'provincie' => public_path('images/logo_provincie_utrecht.png'),
            ],
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.report', $data)->setPaper('a4', 'landscape')
            ->set_option('margin_top', 0)
            ->set_option('margin_right', 0)
            ->set_option('margin_bottom', 0)
            ->set_option('margin_left', 0);

        // Option 1: Download the PDF
        return $pdf->download('Paspoort FMTB 2025.pdf');

    }

/**
* Gets a concept-PDF for the company of the currently logged in user.
 * This is not the final version of the report.
* @return mixed
*/
    public function generatePdfCurrentCompanyConcept()
    {
        $company_data = Company::where('brs',Auth::user()->brs)->first();
        $company_properties = CompanyProperties::where('company_id',$company_data->id)->first();

        $scores = new KPIScores();
        $scores = array_merge($scores->getScores($company_data->id),
            $scores->collectiveAverages($company_data->id),
            $scores->totalAverages());

        // Example data for the PDF
        $data = [
            'title' => 'Conceptpaspoort FMTB',
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
                'provincie' => public_path('images/logo_provincie_utrecht.png'),
                'watermark' => public_path('images/watermark_concept.png'),
            ],
        ];

        // Load a Blade view and pass the data
        $pdf = Pdf::loadView('pdf.concept-report', $data)->setPaper('a4', 'landscape')
            ->set_option('margin_top', 0)
            ->set_option('margin_right', 0)
            ->set_option('margin_bottom', 0)
            ->set_option('margin_left', 0);

        // Option 1: Download the PDF
        return $pdf->download('Conceptpaspoort FMTB 2025.pdf');

    }

}
