<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription; 
use App\Models\Member;


class SubscriptionController extends Controller
{
    // ok ok , here is the structure , we will have a place to see all the subscripiton , 
    //you cant create or update or desatory unless you are in the members profile , 
    //basically , the subscription will appear in two places , in the members prfile , and the sbscription section 
    // that's it 9te3 lah idir lkhir 


    /**
     * Display a listing of the resource.
     */
    public function index(Member $member)
    {
        $subscription = $member->subscriptions()->paginate(5);
        return response()->json($subscription);

        
    }

    /**
     * Store a newly created resource in storage.
     */

    // im thinking the subscription should be created inside the member profile 
    // i cant think o any data to insert except the plan (monthly , quarlty , yearly)
    // i will get back to this later 
    public function store(Request $request , Member $member)
    {
        $validatedData = $request->validate([
            'plan' => 'required|in:monthly,quarterly,yearly',
            'member_id' => 'required|exists:members,id',
        ]);
        if ($validatedData['plan'] === 'monthly') {
            $validatedData['end_date'] = now()->addMonth();
        } elseif ($validatedData['plan'] === 'quarterly') {
            $validatedData['end_date'] = now()->addMonths(3);
        } elseif ($validatedData['plan'] === 'yearly') {
            $validatedData['end_date'] = now()->addYear();
        }
        $member->subscriptions()->create([
            'plan' => $validatedData['plan'],
            'member_id' => $validatedData['member_id'],
            'start_date' => now(),
            'end_date' => $validatedData['end_date'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    // i think the same thing goes on this , you can see a subscription by accessing to the members profile
    // will get back to this later 
    public function show(string $id , Member $member)
    {
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }
        return response()->json($subscription);
    }

    /**
     * Update the specified resource in storage.
     */
    // 
    public function update(Request $request, string $id , Member $member)
    {
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }
        $validatedData = $request->validate([
            'plan' => 'required|in:monthly,quarterly,yearly',
            'member_id' => 'required|exists:members,id',
        ]);
        $member->subscriptions()->update($validatedData);
        return response()->json($subscription);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id , Member $member)
    {
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }
        $member->subscriptions()->delete();
        return response()->json(['message' => 'Subscription deleted successfully']);
    }
}
