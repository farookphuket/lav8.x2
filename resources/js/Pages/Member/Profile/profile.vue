<template>
    <div>
        <profile-form :user_id="user_id"></profile-form>
    </div>
</template>


<script>
import ProfileForm from './form.vue'
export default{
    name:"MemberProfile",
    props:["user_id"],
    components:{
        ProfileForm,
    }
}
</script>
