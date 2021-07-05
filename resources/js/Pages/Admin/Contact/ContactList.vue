<template>
    <div class="card-body">
        <div class="table-responsive">
            <div id="dataTable_wrapper_x2" 
                class="dataTables_wrapper dt-bootstrap4">
                <div class="row">

                    <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length" 
                            >

                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-sm-12">
                        <table class="table table-bordered " 
                                width="100%" cellspacing="0" 
                               role="grid" aria-describedby="dataTable_info" 
                                style="width: 100%;">

                            <!-- ====== table title START ===== -->

                            <thead>
                                <tr role="row">
                                    <th class="sorting_asc" tabindex="0" 
                                                            aria-controls="dataTable" 
                                                            rowspan="1" colspan="1" 
                                                                        aria-sort="ascending" 
                                                                        aria-label="Name: activate to sort 
                                                                                      column descending" 
                                                                        style="width: 123px;">
                                        Name
                                    </th>
                                    <th class="sorting" tabindex="0" 
                                                        aria-controls="dataTable" rowspan="1" 
                                                                                  colspan="1" 
                                                                                  aria-label="Position: activate to sort 
                                                                                                column ascending" 
                                                                                  style="width: 199px;">
                                        Title
                                    </th>
                                    <th class="sorting" tabindex="0" 
                                                        aria-controls="dataTable" rowspan="1" 
                                                                                  colspan="1" aria-label="Office: 
                                                                                                          activate to sort column ascending" 
                                                                                              style="width: 91px;">
                                        Email
                                    </th>
                                    <th class="sorting" tabindex="0" 
                                                        aria-controls="dataTable" 
                                                        rowspan="1" 
                                                        colspan="1" 
                                                      aria-label="Age: activate to sort 
                                                                    column ascending" 
                                                      style="width: 34px;">
                                        Reply
                                    </th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th rowspan="1" colspan="1">
                                        Name
                                    </th>
                                    <th rowspan="1" colspan="1">
                                        Title
                                    </th>
                                    <th rowspan="1" colspan="1">
                                        Email
                                    </th>
                                    <th rowspan="1" colspan="1">
                                        Reply
                                    </th>
                                </tr>
                            </tfoot>


                            <!-- ====== table title END ===== -->


                            <tbody>
                                <tr role="row" class="even" 
                                    v-for="co in contacts.data">
                                    <td class="sorting_1">
                                        <a href="" :title="co.user.name">
                                            {{co.name}} 
                                        </a> &nbsp; 
                                        <button class="btn btn-outline-danger 
                                            btn-sm" 
                                            @click.prevent="$emit('del',co.id)">
                                        <b-icon icon="trash"></b-icon>
                                        </button >

                                    </td>
                                    <td>
                                        <a href="" :title="co.title">
                                            {{sTitle.smartTitle(co.title,16)}}
                                        </a>
                                    </td>
                                    <td>
                                        <a href="" :title="co.user.email">
                                            {{co.email}}
                                        </a>
                                    </td>
                                    <td v-if="co.replied_at == 'NO'">

                                        <a href="" 
                                           @click.prevent="$emit('edit',co.id)"
                                            title="Not Reply yet">
                                        {{co.replied_at}}
                                        </a>

                                    </td>
                                    <td v-else>
                                        <a href="" 
                                           @click.prevent="$emit('edit',co.id)"
                                            :title="moment(co.replied_at)">
                                            {{moment(co.replied_at).fromNow()}}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>


            <!-- ========= Pagination div.row START ============ -->
            <div class="row">


                <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" 
                        id="dataTable_info_x" 
                        role="status" 
                        aria-live="polite">
                        Showing {{contacts.from}} to 
                        {{contacts.to}} of 
                        {{contacts.total}} entries
                    </div>
                </div>

                <div class="col-sm-12 col-md-7">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">

                            <li class="page-item" v-for="li in contacts.links">
                                <a class="page-link p-2" href="" v-html="li.label" 
                                    v-if="!li.active && li.url != null" 
                                    @click.prevent="$emit('getContact',li.url)">
                                    {{li.label}}
                                </a>
                                <span class="page-link active" 
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{contacts.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
                </div>

            </div>

            <!-- ========= Pagination div.row END ============ -->



            </div>
        </div>
    </div>



</template>
<script>


var moment = require('moment')
export default{
    name:"ContactList",
    props:["contacts"],
    data(){
        return{
            moment:moment,
            sTitle:new CustomText(),

        }
    },

}

</script>
