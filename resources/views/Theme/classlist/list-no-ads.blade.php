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

<title>@hasSection("meta_title") @yield('meta_title') @else welcome to see-southern.com @endif</title>

<meta name="description" content="see southern thailand คนใต้บ้านเรานิ มาลองแลกันต๊ะ">
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


<section class="banner-area bg_cover">
<div class="container">
<div class="row">
<div class="col-lg-6">
<div class="banner-content">
            <h1 class="text-white">
@guest
    @if(Request::segment(2))
        {{Request::segment(2)}}
    @else
        {{Request::segment(1)}}
    @endif

@endguest
            </h1>
<nav aria-label="breadcrumb">
<ol class="breadcrumb">

@auth
    <li class="breadcrumb-item"><a href="{{route("member.dashboard.index")}}">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{Request::segment(2)}}</li>
@else

    <li class="breadcrumb-item"><a href="{{url("/")}}">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{Request::segment(1)}}</li>
@endauth
</ol>
</nav>
</div>
</div>
</div>
</div>
</section>


<section class="category-area pb-110">
    <div class="container">
        <div class="category-top box-style">
            <div class="row align-items-center">
                <!--
                <div class="col-md-6">
                    <div class="left-wrapper">
                        <div class="sorting">
<!--
                            <label for="sort">Show items</label>
                            <select name="sort" id="sort">
                                <option value="0">Popular Items</option>
                                <option value="1">By Default</option>
                                <option value="2">Newest Items</option>
                            </select>
-->
<!--
                        </div>
                    </div>
                </div>
-->
                <div class="col-md-6">
                    <div class="right-wrapper">

<!--
                        <ul class="nav product-view-btns" id="myTab" role="tablist">
                            <li class="product-view-item" role="presentation">
                                <a class="product-view-btn active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="true"><i class="lni lni-list"></i></a>
                            </li>
                            <li class="product-view-item" role="presentation">
                            <a class="product-view-btn" id="grid-tab" data-toggle="tab" href="#grid" role="tab" aria-controls="grid" aria-selected="false"><i class="lni lni-grid-alt"></i></a>
                            </li>
                        </ul>
-->
<!--
                        <form action="#">
                            <input type="text" name="search" id="search" placeholder="Search">
                            <button><i class="lni lni-search-alt"></i></button>
                        </form>
-->
                        @auth
                        <p class="mb-12 pt-8">{{Request::segment(2)}}</p>
                        @else

                        <p class="mb-12 pt-8">{{Request::segment(1)}}</p>
                        @endauth
                    </div>
                </div>
            </div>
        </div>

        <div class="category-wrapper">
            <div class="row">

                <div class="col-lg-12">
                    <div class="left-wrapper">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade" id="grid" 
                                    role="tabpanel" aria-labelledby="grid-tab">
                                <div class="row">

    <!--
                                    <div class="col-lg-6 col-md-6">
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
-->

                                </div>
                            </div><!-- end of div#grid -->


                            <div class="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
                                <div class="row">
                                    @yield('content')
<!--
<div class="col-lg-12">
<div class="single-product list-view">
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
-->

                                </div>
                            </div>
</div>
</div>
</div>

<!--
<div class="col-lg-4">
<div class="sidebar-wrapper">

<!--

<div class="box-style price-range">
<h3 class="mb-30">Price Range</h3>
<div class="collapse show" id="pricingOne">
<div class="price-range">
<div class="price-amount">
<div class="amount-input">
<label>Minimum Price</label>
<div id="slider-snap-value-lower" class="amount" contenteditable></div>
</div>
<div class="amount-input">
<label>Maximum Price</label>
<div id="slider-snap-value-upper" class="amount" contenteditable></div>
</div>
</div>
<div class="range-slider" id="slider-snap"></div>
</div>
</div>
</div>
-->
<!--
<div class="box-style sidebar-category">
<h3 class="mb-30">All Categories</h3>
<ul>
<li><a href="javascript:void(0)"><span>Web Design</span> <span class="right">12</span></a></li>
<li><a href="javascript:void(0)"><span>Branding</span> <span class="right">20</span></a></li>
<li><a href="javascript:void(0)"><span>Web Development</span> <span class="right">45</span></a></li>
<li><a href="javascript:void(0)"><span>Graphic Design</span> <span class="right">87</span></a></li>
<li><a href="javascript:void(0)"><span>Marketing</span> <span class="right">35</span></a></li>
<li><a href="javascript:void(0)"><span>Wireframing</span> <span class="right">34</span></a></li>
</ul>
</div>
-->

<!--
<div class="box-style add-box">
<h3 class="mb-30">Advertisement</h3>
<div class="image">
<a href="javascript:void(0)" class="d-block">
<img src="{{asset("classlist/assets/images/product/ad-img.jpg")}}" alt="" class="w-100">
</a>
</div>
</div>
-->
    <!--
    <div class="box-style social-box">
        <h3 class="mb-30">Follow Us</h3>
        <ul class="social">
        <li><a href="javascript:void(0)"><i class="lni lni-facebook-filled"></i></a></li>
        <li><a href="javascript:void(0)"><i class="lni lni-twitter-filled"></i></a></li>
        <li><a href="javascript:void(0)"><i class="lni lni-instagram-filled"></i></a></li>
        <li><a href="javascript:void(0)"><i class="lni lni-linkedin-original"></i></a></li>
        </ul>
    </div>
    -->
<!--
</div>
</div>
-->

</div>
</div>
</div>
</section>


<footer class="footer-area">
    
    @include("Theme.classlist.inc.footer")
</footer>

</div>

<a href="#" class="back-to-top btn-hover"><i class="lni lni-chevron-up"></i></a>

<!--
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
-->

<script src="{{asset("classlist/assets/js/bootstrap.bundle-5.0.0.alpha-min.js")}}"></script>

<script src="{{asset("classlist/assets/js/tiny-slider.js")}}"></script>

<script src="{{asset("classlist/assets/js/wow.min.js")}}"></script>

<script src="{{asset("classlist/assets/js/glightbox.min.js")}}"></script>

<!--
<script src="{{asset("classlist/assets/js/selectr.min.js")}}"></script>
-->
<script src="{{asset("classlist/assets/js/nouislider.js")}}"></script>

<!--
<script src="assets/js/main.js"></script>
-->

@include("Theme.classlist.inc.main")

<!--
<script>
		//======== select js
		new Selectr('#sort', {
			searchable: false,
			width: 300
		});

		var snapSlider = document.getElementById('slider-snap');

			noUiSlider.create(snapSlider, {
				start: [199, 789],
				// snap: true,
				connect: true,
				range: {
					'min': 99,
					'max': 999
				}
			});

			var snapValues = [
					document.getElementById('slider-snap-value-lower'),
					document.getElementById('slider-snap-value-upper')
				];

				snapSlider.noUiSlider.on('update', function (values, handle) {
					snapValues[handle].innerHTML = values[handle]
				});
	</script>
-->

    <script src="{{asset("js/app.js")}}"></script>
</body>
</html>
