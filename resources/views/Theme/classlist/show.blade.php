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
<title>@hasSection("meta_title") @yield('meta_title') @else 
welcome to see-southern.com @endif</title>

<meta name="keywords" content="@hasSection('meta_keywords') @yield('meta_keywords') @else see southern thailand,เมืองใต้บ้านเรา,ภาคใต้ประเทศไทย @endif">


<meta name="description" content="@hasSection('meta_des') @yield('meta_des') @else see southern thailand เมืองใต้บ้านเรา ภาคใต้ประเทศไทย บ้านเราหรอยๆ @endif">



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
        @hasSection("meta_title") @yield("meta_title") @endif
    </h1>


<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        
        @guest
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item">
            <a href="{{url()->previous()}}">
                {{Request::segment(1)}}
            </a>
             
        </li>
            @if(Request::segment(2))
                <li class="breadcrumb-item active" aria-current="page">
                    @hasSection("meta_title") @yield("meta_title") @endif
                </li>
            @endif
        @endguest
    </ol>
</nav>
</div>
</div>
</div>
</div>
</section>


<section class="product-details-area">
    <div class="container">
        <div class="product-details-wrapper box-style">
            <div class="info-wrapper">
                <div class="showcase-wrapper">

                    <div class="row">
                        <div class="text-wrapper">
                            @yield('content')
                        </div>
                    </div>
            </div>
        </div>
    </div>
</section>


<footer class="footer-area">

    @include("Theme.classlist.inc.footer")
</footer>

<!-- end of div#app for vue -->
</div>
<!-- end of div#app for vue -->

<a href="#" class="back-to-top btn-hover"><i class="lni lni-chevron-up"></i></a>

<!--
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">
</script>
-->

<script src="{{asset("classlist/assets/js/bootstrap.bundle-5.0.0.alpha-min.js")}}"></script>

<script src="{{asset("classlist/assets/js/tiny-slider.js")}}"></script>

<script src="{{asset("classlist/assets/js/wow.min.js")}}"></script>

<script src="{{asset("classlist/assets/js/glightbox.min.js")}}"></script>

<script src="{{asset("classlist/assets/js/selectr.min.js")}}"></script>

<script src="{{asset("classlist/assets/js/nouislider.js")}}"></script>

<!--
<script src="assets/js/main.js"></script>
-->

@include("Theme.classlist.inc.main")


    <script src="{{asset("js/app.js")}}"></script>
</body>
</html>
