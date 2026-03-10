<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    protected $model = Expense::class;

    public function definition()
    {
        return [
            'type' => $this->faker->randomElement(['Equipment Maintenance', 'Utility Bills', 'Rent']),
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'expense_date' => $this->faker->date(),
        ];
    }
}
