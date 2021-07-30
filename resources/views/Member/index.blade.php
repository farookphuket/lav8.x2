@extends('Theme.classlist.landing')




@section('head_script')
<script>
    var ownId = "{!!Auth::user()->id!!}";
</script>

@endsection



@section('content')
    
    @section("meta_title",$whatnew->whatnew_title)

    <member-whatnew ></member-whatnew>


@endsection
