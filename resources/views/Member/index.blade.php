@extends('Theme.classlist.landing')




@section('head_script')
<script>
    var ownId = "{!!Auth::user()->id!!}";
</script>

@endsection



@section('content')


    <member-whatnew ></member-whatnew>


@endsection
