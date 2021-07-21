<template>
<section id="faq" class="faq section-bg">
      <div class="container aos-init aos-animate" data-aos="fade-up">



            <whatnew-form :editId="editId" :templates="templates"
                @getWhatnew="getWhatnew($event)"></whatnew-form>

            <whatnew-list :wns="wns"  @edit="edit($event)" 
                @del="del($event)"
                @getWhatnew="getWhatnew($event)"></whatnew-list>

            <b-modal title="server said :" ref="onOk" ok-only>
                <div v-html="res_status">
                    {{res_status}}
                </div>
            </b-modal>
      </div>
    </section>
</template>



<script>
import WhatnewForm from './WhatnewForm.vue'
import WhatnewList from './WhatnewList.vue' 
export default{
    name:"Whatnew",
    components:{
        WhatnewForm,
        WhatnewList,
    },
    data(){
        return{
            wns:[],
            editId:'',
            res_status:'',
            templates:'',
        }
    },
    mounted(){
        this.getWhatnew()
    },
    methods:{
        getWhatnew(page){
            this.editId = 0
            let url = ''
            if(page){
                url = page
                this.$cookies.set('mWhatnew_old_page',url)
            }
            url = this.$cookies.get('mWhatnew_old_page')
            if(!url){
                url = `/member/getWhatnew`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.wns = res.data.whatnews
                    this.templates = res.data.templates
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`this will delete item ${id} are you sure?`) == true){
                let url = `/member/dashboard/${id}`
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                    .catch(err=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
                this.$refs["onOk"].show()
                setTimeout(()=>{
                    this.getWhatnew()
                },3200)

            }
            
        },
    },
}

</script>
