<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance ; 

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Attendance::query();

        // Filter by member name
        if (request()->filled('member')) {
            $member = request('member');
            $query->whereHas('member', function ($q) use ($member) {
                $q->where('name', 'like', "%$member%");
            });
        }

        // Filter by date range
        if (request()->filled('date_from')) {
            $query->whereDate('check_in_date', '>=', request('date_from'));
        }
        if (request()->filled('date_to')) {
            $query->whereDate('check_in_date', '<=', request('date_to'));
        }

        // Filter by status
        if (request()->filled('status')) {
            $query->where('status', request('status'));
        }

        $attendance = $query->with('member')->paginate(10);
        return response()->json($attendance);
    }

    /**
     * Store a newly created resource in storage.
     */

    // thats the tricky part of the attendance , we need to store the attendance ussing a qr code
    // the member should checkin and checkout 
    // my idea is in checkin the attendace get sto
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'member_id' => 'required|exists:members,id',
            'check_in_time' => 'required|date_format:Y-m-d H:i:s',
            'check_out_time' => 'nullable|date_format:Y-m-d H:i:s|after:check_in_time',
        ]);

        Attendance::create($validatedData + ['status' => 'present']);
        return response()->json($validatedData, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }
        return response()->json($attendance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }
        $validatedData = $request->validate([
            'member_id' => 'required|exists:members,id',
            'check_out_time' => 'required|date_format:H:i:s|after:check_in_time',
        ]);
        $attendance->update($validatedData + ['status' => 'absent']);
        return response()->json($attendance);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // i dont think we need to delete an attendance record just in case we need it
    }

        
}
