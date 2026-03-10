<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\User;

Route::get('/user', function (Request $request) {
    return response()->json(User::all());
});




