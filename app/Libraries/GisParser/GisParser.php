<?php

namespace App\Libraries\GisParser;

use App\Models\Company;
use App\Models\GisRecord;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Reader\Xls;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Saloon\XmlWrangler\Exceptions\MissingNodeException;
use Saloon\XmlWrangler\Exceptions\MultipleNodesFoundException;
use Saloon\XmlWrangler\Exceptions\QueryAlreadyReadException;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;


class GisParser
{

    private function getReader($filename)
    {
        if (pathinfo($filename, PATHINFO_EXTENSION) === "xls")
        {
            return new Xls();
        }
        else
        {
            return new Xlsx();
        }
    }


    /**
     * @param $excel_file
     * @return bool
     */
    public function checkCorrectSheet($excel_file): bool
    {
        $reader = $this->getReader($excel_file);
        $spreadsheet = $reader->load($excel_file);

        if ($spreadsheet->getSheetByName('Beheereenheden collectief') !== null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $excel_file
     * @return bool
     */
    public function checkCorrectHeaders($excel_file): bool
    {
        $reader = $this->getReader($excel_file);
        $spreadsheet = $reader->load($excel_file);
        $worksheet = $spreadsheet->getSheetByName('Beheereenheden collectief');

        if ($worksheet->getCell('F1')->getValue() === "Beheerpakket Code") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function writeGisRecords($excel_file, $dump_id): int
    {
        $totalWritten = 0;

        // Get all fields
        $reader = $this->getReader($excel_file);
        $spreadsheet = $reader->load($excel_file);
        $worksheet = $spreadsheet->getSheetByName('Beheereenheden collectief');
        $highestRow = $worksheet->getHighestDataRow();
        $gisRecords = array();

        for ($row = 2; $row <= $highestRow; ++$row) {

            $gisRecords[] = array(
                'dump_id' => $dump_id,
                'kvk' => $worksheet->getCell([23, $row])->getValue() ?? 0,
                'eenheid_code' => $worksheet->getCell([6, $row])->getValue() ?? 0,
                'oppervlakte' => $worksheet->getCell([9, $row])->getValue() ?? 0,
                'lengte' => $worksheet->getCell([10, $row])->getCalculatedValue() ?? 0,
                'breedte' => $worksheet->getCell([11, $row])->getValue() ?? 0,
                'eenheden' => $worksheet->getCell([12, $row])->getValue() ?? 0,
            );
            $totalWritten++;
        }
        // Delete all existing records of the dump, mass insert new ones
        GisRecord::where('dump_id',$dump_id)->delete();

        foreach (array_chunk($gisRecords,500) as $t)
        {
            GisRecord::insert($t);
        }

        return $totalWritten;
    }
}
