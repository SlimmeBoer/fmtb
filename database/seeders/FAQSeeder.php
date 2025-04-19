<?php

namespace Database\Seeders;

use App\Models\FAQ;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FAQ::factory()->create(['id' => 1, 'order' => 1, 'question' => 'Vraag 1', 'answer' => 'Antwoord 1']);
        FAQ::factory()->create(['id' => 2, 'order' => 2, 'question' => 'Vraag 2', 'answer' => 'Antwoord 2']);
        FAQ::factory()->create(['id' => 3, 'order' => 3, 'question' => 'Vraag 3', 'answer' => 'Antwoord 3']);
    }
}
