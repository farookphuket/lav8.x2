<template>
    <div class="container-fluid">
        <h1 class="mt-4">Category</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Category</li>
        </ol>
        <category-form @getCategory="getCategory($event)" :editId="editId" 
            ></category-form>
        <category-list :category="category" @getCategory="getCategory($event)" 
            @edit="edit($event)" @del="del($event)" :showP="showP"
            ></category-list>
    </div>
</template>

<script>
import CategoryForm from './CategoryForm.vue'
import CategoryList from './CategoryList.vue'
export default{
    name:"ManCategory",
    components:{
        CategoryForm,
        CategoryList,
    },
    data(){
        return{
            category:'',
            editId:0,
            res_status:'',
            showP:false,
        }
    },
    mounted(){
        this.getCategory()
    },
    methods:{
        getCategory(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("acat_old_page",url)
            }
            url = this.$cookies.get("acat_old_page")
            if(!url){
                url = `/admin/getCategory`
            }

            axios.get(url)
                .then(res=>{
                    this.category = res.data.category
                    console.log(Object.keys(this.category.data).length)
                    if(Object.keys(this.category.data).length >= 2){
                        this.showP = true
                    }
                })
        },
        edit(id){
            this.editId = id
        },
        del(id){
            if(confirm(`This will remove Category ${id} 
            \nAre you sure?`) == true){
                let url = `/admin/category/${id}` 
                axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
                    .catch(err=>{
                        this.res_status = `<span class="alert alert-danger">
                            ${Object.values(err).join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.getCategory()
            },3200)
        },
    },
}
</script>
