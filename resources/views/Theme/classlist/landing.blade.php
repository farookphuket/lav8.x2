<?php
use Carbon\Carbon;
use Illuminate\Support\Facades\Config;

$my_mobile = Config::get("DEFAULT_CONTACT.my_mobile");
$my_email = Config::get("DEFAULT_CONTACT.my_email");
$my_address = Config::get("DEFAULT_CONTACT.my_address");

$my_twitter = Config::get("DEFAULT_CONTACT.my_twitter");
$my_facebook = Config::get("DEFAULT_CONTACT.my_facebook");
$my_instagram = Config::get("DEFAULT_CONTACT.my_instagram");
$my_google = Config::get("DEFAULT_CONTACT.my_google");
$my_linkedin = Config::get("DEFAULT_CONTACT.my_linkedin");
$my_skype = Config::get("DEFAULT_CONTACT.my_skype");

?>
<!doctype html>
<html class="no-js" lang="en">
<head>

@include("INC.google-service")

<meta charset="utf-8">


@hasSection('meta_title')
    <title>@yield('meta_title')</title>
    <meta name="keywords" content="@yield('meta_title')">
    <meta name="description" content="@yield('meta_title')">
    @else
        <title>
        see southern thailand คนใต้บ้านเรานิ มาลองแลกันต๊ะ
        </title>
        <meta name="keywords" 
                    content="see southern,southern thailand, คนใต้บ้านเรานิ,
        ภาคใต้เมืองไทย,มาลองแลกันต๊ะ">
        <meta name="description" 
                content="see southern thailand คนใต้บ้านเรานิ มาลองแลกันต๊ะ">
@endif


<meta name="viewport" content="width=device-width, initial-scale=1">


@include("Theme.classlist.inc.head_link")
@yield("head_script")

</head>
<body>
<!--[if IE]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
    <![endif]-->

<div class="preloader">
<div class="loader">
<div class="ytp-spinner">
<div class="ytp-spinner-container">
<div class="ytp-spinner-rotator">
<div class="ytp-spinner-left">
<div class="ytp-spinner-circle"></div>
</div>
<div class="ytp-spinner-right">
<div class="ytp-spinner-circle"></div>
</div>
</div>
</div>
</div>
</div>
</div>

<div id="app">

        <header class="header_area">
            <div id="header_navbar" class="header_navbar">
                <div class="container position-relative">
                    <div class="row align-items-center">
                        <div class="col-xl-12">
                            <nav class="navbar navbar-expand-lg">
                                @include("Theme.classlist.inc.nav")
                            </nav> 
                        </div>
                    </div> 
                </div> 
            </div> 
        </header>



        <section id="home" class="hero-area bg_cover">
            <div class="container">
                <div class="row">
                    <div class="mx-auto col-lg-7 col-xl-6 col-md-10">
                        <div class="text-center hero-content">
                            <h1 class="mb-30 wow fadeInUp" 
                                data-wow-delay=".2s">
                                    Welcome to {{Request::getHost()}}
                            </h1>
                            <p class="wow fadeInUp" data-wow-delay=".4s">
                                @hasSection('meta_title') 
                                    @yield('meta_title')
                                @else
                                    {{Request::getHost()}}
                                @endif
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<!--
<div class="search-area">
<div class="container">
<div class="search-wrapper">
<form action="#">
<div class="row justify-content-center">
<div class="col-lg-3 col-sm-5 col-10">
<div class="search-input">
<label for="keyword"><i class="lni lni-search-alt theme-color"></i></label>
<input type="text" name="keyword" id="keyword" placeholder="Product keyword">
</div>
</div>
<div class="col-lg-3 col-sm-5 col-10">
<div class="search-input">
<label for="category"><i class="lni lni-grid-alt theme-color"></i></label>
<select name="category" id="category">
<option value="none" selected disabled>Categories</option>
<option value="none">Vehicle</option>
<option value="none">Electronics</option>
<option value="none">Mobiles</option>
<option value="none">Furniture</option>
<option value="none">Fashion</option>
<option value="none">Jobs</option>
<option value="none">Real Estate</option>
<option value="none">Animals</option>
<option value="none">Education</option>
<option value="none">Matrimony</option>
</select>
</div>
</div>
<div class="col-lg-3 col-sm-5 col-10">
<div class="search-input">
<label for="location"><i class="lni lni-map-marker theme-color"></i></label>
<select name="location" id="location">
<option value="none" selected disabled>Locations</option>
<option value="none">New York</option>
<option value="none">California</option>
<option value="none">Washington</option>
<option value="none">Birmingham</option>
<option value="none">Chicago</option>
<option value="none">Phoenix</option>
</select>
</div>
 </div>
