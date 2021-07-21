<template>
    <div class="card">
        <div class="card-body">
            <form action="">
                <div class="form-group">
                    <input v-model="tForm.tm_title" class="form-control" 
                        ref="tm_title"
                    type="text" name="tm_title" placeholder="Enter title">
                </div>
                <div class="form-group">
                    <select ref="tm_method" name="tm_method" 
                        class="form-control">
                        <option value="whatnew">whatnew</option>
                        <option value="blog">blog</option>
                    </select>
                </div>

                <div class="form-group">
                    <jodit-editor v-model="tForm.tm_excerpt" 
                        height="450"></jodit-editor>
                </div>

                <div class="form-group">
                    <jodit-editor v-model="tForm.tm_body" 
                        height="450"></jodit-editor>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-check form-switch">
                            <input v-model="tForm.tm_public" 
                            class="form-check-input" type="checkbox" 
                            name="tm_public">
                            <span class="badge badge-success p-2 " 
                                  v-if="tForm.tm_public != 0"
                                >
                                Public
                            </span>
                            <span class="badge badge-warning p-2 " 
                                  v-else
                                >
                                Private 
                            </span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="btn-group float-right">
                            <button type="submit" 
                                class="btn btn-outline-primary"
                                @click.prevent="save(saveId)">
                                <b-icon icon="pen"></b-icon>
                            </button>

                            <button  
                                class="btn btn-outline-danger"
                                @click.prevent="emForm">
                                <b-icon icon="backspace"></b-icon>
                            </button>
                        </div><!-- end of div.btn-group -->
                    </div><!-- end of div.col-lg-4 -->
                </div><!-- end of div.row -->
            </form>
        </div>
    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"TemplateForm",
    props:["editId"],
    data(){
        return{
            res_status:'',
            saveId:0,
            tForm:new Form({
                tm_title:'',
                tm_method:'',
                tm_excerpt:'',
                tm_body:'',
                tm_public:'',
            }),
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
                let url = `/member/template/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        console.log(res.data.template)
                        let tData = res.data.template 
                        this.tForm.tm_title = tData.tm_title
                        this.$refs.tm_method.value = tData.tm_method
                        this.$refs.tm_title.focus()
                        this.tForm.tm_excerpt = tData.tm_excerpt
                        this.tForm.tm_body = tData.tm_body
                        this.saveId = tData.id
                        if(tData.tm_public != 0) this.tForm.tm_public = true
                    })
            }
        },
        save(id){
            this.tForm.tm_method = this.$refs.tm_method.value
            let url = `/member/template`
            if(id){
                url = `/member/template/${id}`
                this.tForm.submit('put',url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger 
                        p-2">${Object.values(err).join()}</span>`
                    })


            }else{

                this.tForm.submit('post',url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger 
                        p-2">${Object.values(err).join()}</span>`
                    })


            }
            setTimeout(()=>{
                this.res_status = ''
                this.$emit('getTemplate')
            },3600)
        },
        emForm(){
            this.tForm.reset()
            this.res_status = ''
            setTimeout(()=>{
                this.$emit('getTemplate')
            },2500)
        },
    },
}
</script>
