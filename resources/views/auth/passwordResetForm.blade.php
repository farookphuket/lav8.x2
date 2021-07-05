@extends('auth.auth')


@section('head_script')
<script>
    var time_left = "{!!$time_left!!}";
    var msg = `{!!$msg!!}`;
    var token = `{!!$token!!}`;
</script>
@endsection

@section('content')
<reset-password></reset-password>
@endsection