<div class="col-lg-2 col-sm-5 col-10">
<div class="search-btn">
<button class="main-btn btn-hover">Search <i class="lni lni-search-alt"></i></button>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
-->

<section class="category-list-area pt-130">
<div class="container" >
<div class="category-list-wrapper">

<!--
<div class="category-list-item">
<a href="#" no-follow>
<div class="icon">
<i class="lni lni-car"></i>
</div>
<h3>Vehicles</h3>
<p>รถยนต์ ยานยนต์</p>
</a>
</div>
<div class="category-list-item">
<a href="#" no-follow>
<div class="icon">
<i class="lni lni-display"></i>
</div>
<h3>Computer</h3>
<p>คอมพิวเตอร์/อุปกรณ์</p>
</a>
</div>

<div class="category-list-item">
<a href="#" no-follow>
<div class="icon">
<i class="lni lni-mobile"></i>
</div>
<h3>Mobiles</h3>
<p>โทรศัพท์มือถือ/อื่นๆ</p>
</a>
</div>


<div class="category-list-item">
<a href="#" no-follow>
<div class="icon">
<i class="lni lni-plane"></i>
</div>
<h3>Travel</h3>
<p>ท่องเที่ยว</p>
</a>
</div>
-->


@yield('category')
<!--
<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-tshirt"></i>
</div>
<h3>Fashion</h3>
</a>
</div>


<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-briefcase"></i>
</div>
<h3>Jobs</h3>
</a>
</div>


<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-apartment"></i>
</div>
<h3>Real Estates</h3>
</a>
</div>


<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-book"></i>
</div>
<h3>Education</h3>
</a>
</div>


<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-users"></i>
</div>
<h3>Matrimony</h3>
</a>
</div>


<div class="category-list-item">
<a href="category.html">
<div class="icon">
<i class="lni lni-heart"></i>
</div>
<h3>Pets</h3>
</a>
</div>
-->

</div>
</div>
</section>


