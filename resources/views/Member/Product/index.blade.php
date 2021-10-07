@extends("Theme.classlist.list-no-ads")

@section("meta_title","product member")

@section("content")


<member-product :user_id="{{Auth::user()->id}}" 
    :category="{{$category}}"></member-product>
@endsection
