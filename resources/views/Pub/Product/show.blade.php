@extends("Theme.classlist.show")

@section("meta_title",$product->product_title)

@section("content")

<div class="container">
   <h2 class="text-center">{{$product->product_title}}</h2>

    <div class="row">
        <div class="col-lg-4">
            <div class="mb-4">
                <img class="responsive d-block mx-auto" src="{{$product->product_pic_absolute_path}}" 
                alt="{{$product->product_title}}">
                <p class="pt-2 text-center">{{$product->product_title}}</p>
                
            </div>
        </div>

        <div class="col-lg-8">
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <tr>
                        <th> Title</th>
                        <td>{{$product->product_title}} </td>
                    </tr>
                        
                    <tr>
                        <th>price</th>
                        <td>
                            <a  href="https://www.google.com/search?q={{$product->product_price}}+thaibath+to+USD" 
                                target="_blank">
                                {{$product->product_price}}
                            </a>
                             THB.</td>
                    </tr>
                    <tr>
                        <th>Seller</th>
                        <td>{{$product->user->name}}</td>
                    </tr>
                        @foreach($product->category as $ca)
                    <tr>

                        <th>Category</th>
                        <td>{{$ca->cat_title}}</td>
                    </tr>
                        @endforeach
                </table>
            </div>
        </div>
    </div>
    {!!$product->product_des!!} 

    <div class="col-lg-12">
        <p class="pt-4 mb-4 mt-4">
            &nbsp;
        </p>
    </div>
    @guest
        <div class="row">
            <div class="col-lg-6">
                <p>
                please 
                <span class="badge badge-warning p-2">
                    <a href="/login" class="text-white">
                        Login 
                        
                    </a>
                </span>
                <span class="far fa-home fa-x2"></span>
                to buy "{{$product->product_title}}"
                </p>
            </div>
            <div class="col-lg-6">
                <p>
                กรุณา 
                <span class="badge badge-warning p-2">
                    <a href="/login" class="text-white">
                        Login
                    </a>
                </span>
                เพื่อซื้อสินค้า "{{$product->product_title}}"
                </p>
            </div>
        </div>

    @endguest
</div>

@endsection
