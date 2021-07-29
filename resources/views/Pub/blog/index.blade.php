@extends("Theme.classlist.list-no-ads")





@section('content')

    @if($blog->title)
        @section("meta_title",$blog->title)
    @endif
<pub-blog></pub-blog>


@endsection
