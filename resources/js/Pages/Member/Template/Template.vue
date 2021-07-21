<template>
    <div class="container-fluid">

        <template-form :editId="editId" 
            @getTemplate="getTemplate($event)"></template-form>

        <template-list :user_id="user_id" :templates="templates"
            @getTemplate="getTemplate($event)" @edit="edit($event)" 
            @del="del($event)" 
            @showTemplate="showTemplate($event)" 
            :show_pagination="show_pagination"></template-list>

        <b-modal title="server say : " ref="onOk" ok-only>
            <span v-html="res_status">
                {{res_status}} 
            </span>
        </b-modal>
        <b-modal ref="big_box" size="xl" :title="template.tm_title"  ok-only>
            <div class="container">
                <h2 class="text-center mb-2">{{template.tm_title}}</h2>
                <div v-html="template.tm_excerpt">{{template.tm_excerpt}}</div>
                <div v-html="template.tm_body">{{template.tm_body}}</div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import TemplateForm from './TemplateForm.vue'
import  TemplateList from './TemplateList.vue';
export default{
    name:"MemberTemplate",
    props:["user_id"],
    components:{
        TemplateForm,
        TemplateList,
    },
    data(){
        return{
            templates:'',
            template:'',
            editId:0,
            res_status:'',
            show_pagination:false,
        }
    },
    mounted(){
        this.getTemplate()
    },
    methods:{
        getTemplate(page){
            let url = ''
            if(page){
                url = page 
                this.$cookies.set("mtemplate_old_page",url)
            }
            url = this.$cookies.get("mtemplate_old_page")
            if(!url) url = `/member/getTemplate`
            axios.get(url)
                .then(res=>{
                    this.templates = res.data.templates
                    //console.log(res.data)
                    if(Object.keys(this.templates.data).length >= 2){
                        this.show_pagination = true
                    }
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`This operation will be completely remove the 
            template id ${id}\n are your sure you want to delete?`) == true){
                let url = `/member/template/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }
            setTimeout(()=>{
                this.show_pagination = false 
                this.getTemplate()
            },3200)
        },
        showTemplate(id){
            let url = `/member/template/${id}`
            axios.get(url)
                .then(res=>{
                    this.template = res.data.template
                    console.log(this.template)
                })
            this.$refs["big_box"].show()
        },
    },
}
</script>
