<template>
    <div class="container">
        <form @submit.prevent="save(saveId)" 
            >
            <div class="form-group">
                <datepicker :bootstrap-styling="true"
                 input-class="form-control" wrapper-class="p-4 mb-4" 
                :typeable="true" calendar-class="container"
                 v-model="timelineForm.date_ref"   name="date_ref" 
                                          ref="date_ref"
                @selected="pickDate"></datepicker>
                <p class="pt-4">
                    {{moment(timelineForm.date_ref)}} &middot; 
                    <span>{{moment(timelineForm.date_ref).fromNow()}}</span>
                </p>
            </div>
            <div class="form-group">
                <jodit-editor v-model="timelineForm.report" height="550" 
                    name="report"></jodit-editor>
            </div>
            <div class="clearfix">
                <div class="float-left">
                    <div v-html="res_status">{{res_status}}</div>
                </div>
                <div class="float-right">
                    <button class="btn btn-outline-primary" type="submit" 
                        >Save</button>
                </div>
            </div>
        </form>


    </div>
</template>

<script>
var moment = require('moment')
import JoditEditor from 'jodit-vue'
import Datepicker from 'vuejs-datepicker'
export default{
    name:"TimelineForm",
    props:["editId","user_id"],
    components:{
        Datepicker,
    },
    data(){
        return{
            saveId:0,
            res_status:"",
            errors:'',
            moment:moment,
            timelineForm: new Form({
                date_ref:'',
                report:''
            }),

        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    mounted(){
        this.timelineForm.date_ref = new Date()

    },
    methods:{
        pickDate(){
            this.$nextTick(()=>{
                //console.log(this.timelineForm.date_ref)
            });
           // alert(this.date_ref)
        },
        save(id){
            let url = ''
            if(id){
                // update the timeline

                url = `/member/timeline/${id}`
                let data = {
                    date_ref:this.timelineForm.date_ref,
                    report:this.timelineForm.report
                }
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.timelineForm.report = ''
                        this.timelineForm.date_ref = new Date()
                    })

            }else{
                url = `/member/timeline`
                this.timelineForm.submit('post',url)
                    .then((res)=>{
                        //console.log(res.msg)
                        this.res_status = res.msg
                        
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join("")}</span>`
                    })

            }
            setTimeout(()=>{
                this.$emit('getTimelines')
                this.res_status = ''
            },2500)
        },
        getEditData(id){
            if(id != 0){
                let url = `/member/timeline/${id}`
                axios.get(url)
                    .then(res=>{
                        console.log(res.data.timeline)
                        //this.timelineForm
                        let tm = res.data.timeline
                        this.saveId = tm.id
                        this.$refs.date_ref.$el.querySelector("input").focus()
                        this.timelineForm = {
                            date_ref:tm.date_ref,
                            report:tm.report
                        }
                    })
            }
        }


    },
}
</script>
