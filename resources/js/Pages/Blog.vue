<template>

<div class="row">

    <!-- show blog content on left -->
    <div class="col-lg-12">
        <blog-list  
            :blogs="blogs" @openMe="openMe($event)" 
            @getBlogs="getBlogs($event)"></blog-list>
    </div>

</div>


</template>


<script>
import BlogTags from './BlogTag.vue'
import BlogSearch from './BlogSearch.vue'
import BlogList from "./BlogList.vue"
export default{
    name:"PubBlog",
    components:{
        BlogList,
        BlogTags,
        BlogSearch
    },
    data(){
        return{
            search:[],
            showSearch:false,
            blogs:[],
            post_tag:[],
        }
    },
    mounted(){
        this.getBlogs()
        this.getTags()
    },
    methods:{
        getBlogs(page){
         let url = ''
            if(page){
                url = page
                this.$cookies.set("pblog_olg_page",url)
            }
            url = this.$cookies.get("pblog_olg_page")
            if(!url){
                url = `api/getBlog`
            }
            axios.get(url)
                .then(res=>{
//                    console.log(res.data)
                    this.blogs = res.data.blogs
                })
        },
        getTags(page){
            let url = ''
            if(page){
                url = page 
                this.$cookies.set("ptag_old_page",url)
            }
            url = this.$cookies.get("ptag_old_page")
            if(!url){
                url = `/getTags`
            }
            axios(url)
                .then(res=>{
                    this.post_tag = res.data.post_tag
                })
        },
        getSearch(key){
            if(!key){
                this.showSearch = false
            }else{
                this.showSearch = true
                let url = `/blogSearch?search=${key}`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data)
                        this.search = res.data.blogs 
                        
                    })
            }

        },
        openMe(ir){
            let url = `/blog/${ir}`
            location.href = url
        },
    },
}
</script>
