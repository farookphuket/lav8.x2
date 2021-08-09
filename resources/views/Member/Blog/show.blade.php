@extends('Theme.classlist.show')




@section('content')

@if(!$blog->isEmpty())
    <!-- found some data -->
    @foreach($blog as $it)

        @section("meta_title",$it->title)

        @section("meta_keywords",$it->title)

        @section("meta_des",$it->title)

                <h4 class="mb-4">{{$it->title}}</h4>

                    <span class="mr-4">
                        <b-icon icon="person"></b-icon>
                        {{$it->user->name}}
                    </span>

                    <span class="mr-4">
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




            <div class="mt-4 mb-6">
                {!!$it->body!!}
            </div>
            <p class="mt-4 mb-4">&nbsp;</p>
            <hr class="mt-4 mb-4">
            
            <blog-comment :blog_id="{{$it->id}}" 
                    :user_id="{{Auth::user()->id}}"></blog-comment>

            

    @endforeach
@else
    <!-- from github -->



    <!-- from github -->
@endif


@endsection
