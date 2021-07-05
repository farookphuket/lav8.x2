<template>
    <div class="container-fluid">
        <h1 class="mt-4">Users</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Users</li>
        </ol>

        <div class="card mb-4">
            <div class="card-body">
                DataTables is a third party plugin that is used to generate the
                demo table below. For more information about DataTables, please
                visit the
                <a target="_blank" href="https://datatables.net/"
                    >official DataTables documentation</a
                >
                .
            </div>
        </div>

        <div class="card mb-4 pt-4">
            <div class="card-body">
                <p>
                    to create new user click the button
                </p>
                <a target="_blank" href="https://datatables.net/"
                    >official DataTables documentation</a
                >
                .
                <div class="clearfix">
                    <div class="float-right">
                        <div class="btn-group">

                            <button
                                class="btn btn-outline-primary btn-xl"
                                @click="showList = false"
                                v-if="showList == true" 
                            >
                                <b-icon icon="search"></b-icon>
                            </button>
                            <button
                                class="btn btn-outline-danger btn-xl"
                                @click="showList = true"
                                v-else
                            >
                                <b-icon
                                    icon="x-circle"
                                    variant="danger"
                                ></b-icon>
                            </button>



                            <button
                                class="btn btn-outline-primary btn-xl"
                                @click="showForm = true"
                                v-if="showForm == false"
                            >
                                <b-icon icon="plus"></b-icon>
                            </button>
                            <button
                                class="btn btn-outline-danger btn-xl"
                                @click="showForm = false"
                                v-else
                            >
                                <b-icon
                                    icon="x-circle"
                                    variant="danger"
                                ></b-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <user-form
            :editId="editId" 
            :roles="roles"
            @getUserList="getUserList($event)"
            v-show="showForm"
        ></user-form>

        <user-search v-if="showList == false"></user-search>
        <user-list
            :users="users"
            @getUserList="getUserList($event)" 
            @userEdit="userEdit($event)" 
            @userDel="userDel($event)"
            v-show="showList"
        ></user-list>

        <b-modal ref="onOk" title="Server Said :" centered ok-only>
            <div class="container" v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
import UserForm from "./UserForm.vue";
import UserList from "./UserList.vue";
import UserSearch from "./UserSearch.vue"

export default {
    name: "ManUser",
    components: {
        UserList,
        UserForm,
        UserSearch
    },
    data() {
        return {
            users: [],
            editId: "",
            roles:[],
            showForm: false,
            showList:true,
            res_status:''
        };
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        getUserList(page) {
            this.editId = 0
            let url = "";
            if (page) {
                url = page;
                this.$cookies.set("auser_old", url);
            }
            url = this.$cookies.get("auser_old");
            if (!url) {
                url = `/admin/getUserList`;
            }
            axios.get(url).then((res) => {

                this.users = res.data.users;
                this.roles = res.data.roles;
            });
        },
        userEdit(id) {
            this.editId = id;
            this.showForm = true;
        },
        userDel(id) {
            let url = `/admin/user/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()

                })
            setTimeout(()=>{
                this.getUserList()
            },2300)

        },
    },
};
</script>
