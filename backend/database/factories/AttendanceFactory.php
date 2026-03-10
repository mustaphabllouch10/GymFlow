<?php

namespace Database\Factories;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition()
    {
        return [
            'member_id' => 1,
            'check_in_date' => $this->faker->date(),
        ];
    }
}
