<template>
<div class="card-body pt-2 mb-2">
    <form action="" @submit.prevent="save(saveId)" 
        @keydown="cT.errors.clear($event.target.name)">
        <div class="row">
            <div class="form-group col-md-6">
                <input v-model="cT.name" class="form-control mb-4" 
                        type="text" name="name" placeholder="name">


            </div>
            <div class="form-group col-md-6">
                <input v-model="cT.email" class="form-control" 
                type="email"  name="email" placeholder="email">
            </div>

            <div class="form-group col-md-12">
                <input v-model="cT.title" class="form-control" 
                type="text" name="title" ref="title" placeholder="title">
            </div>


            <div class="form-group col-md-12">
                <jodit-editor v-model="cT.body" 
                    height="350" 
                    width="100%"></jodit-editor>
            </div>


            <div class="form-group col-md-12 pt-4">
                    
                    <div class="float-left">

                        <label for="" >
                            <input v-model="cT.reply" type="checkbox" 
                            name="reply" class="form-control mb-4"> 
                            <span class="alert alert-success pt-2" 
                                v-if="cT.reply == true">
                                set as Reply
                            </span>
                            <span class="alert alert-warning pt-2" v-else>
                                set as NOT Reply
                            </span>
                        </label>

                    </div>

                    <div class="float-right">
                        <div class="btn-group">
                            <button class="btn btn-outline-primary" 
                                >
                                save
                            </button>
                        </div>
                    </div>
            </div>

            <div class="form-group col-md-12 pt-4" v-html="res_status">
                {{res_status}}
            </div>

        </div><!-- div.row -->
    </form>

</div>
</template>


<script>

import JoditEditor from 'jodit-vue'

export default{
    name:"ContactForm",
    props:["editId"],
    data(){
        return{
            saveId:'', 
            res_status:'',
            cT:new Form({
                title:'',
                email:'',
                body:'',
                reply:''
            })
        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods:{
        getEditData(x){
            if(x != 0){
                this.cT.reply = false
                let url = `/admin/contact/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        let fData = res.data.contact 
                        //console.log(fData.title)
                        this.cT.title = fData.title
                        this.$refs.title.focus()
                        this.cT.name = fData.name
                        this.cT.email = fData.email
                        this.cT.body = fData.body
                        this.saveId = fData.id
                        if(fData.replied_at != 'NO'){
                            this.cT.reply = true
                        }
                    
                    })
            }
        },
        save(id){
            let url = ''

            if(id){
                url = `/admin/contact/${id}`
                this.cT.submit("put",url)
                    .then((res)=>{
                        console.log(res.msg)
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`

                    })
            }else{

                url = `/admin/contact`
                this.cT.submit("post",url)
                    .then((res)=>{
//                        console.log(res.msg)
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)

                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
            }

            setTimeout(()=>{
                this.$emit('getContact')
                this.clear()
            },3000)
        },
        clear(){
            this.res_status = ""
            this.saveId = ''
            this.cT.name = ''
        }
    },
}
</script>
