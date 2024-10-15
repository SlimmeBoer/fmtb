<?php

namespace App\Libraries\KLWParser;

use App\Libraries\UMDL\UMDLCompanyPropertiesWriter;
use App\Libraries\UMDL\UMDLKPICollector;
use App\Models\KlwField;
use App\Models\KlwValue;
use App\Models\UmdlKpiValues;
use Illuminate\Support\Facades\Log;
use Saloon\XmlWrangler\Exceptions\MissingNodeException;
use Saloon\XmlWrangler\Exceptions\MultipleNodesFoundException;
use Saloon\XmlWrangler\Exceptions\QueryAlreadyReadException;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;
use Saloon\XmlWrangler\XmlReader;


class KLWParser
{
    public function getCompany($xml_file) : array
    {
        $reader = XmlReader::fromFile($xml_file);

        /** @var TYPE_NAME $reader */
        return array(
            'name'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.veehouder')->sole(),
            'address'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.straat')->sole(),
            'postal_code'=> str_replace(' ', '', $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.postcode')->sole()),
            'city'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.plaats')->sole(),
            'province'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.provincie')->sole(),
            'brs'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.brs_nummer')->sole(),
            'ubn'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.ubn_nummer')->sole(),
            'type'=> $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.typebedr')->sole(),
            'bio'=> ($reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.biobedrijf')->sole() == "Ja"),
        );
    }

    /**
     * @throws MissingNodeException
     * @throws MultipleNodesFoundException
     * @throws \Throwable
     * @throws QueryAlreadyReadException
     * @throws XmlReaderException
     */
    public function getYear($xml_file) : string
    {
        $reader = XmlReader::fromFile($xml_file);
        return $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.jaartal')->sole();
    }

    /**
     * @throws MissingNodeException
     * @throws MultipleNodesFoundException
     * @throws \Throwable
     * @throws QueryAlreadyReadException
     * @throws XmlReaderException
     */
    public function getKVK($xml_file) : string
    {
        $reader = XmlReader::fromFile($xml_file);
        return $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.kvk_nummer')->sole();
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function importFields($xml_file, $dump_id, $year, $company_id) : int
    {
        $totalParsed = 0;

        // Get all fields
        $reader = XmlReader::fromFile($xml_file);
        $all_elements = $reader->value('KW_Output.PLAN')->sole();

        $collector = new UMDLKPICollector();
        $company_properties = new UMDLCompanyPropertiesWriter();

        foreach ($all_elements as $section_key => $section_values) {

            IF ($section_key == "DUMPFILES_JAAR0") {
                foreach ($section_values as $subsection_key => $subsection_values) {
                    foreach ($subsection_values as $field_key => $field_value) {

                        $field_key = str_replace('dzh_','dzhm_',$field_key);
                        $field_value = str_replace(',','.',$field_value);

                        /*
                        $klwField = KlwField::firstOrNew(array(
                            'workspace_id' => 1,
                            'fieldname' => $field_key,
                            'section' => $section_key,
                            'subsection' => $subsection_key,
                        ));
                        $klwField->save();

                        $klwValue = KlwValue::firstOrNew(array(
                            'dump_id' => $dump_id,
                            'field_id' => $klwField->id,
                        ));
                        $klwValue->value = $field_value;
                        $klwValue->save();
                        */

                        // Set vars of UMDL calculator
                        if (array_key_exists($field_key, $collector->vars))
                        {
                            $collector->vars[$field_key] = $field_value;
                        }
                        // Set vars of UMDL calculator
                        if (array_key_exists($field_key, $company_properties->vars))
                        {
                            $company_properties->vars[$field_key] = $field_value;
                        }

                        ++$totalParsed;
                    }
                }
            }
        }

        // Calc KPI values
        $collector_record = $collector->saveKPIs($company_id, $year);
        $properties_record = $company_properties->saveProperties($company_id);

        return $totalParsed;
    }
}
