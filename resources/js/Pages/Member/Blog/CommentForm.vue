<template>
    <div class="add-review-wrapper mt-4">
        
        <form action="" class="mt-6" @submit.prevent="save(save_id)">
            <div class="form-group">
                <input v-model="cForm.comment_title" class="form-control" type="text" 
                name="comment_title" placeholder="Enter the title">
                <input type="hidden" name="blog_id" :value="blog_id">
            </div>

            <div class="form-group">
               <jodit-editor v-model="cForm.comment_body" name="comment_body"
                   height="430"></jodit-editor>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <span v-html="res_status">{{res_status}}</span>
                </div>
                <div class="col-md-6">
                    <button type="submit"
                        class="btn btn-outline-primary float-right">
                        Sent
                    </button>
                </div>
            </div>
        </form>



        <b-modal title="server said" ref="onOk" 
            centered ok-only>

            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
        <div class="mt-8 mb-8">
            <p class="mb-8">&nbsp;</p>
        </div>
    </div>
</template>



<script>
import JoditEditor from 'jodit-vue'

export default{
    name:"commentForm",
    props:["blog_id"],
    data(){
        return{
            save_id:0,
            res_status:'',
            cForm:new Form({
                blog_id:'',
                comment_title:'',
                comment_body:''
            }),
        }
    },
    methods:{
        save(id){
            let url = ''
            this.cForm.blog_id = this.blog_id
            if(id){
                url = `/member/updateComment/${id}`
            }else{
                url = `/member/comment`
                this.cForm.submit("post",url)
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

                setTimeout(()=>{
                    this.$emit('getComments')
                    this.res_status = ''
                },3000)
            }
        },
    },
}
</script>
