<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Contact form endpoints
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);

