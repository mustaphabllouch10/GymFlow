<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'photo',
        'joined_date',
    ];
    use HasFactory;



    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
