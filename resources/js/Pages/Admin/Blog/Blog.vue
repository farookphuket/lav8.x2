<template>
    <div class="container-fluid">

        <blog-form :editId="editId" :category="category"
            :tags="tags" @box="box($event)" 
            @getBlogs="getBlogs($event)" :template="template"></blog-form>

        <blog-list :blogs="blogs" 
            @openMe="openMe($event)" 
            @edit="edit($event)" 
            @del="del($event)" 
            @getBlogs="getBlogs($event)"></blog-list>



        <b-modal ref="onOk" title="server said :" ok-only>
            <div class="container" 
                v-html="res_status">{{res_status}}</div>
        </b-modal>
    </div>
</template>

<script>
import BlogList from './BlogList.vue'
import BlogForm from './BlogForm.vue'
export default{
    name:"ManBlog",
    components:{
        BlogList,
        BlogForm,
    },
    props:["category","template"],
    data(){
        return{
            blogs:[],
            tags:[],
            res_status:'',
            editId:'',
        }
    },
    mounted(){
        this.getBlogs()
    },
    methods:{
        getBlogs(page){
            this.editId = 0
            let url = ''
            if(page){
                url = page
                this.$cookies.set("ablog_old_page",url)
            }
            url = this.$cookies.get("ablog_old_page")
            if(!url){
                url = `/admin/getBlogs`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.blogs = res.data.blogs
                    this.tags = res.data.tags
                })
        },
        getTags(){

        },
        edit(id){
            this.editId = id
        },
        del(id){
            let url = `/admin/blog/${id}`
            if(confirm(`this will remove the item ${id} are you sure?`) == true){
                axios.delete(url)
                    .then(res=>{
                       this.res_status = res.data.msg 
                        this.box(this.res_status)
                    })
                setTimeout(()=>{
                    this.getBlogs()
                },3200)
            }

        },
        openMe(slug){

            let url = `/admin/blog/${slug}`
            location.href=url
        },
        box(msg){
            this.res_status = msg 
            this.$refs["onOk"].show()
        },
    },
}

</script>
