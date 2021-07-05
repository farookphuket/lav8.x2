
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
<div class="widget-wrapper">
    <div class="map-img">
        <img src="{{asset("classlist/assets/images/footer/map-img.svg")}}" alt="">
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xl-4 col-md-7">
                <div class="footer-widget about">
                    <a href="index.html" class="d-inline-block mb-30">
                        <img src="{{asset("img/see-logo.png")}}" alt="">
                    </a>

                    <span style="color:white;"> 📆 {{date("d-m-Y",time())}}</span>
                    <p class="text-white mb-25">

                       this web site has created on "📅 17 Sep 2007"(or 
                        {{Carbon::parse("17-9-2007")->diffForHumans()}} 
                        ) and will be end on the "17 May 2023" (or 
                        {{Carbon::parse("17-05-2023")->diffForHumans()}} 
                        ) as I just done with this because I have enough.
                    </p>

                     <ul class="social">
                        <li><a target="_blank" href="{{$my_facebook}}">
                                <i class="lni lni-facebook-filled"></i></a>
                        </li>
                        <li>
                            <a target="_blank" 
                                href="{{$my_twitter}}">
                                <i class="lni lni-twitter-filled"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" 
                                href="{{$my_instagram}}">
                                <i class="lni lni-instagram-filled"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" 
                                href="{{$my_linkedin}}">
                                <i class="lni lni-linkedin-original"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xl-2 col-md-3 order-md-2 order-xl-1 col-sm-6">
                <div class="footer-widget">
                    <h4>Quick Link</h4>
                    <ul class="link">
                        @auth

                            <li><a href="{{route("member.dashboard.index")}}">Home</a></li>
                            <li><a href="{{url("/about")}}">About</a></li>
                            <li><a href="{{route("member.photo.index")}}">Photo</a></li>
                            <li><a href="javascript:void(0)">Product details</a></li>
                        @else
                            <li><a href="/">Home</a></li>
                            <li><a href="{{url("/about")}}">About</a></li>
                            <li><a href="javascript:void(0)">Category</a></li>
                            <li><a href="javascript:void(0)">Product details</a></li>
                            <li><a href="javascript:void(0)">Contact</a></li>
                        @endauth
                    </ul>
                </div>
            </div>

<!--
            <div class="col-xl-2 col-md-4 order-md-3 order-xl-2 col-sm-6">
                <div class="footer-widget">
                    <h4>Support</h4>
                    <ul class="link">
                        <li><a href="javascript:void(0)">Live Chat</a></li>
                        <li><a href="javascript:void(0)">Privacy Policy</a></li>
                        <li><a href="javascript:void(0)">Purchase</a></li>
                        <li><a href="javascript:void(0)">Protection</a></li>
                        <li><a href="javascript:void(0)">Support</a></li>
                    </ul>
                </div>
            </div>
-->

            <div class="col-xl-3 col-md-3 order-md-3 order-xl-3 col-sm-6">
                <div class="footer-widget">
                    <h4>Visitors</h4>

                        <visitors></visitors>

                </div>
            </div>
            <div class="col-xl-3 col-md-3 order-md-4 order-xl-4 col-sm-6">
                <div class="footer-widget">
                    <h4>Contact Us</h4>
                    <ul>
                        <li>
                        <span>Phone:</span>
{{$my_mobile}}
                        </li>
                        <li>
                        <span>Email:</span>
                        <a href="#" class="" >{{$my_email}}</a>
                        </li>
                        <li>
                        <span>Location:</span>
                        {{$my_address}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="copy-right">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="text-center">
                    <p> 

                        code v{{ Illuminate\Foundation\Application::VERSION }} (
                        PHP v{{ PHP_VERSION }}) 
                        Designed & Developed By 
                        <a href="https://graygrids.com/" 
                            rel="nofollow" target="_blank">GrayGrids</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
