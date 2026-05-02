<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\User;
use App\Models\Expense;
use App\Models\Subscription;
use App\Models\Attendance;


class dashboardController extends Controller
{
    

public function index(){

    // members : 
    $membersCount = Member::count();
    // subscriptions :
    $subscriptionsCount = Subscription::count();
    $expiredSubscriptionsCount = Subscription::where('status', 'expired')->count();

    // expenses :
    $expensesCount = Expense::count();
    $thisMonthExpenses = Expense::whereMonth('created_at', now()->month)->whereYear('created_at', now()->year)->sum('amount');

    
    // Attendance :
    $todayAttendanceCount = Attendance::whereDate('created_at', now()->toDateString())->count();
    $activeAttendanceCount = Attendance::where('updated_at', '!=', null)->count();



    return response()->json([
        'membersCount' => $membersCount,
        'subscriptionsCount' => $subscriptionsCount,
        'expiredSubscriptionsCount' => $expiredSubscriptionsCount,
        'expensesCount' => $expensesCount,
        'thisMonthExpenses' => $thisMonthExpenses,
        'todayAttendanceCount' => $todayAttendanceCount,
        'activeAttendanceCount' => $activeAttendanceCount
    ]);


}
}

