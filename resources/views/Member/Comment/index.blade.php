@extends('Theme.classlist.list-no-ads')

@section("head_script")

@endsection


@section('content')

<member-comment :user_id="{!!Auth::user()->id!!}"></member-comment>
@endsection
