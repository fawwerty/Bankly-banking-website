<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\TransactionController;
use App\Http\Controllers\API\ReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {

    // User routes
    Route::get('/user', [AuthController::class, 'user']);

    // Account routes
    Route::get('/accounts', [AccountController::class, 'index']);
    Route::post('/accounts', [AccountController::class, 'store']);
    Route::get('/accounts/{account}', [AccountController::class, 'show']);
    Route::put('/accounts/{account}', [AccountController::class, 'update']);
    Route::delete('/accounts/{account}', [AccountController::class, 'destroy']);
    Route::get('/accounts/{account}/balance', [AccountController::class, 'balance']);

    // Transaction routes
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show']);
    Route::get('/accounts/{account}/transactions', [TransactionController::class, 'getAccountTransactions']);
    Route::post('/transactions/transfer', [TransactionController::class, 'transfer']);
    Route::post('/transactions/deposit', [TransactionController::class, 'deposit']);
    Route::post('/transactions/withdraw', [TransactionController::class, 'withdraw']);

    // Report routes
    Route::get('/reports/user', [ReportController::class, 'userReports']);
    Route::get('/reports/account/{accountId}', [ReportController::class, 'accountReports']);

    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/accounts', [AccountController::class, 'adminIndex']);
        Route::get('/transactions', [TransactionController::class, 'adminIndex']);
        Route::get('/users', [AuthController::class, 'getAllUsers']);
        Route::get('/reports', [ReportController::class, 'index']);
    });

    // Teller routes
    Route::middleware('role:teller')->prefix('teller')->group(function () {
        Route::get('/accounts', [AccountController::class, 'tellerIndex']);
        Route::get('/transactions', [TransactionController::class, 'tellerIndex']);
        Route::post('/transactions/process', [TransactionController::class, 'processTransaction']);
    });
});
