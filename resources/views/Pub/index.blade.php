@extends('Theme.classlist.landing')




@section('head_script')


<script>

</script>
@endsection

@section('category')

    @if($blogs)
        <div class="category-list-item">
        <a href="/blog" no-follow>
        <div class="icon">
        <i class="lni lni-plane"></i>
        </div>
        <h3>Blog</h3>
        <p>
        บลอคโพส 

            
        </p>
           <span class="badge badge-info p2">
            {{count($blogs)}}
            </span>
        </a>
        </div>
    @endif
@endsection



@section('content')

@if($wn)
    @section("meta_title",$wn->whatnew_title)
@endif

<div class="col-md-12">
    <pub-photo></pub-photo>
</div>


@endsection

