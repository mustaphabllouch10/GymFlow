<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required|string"
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user) {
                $abilities = match ($user->role) {
                    "admin" => ['admin'],
                    "user" => ['user'],
                    default => ['user'],
                };
                $token = $user->createToken('auth_token', $abilities)->plainTextToken;
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'abilities' => $abilities
                ]);
            } else {
                return response()->json(['message' => 'User not found after login'], 500);
            }
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

    }

    public function logout()
    {
        $user = Auth::user();
        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        } else {
            return response()->json(['message' => 'No authenticated user'], 401);
        }
    }

    
}
