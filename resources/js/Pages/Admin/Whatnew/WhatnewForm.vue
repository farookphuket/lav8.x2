<template>
    <div class="card-body">
        <form action="" @submit.prevent="save(saveId)">
            <div class="form-group">
                <select ref="sel_tmp" name="sel_tmp" class="form-control" 
                    @change="getTemplate">
                    <option value="0">--- Easy template select here ---</option>
                    <option :value="tm.id" v-for="tm in template">
                    {{tm.tm_title}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <input v-model="wnForm.title" class="form-control" 
                 type="text" ref="title"
                name="title" placeholder="Enter the title">
            </div>
            <div class="form-group">
                <jodit-editor 
                    height="550" v-model="wnForm.body"></jodit-editor>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <label for="">
                        <input v-model="wnForm.is_public" class="form-control" 
                        style="margin-bottom:1em;"
                        type="checkbox" name="is_public">
                        <span class="alert alert-warning" 
                            v-if="wnForm.is_public != true">
                            Private
                        </span>
                        <span class="alert alert-success"
                            v-else>
                            Public
                        </span>
                    </label>
                </div>
                <div class="col-lg-4">
                    <div v-html="res_status">
                        {{res_status}}
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="btn-group float-right">

                            <button class="btn btn-outline-primary" 
                                type="submit">
                                <b-icon icon="pencil"></b-icon>
                            </button>

                            <button class="btn btn-outline-danger" 
                                type="button" @click="clearForm">
                                <b-icon icon="trash"></b-icon>
                            </button>

                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"WhatnewForm",
    props:["editId","template"],
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    data(){
        return{
            saveId:0,
            res_status:'',
            wnForm:new Form({
                title:'',
                body:'',
                is_public:false
            })
        }
    },
    methods:{
        getEditData(id){
            if(id != 0){
                this.$refs.title.focus()
                let url = `/admin/whatnew/${id}`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data.whatnew.whatnew_title)

                        let fData = res.data.whatnew
                        this.saveId = fData.id
                        this.wnForm.title = fData.whatnew_title
                        this.wnForm.body = fData.whatnew_body
                        if(parseInt(fData.is_public) != 0){
                            this.wnForm.is_public = true
                        }
                    })
            }
        },
        save(id){
            let url = `/admin/whatnew`
            if(id){
                url = `/admin/whatnew/${id}`
                this.wnForm.submit("put",url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })
            }else{
                this.wnForm.submit('post',url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.clearForm()
                this.$emit('getWn')
                
            },3200)
        },
        clearForm(){
            this.wnForm.reset()
            this.res_status = ''
            this.saveId = 0
        },
        getTemplate(){
            let url = `/admin/template/${this.$refs.sel_tmp.value}`
            axios.get(url)
                .then(res=>{
                  let tData = res.data.template  
                    this.wnForm.title = tData.tm_title
                    this.wnForm.body = tData.tm_excerpt
                })
            setTimeout(()=>{
                this.$refs.sel_tmp.value = '0'
            },2300)
        },
    },
}
</script>
