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
        KpiScore::factory()->create(['kpi' => '1', 'range' => '<=50', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '50-100', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '100-150', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '1', 'range' => '>150', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2a', 'range' => '<15', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '2a', 'range' => '15-18', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '2a', 'range' => '18-20', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '2a', 'range' => '>20', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2b', 'range' => '<6', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '2b', 'range' => '6-8', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '2b', 'range' => '8-10', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '2b', 'range' => '>10', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2c', 'range' => '<=150', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '2c', 'range' => '150-155', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '2c', 'range' => '155-160', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '2c', 'range' => '>160', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2d', 'range' => '<=150', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '2d', 'range' => '150-155', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '2d', 'range' => '155-160', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '2d', 'range' => '>160', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '2e', 'range' => '<=15', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '2e', 'range' => '15-17', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '2e', 'range' => '17-19', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '2e', 'range' => '>19', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '3', 'range' => '<=-5', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '3', 'range' => '-5-0', 'score' => '2']);;
        KpiScore::factory()->create(['kpi' => '3', 'range' => '0-5', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '3', 'range' => '>5', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '4', 'range' => '<=65', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '65-75', 'score' => '2']);;
        KpiScore::factory()->create(['kpi' => '4', 'range' => '75-85', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '4', 'range' => '>85', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '5', 'range' => '<=15000', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '5', 'range' => '15000-17000', 'score' => '2']);;
        KpiScore::factory()->create(['kpi' => '5', 'range' => '17000-19000', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '5', 'range' => '>19000', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '6a', 'range' => '<400', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '6a', 'range' => '<500', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '6a', 'range' => '<600', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '6a', 'range' => '600+', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '6b', 'range' => '>100%', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '6b', 'range' => '>80%', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '6b', 'range' => '>0%', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '6b', 'range' => '0%', 'score' => '0']);

        KpiScore::factory()->create(['kpi' => '6c', 'range' => '>1', 'score' => '5']);
        KpiScore::factory()->create(['kpi' => '6c', 'range' => '0-1', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '6c', 'range' => '<0', 'score' => '1']);

        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Onbekend', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Volvelds GBM', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Ingevulde MBP', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Ingevulde Milieumaatlat', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Pleksgewijs hele bedrijf', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'On the way to Planet Proof', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'BeterLeven keurmerk', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '7', 'range' => 'Geen middelen', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '8', 'range' => '<=2500', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => '2500-3000', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => '3000-3500', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '8', 'range' => '>3500', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '9', 'range' => '<=80', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '80-90', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '90-100', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '9', 'range' => '100', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '11', 'range' => '<=0.05', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '0.05-0.12', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '0.12-0.20', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '11', 'range' => '>0.20', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '12a', 'range' => '<=0.05', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '12a', 'range' => '0.05-0.12', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '12a', 'range' => '0.12-0.20', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '12a', 'range' => '>0.20', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '12b', 'range' => '<=0.05', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '12b', 'range' => '0.05-0.075', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '12b', 'range' => '0.075-0.10', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '12b', 'range' => '>0.10', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '13', 'range' => '<5j 2m', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '13', 'range' => '5j 2m - 6j', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '13', 'range' => '6j - 7j 2m', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '13', 'range' => '>7j 2m', 'score' => '5']);

        KpiScore::factory()->create(['kpi' => '14', 'range' => '<2 act.', 'score' => '0']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '2 act.', 'score' => '1']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '3 act.', 'score' => '2']);
        KpiScore::factory()->create(['kpi' => '14', 'range' => '>=4 act.', 'score' => '5']);
    }
}
