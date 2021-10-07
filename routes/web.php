<?php

use Illuminate\Support\Facades\Route;

/* Public url */
use App\Http\Controllers\LandingController as pLd;
use App\Http\Controllers\PasswordResetController as passReset;
use App\Http\Controllers\RegisterController as Register;
use App\Http\Controllers\ContactController as pContact;
use App\Http\Controllers\VisitorsController as pVisit;
use App\Http\Controllers\BlogController as pBlog;
use App\Http\Controllers\TagsController as pTag;
use App\Http\Controllers\ProductController as pProduct;
use App\Http\Controllers\PaymentController as pPay;
use App\Http\Controllers\SupportController as pSupport;

// about page
use App\Http\Controllers\AboutController as pAbout;


/* ====================== Member section START ============================= */
use App\Http\Controllers\Member\DashboardController as MDB; /* member dash board */
use App\Http\Controllers\Member\PhotosController as MPHT; /* member Photo */
use App\Http\Controllers\Member\TimelinesController as MTL; /* member Timeline */
use App\Http\Controllers\Member\BlogController as MBL;
use App\Http\Controllers\Member\ProfileController as MPL;
use App\Http\Controllers\Member\TemplateController as MTMP;
use App\Http\Controllers\Member\CommentController as MCMT;

/* created at 24 Aug 2021 */
use App\Http\Controllers\Member\ProductController as MPD; 


/* created at 24 Aug 2021 */
use App\Http\Controllers\Member\CategoryController as MCR; 


/* created at 9 Sep 2021 */
use App\Http\Controllers\Member\CartController as MCRT; 
/* ====================== MEMBER SECTION END =============================== */


/* Admin Import section */

use App\Http\Controllers\Admin\DashboardController as ADC; 
use App\Http\Controllers\Admin\UserController as AUS;
use App\Http\Controllers\Admin\ContactController as ACO;
use App\Http\Controllers\Admin\BlogController as ABL;
use App\Http\Controllers\Admin\TagController as ATG;
use App\Http\Controllers\Admin\ProfileController as APL;
use App\Http\Controllers\Admin\CommentController as ACM;
use App\Http\Controllers\Admin\CategoryController as ACTR;
use App\Http\Controllers\Admin\WhatnewController as AWN;
use App\Http\Controllers\Admin\TimelineController as ATL;
use App\Http\Controllers\Admin\TemplateController as ATMP;
use App\Http\Controllers\Admin\ProductController as APD;
use App\Http\Controllers\Admin\PaymentController as APAY;



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

// Route::get('/', function () {
//     return view('welcome');
// });

/* Public route Start */
Route::resource('/',pLd::class);

Route::resource('/about',pAbout::class);

Route::resource('/visitor',pVisit::class);

Route::resource('/blog',pBlog::class);
Route::get('/blog/{blog:slug}',[pBlog::class,'show'])->name('blog.show');
Route::get('/blogSearch',[pBlog::class,'search'])->name('blogSearch');
Route::get('/getComments',[pBlog::class,'getComments'])->name('getComments');

Route::resource('/support',pSupport::class);
Route::get('/getsupport',[pSupport::class,'getSupport'])
    ->name('getsupport');
Route::get('/payment-support',[pSupport::class,'paymentsupport'])
    ->name('paymentsupport');

// 8 Aug 2021
Route::get('/getBlogComment/{blog:id}',[pBlog::class,'getBlogComment'])
    ->name('getBlogComment');

Route::get("/getTags",[pTag::class,"getTags"])->name("getTags");
Route::resource("/tag",pTag::class);

Route::resource('/register',register::class);

Route::resource('/contact',pContact::class);
Route::post('/confirmRealPerson',[pContact::class,'confirmRealPerson'])
    ->name('confirmRealPerson');
Route::post('isRealPerson/{token}',[pContact::class,'isRealPerson'])
    ->name('isRealPerson');


Route::resource('/passwordreset',passReset::class);
Route::post('/isMemberEmail',[passReset::class,'isMemberEmail'])
    ->name('isMemberEmail');

Route::get('/passreset/{token}',[passReset::class,'passreset'])
    ->name('passreset');

Route::resource('/product',pProduct::class);
Route::get('/getproduct',[pProduct::class,'getProduct'])
            ->name('getproduct');

/* Payment url*/
Route::resource('/payment',pPay::class);
Route::get('/getpayment',[pPay::class,'getPaymentMethod'])
    ->name('getpayment');



/* Public route End */



