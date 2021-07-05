@extends("Theme.classlist.show")




@section("content")

<!-- ========= copy from classlist template ======= -->

<section class="latest-product-area pt-130 pb-110">
    <div class="container">
        <div class="row">
            <div class="mx-auto col-xl-6 col-lg-7 col-md-10">
                <div class="text-center section-title mb-60">
                    <h1>Thank you</h1>
                    <p>
                        to all dear friends , I want to say thank you for all 
                        support that you have givin' for all of time.
                    </p>
                </div>
            </div>
        </div>
        <div class="row">
<?php

    $true_url = "https://i.ibb.co/7SdYkn8/Screenshot-2021-0329-204110.jpg";
    $scb_url = "  https://i.ibb.co/JQ3JKJ6/scb-qrcode-24-3-2021.jpg";
    $krungthai_url = "https://i.ibb.co/dkgFr6T/Krung-Thai-Bank.jpg";
    $kbank_url = "https://i.ibb.co/LCK020c/k-qrcode-24-3-2021.jpg";
    $paypal_url = "https://i.ibb.co/sQwHmxg/2021-03-29-paypal.png";
    $last_update = \Carbon\Carbon::parse("2007-10-29 12:45:09")->diffForHumans();
?>
    
            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="single-product">
            <div class="product-img">
            <a href="https://www.paypal.com/paypalme/farookphuket?locale.x=th_TH">
            <img src="{{$paypal_url}}" alt="">
            </a>
            <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
            </div>
            <div class="product-content">
            <h3 class="name"><a href="https://www.paypal.com/paypalme/farookphuket?locale.x=th_TH" target="_blank">Pay with PayPal</a></h3>
            <span class="update">Last Update: {{$last_update}}</span>


            </div>
            </div>
             </div>


            
            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="single-product">
            <div class="product-img">
            <a href="{{$scb_url}}" target="_blank" title="click to show full pic">
            <img src="{{$scb_url}}" alt="transfer money to SCB Bank">
            </a>
            <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
            </div>
            <div class="product-content">
            <h3 class="name"><a href="{{$scb_url}}">SCB Bank</a></h3>
            <span class="update">Last Update: {{$last_update}}</span>


            </div>
            </div>
             </div>


            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="single-product">
            <div class="product-img">
            <a href="{{$kbank_url}}" target="_blank" title="click to show full pic">
            <img src="{{$kbank_url}}" alt="">
            </a>
            <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
            </div>
                <div class="product-content">
                    <h3 class="name"><a href="{{$kbank_url}}">K bank</a></h3>
                    <span class="update">Last Update: {{$last_update}}</span>
                </div>
            </div>
             </div>



            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="single-product">
            <div class="product-img">
            <a href="{{$true_url}}" target="_blank" title="click to show full pic">
            <img src="{{$true_url}}" alt="">
            </a>
            <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
            </div>
                <div class="product-content">
                    <h3 class="name"><a href="{{$true_url}}">True Money Wallet</a></h3>
                    <span class="update">Last Update: {{$last_update}}</span>
                </div>
            </div>
             </div>


            <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="single-product">
            <div class="product-img">
            <a href="{{$krungthai_url}}" target="_blank" title="click to show full pic">
            <img src="{{$krungthai_url}}" alt="">
            </a>
            <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
            </div>
                <div class="product-content">
                    <h3 class="name"><a href="{{$krungthai_url}}">KrungThai Bank</a></h3>
                    <span class="update">Last Update: {{$last_update}}</span>
                </div>
            </div>
             </div>


    </div><!-- end of div.row -->
</div>



<!-- ============ END  ===================== -->

@endsection
