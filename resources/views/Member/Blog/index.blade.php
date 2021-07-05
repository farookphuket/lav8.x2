@extends('Theme.classlist.list')

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

<member-blog></member-blog>

@endsection
