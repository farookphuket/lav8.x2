<template>
    <div class="container">
        <form action="" enctype="multipart/form-data" 
        class="mt-4">
            
            <div class="form-group mb-4">
                <select ref="sel_cat" name="" @change="selectCategory" 
                class="form-control">
                    <option value="0">-- Select Category --</option>
                    <option :value="ct.id" v-for='ct in category'>
                        {{ct.cat_title}}
                    </option>
                </select>
            </div>
            <div class="row">
                <div class="col-lg-10">

                   <div class="form-group">

                        <input class="form-control" type="text" 
                        placeholder="Enter the product title"
                        ref="product_title"
                        name="product_title" v-model='pForm.product_title'>
                   </div>
                </div>
                <div class="col-lg-2">

                   <div class="form-group">
                        <input class="form-control" type="number" 
                        placeholder="Enter the price"
                        name="product_price" v-model='pForm.product_price'>
                   </div>
                </div>
            </div>


            <!-- upload field,preview START -->
            <div class="row">
                <!-- product image url START -->
                <div class="col-lg-12">
                    <div class="form-group">
                        <label for="">Image URL</label>
                        <input v-model="pForm.product_pic_url" 
                        class="form-control" type="text" 
                        placeholder="Product Image url"
                        name="product_pic_url">
                    </div>
                </div>
                <!-- product image url END -->
                <div class="col-lg-8">
                   <div class="form-group">
                        <input  type="file" name="product_pic"
                        accept="image/*" ref="product_pic"
                        @change="dragFile">

                   </div>
                </div>
                <div class="col-lg-4">
                    <div class="mt-4" v-show="isShow" style="min-height:320px;">
                        <img :src="photo.url" :alt="photo.alt" 
                        class="responsive mx-auto" style="max-width:320px;display:block">
                        <p class="pt-2 text-center">{{photo.alt}}</p>
                    </div>
                </div>
            </div>
            <!-- upload field,preview END -->

           <div class="form-group">
                <jodit-editor height="450" v-model="pForm.product_des" 
                ></jodit-editor>
           </div>
           <div class="row">
               <div class="col-md-6">
                    <span v-html="res_status">{{res_status}}</span>
               </div>
               <div class="col-md-4">

                        <div class="form-check ">
                          <label for="">
                          <input 
                             class="my-checkbox" type="checkbox" style="margin-right:2.05em;" 
                          v-model="pForm.is_sale" name="is_sale">
                          </label>
                              <span class="alert alert-success" 
                                  v-if="pForm.is_sale == true">Sale</span>
                              <span class="alert alert-warning" v-else>Draft</span>
                        </div>


               </div>
               <div class="col-md-2">
                    <div class="float-right btn-group">
                        <button class="btn btn-outline-primary" type="submit" 
                        @click.prevent="save(saveId)">
                            <b-icon icon="pen"></b-icon>
                        </button>
                    </div>
               </div>
           </div>
        </form>
    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"ProductForm",
    props:["category","editId","res_status"],
             data(){
                 return{
                     isShow:false,
                     rMsg:'',
                     photo:'',
                            item:{
                             file:null,
                             img:'',
                            },

                    saveId:'',
                            pForm:new Form({
                                product_title:'',
                                product_pic:'',
                                product_pic_url:'',
                                product_price:0,
                                product_category:'',
                                is_sale:0,
                                product_des:'',
                                    }),
                 }
             },
watch:{
          "editId":function(x){
              
              this.getEditData(x)
          },
          "res_status":function(x){
              this.rMsg = x
          }
      },
methods:{
            getEditData(x){
                this.isShow = false
                this.pForm.is_sale = false
                this.$refs.product_title.focus()
                if(x != 0){
                    let url = `/member/product/${x}/edit`
                    axios.get(url)
                    .then(res=>{

                        let fData = res.data.product

                        //console.log(fData)
                        this.saveId = fData.id
                        if(fData.is_sale != 0){
                            this.pForm.is_sale = true
                        }
                        fData.category.forEach((val)=>{
                            if(val.pivot.product_id == fData.id){
                                this.$refs.sel_cat.value = val.pivot.category_id
                            }
                        })
                        this.pForm.product_title = fData.product_title
                        this.pForm.product_price = fData.product_price
                        this.pForm.product_pic = fData.product_pic_absolute_path
                        this.pForm.product_pic_url = fData.product_pic_absolute_path
                        this.pForm.product_des = fData.product_des
                        this.photo = {
                            url:fData.product_pic_absolute_path
                        }
                        this.isShow = true
                    })
                }
            },
            dragFile(e){
                const theFile = e.target.files[0]
                this.file = theFile
                this.item.img = URL.createObjectURL(theFile)
                this.photo = { 
                    url:this.item.img,
                    alt:this.file.name
                } 
                this.pForm.product_pic = this.file
                this.isShow = true

        },
            selectCategory(){
                let cat_id = this.$refs.sel_cat.value
                this.pForm.product_category = cat_id
            },
            save(id){
                let url = `/member/product`
                let data = new FormData()
                data.append('product_pic',this.pForm.product_pic)
                data.append('product_pic_url',this.pForm.product_pic_url)
                data.append('product_price',this.pForm.product_price)
                data.append('product_title',this.pForm.product_title)
                data.append('product_des',this.pForm.product_des)
                data.append('product_category',this.pForm.product_category)

                if(this.pForm.is_sale != true){
                    this.pForm.is_sale = 0
                }
                data.append('is_sale',this.pForm.is_sale)



                if(id && id != 0){
                    url = `/member/product/${id}`
                    data.append('_method','put')
                }

                axios.post(url,data)
                .then(res=>{

                    this.$emit('showResponseMessage',res.data.msg)
                    })
                .catch((err)=>{
                    
                    this.rMsg = `<span class="alert alert-danger">
                        ${Object.values(err.response.data.errors).join()}
                    </span>`

                    this.$emit('showResponseMessage',this.rMsg)
                        })

                setTimeout(()=>{
                    this.setFormEmpty()
                        },3200)
            },
            setFormEmpty(){
                this.rMsg = ''
                this.pForm.reset()
                this.$emit('getProduct')
                this.isShow = false
                this.$refs.sel_cat.value = 0 
                this.$refs.product_pic.value = ''
            },
        
    },
}
</script>
