<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Member;
use App\Models\User;
use App\Models\Subscription;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubscriptionController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');


//routes for users , only accessible by admin
route::apiResource('users', UserController::class)
->middleware('auth:sanctum' , "admin");



// routes for members , accessible by both admin and user
Route::apiResource('members', MemberController::class)
->middleware('auth:sanctum');


/**
 * all the routes under this are not tested yet , and not complete yet , so ignore them for now
 */

// routes for subscriptions , accessible by both admin and user
Route::apiResource('members.subscriptions', SubscriptionController::class);


// routes for plans , accessible by both admin and user
Route::apiResource('plans', PlanController::class)
->middleware('auth:sanctum');






