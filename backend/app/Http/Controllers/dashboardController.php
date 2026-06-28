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


public function Plans(){

    $plans = Subscription::select('type')
    ->groupBy('type')
    ->selectRaw('COUNT(*) as count')
    ->get();

    return response()->json($plans);

}

public function checkinSummary(){

    $recentattendance = Attendance::latest('created_at')
    ->take(5)
    ->get();

    return response()->json($recentattendance);
}

public function subscriptionSummary()
{
    
    $subExpiringSoon = Subscription::whereBetween('end_date', [now()->toDateString(), now()->addDays(7)->toDateString()])
        ->get();

    return response()->json($subExpiringSoon);

}

public function chart()
{
    $start = now()->startOfMonth();
    $end   = now()->endOfDay();

    $rows = Attendance::selectRaw('DATE(check_in_time) as date, COUNT(*) as count')
        ->whereBetween('check_in_time', [$start, $end])
        ->groupBy('date')
        ->orderBy('date')
        ->get()
        ->keyBy('date');

    // fill every day so missing days show as 0
    $result = [];
    for ($d = $start->copy(); $d->lte($end); $d->addDay()) {
        $key = $d->toDateString();
        $result[] = [
            'date'  => $d->format('M j'),
            'count' => $rows[$key]->count ?? 0,
        ];
    }

    return response()->json($result);
}

}
