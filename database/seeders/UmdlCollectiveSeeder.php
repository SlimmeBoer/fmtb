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
        UmdlCollective::factory()->create(['id' => 1, 'workspace_id' => 1, 'name' => 'Eemvallei', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 2, 'workspace_id' => 1, 'name' => 'Kromme Rijnstreek', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 3, 'workspace_id' => 1, 'name' => 'Oostelijke Vechtplassen', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 4, 'workspace_id' => 1, 'name' => 'Utrechtse Heuvelrug', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 5, 'workspace_id' => 1, 'name' => 'Utrechtse Venen', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 6, 'workspace_id' => 1, 'name' => 'Utrechtse Waarden', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 7, 'workspace_id' => 1, 'name' => 'Vallei Utrecht', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 8, 'workspace_id' => 1, 'name' => 'Veenweiden de Meije', 'description' => '']);
        UmdlCollective::factory()->create(['id' => 9, 'workspace_id' => 1, 'name' => 'Vijfheerenlanden', 'description' => '']);
    }
}
