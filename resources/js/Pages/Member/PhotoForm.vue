<template>
    <div>
        <form
            action=""
            @submit.prevent="savePhoto(saveId)"
            @keydown="formData.errors.clear($event.target.name)"
        >
            <div class="row form-group">
                <input
                    v-model="formData.title"
                    class="form-control"
                    type="text"
                    ref="title"
                    name="title"
                    placeholder="the picture title"
                />

                <span
                    v-text="formData.errors.get('title')"
                    v-if="formData.errors.get('title')"
                ></span>
            </div>

            <div class="row form-group">
                <input
                    v-model="formData.url"
                    class="form-control"
                    type="text"
                    ref="formData.url"
                    name="url"
                    placeholder="the picture url"
                />
                <span
                    v-text="formData.errors.get('url')"
                    class="alert alert-danger"
                    v-if="formData.errors.has('url')"
                ></span>
            </div>
            <button
                class="btn btn-outline-primary"
                type="submit"
                :disabled="formData.errors.any()"
            >
                Save
            </button>

            <button
                class="btn btn-outline-danger"
                @click.prevent="clearForm()"
            >
                clear
            </button>
        </form>
        <b-modal title="Server said : " ref="onOk" centered ok-only>
            <div v-html="res_status">{{ res_status }}</div>
        </b-modal>
    </div>
</template>

<script>
//import JoditEditor from "jodit-vue";

export default {
    name: "PhotoForm",
    props:["editId"],
    data() {
        return {
            saveId: 0,
            title: "",
            res_status: "",
            formData: new Form({
                title: "",
                url: "",
            }),
        };
    },
    watch:{
        "editId":function(x){
            this.getEditData(x)
        }
    },
    methods: {
        getEditData(id){
            this.clearForm()
            if(id != 0){
                let url = `/member/photo/${id}`
                axios.get(url)
                    .then(res=>{
                        //console.log(res.data)
                        let fData = res.data.photo
                        this.saveId = fData.id
                        this.formData.title = fData.title
                        this.$refs.title.focus()
                        this.formData.url = fData.url
                    })
            }
        },
        savePhoto(id) {
            let url = "";

            if (id) {
                url = `/member/photo/${id}`;
                //alert(`will save ${id} now`)
                this.formData
                    .submit("put",url)
                    .then((res)=>{

                        this.res_status = res.msg;
                        this.$emit('getPhotos')
                    })
                    .catch((err) => {
                    //    console.log(err);
                        let ob = Object.values(err);
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join("")}</span>`;
                    });
                this.saveId = 0
            } else {
                url = `/member/photo`;
                this.formData
                    .submit("post", url)
                    .then((res) => {
                     //   console.log(res.msg);
                        this.res_status = res.msg;
                        this.$emit('getPhotos')
                    })
                    .catch((err) => {
                    //    console.log(err);
                        let ob = Object.values(err);
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join("")}</span>`;
                    });
            }

            this.$refs["onOk"].show();
        },
        clearForm(){
            this.formData.title = ''
            this.formData.url = ''
            this.saveId = 0
            this.res_status = ''
            this.$emit('getPhotos')
        },

    },
};
</script>
