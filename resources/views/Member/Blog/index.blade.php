@extends('Theme.classlist.list-no-ads')

@section("head_script")
    <script>
        var user_id = "{!!Auth::user()->id!!}"
    </script>
@endsection


@section('content')
<?php
    $title = !$last_blog?'write your blog':$last_blog->title;
?>
    @section('meta_title',$title)

<member-blog :templates="{{$templates}}" 
:category="{{$category}}"></member-blog>

@endsection
