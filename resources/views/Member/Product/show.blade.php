@extends("Theme.classlist.show")



@section("meta_title",$product->product_title)


@section("content")

<div class="container">
    <div class="text-heading">
        <h2 class="text-center">
            {{$product->product_title}}
        </h2>
    </div>

    <div class="row">
        <div class="col-lg-4">
           <img src="{{$product->product_pic_absolute_path}}" 
            class="responsive"
            alt="{{$product->product_title}}">
            <p class="pt-2 text-center">
                {{$product->product_title}} - 
                
                <span class="badge badge-info p-2">
                    {{$product->product_price}}
                </span>
            </p>
        </div>
        <div class="col-lg-8">
           <product-order-form :user_id="{{Auth::user()->id}}" 
:product="{{$product}}" :my_cart="{{$my_cart}}"></product-order-form>
        </div>

        <!-- // order form START -->
        <div class="col-lg-12">
                
            {!!$product->product_des!!}
        </div>
        <!-- // order form End -->

    </div>

</div>

@endsection
