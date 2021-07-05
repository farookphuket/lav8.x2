<template>
<div class="card mb-4">
    <div class="card-header">
        <div class="clearfix">
            <div class="float-left">
                <svg class="svg-inline--fa fa-table fa-w-16 mr-1" aria-hidden="true" 
                    focusable="false" data-prefix="fas" data-icon="table" role="img" 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                    data-fa-i2svg="">
                    <path fill="currentColor" 
                    d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 
                    48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 
                    416H64v-96h160v96zm0-160H64v-96h160v96zm224 
                    160H288v-96h160v96zm0-160H288v-96h160v96z">
                </path>
                </svg><!-- <i class="fas fa-table mr-1"></i> -->
                Contact us 
            </div>
            <div class="float-right">
                <div class="btn-group">
                    <button class="btn btn-outline-primary" 
                        @click.prevent="showSearchContact = true" 
                        v-if="showSearchContact == false">
                        <b-icon icon="search"></b-icon>
                    </button>
                    <button class="btn btn-outline-danger" 
                        @click.prevent="showSearchContact = false"
                        v-else>
                        <b-icon icon="x-circle"></b-icon>
                    </button>


                    <button class="btn btn-outline-primary" 
                        @click.prevent="showFormContact = true" 
                        v-if="showFormContact == false">
                        <b-icon icon="plus"></b-icon>
                    </button>
                    <button class="btn btn-outline-danger" 
                        @click.prevent="showFormContact = false"
                        v-else>
                        <b-icon icon="x-circle"></b-icon>
                    </button>
                </div>
            </div> <!-- end of div.float-right -->
        </div><!-- end of div.clearfix -->
    </div><!-- end of div.card-header -->

    <contact-form v-show="showFormContact" 
        :editId="editId" @getContact="getContact($event)"></contact-form>
    <contact-list v-if="showSearchContact == false" 
        :contacts="contacts" @edit="edit($event)" 
        @del="del($event)" @getContact="getContact($event)"
        ></contact-list>
    <contact-search v-else></contact-search>





    <b-modal title="server said :" ref="onOk" ok-only>
        <div v-html="res_status">
            {{res_status}}
        </div>
    </b-modal>

</div>



</template>


<script>
import ContactSearch from './ContactSearch.vue'
import ContactList from './ContactList.vue'
import ContactForm from './ContactForm.vue'

export default{
    name:"ManContact",
    components:{
        ContactForm,
        ContactList,
        ContactSearch,
    },
    data(){
        return{
            showSearchContact:false,
            showListContact:true,
            showFormContact:false,
            contacts:[],
            editId:'',
            res_status:'',
        }
    },
    mounted(){
        this.getContact()
    },
    methods:{
        getContact(page){
            this.editId = 0 
            let url = ""
            if(page){
                url = page 
                this.$cookies.set("acontact_old_page",url)
            }
            url = this.$cookies.get('acontact_old_page')
            if(!url){
                url = `/admin/getContact`
            }
            axios.get(url)
                .then(res=>{
            //        console.log(res.data.contacts)
                    this.contacts = res.data.contacts
                })
        },
        edit(id){
            this.showFormContact = true 
            this.editId = id
        },
        del(id){
            let url = `/admin/contact/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()
                })

            setTimeout(()=>{
                this.getContact()
            },3800)
        },
    },

}
</script>
