<template>
    <div class="mt-2">



       <div class="card mt-4" v-for="co in comments.data">
           <div class="card-body" v-for="comment in co.comments">
                <h3 class="mt-4 mb-2 
                text-center">{{comment.comment_title}}</h3>
                <div class="mt-2 mb-4" v-html="comment.comment_body">
                    {{comment.comment_body}}
                </div>

                <!-- show user comment info START -->
                <div class="row">
                    <div class="col-lg-4">
                        <span class="badge badge-info p-2 ">
                            <b-icon icon="calendar2-day"></b-icon>
                            <a href="" :title="moment(comment.created_at)" 
                            class="text-white">
                                {{moment(comment.created_at).fromNow()}}
                            </a>
                        </span>
                    </div>
                    <div class="col-lg-8">
                        <div class="float-right btn-group">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="showReplyForm(comment.id)" 
                            :disabled="disabled">
                                <b-icon icon="pencil"></b-icon>
                            </button>

                            <button class="btn btn-outline-danger">
                                <b-icon icon="trash"></b-icon>
                            </button>
                        </div>
                    </div>
                    <!-- comment form START -->
                    <div class="col-lg-12 mt-4 mb-4" v-if="replyItem[comment.id]">
                        <form action="">
                            <div class="form-group">
                                <jodit-editor v-model="rcForm.comment_body" 
                                height="450"></jodit-editor>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div v-html="res_status">
                                        {{res_status}}
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="btn-group float-right">
                                        <button class="btn btn-outline-primary" 
                                        type="submit" @click.prevent="save(comment.id)">
                                            <b-icon icon="pen"></b-icon>
                                        </button>

                                        <button class="btn btn-outline-danger" 
                                        @click="hideReplyForm(comment.id)">
                                            <b-icon icon="x-circle"></b-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- comment form END -->
                </div>
                <!-- show user comment info END -->
                <p class="mt-4">&nbsp;</p>
                <hr class="mt-4 mb-4">
                
           </div>
       </div>

<!--======= pagination START ===============================================-->
        <div class="col-lg-12 mt-4">
            <p>pagination</p>
        </div>
<!--======= pagination END ===============================================-->
    </div>
</template>

<script>
var moment = require("moment")
import JoditEditor from 'jodit-vue'
export default{
    name:"CommentList",
    props:["comments","blog_id"],
    data(){
        return{
            moment:moment,
            replyItem:[],
            res_status:'',
            isShow:false,
            disabled:false,
            rcForm:new Form({
                comment_body:'',
                comment_id:'',
                blog_id:this.blog_id,
                    }),
        }
    },
methods:{

            showReplyForm(id){
                this.isShow = true
                this.disabled = true
                this.rcForm.comment_id = id
                this.$set(this.replyItem,id,true)
            },
            hideReplyForm(id){

                this.isShow = false
                this.disabled = false
                this.$set(this.replyItem,id,false)
            },
            save(id){
                let url = `/admin/comment/${id}`
                this.rcForm.submit('put',url)
                .then((res)=>{
                    this.res_status = res.msg
                        })
                .catch((err)=>{
                    this.res_status = `<span class="alert alert-danger">
                        ${Object.values(err).join()}
                    </span>`
                        })
                setTimeout(()=>{
                    this.$emit('getComment')
                    this.res_status = ''
                    this.hideReplyForm(id)
                        },3200)
            },
        },
}
</script>
