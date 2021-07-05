@extends("Theme.SBAdmin.index")



@section('head_script')
<script>
var ownId = `{!!Auth::user()->id!!}`;
</script>
@endsection

@section("content")

<man-user></man-user>

@endsection
