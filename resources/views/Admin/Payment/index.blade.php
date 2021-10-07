@extends("Theme.SBAdmin.index")




@section("content")
    <man-payment :user_id="{{Auth::user()->id}}"></man-payment>
@endsection
