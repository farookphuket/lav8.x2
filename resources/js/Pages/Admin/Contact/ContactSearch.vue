<template>

    <div class="card-body">
        <div class="table-responsive">
            <div id="dataTable_wrapper" 
                class="dataTables_wrapper dt-bootstrap4">
                <div class="row">
                    <div class="col-lg-12 ">
                        <div id="dataTable_filter" class="dataTables_filter">
                            <label>Search:
                                <input type="text" 
                                @keyup.prevent="getResult"
                                class="form-control form-control-sm" 
                                name="search" ref="search" v-model="search"
                                placeholder="" aria-controls="dataTable">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12" v-show="results != 0">
                        <table class="table table-bordered dataTable" 
                               id="dataTable" width="100%" cellspacing="0" 
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
                                        Create
                                    </th>
                                    <th class="sorting" tabindex="0" 
                                       aria-controls="dataTable" rowspan="1" 
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
                                        Create
                                    </th>
                                    <th rowspan="1" colspan="1">
                                        Reply
                                    </th>
                                </tr>
                            </tfoot>


                            <!-- ====== table title END ===== -->


                            <tbody>
                                <tr role="row" class="even" v-for="li in results">
                                    <td class="sorting_1">{{li.name}}</td>
                                    <td>
                                        <a href="" :title="li.title">
                                            {{sTitle.smartTitle(li.title,12)}}
                                        </a>
                                    </td>
                                    <td>
                                        <a href="" :title="moment(li.created_at)">
                                            {{moment(li.created_at).fromNow()}} 
                                        </a>
                                    </td>
                                    <td>
                                        <span v-if="li.replied_at != 'NO'">
                                            <b-icon icon="person"></b-icon>
                                            <a href="" :title="moment(li.replied_at)">
                                                {{moment(li.replied_at).fromNow()}}
                                            </a>
                                        </span>
                                        <p v-else>{{li.replied_at}}</p> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>





            </div>
        </div>
    </div>

</template>

<script>
var moment = require('moment')
export default{
    name:"ContactSearch",
    data(){
        return{
            results:0,
            search:'',
            moment:moment,
            sTitle:new CustomText(),
        }
    },
    methods:{
        getResult(){
            if(this.$refs.search.value.length >= 3){
                this.search = this.$refs.search.value
                let url = `/admin/searchContact?search=${this.search}`
                axios.get(url)
                    .then(res=>{
                        console.log(res.data)
                        this.results = res.data.faqs

                    })
            }
        }
    },

}

</script>
