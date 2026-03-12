<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::paginate(5);
        return response()->json($plans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|in:monthly,quarterly,yearly',
            'price' => 'required|numeric',
            'duration_in_days' => 'required|integer',
            'description' => 'required|string',
        ]);

        Plan::create($validatedData);
        return response()->json($validatedData, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        return response()->json($plan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|in:monthly,quarterly,yearly',
            'price' => 'sometimes|required|numeric',
            'duration_in_days' => 'sometimes|required|integer',
            'description' => 'sometimes|required|string',
        ]);

        $plan->update($validatedData);
        return response()->json($validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        $plan->delete();
        return response()->json(['message' => 'Plan deleted successfully']);
    }
}
