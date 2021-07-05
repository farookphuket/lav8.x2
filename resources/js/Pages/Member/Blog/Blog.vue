<template>

    <div class="container-fluid">
        <div class="col-lg-12" style="margin-bottom:4em;">
            <div class="clearfix">
                <div class="float-right">
                    <div class="btn-group">
                        <button class="btn btn-outline-primary">
                            <b-icon icon="search"></b-icon>
                        </button>
                        <button class="btn btn-outline-primary" 
                                @click="showForm=true"
                            v-if="showForm == false">
                            <b-icon icon="plus-circle"></b-icon>
                        </button>
                        <button class="btn btn-outline-danger" 
                            @click="showForm = false"
                            v-else>
                            <b-icon icon="x-circle"></b-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <blog-form :editId="editId" :tags="tags" 
            @box="box($event)"
            @getBlogs="getBlogs($event)" v-show="showForm"></blog-form>

        <div class="col-lg-12" style="margin-top:2em;">
            <!-- need some space -->
            &nbsp;
        </div>
        <blog-list :blogs="blogs" 
            @show="show($event)"
            @edit="edit($event)" 
            @del="del($event)"
            @getBlogs="getBlogs($event)"></blog-list>



        <b-modal title="server said: " ref="onOk" ok-only 
            >
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>

</template>


<script>
import BlogList from './BlogList.vue'
import BlogForm from './BlogForm.vue'
export default{
    name:"MemberBlog",
    components:{
        BlogList,
        BlogForm,
    },
    data(){
        return{
            blogs:[],
            tags:[],
            
            editId:'',
            showForm:false,
            showSearchForm:false,
            res_status:'',
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
                this.$cookies.set('mblog_old_page',url)
            }
            url = this.$cookies.get('mblog_old_page')
            if(!url){
                url = `/member/getBlogs`
            }
            axios.get(url)
                .then(res=>{
                //    console.log(res.data.blogs)
                    this.blogs = res.data.blogs
                })
        },
        getTags(){
            let url = `/getTags`
            axios.get(url)
                .then(res=>{
                   // console.log(res.data)
                    this.tags = res.data.tags

                })
        },
        box(msg){
            this.res_status = msg
            this.$refs["onOk"].show();
        },
        show(slug){

            let url = `/member/blog/${slug}`
            location.href = url;
        },
        edit(id){
            this.editId = id
            this.showForm = true
        },
        del(id){

            if(confirm(`you are about to delete ${id}! are you sure `) == true){
                let url = `/member/blog/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.box(res.data.msg)
                    })
                setTimeout(()=>{
                    this.getBlogs()
                },7000)
            }else{
                return
            }
        },
    },
}
</script>
