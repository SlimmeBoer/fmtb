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
             'first_name' => 'Test User',
             'last_name' => 'Test User',
             'email' => 'niels.colijn@precondition.nl',
             'password' => Hash::make('ncmedia')
         ]);


    }
}
