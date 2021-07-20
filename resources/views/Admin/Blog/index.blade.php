@extends("Theme.SBAdmin.index")


@section("content")
    <man-blog :category="{{$category}}" 
:template="{{$template}}"></man-blog>
@endsection
