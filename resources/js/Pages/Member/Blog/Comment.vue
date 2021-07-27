<template>
    <div class="review-body pt-20 mb-20"
        >
        <comment-form :blog_id="blog_id" @getComments="getComments($event)" 
            @box="box($event)" :editId="editId"></comment-form>

        <comment-list :comments="comments" :showPagination="showPagination"
            :slug="slug" :blog_id="blog_id" 
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
    props:["blog_id"],
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
                    if(Object.keys(this.comments.data).length >=2) this.showPagination = true

                })
        },
        box(msg){
            this.res_status = msg
            this.$refs["onOk"].show()
        },
    },
}
</script>
