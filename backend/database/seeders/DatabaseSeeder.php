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

        User::updateOrCreate(
            ['email' => 'admin@gymflow.com'],
            [
                'name' => 'admin',
                'role' => 'admin',
                'password' => bcrypt('admin'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@gymflow.com'],
            [
                'name' => 'user',
                'role' => 'user',
                'password' => bcrypt('user'),
            ]
        );

        $this->call([
            MemberTableSeeder::class,
            SubscriptionTableSeeder::class,
            PaymentTableSeeder::class,
            AttendanceTableSeeder::class,
            ExpenseTableSeeder::class,
            PlanSeeder::class,
        ]);
    }
}
