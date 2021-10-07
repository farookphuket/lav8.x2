<template>
    <div class="card">
        <div class="card-header">
            <h2 class="card-title">Payment method</h2>
        </div>

        <div class="card-body">
            <form action="" enctype="multipath/form-data">
                <div class="form-group">
                    <input v-model="pyForm.pay_title" class="form-control" 
                    type="text" name="pay_title" ref="pay_title"
                    placeholder="Payment Title">
                </div>

                <div class="form-group">
                    <input v-model="pyForm.pay_method" class="form-control" 
                    type="text" name="pay_method" 
                    placeholder="Payment Method">
                </div>

                <div class="form-group">
                    <label for="">
                        Image url
                    </label>
                    <input v-model="pyForm.pay_url" class="form-control" 
                    type="text" name="pay_url" 
                    placeholder="payment image url ">
                    <p class="mt-2 mb-2">
                        *the image url 
                    </p>
                </div>
                <div class="form-group">
                    <input v-model="pyForm.pay_des" class="form-control" 
                    type="text" name="pay_des" 
                    placeholder="Payment Description">
                </div>
                <div class="form-group">
                        <input  class="form-control" 
                        ref="pay_pic" accept="image/*"
                        type="file" @change.prevent="showPreview" name="pay_pic" 
                        >
                    
                </div>
                <div>
                    <span style="max-height:350px; " 
                        class="mt-2 mb-2" v-show="isShowPic">
                        <img class="responsive mx-auto" :src="upload_pic.url" 
                        style="max-width:350px;display:block;"
                        :alt="upload_pic.alt">
                    </span>
                    <p class="mt-2 text-center">
                        {{upload_pic.alt}}
                    </p>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <div class="col-lg-6">
                        <div class="btn-group float-right">
                            <button class="btn btn-outline-primary" 
                            type="submit" @click.prevent="savePayment(editId)">

                                <i class="fa fa-2x fa-save"></i>
                            </button>
                            <button class="btn btn-outline-danger" 
                            @click.prevent="setFormEmpty">
                                <b-icon icon="x-circle"></b-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default{
    name:"PaymentForm",
    props:["editId","res_status"],
    data(){
        return{
            pyForm:new Form({
                pay_title:'',
                pay_method:'',
                pay_des:'',
                pay_pic:'',
                pay_url:'',
                pay_id:'',
                           }),
                select_file:{
                   img:'',
                   file_name:null
                           },
                upload_pic:'',
                isShowPic:false,
                errMsg:'',

        }
    },
watch:{
        "res_status":function(e){
            this.errMsg = e
        },
        "editId":function(x){
                this.getEditData(x)
            }
        },
    methods:{
                showPreview(e){
                    this.isShowPic = true
                    const upload_file = e.target.files[0] 
                    this.file_name = upload_file
                    this.select_file.img = URL.createObjectURL(upload_file)

                   this.upload_pic = {
                       url:this.select_file.img,
                       alt:this.file_name.name
                   }
                   this.pyForm.pay_pic = this.file_name
                },

                getEditData(x){
                    this.upload_pic = {}
                    this.isShowPic = false
                    this.$refs.pay_title.focus()
                    if(x != 0){
                        let url = `/admin/payment/${x}`
                        axios.get(url)
                        .then(res=>{
                            let fData = res.data.payment
                            this.pyForm.pay_title = fData.pay_title
                            this.pyForm.pay_method = fData.pay_method
                            this.upload_pic.url = fData.pay_pic_absolute_path
                            this.upload_pic.alt = fData.pay_title
                            this.pyForm.pay_url = fData.pay_url 
                            this.pyForm.pay_des = fData.pay_des
                            this.pyForm.pay_id = fData.id
                            this.isShowPic = true
                        })

                    }
                },
                savePayment(id){
                    let url = `/admin/payment`

                    let data = new FormData()
                    data.append('pay_pic',this.pyForm.pay_pic)
                    data.append('pay_title',this.pyForm.pay_title)
                    data.append('pay_des',this.pyForm.pay_des)
                    data.append('pay_url',this.pyForm.pay_url)
                    data.append('pay_method',this.pyForm.pay_method)
                    

                    if(id != 0){
                        url = `/admin/payment/${id}`
                        data.append('_method','put')
                        axios.post(url,data)
                            .then(res=>{
                           this.$emit('showResponseMsg',res.data.msg) 
                                    })
                        .catch((err)=>{
                            this.errMsg = `<span class="alert alert-danger">
                            ${Object.values(err.response.data.errors).join()}
                            </span>`
                            this.$emit('showResponseMsg',this.errMsg)
                        })
                    }else{

                        axios.post(url,data)
                            .then(res=>{
                           this.$emit('showResponseMsg',res.data.msg) 
                                    })
                        .catch((err)=>{
                            this.errMsg = `<span class="alert alert-danger">
                            ${Object.values(err.response.data.errors).join()}
                            </span>`
                            this.$emit('showResponseMsg',this.errMsg)
                        })

                    }

                    setTimeout(()=>{
                        this.$emit('getPayment')
                        this.setFormEmpty()
                    },5200)
                },
                setFormEmpty(){

                    this.isShowPic = false
                    this.pyForm.pay_title = ''
                    this.pyForm.pay_des = ''
                    this.pyForm.pay_pic = ''
                    this.pyForm.pay_url = ''
                    this.pyForm.pay_method = ''
                    this.$refs.pay_pic.value = ''
                    this.upload_pic = {
                        url:'',
                        alt:''
                    }
                    this.$emit('getPayment')
                },
            },
}
</script>
