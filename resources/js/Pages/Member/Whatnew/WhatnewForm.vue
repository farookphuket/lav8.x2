<template>
    <div>
        <div class="form form-horizontal" style="margin-bottom:4em;">
            <form action="" @submit.prevent="save(saveId)">
                <div class="form-group">
                    <select ref="sel_tm" @change="getTemplate" 
                        class="form-control">
                        <option value="0">--- Easy template select here ---</option>
                        <option :value="tm.id" v-for="tm in templates">
                        {{tm.tm_title}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input v-model="wnForm.title" class="form-control" 
                        ref="title"   type="text" 
                    name="title" placeholder="enter the title">
                </div>
                <div class="form-group">
                    <jodit-editor v-model="wnForm.body" 
                        height="450"></jodit-editor>
                </div>



                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-check ">
                          <label for="">
                          <input 
                             class="my-checkbox" type="checkbox" style="margin-right:2.05em;" 
                          v-model="wnForm.is_public" name="is_public">
                          </label>
                              <span class="alert alert-success" 
                                  v-if="wnForm.is_public != false">is public</span>
                              <span class="alert alert-danger" v-else>Private</span>
                        </div>
                    </div>

                    <div class="col-lg-4">

                        <div style="margin-top:2em;" v-html="res_status">
                            {{res_status}} status
                        </div>
                    </div>

                    <div class="col-lg-4">

                        <div class="float-right">
                            <div class="btn-group">
                                <button class="btn btn-outline-primary">
                                    <b-icon icon="pen"></b-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>

</template>


<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"WhatnewForm",
    props:["editId","templates"],
    data(){
        return{
            saveId:0,
            res_status:'',
            wnForm:new Form({
                title:'',
                body:'',
                is_public:false,
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
            this.clearForm()
            if(x != 0){
                let url = `/member/dashboard/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        let fData = res.data.whatnew
                        this.wnForm.title = fData.whatnew_title
                        this.$refs.title.focus()
                        this.wnForm.body = fData.whatnew_body

                        if(fData.is_public == '1'){
                            this.wnForm.is_public = true
                        }
                        this.saveId = fData.id
                        //console.log(res.data)
                    })
            }
        },
        save(id){
            let url = `/member/dashboard`
            if(id){
                url = `/member/dashboard/${id}`
                
                this.wnForm.submit("put",url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
            }else{

                this.wnForm.submit("post",url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.res_status = ''
                this.$emit('getWhatnew')
            },3500)
        },
        clearForm(){
            this.res_status = ''
            this.saveId = 0 
            this.wnForm.reset()
        },
        getTemplate(){
            let url = `/member/template/${this.$refs.sel_tm.value}`
            axios.get(url)
                .then(res=>{
                    let tData = res.data.template
                    this.wnForm.title = tData.tm_title
                    this.wnForm.body = tData.tm_excerpt
                })
            setTimeout(()=>{
                this.$refs.sel_tm.value = 0
            },600)

        },
    }
}
</script>
