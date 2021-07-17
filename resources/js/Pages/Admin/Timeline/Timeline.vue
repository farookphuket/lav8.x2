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

        <timeline-list :timeline="timeline" @show="show($event)"
            @edit="edit($event)" @del="del($event)" 
            @getTimeline="getTimeline($event)"></timeline-list>

        <b-modal title="Show timeline" ref="big_box" size="xl" ok-only>
            <div>
                <ul>
                    <li v-for="show in show_timeline.data">
                        <div class="row">
                           <div class="col-lg-4 mt-4 mb-4">
                                <span class="badge badge-info p-4">
                                    {{show.date_ref}}
                                </span>
                           </div>
                           <div class="col-lg-8">
                               <div v-html="show.report">
                                   {{show.report}}
                               </div>
                           </div>

                           <!-- show date -->
                           <div class="col-lg-8">
                               <ul>
                                   <li>
                                       create : {{moment(show.created_at)}} 
                                       &middot; {{moment(show.created_at).fromNow()}}
                                   </li>
                                   <li>
                                       update : {{moment(show.updated_at)}}
                                       &middot; {{moment(show.updated_at).fromNow()}}
                                   </li>
                               </ul>

                           </div>

                           <!-- user name -->
                           <div class="col-lg-4 mt-4 mb-4">
                               <div class="float-right">
                                   {{show.user.name}}
                               </div>
                           </div>
                           <!-- user name -->

                        </div><!-- end of div.row -->        
                    </li>
                    <!-- show pagination -->
                    <li>
                        
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">

                            <li class="page-item" v-for="li in show_timeline.links">
                                <a class="page-link p-2" href="" v-html="li.label" 
                                    v-if="!li.active && li.url != null" 
                                    @click.prevent="show({url:li.url})" >
                                    {{li.label}}
                                </a>
                                <span class="page-link active" 
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{show_timeline.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
                    </li>
                    <!-- show pagination -->
                </ul>
            </div>
        </b-modal>

        <b-modal title="Server said : " ref="onOk" ok-only>
            <div v-html="res_status">{{res_status}}</div>
        </b-modal>
    </div>
</template>

<script>
var moment = require("moment")
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
            res_status:'',
            show_timeline:'',
            moment:moment,

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
               //     console.log(res.data)
                    this.timeline = res.data.timeline
                })
        },
        show(get){
            axios.get(get.url)
                .then(res=>{
                    this.show_timeline = res.data.timeline
                })
            this.$refs["big_box"].show()
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
                this.$refs["onOk"].show()
            }
            setTimeout(()=>{
                this.getTimeline()
            },600)
        },
    },
}
</script>
