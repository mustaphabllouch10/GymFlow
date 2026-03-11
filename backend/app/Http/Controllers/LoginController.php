<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    
    public function login(request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required|string"
        ]);

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            
            $abilities = match ($user->role) {
                 "admin" => ['admin'],
                 "user" => ['user'],
                 
            };
            $token = $user->createToken('auth_token' , $abilities)->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'abilities' => $abilities
            ]);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    
}
