<template>
    <div>

        <div class="col-lg-12">
            <form action="" @submit.prevent="save(saveId)">
                <div class="form-group">
                    <select ref="sel_tm" @change="getTemplate" 
                        class="form-control">
                        <option value="0">--- Easy template select here ---
                        </option>
                        <option :value="tm.id" 
                                v-for="tm in templates">{{tm.tm_title}}</option>
                    </select>
                </div>

                <!-- category -->
                <div class="form-group">
                    <select ref="sel_cat" class="form-control"
                        name="category" @change.prevent="selectCat">
                        <option value="0">-- select category --</option>
                        <option :value="cat.id" v-for="cat in category">
                        {{cat.cat_title}}
                        </option>
                    </select>
                </div>
                <!-- category -->

                <div class="form-group">
                    <input v-model="blogForm.title" 
                    class="form-control" ref="title"
                    type="text" name="title" placeholder="title here">

                    <div class="line-numbers" v-if="blogForm.title != ''">
                        <pre>{{slug.thaiSlug(blogForm.title)}}</pre>
                    </div>
                </div>

                <div class="form-group">
                    <jodit-editor v-model="blogForm.excerpt" 
                        height="350" 
                        ></jodit-editor>
                </div>
                <div class="form-group">
                    <jodit-editor v-model="blogForm.body" 
                        height="350" 
                        ></jodit-editor>
                </div>

                    <div class="row">
                        <div class="col-md-8">
                            <span v-for="ll in tags" class="form-check-group pl-4">
                                <label for="">
                                    <input v-model="blogForm.user_tag" 
                                    :value="ll.id" 
                                    type="checkbox" 
                                    class="form-check-input mb-2"
                                    name="user_tag">  
                                    <span class="badge badge-info p-2 
                                          mr-2 pl-2 text-white" 
                                        >
                                        <b-icon icon="tag"></b-icon>
                                        {{ll.tag_name}}
                                    </span>

                                </label>
                            </span>
                        </div>
                        <div class="col-md-4">
                            <input v-model="blogForm.new_tag" 
                                   class="form-control" type="text" 
                            name="new_tag" ref="new_tag" 
                            placeholder="Enter new tag">
                        </div>
                    </div>

                <div class="row">
                    <div class="col-md-4 mt-2">
                        <label for="" class="form-check-group">
                            <input v-model="blogForm.is_public" 
                            class="form-check-input" type="checkbox" 
                            name="is_public"> 

                            <span 
                                class="badge badge-success p-2" 
                                v-if="blogForm.is_public == true">Public</span>
                            <span class="badge badge-warning p-2" 
                                v-else>Private</span>
                        </label>

                    </div><!-- end of checkbox -->

                    <div class="col-md-4">
                        <div v-html="res_status">{{res_status}}</div>
                    </div><!-- end of status -->

                    <div class="col-md-4 mt-2">

                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                                    type="submit">{{btn_label}}</button>
                        </div>
                    </div>

                </div>

            </form>
        </div><!-- end of div.col-lg-12 form -->
    </div>
</template>


<script>

import JoditEditor from 'jodit-vue'
export default{
    name:"BlogForm",
    props:["editId","tags","templates","category"],
    data(){
        return{
            
            slug:new CustomText(),
            res_status:'',
            sel_tm:'',
            saveId:0,
            btn_label:'Create New Blog',
            blogForm:new Form({
                title:'',
                excerpt:'',
                body:'',
                category:'',
                new_tag:'',
                is_public:'',
                user_tag:[]
            })
        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    mounted(){
        this.saveId = 0
        
    },
    methods:{

        getEditData(x){
            this.blogForm.is_public = false
            this.blogForm.user_tag = []
            if(x != 0){
                this.btn_label = 'Upadate Post'
                let url = `/member/blog/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        res.data.blog.forEach((val)=>{
                            console.log(val)
                            this.$refs.title.focus()
                            if(val.id == x){
                                this.blogForm.title = val.title 
                                this.blogForm.excerpt = val.excerpt
                                this.blogForm.body = val.body
                                this.saveId = val.id
                                
                                if(val.is_public != '0'){
                                    this.blogForm.is_public = true
                                }
                                val.tags.forEach((tag)=>{
                                    //console.log(tag)
                                    if(tag.pivot.blog_id == val.id){
                                        this.blogForm.user_tag.push(tag.id)
                                    }
                                })
                            }
                        })
                    })
            }
        },
        save(id){

            this.blogForm.slug = this.slug.thaiSlug(this.blogForm.title)
            

            let url = ''
            if(id){
                //alert(`will update ${id}`)
                url = `/member/blog/${id}`
                this.blogForm.submit('put',url)
                    .then((res)=>{
                        //console.log(res.msg)
                        this.$emit('box',res.msg)
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                        //console.log(ob.join())
                    })
                
            }else{
                url = `/member/blog`
                this.blogForm.submit('post',url)
                    .then((res)=>{
                        console.log(res)
                        this.$emit('box',res.msg)
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                        //console.log(ob.join())
                    })
            }
            setTimeout(()=>{
                this.saveId = 0
                this.res_status = ''
                this.$emit('getBlogs')
            },7000)
        },
        getTemplate(){
            let url = `/member/template/${this.$refs.sel_tm.value}`
            axios.get(url)
                .then(res=>{
                    let tData = res.data.template
                    this.blogForm.title = tData.tm_title
                    this.blogForm.excerpt = tData.tm_excerpt
                    this.blogForm.body = tData.tm_body
                })
            this.$refs.sel_tm.value = 0
        },
        selectCat(){
           // this.blogForm.category = this.$refs.sel_cat.value
           // console.log(this.blogForm.category)
            return this.blogForm.category = this.$refs.sel_cat.value    
        },
    },
}
</script>
