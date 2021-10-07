<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4" 
            v-for="ct in category.data">
                <span class="badge badge-info p2">{{ct.cat_title}}</span>
                <p class="mt-4">&nbsp;</p>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    name:"CategoryList",
             data(){
                 return{
                     category:[],
                 }
             },
             mounted(){
                 this.getCategory()
             },
methods:{
            getCategory(page){
                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("m_old_category_page",url)
                    }
                    url = this.$cookies.get("m_old_category_page")
                    if(!url) url = `/member/categoryProduct`
                    axios.get(url)
                        .then(res=>{
                        //    console.log(res.data)
                            this.category = res.data.category
                                })
            },
        },
}
</script>
