@extends("Theme.classlist.list")



@section("meta_title","manage your template")


@section("content")

<member-template :user_id="{{Auth::user()->id}}"></member-template>

@endsection
