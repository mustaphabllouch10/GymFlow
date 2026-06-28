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
    

public function summary(){

    // members : 
    $membersCount = Member::where('status', 'active')->count();

    // subscriptions :
    $aboutToExpireSubscriptionsCount = Subscription::whereBetween('end_date', [now()->toDateString(), now()->addDays(7)->toDateString()])->count();

    
    // Attendance :
    $todayAttendanceCount = Attendance::whereDate('created_at', now()->toDateString())->count();
    $activeAttendanceCount = Attendance::where('status', 'present')->count();




    return response()->json([
        'activeMembersCount' => $membersCount,
        'aboutToExpireSubscriptionsCount' => $aboutToExpireSubscriptionsCount,
        'todayAttendanceCount' => $todayAttendanceCount,
        'activeAttendanceCount' => $activeAttendanceCount
    ]);


}
}

