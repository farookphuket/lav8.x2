<template>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table mr-1"></i>
        Search User
    </div>
    <div class="card-body">
        <div class="table-responsive">

            <div id="dataTable_wrapper" 
                class="dataTables_wrapper dt-bootstrap4">
                <div class="row">

                    <!--
                    <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length" id="dataTable_length">
                            <label>Show 
                                <select name="dataTable_length" 
                                    aria-controls="dataTable" 
                                    class="custom-select custom-select-sm 
                                    form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> 
                                entries
                            </label>
                        </div>
                    </div>
                    -->
                    <div class="col-lg-12">
                        <div  class="form-group">
                            <input v-model="search" class="form-control" 
                            type="text" name="search" ref="search" 
                            @keyup="searchUser">
                        </div>
                    </div>
                </div>


            <table class="table table-bordered" id="dataTable" width="100%" 
                cellspacing="0" v-show="showTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Start Date</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Start Date</th>
                        <th>Last Update</th>
                    </tr>
                </tfoot>

                <tbody>
                    <tr v-for="us in users">
                        <td>{{us.name}}</td>
                        <td>{{us.email}}</td>
                        <td>
                            <ul>
                                <li v-for="ro in us.roles">
                                    {{ro.name}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <a href="#" :title="moment(us.created_at)">
                                {{moment(us.created_at).fromNow()}}
                            </a>
                        </td>
                        <td>
                            <a href="#" :title="moment(us.updated_at)">
                                {{moment(us.updated_at).fromNow()}}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            </div>
        </div><!-- end of div.table-responsive -->
        <!-- pagination -->


        <!-- pagination END -->

    </div><!-- end of div.card-body -->

</div><!-- end div.card.mb-4 -->

</template>

<script>
var moment = require('moment')
export default{
    name:"UserSearch",
    data(){
        return{
            users:[],
            search:'',
            showTable:false,
            moment:moment,
        }
    },
    mounted(){
        
    },
    methods:{
        searchUser(){
            //console.log(this.search.length)
            if(this.search.length >= 3){
                let url = `/admin/usearch?search=${this.search}`
                axios.get(url)
                    .then(res=>{
                        console.log(res.data)

                        this.users = res.data.users
                        if(this.users.length != 0){
                            this.showTable = true
                        }
                    })
            }
        }
    },
}
</script>
