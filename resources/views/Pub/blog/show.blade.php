@extends("Theme.classlist.show")


@section('content')

@foreach($blog as $item)

    @section('meta_title',$item->title)    
        

    <h4>{{$item->title}}</h4>
    <span>
        <i class="mr-2 lni lni-calendar"></i>
        {{$item->created_at}}
        &middot;
        {{$item->created_at->diffForHumans()}}
    </span>
    <span>
        <i class="mr-2 lni lni-user"></i> 
        {{$item->user->name}}
    </span>
    <div style="margin-top:2em;">
        {!!$item->excerpt!!}
    </div>
    <div style="margin-top:2em;">
        {!!$item->body!!}
    </div>

    <div class="meta-bottom" style="margin-bottom:4em;">
        <ul>

            @foreach($item->tags as $ta)
            <li>

                <b-icon icon="tags"></b-icon>
                <span>Tag: </span> 
                <a href="#" no-follow>{{$ta->tag_name}}</a>
            </li>
            @endforeach

        </ul>
    </div>
    
    @include("INC.end_content")
    <pub-comment :blog_id="{!!$item->id!!}"></pub-comment>
    @endforeach
@endsection
