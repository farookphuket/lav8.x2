<template>
    <div class="card mb-10 pt-10" style="margin-bottom:20px;">
        <div class="card-header">
            <h2 class="card-title">Comment form</h2>
        </div>
        <div class="card-body">
            <form action="" >
                <div class="form-group">
                    <input v-model="cform.comment_title" class="form-control" 
                    placeholder="Comment title"
                    type="text" name="comment_title" ref="title">
                </div>
                <div class="form-group">
                    <jodit-editor 
                        v-model="cform.comment_body" height="350"></jodit-editor>
                </div>

            </form>
        </div>
        <div class="card-footer">

                <div class="row">
                    <div class="col-lg-6">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <div class="col-lg-6">
                        <button type="submit" @click.prevent="save(saveId)"
                            class="btn btn-outline-primary float-right">
                            save
                        </button>
                    </div>
                </div>

        </div>
    </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"CommentForm",
    props:["editId"],
    data(){
        return{
            saveId:'',
            res_status:'',
            cform:new Form({
                comment_title:'',
                comment_body:''
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
            let url = `/admin/comment/${x}`
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    let fData = res.data.comment
                    this.$refs.title.focus()
                    fData.forEach((val)=>{
                        //console.log(val.comment_title)
                        if(val.id == x){
                            this.cform.comment_title = val.comment_title
                            this.cform.comment_body = val.comment_body
                            this.saveId = val.id
                        }
                    })
                })
        },
        save(id){
            let url = `/admin/comment/${id}`
            this.cform.submit('put',url)
                .then((res)=>{
                    //console.log(res.msg)
                    this.res_status = res.msg
                })
                .catch((err)=>{
                    let ob = Object.values(err)
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join()}</span>`
                })
            setTimeout(()=>{
                this.$emit('getComments')
                this.res_status = ''
            },2300)
        },
    },


}
</script>