<!--
<section class="latest-product-area pt-130 pb-110">
<div class="container">
<div class="row">
<div class="mx-auto col-xl-6 col-lg-7 col-md-10">
<div class="text-center section-title mb-60">
<h1>Latest Products</h1>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt dolore magna.</p>
</div>
</div>
</div>
<div class="row">
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-1.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">Apple iPhone x</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$120.99</h3>
</div>
</div>
</div>
 </div>
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-2.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">Apple MacBook Air</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$420.99</h3>
<a href="javascript:void(0)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Verified Ad</a>
</div>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-3.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">Cctv camera</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$80.99</h3>
</div>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-4.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">Apple's new iMac</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$3000.99</h3>
<a href="javascript:void(0)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Verified Ad</a>
</div>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-5.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">Best Compact DSLR</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$290.99</h3>
</div>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="product-details.html">
<img src="{{asset("classlist/assets/images/product/l-product-6.jpg")}}" alt="">
</a>
<div class="product-action">
<a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
<a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
</div>
</div>
<div class="product-content">
<h3 class="name"><a href="product-details.html">10 Future Concept Cars</a></h3>
<span class="update">Last Update: 5 hours ago</span>
<ul class="address">
<li>
<a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
</li>
<li>
<a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
</li>
</ul>
<div class="product-bottom">
<h3 class="price">$4520.99</h3>
<a href="javascript:void(0)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Verified Ad</a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
-->
@if(Request::segment(1) == '')
<section class="video-area">
<div class="video-wrapper img-bg">
<div class="container">
<div class="text-center video-content">
<h1 class="text-white mb-60">get code &nbsp;<span> {{Request::getHost()}}</span></h1>
<a href="https://www.youtube.com/watch?v=PoPhFSuK540&list=UUnApixzVAeTN0xLXuERn89g&index=16" class="glightbox video-btn" target="_blank"><i class="lni lni-play"></i></a>
</div>
</div>
</div>
<div class="container">
<div class="count-up-wrapper">
<div class="row">
<div class="col-lg-3 col-sm-6">
<div class="single-counter">
<div class="icon">
<i class="lni lni-layers"></i>
</div>
<span class="count">34864</span>
<span>Regular Ads</span>
</div>
</div>
<div class="col-lg-3 col-sm-6">
<div class="single-counter">
<div class="icon">
<i class="lni lni-map-marker"></i>
</div>
<span class="count">867</span>
<span>Locations</span>
</div>
</div>
<div class="col-lg-3 col-sm-6">
<div class="single-counter">
<div class="icon">
<i class="lni lni-users"></i>
</div>
<span class="count">56743</span>
<span>Regular Members</span>
</div>
</div>
<div class="col-lg-3 col-sm-6">
<div class="single-counter">
<div class="icon">
<i class="lni lni-briefcase"></i>
</div>
<span class="count">4583</span>
<span>Premium Ads</span>
</div>
</div>
</div>
</div>
</div>
</section>
@endif

<section class="service-area pt-140 pb-110">
<div class="container">
<div class="row">
<div class="mx-auto col-xl-6 col-lg-7 col-md-10">
<div class="text-center section-title mb-60">
@guest
<h1>What's up?</h1>
<p>hey! if you want to post here please  
    <a href="/login">
        login 
    </a></p>
@else

    <h1>What's up {{Auth::user()->name}}?</h1>
    <p>hey! just say it out.</p>
@endguest
</div>
</div>
</div>

<div class="row justify-content-center">
@guest
    <pub-whatnews></pub-whatnews>
@else 
    <member-whatnew></member-whatnew>
@endguest
<!--
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-book"></i>
</div>
<div class="service-content">
<h3>FULLY DOCUMENTED</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-leaf"></i>
</div>
<div class="service-content">
<h3>CLEAN & MODERN DESIGN</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-map"></i>
</div>
<div class="service-content">
<h3>GREAT FEATURES</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-cog"></i>
</div>
<div class="service-content">
<h3>COMPLETELY CUSTOMIZABLE</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-pointer-up"></i>
</div>
<div class="service-content">
<h3>USER FRIENDLY</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-8 col-11">
<div class="single-service">
<div class="icon">
<i class="lni lni-laptop-phone"></i>
</div>
<div class="service-content">
<h3>FULLY RESPONSIVE</h3>
<p>Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
</div>
-->

</div>
</div>
</section>

