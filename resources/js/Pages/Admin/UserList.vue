<template>
    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-table mr-1"></i>
            User List
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <div
                    id="dataTable_wrapper"
                    class="dataTables_wrapper dt-bootstrap4"
                >
                    <table
                        class="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Start Date</th>
                                <th>Last Update</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Start Date</th>
                                <th>Last Update</th>
                                <th>Manage</th>
                            </tr>
                        </tfoot>

                        <tbody>
                            <tr v-for="ur in users.data">
                                <td>{{ur.name}}</td>
                                <td>{{ur.email}}</td>
                                <td>
                                    <ul>
                                        <li v-for="ro in ur.roles">{{ro.name}}</li>
                                    </ul>
                                </td>
                                <td>

                                    <a href="#" :title="moment(ur.created_at)">
                                        {{moment(ur.created_at).fromNow()}}
                                    </a>
                                    
                                </td>
                                <td>
                                    <a href="#" :title="moment(ur.updated_at)">
                                        {{moment(ur.updated_at).fromNow()}}
                                    </a>
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-outline-primary" 
                                            @click.prevent="$emit('userEdit',ur.id)">
                                            <b-icon icon="pencil"></b-icon>
                                        </button>

                                        <button class="btn btn-outline-danger" 
                                            @click.prevent="$emit('userDel',ur.id)" 
                                            v-show="ownId != ur.id">
                                            <b-icon icon="trash"></b-icon>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Start -->

                    <div class="row"><!-- START div.row pagination -->
                        <div class="col-sm-12 col-md-5">
                            <div
                                class="dataTables_info"
                                id="dataTable_info"
                                role="status"
                                aria-live="polite"
                            >
                                Showing {{ users.from }} to {{ users.to }} of
                                {{ users.total }} entries
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-7">
                            <div
                                class="dataTables_paginate paging_simple_numbers"
                                id="dataTable_paginate"
                            >
                                <ul class="pagination">
                                    <!-- Link list Start -->

                                    <li
                                        class="paginate_button page-item"
                                        v-for="pa in users.links"
                                    >
                                        <a
                                            href="#"
                                            aria-controls="dataTable"
                                            data-dt-idx="pa.id"
                                            tabindex="0"
                                            class="page-link"
                                            @click.prevent="
                                                $emit('getUserList', pa.url)
                                            "
                                            v-html="pa.label"
                                            v-if="!pa.active && pa.url != null"
                                        >
                                            {{ pa.label }}
                                        </a>
                                        <span
                                            class="page-link"
                                            v-html="pa.label"
                                            v-else
                                        >
                                            {{ pa.label }}
                                        </span>
                                    </li>

                                    <!-- End Link list  -->
                                    <li
                                        class="paginate_button page-item active"
                                    >
                                        <a
                                            href="#"
                                            aria-controls="dataTable"
                                            tabindex="0"
                                            class="page-link disabled"
                                            disabled
                                        >
                                            <b-icon icon="book-half"></b-icon>
                                            {{ users.current_page }}
                                        </a>
                                    </li>
                                </ul>
                            </div><!-- end div link list wrap -->
                        </div><!-- end of div.col-sm-12 col-md-7 -->

                    </div><!-- end of div.row pagination -->


                </div><!-- end of div dataTable_wrapper -->
            </div>
            <!-- end of div.table-responsive -->

        </div>
        <!-- end of div.card-body -->
    </div>
    <!-- end div.card.mb-4 -->
</template>

<script>
var moment = require('moment')
export default {
    name: "UserList",
    props: ["users"],
    data(){
        return{
            moment:moment,
            ownId:window.ownId,
            isDisabled:false
        }
    },
    methods:{
        getDisabled(x){
            if(x == ownId){
                this.isDisabled = true
            } 
            
        }
    }
};
</script>
