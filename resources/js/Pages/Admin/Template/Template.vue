<template>
    <div class="container-fluid">
        <h1 class="mt-4">Template</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Template</li>
        </ol>

        <template-form :editId="editId" 
            @getTemplate="getTemplate($event)" 
            @showBox="showBox($event)"></template-form>

        <template-list :templates="templates" :show_pagination="show_pagination" 
            @getTemplate="getTemplate($event)" @view="view($event)"
            @edit="edit($event)" @del="del($event)"></template-list>

        <b-modal ref="onOk" title="server said : " 
            @ok="closeBox"
            centered ok-only>
            <div class="container">
                <div v-html="res_status">
                {{res_status}}
                </div>
            </div>
        </b-modal>
        <b-modal ref="big_box" :title="show_template.tm_title" ok-only size="xl">
            <div class="row">
               <div class="col-lg-12">
                   <h2 class="text-center">
                    {{show_template.tm_title}}
                   </h2>
                   <div class="clearfix">
                       <div class="float-right">
                           <span class="badge badge-info p-4">
                            {{show_template.tm_method}}
                           </span>
                       </div>
                   </div>

                    <div v-html="show_template.tm_excerpt" class="mt-2">
                        {{show_template.tm_excerpt}}
                    </div>

                    <div v-html="show_template.tm_body" class="mt-2">
                        {{show_template.tm_body}}
                    </div>
               </div><!-- end of div.col-lg-12 -->

            </div><!-- end of div.row -->
        </b-modal>
    </div>
    
</template>

<script>
import TemplateForm from './TemplateForm.vue'
import TemplateList from './TemplateList.vue'
export default{
    name:"ManTemplate",
    components:{
        TemplateList,
        TemplateForm
    },
    data(){
        return{
            templates:'',
            show_template:'',
            show_pagination:false,
            editId:0,
            res_status:'',
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
                this.$cookies.set("atemplate_old",url)
            }
            url = this.$cookies.get("atemplate_old")
            if(!url) url = `/admin/getTemplate`
            axios.get(url)
                .then(res=>{
                    this.templates = res.data.templates
                    if(Object.keys(this.templates.data).length >= 4){
                        this.show_pagination = true
                    } 
                })
        },
        view(id){
            let url = `/admin/template/${id}`
            axios.get(url)
                .then(res=>{
                    this.show_template = res.data.template
                    //console.log(this.show_template)
                })
            this.$refs["big_box"].show()
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`This will be completely remove item ${id}\n 
            are your sure you want to remove?`) == true){
                let url = `/admin/template/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                this.$refs["onOk"].show()
                setTimeout(()=>{
                    this.show_pagination = false
                    this.getTemplate()
                },500)
            }
        },
        showBox(msg){
            this.res_status = msg
            this.$refs["onOk"].show()
        },
        closeBox(){
            this.res_status = ''
            this.$refs["onOk"].hide()

        },
    },
}
</script>
