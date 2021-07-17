<template>
    <div class="card mb-4">
        <div class="card-heading">
            <h2 class="text-center card-title">
                Add/Edit Timeline
            </h2>
        </div>
        <div class="card-body">
            <!-- form START -->
            <form action="">
                <div class="form-group">


                <datepicker :bootstrap-styling="true"
                 input-class="form-control" wrapper-class="mt-4 mb-2" 
                :typeable="true" calendar-class="container"
                 v-model="tlForm.date_ref"   name="date_ref" 
                 ref="date_ref"
                ></datepicker>
                <p>
                    {{moment(tlForm.date_ref)}} &middot; 
                    <span>{{moment(tlForm.date_ref).fromNow()}}</span>
                </p>
                </div>
                <div class="form-group">
                    <jodit-editor 
                        v-model="tlForm.report" 
                        height="450"></jodit-editor>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <span v-html="res_status">
                            {{res_status}}
                        </span>
                    </div>
                    <div class="col-md-8">
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                                @click.prevent="save(saveId)">
                                <b-icon icon="pen"></b-icon>
                            </button>
                        </div>
                    </div>
                </div><!-- end of div.row -->

            </form>
            <!-- form START -->
        </div>
    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
import Datepicker from 'vuejs-datepicker'
var moment = require("moment")
export default{
    name:"TimelineForm",
    props:["editId"],
    components:{
        Datepicker,
    },
    data(){
        return{
            moment:moment,
            res_status:'',
            saveId:0,
            tlForm:new Form({
                date_ref:'',
                report:'',
            }),
        }
    },
    mounted(){
        this.tlForm.date_ref = new Date
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods:{

        save(id){
            let url = `/admin/timeline`
            if(id != 0){
                url = `/admin/timeline/${id}`
               this.tlForm.submit("put",url) 
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })
            }else{
               this.tlForm.submit("post",url) 
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.$emit('getTimeline')
                this.res_status = ''
                this.tlForm.date_ref = new Date()
            },2000)
        },
        getEditData(x){
            if(x != 0){
                let url = `/admin/timeline/${x}/edit`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data.timeline)
                        let fData = res.data.timeline
                        this.tlForm.date_ref = fData.date_ref 
                        this.$refs.date_ref.$el.querySelector("input").focus()
                        this.tlForm.report = fData.report
                        this.saveId = fData.id
                    })
            }
        },
    },
}
</script>
