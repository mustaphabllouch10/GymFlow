<?php

namespace Database\Factories;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Member;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition()
    {
        $checkOut = $this->faker->optional()->time();

        return [
            'member_id' => Member::inRandomOrder()->first()->id,
            'check_in_date' => $this->faker->date(),
            'check_in_time' => $this->faker->time(),
            'check_out_time' => $checkOut,
            'status' => $checkOut ? 'absent' : 'present',
        ];
    }
}
