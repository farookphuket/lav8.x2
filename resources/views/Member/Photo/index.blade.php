@extends('Theme.classlist.list')

@section('head_script')
<script>
 var ownId = "{!!Auth::user()->id!!}";
</script>

@endsection

@section('content')
<div class="container">
    <member-photo></member-photo>
</div>

@endsection
