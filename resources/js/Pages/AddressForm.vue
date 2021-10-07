<template>
    <div class="container">

        
        <div class="row">
            
            <div class="col-lg-12">
               <h2 class="text-center">
                    Shipping to 
               </h2>
               <!-- info wrapper div.row START -->
                <div class="row" v-show="isCartPage">
                    <div class="col-lg-6">
                       <p class="mb-4 mt-4">
                            your product will be shipping to this form  
                       </p>
                    </div>
                    <div class="col-lg-6">
                       <p class="mb-4 mt-4">
                            สินค้าจะถูกจัดส่งตามที่อยู่ในฟอร์มนี้ อย่างไรก็ตามหากท่านไม่เห็นที่อยู่ 
                            ของท่านในฟอร์มนี้ ท่านจะต้องคลิกปุ่ม "edit shipping address" 
                            ข้างล่างเพื่อกรอกข้อมูลและกำหนดให้เป็น "default shipping address" 
                       </p>
                    </div>
                </div>

               <!-- info wrapper div.row END -->
               <form action="" class="mt-4 mb-4">
                    <div class="row">

                        <!-- ===== name,last name START=== -->
                        <div class="col-lg-6">
                            <label for="">Name(ชื่อ)</label>
                            <input v-model="adrForm.first_name" class="form-control" 
                            placeholder="Name ชื่อ" ref="first_name"
                            type="text" name="first_name">
                        </div>

                        <div class="col-lg-6">
                            <label for="">Last name(นามสกุล)</label>
                            <input v-model="adrForm.last_name" class="form-control" 
                            placeholder="Family Name นามสกุล"
                            type="text" name="last_name">
                        </div>
                        <!-- ===== name last name END === -->


                    </div>

                    <div class="form-group">
                        <label for="">Address</label>
                        <textarea v-model="adrForm.address" class="form-control" 
                        name="address" placeholder="Shipping address eg: 121/21 rmb road near KSC bank abnr branch"
                        ></textarea>
                    </div>
                    <div class="row">

                        <!-- ===== city,stage,country START ======= -->

                        <div class="col-lg-4">
                            <div class="form-group">
                                <label for="">City (อำเภอ)</label>
                                <input v-model="adrForm.city" class="form-control" 
                                type="text" placeholder="City เขต อำเภอ">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label for="">Stage(จังหวัด)</label>
                                <input v-model="adrForm.stage" class="form-control" 
                                placeholder="Stage/province eg: Krabi"
                                type="text" name="stage">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label for="">Country(ประเทศ)</label>
                                <input v-model="adrForm.country" class="form-control" 
                                placeholder="Thailand"
                                type="text" name="country">
                            </div>
                        </div>
                        <!-- ===== city,stage,country END ======= -->
                        <!-- ===== tel,zip code START======= -->


                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Tel</label>
                                <input v-model="adrForm.tel" class="form-control" 
                                placeholder="phone number eg: +66 81 7887110"
                                type="number" name="tel">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">zip code</label>
                                <input v-model="adrForm.zip_code" class="form-control" 
                                placeholder="zip code eg: 81110"
                                type="number" name="zip_code">
                            </div>
                        </div>
                        <!-- ===== email,tel,zip code End======= -->
                        <!-- spacer START -->
                        <div class="col-lg-12">
                            <p>&nbsp;</p>
                        </div>
                        <!-- spacer END -->

                        <div class="col-lg-4">
                            <label for="">
                                <input ref="is_default_address" type="checkbox" 
                                v-model="adrForm.is_default_address"
                                name="is_default_address" :disabled="isDisabled">
                                <span class="alert alert-success mr-4 ml-3 p-2" 
                                v-if="adrForm.is_default_address == true">
                                    default address
                                </span>
                                <span class="alert alert-warning mr-4 ml-3 p-2" 
                                v-else>
                                    not default
                                </span>
                            </label>
                        </div>
                        <div class="col-lg-4">
                            <span v-html="res_status">{{res_status}}</span>
                        </div>
                        <div class="col-lg-4">
                            <div class="btn-group float-right">
                                <span 
                                v-if="isDisabled == true">
                                    <a class="btn btn-outline-primary p-2" 
                                    @click.prevent="openAddress">
                                        Edit Shipping Address
                                    </a>
                                </span>
                                <button class="btn btn-outline-primary" 
                                type="submit" 
                                @click.prevent="saveAddress(adrForm.address_id)"
                                :disabled="isDisabled" v-else>
                                    <b-icon icon="pen"></b-icon>
                                </button>
                            </div>
                        </div>
                        <!-- end of div button wrapper -->

                    </div><!-- End of div.row form wrapper -->
               </form>
            </div>
            <div class="col-lg-12 mt-8">
                <p>&nbsp;</p>
            </div>
        </div><!-- end of div.row -->



    </div>
</template>

<script>

export default{
    name:"AddressForm",
    props:["user_id","default_address_id",
    "editId","isDisabled","isCartPage"],
    data(){
        return{
            disabled:false,
            res_status:'',
adrForm:new Form({
    first_name:'',
    last_name:'',
    tel:'',
    city:'',
    stage:'',
    country:'',
    zip_code:'',
    address:'',
    address_id:0,
    is_default_address:0,
                })
        }
    },
watch:{
          "editId":function(x){
              this.getEditData(x)
          }
      },
methods:{
            getEditData(x){
                this.adrForm.is_default_address = false
                this.$refs.first_name.focus()
                if(x != 0){
                    let url = `/member/showAddress/${x}`
                    axios.get(url)
                    .then(res=>{
                        //console.log(res.data.address)
                        let fData = res.data.address
                        if(parseInt(fData.is_default_address) != 0) this.adrForm.is_default_address = true
                        this.adrForm.first_name = fData.first_name
                        this.adrForm.last_name = fData.last_name
                        this.adrForm.city = fData.city
                        this.adrForm.stage = fData.stage
                        this.adrForm.country = fData.country
                        this.adrForm.tel = fData.tel
                        this.adrForm.address = fData.address
                        this.adrForm.zip_code = fData.zip_code
                        this.adrForm.address_id = fData.id

                    })
                }
            },
            saveAddress(id){
                let url = ""

                    if(id != 0){
                        url = `/member/updateAddress/${id}`
                        this.adrForm.submit("put",url)
                            .then((res)=>{
                                this.res_status = res.msg
                                this.$emit('getAddress')
                                    })
                        .catch((err)=>{
                            this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                                })
                    }else{
                        url = `/member/saveAddress`
                        this.adrForm.submit("post",url)
                            .then((res)=>{
                                this.res_status = res.msg
                                this.$emit('getAddress')
                                    })
                        .catch((err)=>{
                            this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                                })
                    }

                setTimeout(()=>{
                    this.res_status = ''
                    this.$emit("getAddress")
                        },3200)
            },
            openAddress(){
                let url = `/member/address`
                location.href = url 
            },
        },

}
</script>
