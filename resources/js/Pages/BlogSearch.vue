<template>
    <div class="sidebar-box search-box">
        <form action="#" @keyup="sentSearch">
        <input type="text" name="search" v-model="search" 
        placeholder="Search" ref="search">
        <button> <i class="lni lni-search-alt"></i> </button>
        </form>
    </div>
</template>


<script>

export default{
    name:"BlogSearch",
    data(){
        return{
            search:''
        }
    },
    methods:{
        sentSearch(){
            //let fSearch = this.$refs.search.value
            this.$emit('getSearch',this.search)
        },
    }
}
</script>
