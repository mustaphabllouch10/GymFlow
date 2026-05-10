<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    protected $fillable = [
        'member_id',
        'check_in_date',
        'check_in_time',
        'check_out_time',
        'status',
    ];
    use HasFactory;
    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
