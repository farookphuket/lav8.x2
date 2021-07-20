<template>
    <div class="card">
        <div class="card-body">
            <form action="" >
                <div class="form-group">
                    <input v-model="tForm.tm_title" class="form-control" 
                    type="text" name="tm_title" ref="tm_title">
                </div>

                <div class="form-group">
                    <input v-model="tForm.tm_method" class="form-control" 
                    type="text" name="tm_method">
                </div>
                <div class="form-group">
                    <jodit-editor height="450" 
                        v-model="tForm.tm_excerpt"></jodit-editor>
                </div>

                <div class="form-group">
                    <jodit-editor height="450" 
                        v-model="tForm.tm_body"></jodit-editor>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <!-- select option -->
                    <div class="col-lg-3">
                        <label for="">
                            <input v-model="tForm.tm_public" 
                            class="form-control mb-3" type="checkbox" 
                            name="tm_public">
                            <span class="alert alert-success mt-2" 
                                v-if="tForm.tm_public != 0">
                                Public
                            </span>
                            <span class="alert alert-warning" v-else>
                                Private
                            </span>
                        </label>

                    </div>
                    <!-- select option -->

                    <!-- approve -->
                    <div class="col-lg-6">
                        <select v-model="sel_approve" 
                            name="tm_approved_at" 
                            class="form-control mb-2">
                            <option value="0">Not Approve</option>
                            <option value="1">Approve</option>
                        </select>

                        <div class="btn-group float-right">
                            <button class="btn btn-outline-primary" 
                                @click.prevent="save(saveId)"
                                >
                                <b-icon icon="pencil"></b-icon>
                            </button>
                        </div>
                    </div>
                    <!-- approve -->

                </div>
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
            sel_approve:0,
            tForm:new Form({
                tm_title:'',
                tm_method:'',
                tm_excerpt:'',
                tm_body:'',
                tm_public:'',
                tm_approved_at:'',
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
                let url = `/admin/template/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        console.log(res.data.template)
                        let fData = res.data.template
                        this.saveId = fData.id
                        this.tForm.tm_title = fData.tm_title

                        this.$refs.tm_title.focus()

                        this.tForm.tm_method = fData.tm_method 
                        
                        this.tForm.tm_excerpt = fData.tm_excerpt
                        this.tForm.tm_body = fData.tm_body

                        if(fData.tm_public != 0){
                            this.tForm.tm_public = true
                        }
                        if(fData.tm_approved_at != null){
                            this.sel_approve = "1"
                        }
                    })
            }
        },
        save(id){
            let url = `/admin/template`
            this.tForm.tm_approved_at = this.sel_approve

            if(id){
                url = `/admin/template/${id}`
                this.tForm.submit('put',url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                        this.$emit('showBox',this.res_status)
                    })

            }else{}


            setTimeout(()=>{
                this.$emit('getTemplate')
            },1000)
        },
    },
}
</script>
