<template>
    <div class="container-fluid">

        <h1 class="mt-4">Profile</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Profile</li>
        </ol>

        <div class="card mb-4">
            <div class="card-body">
                DataTables is a third party plugin that is used to generate the
                demo table below. For more information about DataTables, please
                visit the
                <a target="_blank" href="https://datatables.net/"
                    >official DataTables documentation</a
                >
                .
            </div>
        </div>


        <profile-form :user_id="user_id"></profile-form>

    </div>
</template>

<script>
import ProfileForm from './ProfileForm.vue'

export default{
    name:"AdminProfile",
    props:["user_id"],
    components:{
        ProfileForm,
    }
}
</script>
