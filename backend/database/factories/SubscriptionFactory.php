<?php

namespace Database\Factories;

use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition()
    {
        return [
            'member_id' => 1,
            'type' => $this->faker->randomElement(['monthly', 'quarterly', 'yearly']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'price' => $this->faker->randomFloat(2, 20, 200),
        ];
    }
}
