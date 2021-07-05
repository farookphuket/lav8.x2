<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>@hasSection('meta_title') @yield('meta_title') @else welcome {{Auth::user()->name}} @endif</title>
        <link href="{{asset('SBAdmin/css/styles.css')}}" rel="stylesheet" />
        <link href="{{asset('css/custom_theme.css')}}" rel="stylesheet" />
        <link href="{{asset('SBAdmin/extra/dataTables.bootstrap4.min.css')}}" rel="stylesheet"/>
        <link rel="icon" href="{{ URL::asset('img/farICON.ico') }}" 
            type="image/x-icon"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        <script src="{{asset('SBAdmin/extra/all.min.js')}}"></script>
        @yield('head_script')
    </head>
    <body class="sb-nav-fixed">


        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="{{route("admin.dashboard.index")}}">
Admin </a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <!-- not using this search yet 
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
            -->
            <span class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">&nbsp;</span>
            <!-- Navbar-->


            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" 
                            href="{{route("admin.profile.index")}}">
                            Settings
                        </a>
<!--
                        <a class="dropdown-item" href="#">Activity Log</a>
-->
                        <div class="dropdown-divider"></div>
                        <form action="{{route("logout")}}" method="post">
                        @csrf
                        <button class="dropdown-item" type="submit">Logout</button>
                        </form>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">

<!-- =======================  nav left Start ========================= -->
    @include('Theme.SBAdmin.left_nav')
<!-- =======================  nav left End ========================= -->
            </div>


            <div id="layoutSidenav_content">

                <main>

                    <!-- =========== card section START ======== -->

                    <div class="container-fluid">
                        @if(Request::segment(2) == 'dashboard')
<!-- =======================chart START ================= -->
                            @include('Theme.SBAdmin.area_chart')
<!-- =======================chart End ================= -->
                        @endif

                        <div class="container-fluid" id="app">
                            @yield("content")
                        </div>


                    </div><!-- end of div.container-fluid -->
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">
                                Copyright &copy; {{Request::getHttpHost()}}
since 2007 - {{date("Y",time())}}</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="{{asset('SBAdmin/extra/jquery-3.5.1.min.js')}}"></script>
        <script src="{{asset('SBAdmin/extra/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('SBAdmin/js/scripts.js')}}"></script>

@if(Request::segment(2) == 'dashboard')
        <script src="{{asset('SBAdmin/extra/Chart.min.js')}}"></script>
        <script src="{{asset('SBAdmin/assets/demo/chart-area-demo.js')}}"></script>
        <!--
        <script src="{{asset('SBAdmin/assets/demo/chart-bar-demo.js')}}"></script>
        -->
        @include("Theme.SBAdmin.barJS")
@endif
        <script src="{{asset('SBAdmin/extra/jquery.dataTables.min.js')}}"></script>
        <script src="{{asset('SBAdmin/extra/dataTables.bootstrap4.min.js')}}"></script>
        <script src="{{asset('SBAdmin/assets/demo/datatables-demo.js')}}"></script>
        <script src="{{asset("js/app.js")}}"></script>
    </body>
</html>
