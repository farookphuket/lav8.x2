<template>
    
    <div class="review-item-wrapper mt-8">
        <p class="mt-8">&nbsp;</p>
        <div class="float-right mt-8 mb-2">
            Comments <span class="badge badge-info p-2">{{comments.total}}</span>
        </div>
        <div class="review-item mt-8 mb-30" 
            v-for="co in comments.data">
            <div class="media mb-4">
                <div class="info mr-4">
                    <h4 class="">
                        {{co.user.name}} 
                    </h4>
                </div>
                <div class="rating">
                    <div class="float-right">
                        <span>{{moment(co.created_at).fromNow()}}</span>
                    </div>
                </div>
            </div>

                <h3 class="text-center mb-4">{{co.comment_title}}</h3>
                <div class="mt-4 mb-4"
                v-html="co.comment_body">
                    {{co.comment_body}}
                </div>

               <div class="row">
                   <div class="col-lg-6">

                   </div>
                   <div class="col-lg-6">
                        <div class="float-right btn-group">
                            <button class="btn btn-outline-danger" 
                            v-if="user_id == co.user_id" 
                            @click.prevent="$emit('del',co.id)">
                                <b-icon icon="trash"></b-icon>
                            </button>

                            <button class="btn btn-outline-primary mb-4" 
                           @click="showReplyForm(co.id)" v-show="isShow" 
                            v-else>
                                <b-icon icon="pencil"></b-icon>
                            </button>
                        </div>
                   </div>
                   <div class="col-lg-12 mt-8" v-if="replyItem[co.id]">
                        <form action="">
                            <div class="form-group">

                               <jodit-editor v-model="rcForm.comment_body" 
                               placeholder="Enter the comment (required at 
                               least 50 charecters)"
                               height="450"></jodit-editor>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <span v-html="res_status">{{res_status}}</span>
                                </div>
                                <div class="col-md-6">
                                    <div class="float-right btn-group">
                                        <button class="btn btn-outline-primary 
                                        " 
                                        type="submit"
                                        @click.prevent="saveComment(co.id)">
                                            <b-icon icon="pen"></b-icon>
                                        </button>

                                        <button class="btn btn-outline-danger 
                                        " @click="hideReplyForm(co.id)">
                                            <b-icon icon="x-circle"></b-icon>
                                        </button>
                                    </div>
                                </div><!-- end of div.col-md-6 -->
                            </div><!-- end of div.row -->
                        </form>
                   </div>
               </div>
            <hr class="mt-4 mb-4">
            
        </div>

                <div class="nav-scroller py-1 mb-2 mt-4" v-show="showPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{comments.from}}
                                    to <span>{{comments.to}}</span> of
                                    <span>{{comments.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in comments.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getComments',li.url)">
                                    {{li.label}}
                                </a>
                                <span class="page-link active"
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{comments.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
    </div>
</template>


<script>
var moment = require("moment")
import JoditEditor from 'jodit-vue'

export default{
    name:"CommentList",
    props:["comments","blog_id","slug","showPagination","user_id"],
    data(){
        return{
            moment:moment,
            replyItem:[],
            res_status:'',
            isShow:true,
            rcForm:new Form({
                comment_body:'',
                comment_id:0,
                blog_id:this.blog_id
                    }),
        }
    },
methods:{
            showReplyForm(id){
                    this.isShow = false
                    this.rcForm.comment_id = id
                    this.$set(this.replyItem,id,true)
            },
            hideReplyForm(id){
                    this.isShow = true
                    this.rcForm.comment_id = id
                    this.$set(this.replyItem,id,false)
            },
            saveComment(id){
                let url = `/member/comment/${id}`
                this.rcForm.submit('put',url)
                .then((res)=>{
                        this.res_status = res.msg

                        })
                .catch((err)=>{
                    this.res_status = `<span class="alert alert-danger">
                    ${Object.values(err).join()}</span>`
                        })
                setTimeout(()=>{
                    this.res_status = ''
                    this.$emit('getComments')
                    this.hideReplyForm(id)
                        },700)
            },
        },

}
</script>
