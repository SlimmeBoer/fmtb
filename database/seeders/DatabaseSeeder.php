<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory()->create([
             'first_name' => 'Niels',
             'last_name' => 'Colijn',
             'email' => 'nielscolijn@gmail.com',
             'password' => Hash::make('ncmedia')
         ]);


    }
}
