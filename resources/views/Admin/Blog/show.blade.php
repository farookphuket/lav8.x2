@extends("Theme.SBAdmin.index")


@section("content")
    @section("meta_title",$blog->title)
<div class="container">
    <div class="content-title" style="margin-top:4em;">
        <h3>
            {{$blog->title}}
        </h3>
    </div>
    <div>
        {!!$blog->body!!}
        
    </div>
    <ul>
        @if(count($blog->tags)>= 1)
            @foreach($blog->tags as $item)
                <li>
                    <b-icon icon="tags"></b-icon>
                    {{$item->tag_name}}
                </li>
            @endforeach
        @endif
    </ul>
</div>

@endsection