<!--
<section class="feature-product-area bg_cover">
<div class="container">
<div class="row">
<div class="mx-auto col-lg-6 col-md-10">
<div class="text-center section-title mb-60">
<h1>Featured Products</h1>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
</div>
</div>
</div>
<div class="product-carousel-wrapper">
<div class="row feature-product-carousel">
<div class="col-lg-4 col-md-6">
<div class="single-product">
<div class="product-img">
<img src="{{asset("classlist/assets/images/product/l-product-1.jpg")}}" alt="">
</div>
<div class="product-content">
<div class="rating-wrapper">
<h5 class="price theme-color">$120.99</h5>
<div class="rating">
<span>2 Review</span>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star"></i>
</div>
</div>
<h3 class="name"><a href="product-details.html">Apple iPhone x</a></h3>
<p class="sort-des">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
<div class="product-bottom">
<a href="javascript:void(0)" class="address-link"><i class="lni lni-map-marker"></i> United State of America</a>
<span class="theme-color"><i class="lni lni-heart"></i></span>
</div>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="javascript:void(0)" class="badge">New</a>
<img src="{{asset("classlist/assets/images/product/l-product-2.jpg")}}" alt="">
</div>
<div class="product-content">
<div class="rating-wrapper">
<h5 class="price theme-color">$320.99</h5>
<div class="rating">
<span>2 Review</span>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star"></i>
</div>
</div>
<h3 class="name"><a href="product-details.html">Best Compact DSLR</a></h3>
<p class="sort-des">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
<div class="product-bottom">
<a href="javascript:void(0)" class="address-link"><i class="lni lni-map-marker"></i> United State of America</a>
<span class="theme-color"><i class="lni lni-heart"></i></span>
</div>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="single-product">
<div class="product-img">
<a href="javascript:void(0)" class="badge bottom">25% Discount</a>
<img src="{{asset("classlist/assets/images/product/l-product-3.jpg")}}" alt="">
</div>
<div class="product-content">
<div class="rating-wrapper">
<h5 class="price theme-color">$90 <del>$120</del></h5>
<div class="rating">
<span>2 Review</span>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star"></i>
</div>
</div>
<h3 class="name"><a href="product-details.html">Cctv camera</a></h3>
<p class="sort-des">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
<div class="product-bottom">
<a href="javascript:void(0)" class="address-link"><i class="lni lni-map-marker"></i> United State of America</a>
<span class="theme-color"><i class="lni lni-heart"></i></span>
</div>
</div>
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="single-product">
<div class="product-img">
<img src="{{asset("classlist/assets/images/product/l-product-4.jpg")}}" alt="">
</div>
<div class="product-content">
<div class="rating-wrapper">
<h5 class="price theme-color">$1120.99</h5>
<div class="rating">
<span>2 Review</span>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star-filled"></i>
<i class="lni lni-star"></i>
</div>
</div>
<h3 class="name"><a href="product-details.html">Apple's new iMac</a></h3>
<p class="sort-des">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
<div class="product-bottom">
<a href="javascript:void(0)" class="address-link"><i class="lni lni-map-marker"></i> United State of America</a>
<span class="theme-color"><i class="lni lni-heart"></i></span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
-->
@guest
<section class="pricing-area pt-140 pb-140">
<div class="container">
<div class="row">
<div class="mx-auto col-xl-6 col-lg-7 col-md-10">
<div class="text-center section-title mb-90">
<h1>Thank you.</h1>
<p>
Dear my good friends, thank you for all time suppoting me.
</p>
</div>
</div>
</div>
<div class="row justify-content-center">
<div class="col-lg-4 col-md-8 col-sm-10 col-11">
<div class="single-pricing">
<div class="icon">
<i class="lni lni-layers"></i>
</div>
    <h3 class="name">farookphuket.com</h3>
    <ul>
        <li>hosted with "hostatom"</li>
        <li>write post</li>
        <li>personal</li>
        <li>free visit</li>
    </ul>
    <h2 class="price"> <sup>$</sup> 70.00</h2>
    <span class="time">Yearly</span>
    <a href="https://www.farookphuket.com" target="_blank" 
        class="main-btn btn-hover">Visit Now</a>
</div>
</div>

<div class="col-lg-4 col-md-8 col-sm-10 col-11">
<div class="single-pricing standard">
<div class="icon">
<i class="lni lni-leaf"></i>
</div>
<h3 class="name">see-southern.com</h3>
<ul>
<li>hosted with "hostverify"</li>
<li>write post</li>
<li>personal</li>
<li>free visit</li>
</ul>
<h2 class="price"> <sup>$</sup> 65.00</h2>
<span class="time">Yearly</span>
<a href="javascript:void(0)" 
    class="main-btn btn-hover disabled">this website</a>
