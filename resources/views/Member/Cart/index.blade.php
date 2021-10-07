@extends("Theme.classlist.list-no-ads")



@section("content")

<my-cart :user_id="{{Auth::user()->id}}"></my-cart>

@endsection
