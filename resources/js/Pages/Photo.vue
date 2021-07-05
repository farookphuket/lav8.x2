<template>
    <div class="container">
            <photo-list @getPhotos="getPhotos($event)"
                :photos="photos"></photo-list>

    </div>
</template>

<script>
import PhotoList from './PhotoList.vue'
export default{
    name:"PubPhoto",
    components:{
        PhotoList,
    },
    data(){
        return{
            photos:[],
        }
    },
    mounted(){
        this.getPhotos()
    },
    methods:{
        getPhotos(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("pubpic_old_page",url)
            }
            url = this.$cookies.get("pubpic_old_page")
            if(!url){
                url = `/api/getPhotos`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.photos = res.data.photos
                })
        }
    }
}
</script>
