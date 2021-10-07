<template>
    <div class="container-fluid">
        <address-form :user_id="user_id" 
        :default_address_id="default_address_id" 
        :isDisabled="isDisabled" 
        :editId="editId"
        @getAddress="getAddress($event)"></address-form>

        <address-list :user_id="user_id" 
        @edit="edit($event)" @del="del($event)"
        :default_address_id="default_address_id"
        :address_list="address_list"></address-list>
    </div>
</template>


<script>
import AddressForm from './AddressForm.vue'
import AddressList from './AddressList.vue'
export default{
    name:"ShippingAddress",
    props:["user_id"],
    components:{
        AddressForm,
        AddressList,
    },
    data(){
        return{
            address_list:[],
            editId:0,
            default_address_id:0,
            res_status:'',
            isDisabled:false,
            isShowForm:false,
        }
    },
    mounted(){
        this.getAddress()
    },
methods:{
            getAddress(page){
                this.res_status = "" 
                this.default_address_id = 0
                let url = ""

                    if(page){
                        url = page 
                        this.$cookies.set("adr_old_page",url)
                    }
                    url = this.$cookies.get("adr_old_page")
                    if(!url) url = `/member/getAddress`
                    axios.get(url)
                        .then(res=>{
                            this.address_list = res.data.address

                        })

            },
            edit(id){
                this.isDisabled = false,
                this.editId = id
            },
            del(id){
                alert(`this will remove ${id}`)
            },
        },
}
</script>
