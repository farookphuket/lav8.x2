<template>
    <div class="pt-4 mb-4">
        <div class="row justify-content-center">
            <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light my-4">
                            {{ label }} User
                        </h3>
                    </div>
                    <div class="card-body">
                        <form
                            action="#"
                            @submit.prevent="saveUser(saveId)"
                            @keydown="userForm.errors.clear($event.target.name)"
                        >
                            <div class="form-group">
                                <label class="small mb-1" for="inputName"
                                    >Name</label
                                >
                                <input
                                    class="form-control py-4"
                                    v-model="userForm.name"
                                    name="name"
                                    ref="name"
                                    type="text"
                                    placeholder="Enter Name"
                                />
                            </div>

                            <div class="form-group">
                                <label
                                    class="small mb-1"
                                    for="inputEmailAddress"
                                    >Email</label
                                >
                                <input
                                    class="form-control py-4"
                                    v-model="userForm.email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                />

                                <span style="color:red;font-weight:bold;"
                                    v-show="userForm.errors.get('email')"
                                    v-if="userForm.errors.get('email')"
                                    ></span>
                            </div>

                            <div class="form-group">

                                <div
                                    class="custom-control custom-checkbox"
                                    v-for="x in roles"
                                >

                                    <label class="control-label">
                                    <input
                                        v-model="select_roles"
                                        name="roles"
                                        type="checkbox"
                                        :value="x.id"
                                    /> 
                                    {{x.id}}.{{ x.name }} </label
                                    >
                                     
                                </div>
                            </div>
                            <div
                                class="form-group d-flex align-items-center justify-content-between mt-4 mb-0"
                            >
                                <button
                                    class="btn btn-outline-primary"
                                    type="submit"
                                >
                                    Save
                                </button>

                                <button class="btn btn-outline-danger" 
                                   @click.prevent="clear()">
                                    <b-icon
                                        icon="x-circle"
                                    ></b-icon>
                                </button>
                            </div>
                            <div class="form-group pt-4" v-html="res_status">
                                {{res_status}}
                            </div>

                        </form>
                    </div>
                    <div class="card-footer text-center">
                        <div class="small">
                            &nbsp;
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- b-modal -->
        <b-modal ref="onOk" title="Server Said :" 
            @ok="clear"
            centered on-only>
            <div class="container" v-html="res_status">{{res_status}}</div>
        </b-modal>
        <!-- b-modal END -->
    </div>
</template>

<script>
export default {
    name: "UserForm",
    props: ["editId", "roles"],
    watch: {
        editId: function(x) {
            this.getEditData(x);
        },
    },
    data() {
        return {
            label: "Create",
            saveId: 0,
            select_roles:[],
            res_status:'',
            userForm: new Form({
                name: "",
                email: "",
                id: "",
                roles:[],
            }),
        };
    },
    methods: {
        getEditData(x) {
            this.$refs.name.focus()
            this.select_roles = []
            if (x != 0) {
                this.label = "Update"
                let url = `/admin/user/${x}`;
                axios.get(url).then(res => {
                    //console.log(res.data.user);
                    let fData = res.data.user;
                    fData.forEach((val)=>{
                        if(val.id == x){
                            //console.log(val.roles)
                            
                            this.userForm.id = val.id;
                            this.userForm.name = val.name;
                            this.userForm.email = val.email;
                            this.saveId = val.id;
                            val.roles.forEach((ro)=>{
                                this.select_roles.push(ro.pivot.role_id)
                            })

                        }

                    })
                });
            }
        },
        saveUser(id) {
            let url = "";

            // role must be set here
            this.userForm.roles = this.select_roles
            if (id) {
                url = `/admin/user/${id}`
                this.userForm.submit("put", url).then((res) => {
                    //console.log(res);
                    this.res_status = res.msg
                })
                .catch((err) => {
                    //    console.log(err);
                        let ob = Object.values(err);
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join("")}</span>`;
                    });

            }else{

                url = `/admin/user`
                this.userForm.submit("post", url).then((res) => {
                    //console.log(res);
                    this.res_status = res.msg
                })
                .catch((err) => {
                    //    console.log(err);
                        let ob = Object.values(err);
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join("")}</span>`;
                    });
            }

            this.$refs["onOk"].show()
        },
        clear(){
            this.saveId = 0
            this.res_status = ''
            this.select_roles = []
            this.userForm.reset()
            this.$emit('getUserList')
        },
    },
};
</script>
