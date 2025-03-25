<?php

namespace Database\Seeders;

use App\Models\KpiScore;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KpiScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KpiScore::factory()->create(['kpi' => '1', 'range' => '<=40', 'score' => '200']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '40-80', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '80-120', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '120-160', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '>160', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2', 'range' => '<=0', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '2', 'range' => '0-5', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '2', 'range' => '5-10', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '2', 'range' => '>10', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '3', 'range' => '<=40', 'score' => '300']);
        KpiScore::factory()->create(['kpi' => '3', 'range' => '40-50', 'score' => '150']);;
        KpiScore::factory()->create(['kpi' => '3', 'range' => '50-60', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '3', 'range' => '>60', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '4', 'range' => '<=720', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '720-1440', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '1440-2160', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '2160-2880', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '>2880', 'score' => '200']);

        KpiScore::factory()->create(['kpi' => '5', 'range' => '<=17', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '5', 'range' => '17-19', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '5', 'range' => '19-21', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '5', 'range' => '>21', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '6', 'range' => '<=10000', 'score' => '200']);
        KpiScore::factory()->create(['kpi' => '6', 'range' => '10000-15000', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '6', 'range' => '15000-20000', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '6', 'range' => '20000-25000', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '6', 'range' => '>25000', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '7', 'range' => '<=55', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => '55-65', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => '65-75', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => '75-85', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => '>85', 'score' => '200']);

        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Onbekend', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Volvelds GBM', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Ingevulde MBP', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Ingevulde Milieumaatlat', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Pg grasland,vv maisland', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Pg hele bedrijf', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Planet Proof / AH', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'BeterLeven keurmerk', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Biologisch', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => 'Geen middelen', 'score' => '150']);

        KpiScore::factory()->create(['kpi' => '9', 'range' => '<=70', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '70-80', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '80-90', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '90-100', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '>100', 'score' => '200']);

        KpiScore::factory()->create(['kpi' => '10', 'range' => '<=0.05', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '10', 'range' => '0.05-0.10', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '10', 'range' => '0.10-0.15', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '10', 'range' => '0.15-0.20', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '10', 'range' => '>0.20', 'score' => '200']);

        KpiScore::factory()->create(['kpi' => '11', 'range' => '<=0.05', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '0.05-0.10', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '0.10-0.15', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '>0.15', 'score' => '150']);

        KpiScore::factory()->create(['kpi' => '12', 'range' => '<=0.025', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '12', 'range' => '0.025-0.05', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '12', 'range' => '0.05-0.08', 'score' => '200']);
        KpiScore::factory()->create(['kpi' => '12', 'range' => '0.08-0.10', 'score' => '250']);
        KpiScore::factory()->create(['kpi' => '12', 'range' => '>0.10', 'score' => '300']);

        KpiScore::factory()->create(['kpi' => '13a', 'range' => '<=0.6', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '13a', 'range' => '0.6-0.8', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '13a', 'range' => '0.8-1', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '13a', 'range' => '>1', 'score' => '150']);

        KpiScore::factory()->create(['kpi' => '13b', 'range' => '<=400', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '13b', 'range' => '400-500', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '13b', 'range' => '500-600', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '13b', 'range' => '>600', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '14', 'range' => '<62', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '62-72', 'score' => '50']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '72-86', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '>86', 'score' => '150']);

        KpiScore::factory()->create(['kpi' => '15', 'range' => '<2 act.', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '15', 'range' => '2 act.', 'score' => '100']);
        KpiScore::factory()->create(['kpi' => '15', 'range' => '3 act.', 'score' => '150']);
        KpiScore::factory()->create(['kpi' => '15', 'range' => '>=4 act.', 'score' => '200']);
    }
}
