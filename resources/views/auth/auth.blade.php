<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@hasSection("meta_title") @yield("meta_title") 
@else Please login with your credentials @endif</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="{{asset('css/auth_style.css')}}">

<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

@yield('head_script')
</head>
<body>
    <div id="app">
        @yield('content')
    </div>
</body>

<script src="{{asset('js/app.js')}}"></script>
</html>
