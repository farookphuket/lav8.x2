<template>
    <div class="card mb-4 pt-4">
        <div class="card-header">
            <h2 class="card-title">
                Create/Edit Category
            </h2>
        </div>
        <div class="card-body">
            <form action="">
                <div class="form-group">
                    <input v-model="catForm.cat_title" 
                    class="form-control" type="text" 
                    placeholder="Enter the Title"
                    name="cat_title">
                </div>

                <div class="form-group">
                    <input v-model="catForm.cat_type" 
                    class="form-control" type="text" 
                    placeholder="Enter Type"
                    name="cat_type">
                </div>

                <div class="form-group">
                    <input v-model="catForm.cat_section" 
                    class="form-control" type="text" 
                    placeholder="Enter Section"
                    name="cat_section">
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <span v-html="res_status">{{res_status}}</span>
                    </div>
                    <div class="col-md-6">
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                                type="submit" @click.prevent="save(saveId)">
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
export default{
    name:"CategoryForm",
    props:["editId"],
    data(){
        return{
            res_status:'',
            saveId:'',
            catForm:new Form({
                cat_title:'',
                cat_type:'',
                cat_section:'',
            }),
        }
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods:{
        getEditData(x){
            if(x != 0){
                let url = `/admin/category/${x}`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data.category)
                        let fData = res.data.category
                        this.saveId = fData.id
                        this.catForm.cat_title = fData.cat_title
                        this.catForm.cat_section = fData.cat_section
                        this.catForm.cat_type = fData.cat_type
                    })
            }
        },
        save(id){
            let url = ''
            if(id){
                url = `/admin/category/${id}` 
                this.catForm.submit("put",url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })

            }
            else{
                url = `/admin/category`
                this.catForm.submit("post",url)
                    .then((res)=>{
                        this.res_status = res.msg
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.res_status = ''
                this.$emit('getCategory')
            },3200)
        },
    },
}
</script>
