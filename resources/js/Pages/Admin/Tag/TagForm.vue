<template>
    <div style="padding-top:2em;">

            <form action="" @submit.prevent="save(saveId)">
                <div class="form-row align-items-center">
                    <div class="col-md-6 my-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                  <b-icon icon="tags"></b-icon>
                              </div>
                            </div>
                            <input type="text" class="form-control" 
                            placeholder="new tag" name="tag_name" 
                            ref="tag_name" v-model="tagForm.tag_name">
                        </div>
                    </div>
                    <div class="col-auto my-1">
                        <button type="submit" 
                            class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>

    </div>
</template>


<script>


export default{
    name:"TagForm",
    props:["editId"],
    data(){
        return{
            saveId:0,
            tagForm:new Form({
                tag_name:''
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
                this.$refs.tag_name.focus()
                let url = `/admin/tag/${x}/edit`
                axios.get(url)
                    .then(res=>{

                        let fData = res.data.tag
                        this.tagForm.tag_name = fData.tag_name
                        
                        this.saveId = fData.id
                    })
            }
        },
        save(id){
           let url = ''
            if(this.tagForm.tag_name != '' && this.tagForm.tag_name.length >= 3){

                if(id){
                    url = `/admin/tag/${id}`
                    this.tagForm.submit("put",url)
                        .then((res)=>{
                            this.res_status = res.msg
                            this.$emit('box',this.res_status)
                        })
                        .catch((err)=>{
                            let ob = Object.values(err)
                            this.res_status = `<span class="alert alert-danger">
                                ${ob.join()}</span>`

                            this.$emit('box',this.res_status)
                        })
                }else{
                    url = `/admin/tag`
                    this.tagForm.submit('post',url)
                        .then((res)=>{
                            this.res_status = res.msg
                            this.$emit('box',this.res_status)
                        })
                        .catch((err)=>{
                            let ob = Object.values(err)
                            this.res_status = `<span class="alert alert-danger">
                                ${ob.join()}</span>`
                            this.$emit('box',this.res_status)
                        })

                    
                }
                setTimeout(()=>{
                    this.$emit('getTags')
                },3500)
            }
        },
    },
}
</script>
