<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::factory()->create(['id' => 1, 'name' => 'Noordelijke Wouden',
            'description' => '',
            'weight_kpi1' => 15, 'weight_kpi2a' => 15, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 2, 'name' => 'Zuidelijke Wouden',
            'description' => '',
            'weight_kpi1' => 20, 'weight_kpi2a' => 25, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 10, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 3, 'name' => 'Oostergo/Noordelijke Kleischil',
            'description' => '',
            'weight_kpi1' => 20, 'weight_kpi2a' => 10, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 15, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 4, 'name' => 'Westergo/Greidhoeke',
            'description' => '',
            'weight_kpi1' => 10, 'weight_kpi2a' => 10, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 9,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 5, 'name' => 'Veenweidegebied',
            'description' => '',
            'weight_kpi1' => 10, 'weight_kpi2a' => 10, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 15,
            'weight_kpi11' => 15, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 6, 'name' => 'Gaasterland',
            'description' => '',
            'weight_kpi1' => 15, 'weight_kpi2a' => 15, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);

        Area::factory()->create(['id' => 7, 'name' => 'Waddengebied',
            'description' => '',
            'weight_kpi1' => 10, 'weight_kpi2a' => 10, 'weight_kpi2b' => 5, 'weight_kpi2c' => 5, 'weight_kpi2d' => 10, 'weight_kpi3' => 5,
            'weight_kpi4' => 5, 'weight_kpi5' => 5, 'weight_kpi6' => 2, 'weight_kpi7' => 5, 'weight_kpi8' => 5, 'weight_kpi9' => 5,
            'weight_kpi11' => 10, 'weight_kpi12a' => 20, 'weight_kpi12b' => 20, 'weight_kpi13' => 5, 'weight_kpi14' => 4]);
    }
}
