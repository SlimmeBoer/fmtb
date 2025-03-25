<?php

namespace Database\Seeders;

use App\Models\UmdlCollective;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UmdlCollectiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UmdlCollective::factory()->create(['id' => 1, 'name' => 'Rijn, Vecht en Venen', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 2, 'name' => 'Lopikerwaard', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 3, 'name' => 'Utrecht-Oost', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 4, 'name' => 'Eemland', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 5, 'name' => 'Alblasserwaard-Vijfheerenlanden', 'description' => '']);

    }
}
