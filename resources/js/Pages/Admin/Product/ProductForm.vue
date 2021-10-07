<template>
    <div class="mb-4 mt-2">
        <div class="card-body">
            <form action="">
                <div class="form-group mb-4 mt-2">
                    <select ref="sel_cat" name="" 
                    class="form-control" @change.prevent="getCategory">
                        <option value="0">-- Select Option --</option>
                        <option :value="ca.id" v-for="ca in category">{{ca.cat_title}}</option>
                    </select>
                </div>
            
                <!-- product title,price START -->
                <div class="row">
                    <div class="col-lg-10">
                        <div class="form-group">
                            <label for=""></label>
                            <input v-model="pForm.product_title" class="form-control" type="text" 
                            ref="product_title"
                            name="product_title" placeholder="product title">
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            <label for=""></label>
                            <input v-model="pForm.product_price" 
                            class="form-control" type="number" 
                            ref="product_price"
                            name="product_price" placeholder="product price">
                        </div>
                    </div>

                    <!-- upload pic,preview START -->
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label for="">image url</label>
                            <input v-model="pForm.product_pic_url" 
                            class="form-control" type="text" name="product_pic_url"
                            placeholder="Product image url">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input @change.prevent="showUploadPreview" type="file" 
                            name="product_pic">
                        </div>     
                    </div>
                    <div class="col-lg-6">
                        <div v-show="showPreview">
                            <span style="max-height:320px;">
                                <img class="responsive mx-auto" :src="photo.url" 
                                style="max-height:300px;display:block;"
                                :alt="photo.alt">
                            </span>
                            <p class="mt-2 text-center">
                                {{photo.alt}}
                            </p>
                        </div>
                    </div>
                    <!-- upload pic,preview END -->

                </div>
                <!-- product title,price END -->

                <div class="form-group mt-4 mb-4">
                    <jodit-editor height="450" 
                    v-model="pForm.product_des"></jodit-editor>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                       <!-- checkbox isSale --> 
                        <div class="form-group">
                            <input v-model="pForm.is_sale" type="checkbox" 
                            name="is_sale">
                            <span v-if="pForm.is_sale != false">
                                Sale
                            </span>
                            <span v-else>
                                Not sale
                            </span>
                        </div>
                       <!-- checkbox isSale --> 
                    </div>
                    <div class="col-lg-6">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <div class="col-lg-3">
                        <div class="btn-group float-right">
                            <button class="btn btn-outline-primary" 
                            type="submit" @click.prevent="saveProduct(editId)">
                                <b-icon icon="pen"></b-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"ProductForm",
    props:["category","editId","res_status"],
    data(){
        return{
            rMsg:'',
            cat_id:'',
            upload_item:{
                img:'',
                file:null,
            },
            photo:'',
            showPreview:false,
                 pForm:new Form({
                     is_sale:0,
                     product_title:'',
                     product_des:'',
                     product_price:0,
                     product_pic:'',
                     product_pic_url:'',
                         })
        }
    },
watch:{
          "res_status":function(x){
              this.rMsg = x
          },
          "editId":function(e){
              this.getEditData(e)
          }
      },
methods:{
            showUploadPreview(e){
                this.showPreview = true
                const theFile = e.target.files[0]
                this.upload_item.img = URL.createObjectURL(theFile)
                this.file = theFile
                this.photo = {
                    url:this.upload_item.img,
                    alt:this.upload_item.file
                }
                this.pForm.product_pic = theFile

            },
            getCategory(){
                this.cat_id = this.$refs.sel_cat.value
            },
            getEditData(x){
                this.pForm.is_sale = false
                this.showPreview = true
                if(x != 0){
                    this.$refs.product_title.focus()
                    let url = `/admin/product/${x}/edit`
                    axios.get(url)
                    .then(res=>{
                        let fData = res.data.product
                        //console.log(res.data)
                        this.pForm.product_title = fData.product_title
                        this.pForm.product_price = fData.product_price
                        this.pForm.product_des = fData.product_des
                        this.pForm.product_pic = fData.product_pic_absolute_path
                        this.pForm.product_pic_url = fData.product_pic_absolute_path

                        // category select
                        fData.category.forEach((ca)=>{
                            //console.log(ca)
                            if(ca.pivot.product_id == fData.id) this.$refs.sel_cat.value = ca.id
                        })

                        // product image
                        this.photo = {
                            url:fData.product_pic_absolute_path,
                            alt:fData.product_title
                        }

                        // is sale
                        if(fData.is_sale != 0) this.pForm.is_sale = true

                            })
                }
            },
            saveProduct(id){
                this.showPreview = false
                let url = `/admin/product`

                // form data 
                let data = new FormData()
                data.append('product_title',this.pForm.product_title)
                data.append('product_pic',this.pForm.product_pic)
                data.append('product_pic_url',this.pForm.product_pic_url)
                data.append('product_price',this.pForm.product_price)
                data.append('product_des',this.pForm.product_des)
                data.append('cat_id',this.$refs.sel_cat.value) 
                //
                if(this.pForm.is_sale != false) data.append('is_sale',true)

                if(id != 0){
                    url = `/admin/product/${id}`
                    data.append('_method','put')
                    data.append('cat_id',this.$refs.sel_cat.value)
                    //alert(`will update ${id}`)
                }       
               axios.post(url,data) 
                   .then((res)=>{
                    //   console.log(res)
                       this.$emit("showResponseMessage",res.data.msg)
                       setTimeout(()=>{
                           this.setFormEmpty()
                           
                               },1500)
                           })
               .catch((err)=>{
                   this.rMsg = `<span class="alert alert-danger">
                   ${Object.values(err.response.data.errors).join()}
                   </span>`
                   this.$emit('showResponseMessage',this.rMsg)
                   setTimeout(()=>{
                       this.$refs.product_title.focus()
                           },2500)
                })
            },
            setFormEmpty(){
                this.rMsg = ''
                this.$refs.sel_cat.value = 0
                this.pForm.reset()
                this.showPreview = false
                this.$emit('getProduct')
            },
        },
}
</script>
