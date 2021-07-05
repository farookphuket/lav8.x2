<template>
    <div class="container-fluid">

        <tag-form :editId="editId" @getTags="getTags($event)"
            @box="box($event)"></tag-form>

        <div style="margin-top:2em;">&nbsp;</div>
        <tag-list :tags="tags" @openMe="openMe($event)"
            @getTags="getTags($event)"
            @edit="edit($event)" @del="del($event)"></tag-list>

        <b-modal title="server said :" ref="onOk" centered ok-only>
            <div class="container" v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import TagList from './TagList.vue'
import TagForm from './TagForm.vue'
export default{
    name:"ManTag",
    components:{
        TagForm,
        TagList,
    },
    data(){
        return{
          //  tag_blog:[],
            tags:[],
            editId:0,
            res_status:'',

        }
    },
    mounted(){
        this.getTags()
        //this.getTagBlogs()
    },
    methods:{

        /*
        getTagBlogs(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("atag_old_page",url)
            }
            url = this.$cookies.get("atag_old_page")
            if(!url){
                url = `/admin/getTagBlogs`
            }
            axios.get(url)
                .then(res=>{

                    this.tag_blog = res.data.tag_blog
                })
        },
        */
        getTags(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("atag_old_page",url)
            }
            url = this.$cookies.get("atag_old_page")
            if(!url){
                url = `/admin/getTags`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.tags = res.data.tags
                })
        },
        openMe(slug){
            let url = `/admin/blog/${slug}`
            location.href=url
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`you are about to delete the id ${id}!\n 
            are you sure?`) == true){
                let url = `/admin/tag/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                    .catch(err=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
                
                setTimeout(()=>{
                    this.getTags()
                },3500)
            }else{
                return
            }
        },
        box(msg){
            this.res_status = msg
            this.$refs["onOk"].show()
        },
    }
}
</script>
