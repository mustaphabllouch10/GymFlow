<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'member_id',
        'check_in_date',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
