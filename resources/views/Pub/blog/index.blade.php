@extends("Theme.classlist.list")





@section('content')

    @if($blog->title)
        @section("meta_title",$blog->title)
    @endif
<pub-blog></pub-blog>


@endsection
