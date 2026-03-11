<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Member;
use App\Models\User;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');


//routes for users , only accessible by admin
route::apiResource('users', UserController::class)
->middleware('auth:sanctum' , "admin");



// routes for members , accessible by both admin and user
Route::apiResource('members', MemberController::class)
->middleware('auth:sanctum');







