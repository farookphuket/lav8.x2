<template>
    <div class="card mb-4" style="margin-top:1.5em;">

        <div class="card-body">
            <div class="form-wrapper">
                <form action="" @submit.prevent="save(saveId)" 
                    @keydown="blogForm.errors.clear($event.target.name)">

                    <div class="form-group pt-2 mb-2">
                        <select ref="sel_tm" name="" 
                            class="form-control " @change="getTemplate">
                            <option value="0">
                            Easy template select from here
                            </option>
                            <option :value="tm.id" v-for="tm in template">
                                {{tm.tm_title}}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <input v-model="blogForm.title" 
                               ref="title"
                               class="form-control" type="text" 
                            name="title" placeholder="title">

                        <div style="margin-top:1.3em;">
                            <pre 
                                v-if="blogForm.title.length != 0">
                                <span>{{slug.thaiSlug(blogForm.title)}}</span>
                                
                            </pre>
                        </div>

                    </div>

                    <!-- select category -->
                    <div class="form-group">
                        <select ref="sel_cat" name="sel_cat" 
                            class="form-control mt-2"
                            @change="getCat">
                            <option value="0">--Select Category--</option>
                            <option :value="ca.id" v-for="ca in category">
                            {{ca.cat_title}} &middot; 
                            {{ca.cat_type}} &middot;
                            {{ca.cat_section}}
                            </option>
                        </select>
                    </div>
                    <!-- select category -->

                    <div class="form-group">
                        <jodit-editor height="450" v-model="blogForm.excerpt"
                            placeholder="type something amazing!"></jodit-editor>
                    </div>

                    <div class="form-group">
                        <jodit-editor height="450" v-model="blogForm.body"
                            placeholder="type something amazing!"></jodit-editor>
                    </div>

                    <div class="row">
                       <div class="col-lg-8">

                           <ul>

                               <li style="display:inline-block;
                                   margin:1em 2em;"
                                   v-for="ta in tags">
                                   <input v-model="blogForm.user_tag" class="my-checkbox" 
                                   type="checkbox" name="tag_name" 
                                   :value="ta.id">
                                   <span>
                                    {{ta.tag_name}} 
                                        <b-icon icon="tag"></b-icon>
                                   </span>
                               </li>
                           </ul>
                       </div>
                       <div class="col-lg-4">
                            <label for="">
                                new tag
                            </label>
                                <input v-model="blogForm.new_tag" 
                                class="form-control" type="text" 
                                name="new_tag" 
                                placeholder="enter tag name">

                       </div>
                       <div class="col-lg-10">
                            <label for="">
                                <input v-model="blogForm.is_public" class="my-checkbox" 
                                type="checkbox" name="is_public">

                                <span class="alert alert-warning" 
                                    v-if="blogForm.is_public == false">Private</span>
                                <span class="alert alert-success" v-else>Public</span>
                            </label>
                            <span v-show="res_status" v-html="res_status" 
                                                      >{{res_status}}</span>
                       </div>
                       <div class="col-lg-2">
                           <button class="btn btn-outline-primary float-right" 
                               type="submit">Save</button>
                       </div>
                    </div>

                </form>
            </div>

        </div><!-- end of div.card-body -->



    </div>
</template>

<script>
import JoditEditor from 'jodit-vue';
export default{
    name:"BlogForm",
    props:["tags","editId","category","template"],
    data(){
        return{
            saveId:0,
            is_public:0,
            res_status:'',
            slug:new CustomText(),
            sel_cat:'',
            blogForm:new Form({
                title:'',
                category:'',
                excerpt:'',
                body:'',
                slug:'',
                new_tag:'',
                user_tag:[],
                is_public:false,
            })
        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods:{
        getEditData(x){
            this.saveId = 0
            this.blogForm.user_tag = []
            this.blogForm.is_public = false
            if(x != 0){
                let url = `/admin/blog/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data)
                        let fData = res.data.blog
                        this.saveId = fData.id
                        this.blogForm.title = fData.title
                        this.blogForm.excerpt = fData.excerpt
                        this.$refs.title.focus()
                        this.blogForm.body = fData.body 
                        if(fData.is_public != '0'){
                            this.blogForm.is_public = true
                        }
                        fData.tags.forEach((val)=>{
                            if(val.pivot.blog_id == fData.id){
                                this.blogForm.user_tag.push(val.id)
                            }
                        })

                        fData.category.forEach((val)=>{
                        //    console.log(val)
                            if(val.pivot.blog_id == fData.id){

                         //       console.log(val.id)
                                this.$refs.sel_cat.value = val.id

                            }
                        })

                    })
            }
        },
        save(id){

            let url = ''
            this.blogForm.slug = this.slug.thaiSlug(this.blogForm.title)
            //console.log(this.blogForm)
            
            if(id){
                url = `/admin/blog/${id}`

                this.blogForm.submit("put",url)
                    .then((res)=>{
                        this.res_status = res.msg 
                        this.$emit('box',this.res_status)
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="aclert alert-danger">
                            ${ob.join()}</span>`
                        this.$emit('box',this.res_status)
                    })
            }else{
                url = `/admin/blog`
                this.blogForm.submit("post",url)
                    .then((res)=>{
                        this.res_status = res.msg 
                        this.$emit('box',this.res_status)
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                        this.$emit('box',this.res_status)
                    })
            }
            setTimeout(()=>{

                location.reload()
            },3200)
            
        },
        getCat(){
            let c_id = this.$refs.sel_cat.value 
            return this.blogForm.category = c_id
        },
        getTemplate(){
            let url = `/admin/template/${this.$refs.sel_tm.value}`
            axios.get(url)
                .then(res=>{
                    //console.log(res.data.template)
                    let tData = res.data.template
                    this.blogForm.title = tData.tm_title 
                    this.blogForm.excerpt = tData.tm_excerpt
                    this.blogForm.body = tData.tm_body
                })
            setTimeout(()=>{
                this.$refs.sel_tm.value=0
            },2300)
        },
    },
}
</script>
