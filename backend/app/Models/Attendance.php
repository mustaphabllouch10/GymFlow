<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    protected $fillable = [
        'member_id',
        'check_in_date',
    ];
    use HasFactory;
    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
