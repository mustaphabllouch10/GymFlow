<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Attendance;

class CheckinController extends Controller
{
    public function checkin(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
        ]);

        $memberId = $request->input("member_id");

        $member = Member::where('id', $memberId)
        ->where('status', 'active')
        ->first(); 
        if (!$member) {
            return response()->json(['message' => 'Member not found or inactive'], 404);
        }

        $attendance = Attendance::create([
            'member_id' => $memberId,
            'check_in_date' => now()->toDateTimeString(), 
            "check_in_time" => now()->toTimeString(),
            "check_out_date" => null, 
            'status' => 'present',
        ]);

        return response()->json(['message' => 'Check-in successful', 'attendance' => $attendance], 201);


    }


    public function checkout(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
        ]);

        $memberId = $request->input("member_id");

        $attendance = Attendance::where('member_id', $memberId)
        ->whereNull('check_out_time')
        ->first();

        if (!$attendance) {
            return response()->json(['message' => 'No active check-in found for this member'], 404);
        }

        $attendance->update([
            'check_out_time' => now()->toTimeString(),
            'status' => 'absent',
        ]);

        return response()->json(['message' => 'Check-out successful', 'attendance' => $attendance], 200);
    }
}


