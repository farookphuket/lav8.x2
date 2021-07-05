<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Print my timeline</title>

<link rel="stylesheet" href="{{asset('css/print_page.css')}}">
    <style type = "text/css">
   <!--

   
   -->
</style>
</head>
<body>
<div id="content" >
<h1 style="text-align:center;">{{Auth::user()->name}}'s Timeline </h1>
<p style="text-align:right;">
this document created on {{date('Y-m-d H:i:s',time())}}
</p>
   @foreach($print as $li) 
       <div id="page">

            <article>
                <h3 class="site-title">
                    <i>
                     <u>
                        {{$li->date_ref}}
                     </u>
                    </i>
                </h3>
                <p>
                   <blockquote>
                        {!!$li->report!!}
                    </blockquote>
                </p>
            </article>       
            <hr>

        </div>
   
    
    @endforeach
</div>

<script>
window.print();
</script>
</body>
</html>
