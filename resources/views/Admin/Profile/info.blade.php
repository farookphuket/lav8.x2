@extends("Theme.SBAdmin.index")



@section("content")

<admin-profile :user_id="{!!Auth::user()->id!!}"></admin-profile>


@endsection
