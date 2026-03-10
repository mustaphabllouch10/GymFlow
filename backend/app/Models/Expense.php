<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    protected $fillable = [
        'type',
        'amount',
        'expense_date'
    ];
    use HasFactory;

}
