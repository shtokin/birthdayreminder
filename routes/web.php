<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{path?}', function () {
    return view('spa');
});
Route::get('/{path}/{subpath?}', function () {
    return view('spa');
});
Route::get('/{path}/{subpath?}/{three?}', function () {
    return view('spa');
});
