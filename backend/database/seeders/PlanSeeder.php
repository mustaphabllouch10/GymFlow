<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'monthly',
                'price' => 50.00,
                'duration_in_days' => 30,
                'description' => 'Access to gym facilities for one month.'
            ],
            [
                'name' => 'quarterly',
                'price' => 135.00,
                'duration_in_days' => 90,
                'description' => 'Access to gym facilities for three months.',
            ],
            [
                'name' => 'yearly',
                'price' => 480.00,
                'duration_in_days' => 365,
                'description' => 'Access to gym facilities for one year.'
            ],
        ];

        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