</div>
</div>
<div class="col-lg-4 col-md-8 col-sm-10 col-11">
<div class="single-pricing">
<div class="icon">
<i class="lni lni-diamond-alt"></i>
</div>
<h3 class="name">baanlungpa.com</h3>
<ul>
<li>hosted with "hostverify"</li>
<li>write post</li>
<li>personal</li>
<li>free visit</li>
</ul>
<h2 class="price"> <sup>$</sup> 60.00</h2>
<span class="time">Yealy</span>
<a href="https://www.baanlungpa.com" target="_blank"
    class="main-btn btn-hover">Visit Now</a>
</div>
</div>
</div>
</div>
</section>


<section class="subscribe-area">
    <div class="container">
<!--
        <div class="subscribe-wrapper bg_cover">
            <div class="row align-items-center">


<div class="col-lg-7">
<div class="subscribe-content section-title">
<h1 class="text-white">Subscribe Our Newsletter</h1>
<p class="text-white">Buy and sell everything from used cars to mobile phones and computer or search for property.</p>
</div>
</div>
<div class="col-lg-5">
<div class="subscribe-form-wrapper">
<form action="#" class="subscribe-form">
<input type="email" name="sub-email" placeholder="Enter your Email">
<button><i class="lni lni-telegram-original"></i></button>
</form>
</div>
</div>
    
</div>
</div>
-->

        <faq-us></faq-us>
</div>
</section>

@endguest

    <section class="testimonial-area pt-140 pb-140">
        <div class="container">
    
            <div class="row">
                

                <div class="mx-auto col-xl-6 col-lg-7 col-md-10">
                    <div class="text-center section-title mb-60">
                        <h1>photos</h1>
                        <p>show last photo</p>
                    </div>
                </div>
            </div>


            <div class="testimonial-wrapper">
                <div class="row testimonial-carousel">


                <!--
                    <div class="col-lg-4">
                        <div class="single-testimonial">
                            <div class="testimonial-top">
                                <div class="testimonial-info">
                                    <div class="image">
                                        <img src="{{asset("classlist/assets/images/testimonial/testimonial-1.png")}}" alt="">
                                    </div>
                                    <div class="meta">
                                        <h6>Ena Shah</h6>
                                        <p>Creative Designer</p>
                                    </div>
                                </div>
                                <div class="quote">
                                    <img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
                                </div>
                            </div>
                            <div class="content">
                                <p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
                            </div>
                        </div>
                    </div>
                    -->
<!--
<div class="col-lg-4">
<div class="single-testimonial">
<div class="testimonial-top">
<div class="testimonial-info">
<div class="image">
<img src="{{asset("classlist/assets/images/testimonial/testimonial-2.png")}}" alt="">
</div>
<div class="meta">
<h6>Michel Smith</h6>
<p>Product Designer</p>
</div>
</div>
<div class="quote">
<img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
</div>
</div>
<div class="content">
<p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
</div>
</div>
</div>
-->

<!--
<div class="col-lg-4">
<div class="single-testimonial">
<div class="testimonial-top">
<div class="testimonial-info">
<div class="image">
<img src="{{asset("classlist/assets/images/testimonial/testimonial-3.png")}}" alt="">
</div>
<div class="meta">
<h6>Sarah A. K.</h6>
<p>Graphic Designer</p>
</div>
</div>
<div class="quote">
<img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
</div>
</div>
<div class="content">
<p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
</div>
</div>
</div>
-->

