<?php

namespace Database\Seeders;

use App\Models\CollectivePostalcode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollectivePostalcodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        CollectivePostalcode::factory()->create(['collective_id' => 1, 'postal_code' => '1391AA']);
    }
}
