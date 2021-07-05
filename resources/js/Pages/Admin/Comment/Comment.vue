<template>
    <div class="container-fluid">
        <h1 class="mt-4 p-4">Comment</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Comment</li>
        </ol>
        <comment-form :editId="editId" 
            @getComments="getComments($event)"></comment-form>
       <comment-list :comments="comments" 
            @edit="edit($event)"
           @getComments="getComments($event)"></comment-list>
    </div>
</template>

<script>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'
export default{
    name:"ManComment",
    components:{
        CommentList,
        CommentForm,
    },
    data(){
        return{
            comments:[],
            res_status:'',
            editId:'',
        }
    },
    mounted(){
        this.getComments()
    },
    methods:{
        getComments(page){
            let url = ''

            if(page){
                url = page
            }
            url = `/admin/getComments`
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.comments = res.data.comments
                })
        },
        edit(id){
            this.editId = id
        },
    },
}
</script>
