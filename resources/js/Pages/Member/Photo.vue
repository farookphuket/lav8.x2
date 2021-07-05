<template>
    <div>
        <div class="clearfix">
            <div class="float-right">
                <button class="btn btn-outline-primary" 
                    v-if="showPhotoForm == false" 
                    @click="showPhotoForm=true"
                    >
                    <b-icon icon="plus"></b-icon>
                    Add photo</button>
                <button class="btn btn-outline-danger" @click="showPhotoForm=false"
                    v-else>Close</button>
            </div>
        </div>
        <p class="pt-2 mb-2">&nbsp;</p>
        <photo-form @getPhotos="getPhotos($event)" :editId="editId" 
            v-show="showPhotoForm"></photo-form>
        <photo-list @getPhotos="getPhotos($event)" 
            @delPic="delPic($event)"
            @editPic="editPic($event)"
            :photos="photos" 
            ></photo-list>

        <b-modal ref="onOk" title="server said :"  
            centered
            ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>


<script>
import PhotoForm from "./PhotoForm.vue"
import PhotoList from './PhotoList.vue'
export default{
    name:"MemberPhoto",
    components:{
        PhotoForm,
        PhotoList
    },
    data(){
        return{
            photos:[],
            editId:0,
            res_status:'',
            showPhotoForm:false,
        }
    },
    mounted(){
        this.getPhotos()
    },
    methods:{
        getPhotos(page){
            let url = ""
            if(page){
                url = page
                this.$cookies.set("member_old_photo_page",url)
            }
            url = this.$cookies.get("member_old_photo_page")
            if(!url){
                url = `/api/getPhotos`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.photos = res.data.photos
                })
        },
        editPic(id){
            this.editId = id 
            this.showPhotoForm = true
        },
        delPic(id){
            if(confirm(`this will delete the id ${id} are you sure?`) == true){
                let url = `/member/photo/${id}`
                axios.delete(url)
                    .then(res=>{
                        //console.log(res.data)
                        this.res_status = res.data.msg
                        this.$refs["onOk"].show()
                        setTimeout(()=>{
                            this.getPhotos()
                        },2500)
                    })
            }
        }
    },
}
</script>