<!--
<div class="col-lg-4">
<div class="single-testimonial">
<div class="testimonial-top">
<div class="testimonial-info">
<div class="image">
<img src="{{asset("classlist/assets/images/testimonial/testimonial-2.png")}}" alt="">
</div>
<div class="meta">
<h6>Michel Smith</h6>
<p>Product Designer</p>
</div>
</div>
<div class="quote">
<img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
</div>
</div>
<div class="content">
<p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
</div>
</div>
</div>
-->
<!--
<div class="col-lg-4">
<div class="single-testimonial">
<div class="testimonial-top">
<div class="testimonial-info">
<div class="image">
<img src="{{asset("classlist/assets/images/testimonial/testimonial-1.png")}}" alt="">
</div>
<div class="meta">
<h6>Ena Shah</h6>
<p>Creative Designer</p>
</div>
</div>
<div class="quote">
<img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
</div>
</div>
<div class="content">
<p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
</div>
</div>
</div>


<div class="col-lg-4">
<div class="single-testimonial">
<div class="testimonial-top">
<div class="testimonial-info">
<div class="image">
<img src="{{asset("classlist/assets/images/testimonial/testimonial-1.png")}}" alt="">
</div>
<div class="meta">
<h6>Ena Shah</h6>
<p>Creative Designer</p>
</div>
</div>
<div class="quote">
<img src="{{asset("classlist/assets/images/testimonial/quote.svg")}}" alt="">
</div>
</div>
<div class="content">
<p>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
</div>
</div>
</div>
-->

                <pub-photo></pub-photo>

            </div>
        </div>
    </div>
</section>


<footer class="footer-area">
    @include("Theme.classlist.inc.footer")
</footer>


</div><!-- end of div#app for vue -->

<a href="#" class="back-to-top btn-hover"><i class="lni lni-chevron-up"></i></a>

<!--
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
-->
<script src="{{asset("classlist/assets/js/bootstrap.bundle-5.0.0.alpha-min.js")}}"></script>

<!--
<script src="{{asset("classlist/assets/js/tiny-slider.js")}}"></script>
-->
<script src="{{asset("classlist/assets/js/wow.min.js")}}"></script>

@guest
<script src="{{asset("classlist/assets/js/glightbox.min.js")}}"></script>
@endguest

<script src="{{asset("classlist/assets/js/selectr.min.js")}}"></script>

<script src="{{asset("classlist/assets/js/nouislider.js")}}"></script>

@include("Theme.classlist.inc.main")

<!--
<script src="{{asset("classlist/assets/js/main.js")}}"></script>
-->
<!--
<script>

		//========= glightbox
		const myGallery = GLightbox({
			'href': 'assets/video/Free App Landing Page Template - AppLand.mp4',
			'type': 'video',
			'source': 'youtube', //vimeo, youtube or local
			'width': 900,
			'autoplayVideos': true,
		});

		//======== tiny slider for feature-product-carousel
    /*
		tns({
			slideBy: 'page',
			autoplay: false,
			mouseDrag: true,
			gutter: 20,
			nav: false,
			controls: true,
			controlsPosition: 'bottom',
			controlsText: [
				'<span class="prev"><i class="lni lni-chevron-left"></i></span>', 
				'<span class="next"><i class="lni lni-chevron-right"></i></span>'
			],
			container: ".feature-product-carousel",
			items: 1,
			center: false,
			autoplayTimeout: 5000,
			swipeAngle: false,
			speed: 400,
			responsive: {
				768: {
					items: 2,
				},

				992: {
					items: 2,
				},

				1200: {
					items: 3,
				}
			}
		});

		//======== tiny slider for testimonial
		tns({
			slideBy: 'page',
			autoplay: false,
			mouseDrag: true,
			gutter: 20,
			nav: true,
			controls: false,
			container: ".testimonial-carousel",
			items: 1,
			center: false,
			autoplayTimeout: 5000,
			swipeAngle: false,
			speed: 400,
			responsive: {
				768: {
					items: 2,
				},
				1200: {
					items: 3,
				}
			}
		});
    */
	</script>
-->
    <script src="{{asset("js/app.js")}}"></script>
</body>
</html>
