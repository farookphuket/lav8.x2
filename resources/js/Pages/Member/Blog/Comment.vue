<template>
    <div class="review-body pt-20 mb-20"
        >
            <h2 class="text-center mt-4 mb-4">
                comments({{num_comment}})
            </h2>
            <p class="mt-2 mb-4">
                write your comment.
            </p>
        <comment-form :blog_id="blog_id" @getComments="getComments($event)" 
            @box="box($event)" :editId="editId"></comment-form>

        <comment-list :comments="comments" :showPagination="showPagination"
            :slug="slug" :blog_id="blog_id" :num_comment="num_comment"
            :user_id="user_id" @del="del($event)"
            @getComments="getComments($event)"></comment-list>

        <b-modal ref="onOk" title="server said :" 
         centered   ok-only>
            <div class="container" style="padding:4em;" 
                v-html="res_status">{{res_status}}
            </div>
        </b-modal>
    </div>

</template>

<script>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'
export default{
    name:"BlogComment",
    props:["blog_id","user_id"],
    components:{
        CommentForm,
        CommentList,
    },
    data(){
        return{
            res_status:'',
            editId:'',
            comments:[],
            cook_blog_id:'',
            slug:'',
            showPagination:false,
            num_comment:0,

        }
    },
    mounted(){

        if(parseInt(this.$cookies.get("cook_blog_id")) != this.blog_id){
            this.$cookies.remove("mcomment_old")

        }

        this.getComments()
    },
    methods:{
        getComments(page){

            this.$cookies.set("cook_blog_id",this.blog_id)
            let url = ''
            if(page){
                url = page+"&blog_id="+this.blog_id
                this.$cookies.set('mcomment_old',url)

            }
            url = this.$cookies.get('mcomment_old')
            if(!url){
                url = `/getComments?blog_id=${this.blog_id}`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.comments = res.data.comments
                    this.slug = res.data.slug
                    if(Object.keys(this.comments.data).length >=12) this.showPagination = true

                    this.num_comment = this.comments.data.length

                })
        },
        del(id){
            if(confirm(`this will be permantly remove the comment id ${id} \n 
                        are you sure? `) == true){
                alert(id)
            }
        },
        box(msg){
            this.res_status = msg
            this.$refs["onOk"].show()
        },
    },
}
</script>
