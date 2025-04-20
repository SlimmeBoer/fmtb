<?php

namespace App\Libraries\ResultParser;

use App\Models\Company;
use App\Models\OldResult;
use App\Models\UmdlCompanyProperties;
use App\Models\UmdlKpiValues;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Saloon\XmlWrangler\Exceptions\MissingNodeException;
use Saloon\XmlWrangler\Exceptions\MultipleNodesFoundException;
use Saloon\XmlWrangler\Exceptions\QueryAlreadyReadException;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;
use Saloon\XmlWrangler\XmlReader;


class ResultParser
{
    /**
     * @throws MissingNodeException
     * @throws MultipleNodesFoundException
     * @throws \Throwable
     * @throws QueryAlreadyReadException
     * @throws XmlReaderException
     */
    public function getUBN($excel_file) : string
    {
        $reader = new Xlsx();
        $spreadsheet = $reader->load($excel_file);
        $worksheet = $spreadsheet->getSheetByName('UMDL invulblad');

        return $worksheet->getCell('E10')->getValue();
    }

    /**
     * @param $excel_file
     * @return bool
     */
    public function checkSheetExists($excel_file, $sheetname): bool
    {
        $reader = new Xlsx();
        $spreadsheet = $reader->load($excel_file);

        if ($spreadsheet->getSheetByName($sheetname) !== null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param $excel_file
     * @param $filename
     * @return OldResult
     */
    public function getResults($excel_file, $filename) : OldResult
    {
        $totalWritten = 0;

        // Get all fields
        $reader = new Xlsx();
        $spreadsheet = $reader->load($excel_file);
        $infosheet = $spreadsheet->getSheetByName('UMDL invulblad');
        $ubn = $infosheet->getCell('E10')->getValue();
        $worksheet = $spreadsheet->getSheetByName('Eindresultaat');
        $year = $worksheet->getCell('F15')->getValue();

        $oldresult = OldResult::firstOrNew(array(
            'ubn' => $ubn,
            'final_year' => $year,
        ));

        // Set all properties
        $oldresult->filename = $filename;
        $oldresult->result_kpi1a = $worksheet->getCell('G16')->getCalculatedValue();
        $oldresult->result_kpi1b = $worksheet->getCell('G17')->getCalculatedValue();
        $oldresult->result_kpi2 = $worksheet->getCell('G18')->getCalculatedValue();
        $oldresult->result_kpi3 = $worksheet->getCell('G19')->getCalculatedValue();
        $oldresult->result_kpi4 = $worksheet->getCell('G20')->getCalculatedValue();
        $oldresult->result_kpi5 = $worksheet->getCell('G21')->getCalculatedValue();
        $oldresult->result_kpi6a = $worksheet->getCell('G22')->getCalculatedValue();
        $oldresult->result_kpi6b = $worksheet->getCell('G23')->getCalculatedValue();
        $oldresult->result_kpi6c = $worksheet->getCell('G24')->getCalculatedValue();
        $oldresult->result_kpi6d = $worksheet->getCell('G25')->getCalculatedValue();
        $oldresult->result_kpi7 = $worksheet->getCell('G26')->getCalculatedValue();
        $oldresult->result_kpi8 = $worksheet->getCell('D27')->getCalculatedValue();
        $oldresult->result_kpi9 = $worksheet->getCell('G28')->getCalculatedValue();
        $oldresult->result_kpi10 = $worksheet->getCell('D29')->getCalculatedValue();
        $oldresult->result_kpi11 = $worksheet->getCell('D30')->getCalculatedValue();
        $oldresult->result_kpi12 = $worksheet->getCell('D31')->getCalculatedValue();
        $oldresult->result_kpi13a = $worksheet->getCell('G32')->getCalculatedValue();
        $oldresult->result_kpi13b = $worksheet->getCell('G33')->getCalculatedValue();
        $oldresult->result_kpi14 = $worksheet->getCell('G34')->getCalculatedValue();
        $oldresult->result_kpi15 = $worksheet->getCell('D35')->getCalculatedValue();

        $oldresult->score_kpi1 = $worksheet->getCell('I16')->getCalculatedValue();
        $oldresult->score_kpi2 = $worksheet->getCell('I18')->getCalculatedValue();
        $oldresult->score_kpi3 = $worksheet->getCell('I19')->getCalculatedValue();
        $oldresult->score_kpi4 = $worksheet->getCell('I20')->getCalculatedValue();
        $oldresult->score_kpi5 = $worksheet->getCell('I21')->getCalculatedValue();
        $oldresult->score_kpi6 = $worksheet->getCell('I22')->getCalculatedValue();
        $oldresult->score_kpi7 = $worksheet->getCell('I26')->getCalculatedValue();
        $oldresult->score_kpi8 = $worksheet->getCell('I27')->getCalculatedValue();
        $oldresult->score_kpi9 = $worksheet->getCell('I28')->getCalculatedValue();
        $oldresult->score_kpi10 = $worksheet->getCell('I29')->getCalculatedValue();
        $oldresult->score_kpi11 = $worksheet->getCell('I30')->getCalculatedValue();
        $oldresult->score_kpi12 = $worksheet->getCell('I31')->getCalculatedValue();
        $oldresult->score_kpi13 = $worksheet->getCell('I32')->getCalculatedValue();
        $oldresult->score_kpi14 = $worksheet->getCell('I34')->getCalculatedValue();
        $oldresult->score_kpi15 = $worksheet->getCell('I35')->getCalculatedValue();

        $oldresult->total_score = $worksheet->getCell('I36')->getCalculatedValue();
        $oldresult->total_money = $worksheet->getCell('I37')->getCalculatedValue();

        $oldresult->save();

        return $oldresult;
    }
}
