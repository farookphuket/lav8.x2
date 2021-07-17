@extends("Theme.SBAdmin.index")


@section("content")
    <man-blog :category="{{$category}}"></man-blog>
@endsection
