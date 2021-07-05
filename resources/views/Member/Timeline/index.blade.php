@extends("Theme.classlist.show")


@section("meta_title","show timeline ".Auth::user()->name)


@section("content")
<member-timeline :user_id="{!!Auth::user()->id!!}"></member-timeline>


@endsection
