<template>
    <div class="container-fluid">
        <h1>my comment</h1>

        <comment-list :comments="comments" 
        :user_id="user_id" @del="del($event)"
        :showPagination="showPagination" 

        ></comment-list>
    </div>
</template>

<script>
import CommentList from "./CommentList.vue";
export default {
    name: "MemberComment",
    props:["user_id"],
    components: {
        CommentList,
    },
    data() {
        return {
            comments: "",
            showPagination:false,
        };
    },
    mounted() {
        this.getComment();
    },
methods: {
             getComment(page){
                 let url = ''
                     if(page){
                         url = page 
                         this.$cookies.set('mcomment_old_page',url)
                     }
                     url = this.$cookies.get("mcomment_old_page")
                         if(!url){
                             url = `/member/getComment`
                         }
                         axios.get(url)
                             .then(res=>{
                                 this.comments = res.data.comments
                                 if(Object.keys(this.comments.data).length >= 2) this.showPagination = true
                                     })
             },
             del(id){
                alert(`delete ${id}`)
             },
         },
};
</script>
