<template>
    <div>
        <h2 class="text-center">
            Comments({{num_comment}})
        </h2>
        <comment-list :comments="comments" :blog_id="blog_id" 
        @getComment="getComment($event)" :showPagination="showPagination"

        ></comment-list>
    </div>
</template>

<script>
import CommentList from './BlogCommentList.vue'
export default{
    name:"AdminComment",
             components:{
                 CommentList,
             },
    props:["blog_id"],
    data(){
        return{
            comments:'',
            num_comment:0,
            showPagination:false,
        }
    },
    mounted(){
        this.getComment()
    },
methods:{
            getComment(page){
                this.showPagination = false
                let url = ""
                if(page){
                    url = page 
                    this.$cookies.set("admin_blog_comment_old_page",url)
                }
                url = this.$cookies.get("admin_blog_comment_old_page")
                if(!url) url = `/getBlogComment/${this.blog_id}`

                axios.get(url)
                    .then(res=>{
                        //console.log(res.data.comments)
                        this.comments = res.data.comments

                        // get the comment list including this specific 
                        // blog id
                        let c_co = res.data.comments.data 
                        c_co.forEach((val)=>{
                            console.log(val.comments)
                            this.num_comment = val.comments.length
                        })

                    })

            },
        },
}
</script>
