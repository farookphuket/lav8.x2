<template>
    <div class="container-fluid">
        <timeline-form 
            @getTimelines="getTimelines($event)"  
            :editId="editId" :user_id="user_id"></timeline-form>

        <timeline-list @print="print($event)"
            :timelines="timelines" @edit="edit($event)" @del="del($event)" 
            :showPagination="showPagination">
        </timeline-list>


        <b-modal title="Server Said :" ref="onOk" centered ok-only>
            <div class="container" v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>

    </div>
</template>

<script>
import TimelineForm from './TimelineForm.vue'
import TimelineList from './TimelineList.vue'
export default {
    name: "MemberTimeline",
    props:["user_id"],
    components:{
        TimelineList,
        TimelineForm
    },
    data(){
        return{
            timelines:[],
            editId:0,
            res_status:'',
            showPagination:false,
        }
    },
    mounted(){
        this.getTimelines()
    },
    methods:{
        getTimelines(page){
            this.editId = 0
            let url = ''
            if(page){
                url = page
                this.$cookies.set("mtl_old_page")
            }
            url = this.$cookies.get("mtl_old_page")
            if(!url){
                url = `/member/getTimelines`
            }
            axios.get(url)
                .then(res=>{
                    this.timelines = res.data.timelines
                    if(Object.keys(this.timelines.data).length >= 2){
                        this.showPagination = true
                    }
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`this will delete item ${id} are you sure?`) == true){
                let url = `/member/timeline/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    },err=>{
                        let ob = Object.values(err.response.data)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob}</span>`
                    })

                this.$refs["onOk"].show()

                setTimeout(()=>{
                    this.showPagination = false
                    this.getTimelines()
                },2500)

            }else{
                return
            }
        },
        print(){
            let url = '/member/printTimeLine'
            window.open(url,'_blank')
        }
    },
};
</script>
