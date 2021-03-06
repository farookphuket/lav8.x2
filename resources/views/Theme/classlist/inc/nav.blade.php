
<a class="navbar-brand" @auth href="/member/dashboard" @else href="/" @endauth>
    <img id="logo" src="{{asset("img/see-logo.png")}}" alt="Logo">
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation">
    <span class="toggler-icon"></span>
    <span class="toggler-icon"></span>
    <span class="toggler-icon"></span>
</button>


<div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
    <ul id="nav" class="navbar-nav">
        <li class="nav-item">
            @guest
                <a class="page-scroll 
                    @if(Request::segment(1) == NULL)active @endif" 
                    href="/"> 
                    <span class="fas fa-home fa-1x"></span>
                    Home</a>
            @else
                <a class="page-scroll 
                    @if(Request::segment(2) == 'dashboard')
                    active @endif" href="{{route('member.dashboard.index')}}" 
                >

                <span class="fas fa-home fa-1x"></span>
                Home</a>
            @endguest
        </li>

        
<!-- ========= menu link with sub menu Page START===== -->
        <li class="nav-item">
            <?php
                $req = Request::segment(1);
                $mem_req = Request::segment(2);
            ?>
            @guest
            <a class="page-scroll @if($req == 'blog' || $req == 'about') active @endif"  
                data-toggle="collapse" data-target="#sub-nav1" aria-controls="sub-nav1" aria-expanded="false" aria-label="Toggle navigation" href="javascript:void(0)">
                <span class="far fa-folder-open fa-1x"></span>
                Pages
                <div class="sub-nav-toggler">
                    <span></span>
                </div>
            </a>
                @else

                <a class="page-scroll @if($mem_req == 'blog' || $mem_req == 'about') active @endif"  
                    data-toggle="collapse" data-target="#sub-nav1" aria-controls="sub-nav1" aria-expanded="false" aria-label="Toggle navigation" href="javascript:void(0)">
                    <span class="far fa-folder-open fa-1x"></span>
                    Pages
                    <div class="sub-nav-toggler">
                        <span></span>
                    </div>
                </a>
            @endguest
            <ul class="sub-menu collapse" id="sub-nav1">
                @guest
                <li>
                    <a class="@if(Request::segment(1) == 'blog') active @endif"
                    href="{{url('/blog')}}">Blog</a></li>
                <li>
                    <a 
                    class="@if(Request::segment(1) == 'about') active @endif"
                    href="{{url('/about')}}">About</a></li>

                    @else
                    
                    <li>
                        <a 
                        class="@if($mem_req == '/timeline') active @endif"
                        href="{{route('member.timeline.index')}}">Timeline</a>

                    </li>
                    <li>
                        <a 
                        class="@if($mem_req == '/blog') active @endif"
                        href="{{route('member.blog.index')}}">Blog</a>

                    </li>
                    
                    <li>
                        <a 
                        class="@if($mem_req == '/comment') active @endif"
                        href="{{route('member.comment.index')}}">Comment</a>

                    </li>
                    <li>
                        <a 
                        class="@if($mem_req == '/photo') active @endif"
                        href="{{route('member.photo.index')}}">Photo</a>

                    </li>
                    <li>
                        <a 
                        class="@if($mem_req == '/template') active @endif"
                        href="{{route('member.template.index')}}">Template</a>

                    </li>
                @endguest
            </ul>
        </li>

        @guest


        <!-- =================== Product nav 24 Aug 2021 START ============ -->
        <li class="nav-item">
            <a 
            class="@if(Request::segment(1) == 'product') active @endif"
            href="/product">Product</a>
        </li>


        <!-- =================== Product nav 24 Aug 2021 END ============== -->

        <li class="nav-item">
            <a 
            href="{{url('/support')}}">
            <span class="fa fa-life-ring"></span>
            Support 
                
            </a>
        </li>

        <li class="nav-item">
            <a 
            href="{{url('/login')}}">
            <span class="fas fa-lock"></span>
            Login 
                
            </a>
        </li>
    
        @else 
            
        <li class="nav-item">

            <!--
            <a 
                href="{{route('member.product.index')}}" 
                class="@if($mem_req == 'product') active @endif" 
            >Want to Sale</a>
            -->


            <!-- product SUB link start -->
            
                <a class="page-scroll @if($mem_req == 'product') active @endif"  
                    data-toggle="collapse" data-target="#sub-nav1" aria-controls="sub-nav1" aria-expanded="false" aria-label="Toggle navigation" href="javascript:void(0)">Product
                    <div class="sub-nav-toggler">
                        <span></span>
                    </div>
                </a>

                
            <ul class="sub-menu collapse" id="sub-nav1">
                <li>
                    <a href="{{route('member.product.index')}}" 
                        class="@if($mem_req == 'product') active @endif"
                        title="Buy or Sale your product"
                        >
                        Want to Buy
                    </a>
                </li>
                
                
            </ul>
            <!-- product SUB link END -->

        </li>
        @endguest
        
<!-- ========= menu link with sub menu Page End===== -->

<!-- ========= menu link with sub menu Category START===== -->
<!-- //========= not showing yet!!
        <li class="nav-item">
            <a class="page-scroll" data-toggle="collapse" data-target="#sub-nav" aria-controls="sub-nav" aria-expanded="false" aria-label="Toggle navigation" href="javascript:void(0)">Category
                <div class="sub-nav-toggler">
                    <span></span>
                </div>
            </a>
            <ul class="sub-menu collapse" id="sub-nav">
                <li><a href="category.html">Category Grid</a></li>
                <li><a href="category-list.html">Category List</a></li>
            </ul>
        </li>
-->
<!-- ========= menu link with sub menu Category END===== -->

    </ul>
</div>
<!-- ========= END of nav left ========= -->

<!-- ========= nav right only for auth user ========= -->
@auth
    <ul class="header-btn d-md-flex">
        <li>
            <a href="#" class="main-btn account-btn">
                <span class="d-md-none"><i class="lni lni-user"></i></span>
                <span class="d-none d-md-block">{{Auth::user()->name}}</span>
            </a>
            <ul class="dropdown-nav">
                <li>
                    <a href="{{route('member.cart.index')}}">
                        <b-icon icon="cart4"></b-icon>
                        My Cart
                    </a>
                </li>
                <li>
                    <a href="{{route('member.timeline.index')}}">
                        timeline
                    </a>
                </li>
                <li>
                    <a href="{{route('member.profile.index')}}">
                        Profile Edit
                    </a>
                </li>

                <li>
                    <a href="{{route('member.profile.address')}}">
                        Shipping Address
                    </a>
                </li>
                <li>
                    <form action="{{route('logout')}}" method="post">
                        @csrf
                        <button class="btn btn-outline-primary btn-block" 
                        type="submit">logout</button>
                    </form>
                </li>
            </ul>
        </li>

<!--
        <li>
        <a href="post-ad.html" class="main-btn btn-hover d-none d-md-block">Post An Ad</a>
        </li>
-->

    </ul>
@endauth