/*  #member  */
Route::prefix('member')->name('member.')
                        ->middleware('auth')
                        ->group(function(){

    Route::resource('/dashboard',MDB::class);
    Route::get("getWhatnew",[MDB::class,'getWhatnew'])
        ->name('getWhatnew');

    Route::resource('/photo',MPHT::class);
    Route::resource('/timeline',MTL::class);
    Route::get('/getTimelines',[MTL::class,'getTimelines'])
        ->name('getTimelines');
    Route::get('/printTimeLine',[MTL::class,'printTimeLine'])
        ->name("printTimeLine");



    // blog
    Route::resource('/blog',MBL::class);
    Route::get('/getBlogs',[MBL::class,'getBlogs'])->name("getBlogs");
    Route::get('/blog/{blog:slug}',[MBL::class,'show'])->name('bolg.show');

    // blog comment 
    Route::post("/saveComment",[MBL::class,'saveComment'])
        ->name('saveComment');

    // profile
    Route::resource("/profile",MPL::class);

    /* =============== */
    Route::get("/address",[MPL::class,'address'])->name('profile.address');


    /* =============== */
    Route::get("/getmydefaultshippingaddress",[MPL::class,
        'getMyDefaultShippingAddress'])
        ->name('profile.getmydefaultshippingaddress');

    /* =============== get the shipping address list ============================= */
    Route::get("/getAddress",[MPL::class,'getAddress'])->name('profile.getAddress');


    /* =============== show shipping address ============================= */
    Route::get("/showAddress/{id}",[MPL::class,'showAddress'])->name('profile.showAddress');

    /* =============== save shipping address ============================= */
    Route::post("/saveAddress",[MPL::class,'saveAddress'])->name('profile.saveAddress');

    /* =============== update shipping address ============================= */
    Route::put("/updateAddress/{id}",[MPL::class,'updateAddress'])->name('profile.updateAddress');

    /* =============== delete shipping address ============================= */
    Route::delete("/delAddress/{id}",[MPL::class,'delAddress'])->name('profile.delAddress');


    /* =============== template 19 Jul 2021 ====================*/
    Route::resource("/template",MTMP::class);
    Route::get("/getTemplate",[MTMP::class,"getTemplate"])
        ->name("getTemplate");
    /* =============== template 19 Jul 2021 ====================*/

    /* =============== Comemnt 27 Jul 2021 =====================*/
    Route::resource('/comment',MCMT::class);
    Route::get("/getComment",[MCMT::class,'getComment'])
        ->name("getComment");
    /* =============== Comemnt 27 Jul 2021 =====================*/

    /* =============== Product 24 Aug 2021 ================================= */
    Route::resource("/product",MPD::class);

    Route::get('/getByCategory/{cat_id}',[MPD::class,'getByCategory'])
        ->name('getByCategory');

    // member get product
    Route::get('/getProduct',[MPD::class,"getProduct"])
        ->name("getProduct");

    Route::get('/categoryProduct',[MPD::class,'categoryProduct'])
        ->name('categoryProduct');
    /* =============== Product 24 Aug 2021 ================================= */

    /* =============== Category 24 Aug 2021 START ========================== */
    Route::resource('category',MCR::class);
    Route::get("/getCategory",[MCR::class,"getCategory"])
        ->name("getCategory");
    /* =============== Category 24 Aug 2021 END   ========================== */


    /* =============== Cart 9 Sep 2021 START ========================== */
    Route::resource('cart',MCRT::class);
    Route::get("/getMyCart",[MCRT::class,"getMyCart"])
        ->name("getMyCart");
    /* =============== Cart 9 Sep 2021 END   ========================== */

});




/* 
 * #admin
 * Admin section */
Route::prefix('admin')->name('admin.')
    ->middleware('can:adminRight')
    ->group(function(){
        Route::resource('/dashboard',ADC::class);


        Route::resource("/blog",ABL::class);
        Route::get("/blog/{blog:slug}",[ABL::class,"show"]);
        Route::get('/getBlogs',[ABL::class,'getBlogs'])->name('getBlogs');

        Route::resource("/tag",ATG::class);
        Route::get('/getTags',[ATG::class,"getTags"])->name("getTags");
        Route::get('/getTagBlogs',[ATG::class,"getTagBlogs"])->name("getTagBlogs");

        Route::resource('/contact',ACO::class);
        Route::get('/getContact',[ACO::class,'getContact'])
            ->name('getContact');
        Route::get('searchContact',[ACO::class,'search'])
            ->name("searchContact");

        Route::resource('/user',AUS::class);
        Route::get('/getUserList',[AUS::class,'getUserList'])
            ->name('getUserList');
        Route::get('/usearch',[AUS::class,'search'])->name('usearch');

        Route::resource("/profile",APL::class);

        Route::resource("/comment",ACM::class);
        Route::get('/getComments',[ACM::class,'getComments'])
            ->name('getComments');

        /* ============== Category ==============================*/
        Route::resource("/category",ACTR::class);
        Route::get("/getCategory",[ACTR::class,"getCategory"])
            ->name("getCategory");

        /* ============== Whatnew ==============================*/
        Route::resource("/whatnew",AWN::class);
        Route::get("/getWhatnew",[AWN::class,"getWhatnew"])
            ->name("getWhatnew");

        /* ============= Timeline 16 Jul 2021 ================= */
        Route::resource("/timeline",ATL::class);
        Route::get("/getTimeline",[ATL::class,"getTimeline"])
            ->name("getTimeline");
        /* ============= Timeline 16 Jul 2021 ================= */

        /* ============= Template 19 Jul 2021 ================= */
        Route::resource("/template",ATMP::class);
        Route::get("/getTemplate",[ATMP::class,"getTemplate"])
            ->name("getTemplate");
        /* ============= Template 19 Jul 2021 ================= */



        /* ============= Product 03 Aug 2021 ================= */
        Route::resource("/product",APD::class);
        Route::get("/getProduct",[APD::class,"getProduct"])
            ->name("getProduct");

        /* ============ Payment 28 Sep 2021 ================== */
        Route::resource("/payment",APAY::class);
        Route::get("getpayment",[APAY::class,"getPayment"])
            ->name("admin.getpayment");
        /* ============ Payment 28 Sep 2021 ================== */

});

 
