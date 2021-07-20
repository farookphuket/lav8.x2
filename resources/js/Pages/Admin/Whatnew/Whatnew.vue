<template>
    <div class="card mb-4">
        

            <div class="card-header">
                <h1 class="mt-4">What's going on?</h1>
            </div>

            <whatnew-form :editId="editId" @getWn="getWn($event)" 
                    :template="template"
                ></whatnew-form>
            <whatnew-list :whatnew="whatnew" 
                @getWn="getWn($event)" 
                @edit="edit($event)" 
                @del="del($event)"></whatnew-list>

    </div>
</template>

<script>
import WhatnewForm from "./WhatnewForm.vue"
import WhatnewList from './WhatnewList.vue'
export default{
    name:"ManWhatnew",
    components:{
        WhatnewForm,
        WhatnewList,
    },
    data(){
        return{
            whatnew:'',
            editId:'',
            res_status:'',
            template:'',
        }
    },
    mounted(){
        this.getWn()
    },
    methods:{
        getWn(page){
            let url = ''
            if(page){
                url = page 
                this.$cookies.set("awn_old_page",url)
            }
            url = this.$cookies.get("awn_old_page")
            if(!url){
                url = `/admin/getWhatnew`
            }
            axios.get(url)
                .then(res=>{
                    this.whatnew = res.data.whatnew
                    this.template = res.data.template
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`this will permantly delete ${id}! are you sure?`) == true){
                let url = `/admin/whatnew/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                    .catch(err=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })

            }
            setTimeout(()=>{
                this.getWn()
            },1200)
        },
        showBox(msg){
            this.res_status = msg
        },
    },
}
</script>
