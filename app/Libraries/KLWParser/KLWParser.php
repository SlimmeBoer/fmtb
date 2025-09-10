<?php

namespace App\Libraries\KLWParser;

use App\Libraries\Monitor\CompanyPropertiesWriter;
use App\Libraries\Monitor\KPICollector;
use App\Models\KlwField;
use App\Models\KlwValue;
use App\Models\Signal;
use App\Models\KpiValues;
use Illuminate\Support\Facades\Log;
use Saloon\XmlWrangler\Exceptions\MissingNodeException;
use Saloon\XmlWrangler\Exceptions\MultipleNodesFoundException;
use Saloon\XmlWrangler\Exceptions\QueryAlreadyReadException;
use Saloon\XmlWrangler\Exceptions\XmlReaderException;
use Saloon\XmlWrangler\XmlReader;
use function VeeWee\Xml\Dom\Xpath\Locator\query;


class KLWParser
{
    public function checkValid($xml_file): bool
    {
        $reader = XmlReader::fromFile($xml_file);
        try {
            $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.veehouder')->sole();
            return true;
        }
        catch (MissingNodeException $e) {
            return false;
        }
    }


    public function getCompany($xml_file): array
    {
        $reader = XmlReader::fromFile($xml_file);

        /** @var TYPE_NAME $reader */
        return array(
            'name' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.veehouder')->sole(),
            'address' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.straat')->sole(),
            'postal_code' => str_replace(' ', '', $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.postcode')->sole()),
            'city' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.plaats')->sole(),
            'province' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.provincie')->sole(),
            'brs' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.brs_nummer')->sole(),
            'ubn' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.ubn_nummer')->sole(),
            'type' => $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.typebedr')->sole(),
            'bio' => ($reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.biobedrijf')->sole() == "Ja"),
        );
    }

    /**
     * @throws MissingNodeException
     * @throws MultipleNodesFoundException
     * @throws \Throwable
     * @throws QueryAlreadyReadException
     * @throws XmlReaderException
     */
    public function getYear($xml_file): string
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
    public function getKVK($xml_file): string
    {
        $reader = XmlReader::fromFile($xml_file);
        return $reader->value('KW_Output.PLAN.DUMPFILES_JAAR0.kvk_nummer')->sole();
    }

    /**
     * @throws \Throwable
     * @throws XmlReaderException
     */
    public function importFields($xml_file, $dump_id, $year, $company_id, $savefields): int
    {
        $totalParsed = 0;

        // Get all fields
        $reader = XmlReader::fromFile($xml_file);
        $all_elements = $reader->value('KW_Output.PLAN')->sole();

        $collector = new KPICollector();
        $company_properties = new CompanyPropertiesWriter();
        $klwValueData = array();

        $existing_fields = KlwField::all();

        foreach ($all_elements as $section_key => $section_values) {

            // Get KLW-values
            if ($section_key == "DUMPFILES_JAAR0") {
                foreach ($section_values as $subsection_key => $subsection_values) {
                    foreach ($subsection_values as $field_key => $field_value) {

                        if ($year === '2021') {
                            $field_key = str_replace('dzh_', 'dzhm_', $field_key);
                        }
                        $field_value = str_replace(',', '.', $field_value);

                        // Only execute this code if the full import is checked
                        if ($savefields === true) {
                            // Save Database performance, check if a key already exists (one query)
                            $field_exists = false;
                            $field_exists_id = 0;

                            foreach ($existing_fields as $existing_field) {
                                if ($existing_field->fieldname === $field_key) {
                                    $field_exists = true;
                                    $field_exists_id = $existing_field->id;
                                    break;
                                }
                            }
                            if (!$field_exists) {
                                $klwField = KlwField::firstOrNew(array(
                                    'fieldname' => $field_key,
                                    'section' => $section_key,
                                    'subsection' => $subsection_key,
                                ));
                                $klwField->save();
                                $field_exists_id = $klwField->id;
                            }

                            // Add to array. Insert later in one query.
                            $klwValueData[] = array(
                                'dump_id' => $dump_id,
                                'field_id' => $field_exists_id,
                                'value' => $field_value,
                            );
                        }
                        // Set vars of calculator
                        if (array_key_exists($field_key, $collector->vars)) {
                            $collector->vars[$field_key] = $field_value;
                        }
                        // Set vars of calculator.
                        if (array_key_exists($field_key, $company_properties->vars)) {
                            $company_properties->vars[$field_key] = $field_value;
                        }

                        ++$totalParsed;
                    }
                }
            }
        }
        // Insert all values at once
        if ($savefields === true) {
            KlwValue::insert($klwValueData);
        }

        // Calc KPI values
        $collector_record = $collector->saveKPIs($company_id, $year);
        $properties_record = $company_properties->saveProperties($company_id);
        return $totalParsed;
    }

    public function importSignals($xml_file, $dump_id, $year, $company_id): int
    {
        $totalParsed = 0;

        // Get signals
        $reader = XmlReader::fromFile($xml_file);
        $all_elements = $reader->value('KW_Output.PLAN.SIGNALERINGEN')->sole();
        $signalData = array();

        foreach ($all_elements as $signal_types) {
            foreach ($signal_types as $signal_type) {

                if (is_array($signal_type)) {
                    // Hotfix for missing item number
                    if (array_key_exists('itemnr', $signal_type)) {
                        $item_nr = $signal_type['itemnr'];
                    } else {
                        $item_nr = 0;
                    }

                    $signalData[] = array(
                        'dump_id' => $dump_id,
                        'item_nummer' => $item_nr,
                        'signaal_nummer' => $signal_type['sign_num'],
                        'signaal_code' => $signal_type['sign_cod'],
                        'categorie' => $signal_type['categorie'],
                        'onderwerp' => $signal_type['onderwerp'],
                        'soort' => $signal_type['soort'],
                        'kengetal' => $signal_type['kengetal'],
                        'waarde' => $signal_type['waarde'],
                        'kenmerk' => $signal_type['kenmerk'],
                        'actie' => $signal_type['actie'],
                    );

                    ++$totalParsed;
                }
            }
        }
        Signal::insert($signalData);
        return $totalParsed;
    }
}
