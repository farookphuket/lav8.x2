<template>
    <div class="card mb-4">
        <div class="card-body">
            <form action="" >
                <div class="form-group">
                    <input v-model="pform.name" 
                            class="form-control" type="text" name="name" 
                            placeholder="Enter name">
                </div>

                <div class="form-group">
                    <input v-model="pform.email" placeholder="Enter email"
                            class="form-control" type="text" name="email">
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Enter new password or leave this field blank</p>
                    </div>
                    <div class="col-lg-6">
                        <input v-model="pform.password" class="form-control" 
                        type="password" name="password">
                    </div>
                    <div class="col-lg-6">
                        <input v-model="pform.password_confirmation" 
                        class="form-control" type="password"
                        name="password_confirmation">
                    </div>
                    <div class="col-lg-12">
                        <p class="p-4">
                            please enter your current password to keep change
                        
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <span v-html="res_status">{{res_status}}</span> 
                        &middot;
                        <span>
                            <b-icon icon="clock-history"></b-icon>
                            {{moment(last_update).fromNow()}}
                        </span>
                    </div>
                    <div class="col-lg-6">
                        <input v-model="pform.current_password" class="form-control" 
                        type="password" name="current_password">
                    </div>

                </div><!-- end div.row -->

            </form>
        </div>
        <div class="card-footer">
            <div class="clearfix">
                <div class="float-right">
                    <button class="btn btn-outline-primary" 
                        type="submit" @click.prevent="save(saveId)">
                        <b-icon icon="pencil"></b-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
var moment = require('moment')
export default{
    name:"ProfileForm",
    props:["user_id"],
    data(){
        return{
           saveId:0, 
            res_status:'',
            moment:moment,
            last_update:'',
            pform:new Form({
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
                current_password:'',
            })
        }
    },
    mounted(){
        this.getEditData(this.user_id)
    },
    methods:{
        getEditData(x){
            let url = `/admin/profile/${x}`
            axios.get(url)
                .then(res=>{
                    console.log(res.data)
                    let fData = res.data.user
                    this.pform.name = fData.name
                    this.pform.email = fData.email
                    this.last_update = fData.updated_at
                    this.saveId = fData.id
                })
        },
        save(id){
            let url = `/admin/profile/${id}`
            this.pform.submit('put',url)
                .then((res)=>{
                    this.res_status = res.msg
                })
                .catch((err)=>{
                    let ob = Object.values(err)
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join()}</span>`
                })
            setTimeout(()=>{
                this.getEditData(this.user_id)
                this.res_status = ''
                this.saveId = 0
            },3200)
        },
    },
}
</script>
