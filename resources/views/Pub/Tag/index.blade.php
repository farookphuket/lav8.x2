@extends("Theme.base.b2")

@section("meta_title","show by tag list")

@section("content")

<div class="col-lg-12 ">
    <div class="left-wrapper">
        <div class="feature-style-6 bg-white pt-0 pb-60">
            <div class="row">

        @if(count($tag_blog) >= 1)
            <div class="col-lg-12" style="margin-bottom:4em;">
                <h3 class="text-center" >
show by tag name
                </h3>
            </div>
            @foreach($tag_blog as $item)
                
            @if(count($item->blogs) >= 1)
            <div class="col-lg-6 col-md-6">
                <div class="single-feature">
                    <div class="content">

                            <h5>
                                <a href="#" class="active disabled">
                                    {{$item->tag_name}}
                                </a>
                            </h5>
                            @foreach($item->blogs as $x2)
                                <p>
                                    <a href="{{url("blog/$x2->slug")}}">
                                        {{$x2->title}}
                                    </a> &middot; 
                                    <a href="{{url("blog/$x2->slug")}}" 
                                        target="_blank" 
                                        title="open link in new tab">
                                        <b-icon icon="box-arrow-up-right"></b-icon>
                                    </a>
                                </p>
                            @endforeach
                    </div>
                </div>
            </div>
                
                @endif
            @endforeach
        @endif






</div>

<!--
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item disabled">
            <a class="page-link" href="#0" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#0">1</a></li>
            <li class="page-item"><a class="page-link" href="#0">2</a></li>
            <li class="page-item"><a class="page-link" href="#0">3</a></li>
            <li class="page-item">
            <a class="page-link" href="#0">Next</a>
            </li>
        </ul>
    </nav>
-->
</div>
</div>
</div>


@endsection
