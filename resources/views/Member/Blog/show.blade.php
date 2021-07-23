@extends('Theme.classlist.show')




@section('content')

@if(!$blog->isEmpty())
    <!-- found some data -->
    @foreach($blog as $it)

        @section("meta_title",$it->title)

        @section("meta_keywords",$it->title)

        @section("meta_des",$it->title)

                <h4>{{$it->title}}</h4>

                    <span>
                        <b-icon icon="person"></b-icon>
                        {{$it->user->name}}
                    </span>

                    <span>
                        <a href="#" 
                            title="{{$it->created_at}}">
                            <b-icon icon="calendar2-day"></b-icon>
                            {{$it->created_at->diffForHumans()}}
                        </a>
                    </span>

                    @if(count($it->tags) >= 1)

                        Tags :
                        @foreach($it->tags as $tag)
                            <span>
                                <b-icon icon="tag"></b-icon>
                                {{$tag->tag_name}}
                            </span>
                        @endforeach
        
                    @endif




            <div>
                {!!$it->body!!}
            </div>

            <blog-comment :blog_id="{{$it->id}}"></blog-comment>

            

    @endforeach
@else
    <!-- from github -->



    <!-- from github -->
@endif


@endsection
