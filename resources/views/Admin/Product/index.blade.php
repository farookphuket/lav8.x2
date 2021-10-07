@extends("Theme.SBAdmin.index")




@section("content")

    <man-product 
        :user_id="{{Auth::user()->id}}" 
        :category="{{$category}}"
        ></man-product>    

@endsection
