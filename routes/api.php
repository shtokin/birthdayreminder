<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware('auth:api')->get('/birthday/{userId}/list', function (Request $request) {
Route::get('/birthday/{userId}/list', 'BirthdayController@list');

Route::get('/birthday/{userId}/{birthdayId}', 'BirthdayController@getBirthday');

Route::post('/birthday/{birthdayId}', 'BirthdayController@updateBirthday');

Route::post('/birthday', 'BirthdayController@create');

Route::delete('/birthday/{userId}/{birthdayId}', 'BirthdayController@deleteBirthday');
