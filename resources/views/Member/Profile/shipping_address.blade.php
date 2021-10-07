@extends("Theme.classlist.list-no-ads")


@section("content")

   <shipping-address :user_id="{{Auth::user()->id}}"></shipping-address>

@endsection
