<template>
    <div>
        <form action="#" @submit.prevent="save(user_id)">
            <div class="form-group">
                <input v-model="userForm.name" 
                       placeholder="Enter user name"
                    class="form-control"
                    type="text" name="name">
            </div>

            <div class="form-group">
                <input v-model="userForm.email" 
                    class="form-control"
                    type="email" name="email" placeholder="Enter your email">
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div style="text-align:center">
                        <p>
                            put the new password 

                        </p>
                        <p style="color:red;font-weight:bold;">
                        * or leave this blank if you do not want to change the 
                        password.
                        </p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <input v-model="userForm.password" 
                    class="form-control" type="text" name="password" 
                    placeholder="Enter new password or leave this field blank">
                </div>
                <div class="col-lg-6">
                    <input v-model="userForm.pass_conf" class="form-control" 
                    type="password" name="pass_conf" 
                    placeholder="Enter your new password again">

                </div>
            </div>
            <div class="row">
                <div class="col-lg-8" 
                    style="margin-top:2.05em;margin-buttom:1.05em;">
                    <p>
                        Enter your current password in order to keep the 
                        change
                    </p>
                    <p>
                        กรุณาใส่รหัสผ่านเดิมของท่านเพื่อยืนยันการเปลี่ยนแปลง
                    </p>
                </div>
                <div class="col-lg-4" 
                    style="margin-top:2.05em;margin-buttom:1.05em;">
                    <input v-model="userForm.cur_pass" class="form-control" 
                    type="password" name="cur_pass" 
                    placeholder="confirm change">
                </div>
            </div>
            <div class="row">
               <div class="col-lg-6">
                    <div class="float-left" style="margin-top:4em;">
                        <span v-html="res_status">{{res_status}}</span>
                        <span v-show="last_update">
                            {{moment(last_update).fromNow()}}
                        </span>
                    </div>
               </div>
               <div class="col-lg-6" style="margin-top:4em;">
                    <div class="float-right">
                        <button type="submit"
                            class="btn btn-outline-primary">
                            save
                        </button>
                    </div>
               </div>
            </div>
        </form>
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"ProfileForm",
    props:["user_id"],
    data(){
        return{
            res_status:'',
            last_update:'',
            moment:moment,
            userForm:new Form({
                name:'',
                email:'',
                password:'',
                pass_conf:'',
                cur_pass:'',
                user_id:''
            })
        }
    },
    mounted(){
        this.getEditData(this.user_id)
    },
    methods:{
        getEditData(x){
            let url = `/member/profile/${x}`
            axios.get(url)
                .then(res=>{
                  //  console.log(res.data.user)
                    let fData = res.data.user
                    this.userForm.name = fData.name 
                    this.userForm.email = fData.email
                    this.last_update = fData.updated_at
                })
        },
        save(id){
            let url = `/member/profile/${id}`
            this.userForm.submit('put',url)
                .then((res)=>{
                    this.res_status = res.msg
                })
                .catch((err)=>{
                    let ob = Object.values(err)
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join()}</span>`
                })
            setTimeout(()=>{
                this.getEditData(id)
                this.res_status = ''
            },2500)
        },
    },
}
</script>
