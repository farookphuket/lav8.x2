<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\PhotoController as pubpic;
use App\Http\Controllers\ContactController as pContact;
use App\Http\Controllers\LandingController as pWhatnew;
use App\Http\Controllers\VisitorsController as pVisit;
use App\Http\Controllers\BlogController as pBlog;

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

Route::get('/getPhotos',[pubpic::class,'getPhotos'])->name('getPhotos');

Route::get('getVisitors',[pVisit::class,'getVisitors'])
    ->name('getVisitors');


Route::get('/getBlog',[pBlog::class,'getBlogs'])
    ->name('getBlog');

Route::get('/getContact',[pContact::class,'getContact'])
    ->name('getContact');


Route::get('/getWhatnew',[pWhatnew::class,'getWhatnew'])
    ->name("getWhatnew");

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
