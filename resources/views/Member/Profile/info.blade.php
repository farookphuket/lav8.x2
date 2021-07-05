@extends("Theme.classlist.show")


@section("content")

<member-profile :user_id="{!!Auth::user()->id!!}"></member-profile>

@endsection
