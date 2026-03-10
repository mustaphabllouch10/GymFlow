<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        return [
            'member_id' => 1,
            'subscription_id' => 1,
            'amount' => $this->faker->randomFloat(2, 20, 200),
            'payment_date' => $this->faker->date(),
            'method' => $this->faker->randomElement(['cash', 'card', 'online']),
        ];
    }
}
