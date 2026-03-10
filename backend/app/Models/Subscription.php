<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subscription extends Model
{
    protected $fillable = [
        'member_id',
        'start_date',
        'end_date',
        'type',
        'price',
    ];
    use HasFactory;
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
