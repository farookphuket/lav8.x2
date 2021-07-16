<template>
    <div class="container-fluid">
        <h1 class="mt-4">Timeline</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Timeline</li>
        </ol>

        <timeline-form :editId="editId" 
            @getTimeline="getTimeline($event)"></timeline-form>

        <timeline-list :timeline="timeline" 
            @edit="edit($event)" @del="del($event)"></timeline-list>
    </div>
</template>

<script>
import TimelineForm from "./TimelineForm.vue"
import TimelineList from "./TimelineList.vue"
export default{
    name:"ManTimeline",
    components:{
        TimelineForm,
        TimelineList,
    },
    data(){
        return{
            timeline:'',
            editId:0,
        }
    },
    mounted(){
        this.getTimeline()
    },
    methods:{
        getTimeline(page){
            let url = ""
            if(page){
                url = page 
                this.$cookies.set("atimeline_old_page",url)
            }
            url = this.$cookies.get("atimeline_old_page")
            if(!url){
                url = `/admin/getTimeline`
            }
            axios.get(url)
                .then(res=>{
                    console.log(res.data)
                    this.timeline = res.data.timeline
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`This will be completely remove the item ${id} \n
            are your sure?`) == true){
                let url = `/admin/timeline/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }
            setTimeout(()=>{
                this.getTimeline()
            },600)
        },
    },
}
</script>
