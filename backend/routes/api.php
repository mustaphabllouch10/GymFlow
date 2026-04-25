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
use App\Http\Controllers\dashboardController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');


//routes for users , only accessible by admin
route::apiResource('users', UserController::class);
// ->middleware('auth:sanctum' , "admin");


// route for dashboard , only accessible by admin
route::get('/dashboard', [dashboardController::class, 'index']);
// ->middleware('auth:sanctum' , "admin");


// routes for members , accessible by both admin and user
Route::apiResource('members', MemberController::class);
// ->middleware('auth:sanctum');


/**
 * all the routes under this are not tested yet , and not complete yet , so ignore them for now
 */

// routes for subscriptions , accessible by both admin and user
Route::apiResource('members.subscriptions', SubscriptionController::class);
// ->middleware('auth:sanctum');

// this route is for the admin to see all the subscriptions in the system , and it will be paginated
Route::get('/subscriptions', function () {
    $subscriptions = Subscription::with('member')->paginate(5);
    return response()->json($subscriptions);
});
// ->middleware('auth:sanctum');

// we will need routes for the attendance , i get back to it rlly quick


// routes for plans , accessible by both admin and user
Route::apiResource('plans', PlanController::class);
// ->middleware('auth:sanctum');


// exportation routes 

Route::get("/exportMembers" , [MemberController::class , "exportMembers"]);




