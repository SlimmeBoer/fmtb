<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
