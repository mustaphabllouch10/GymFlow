<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gymflow.com',
            "role" => "admin",
            'password' => bcrypt('admin'),
        ]);

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@gymflow.com',
            "role" => "user",
            'password' => bcrypt('user'),
        ]);
    }
}
