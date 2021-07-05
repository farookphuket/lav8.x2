@extends('Theme.classlist.landing')




@section('head_script')


<script>

</script>
@endsection

@section('content')

@if($wn)
    @section("meta_title",$wn->whatnew_title)
@endif

<div class="col-md-12">
    <pub-photo></pub-photo>
</div>


@endsection

