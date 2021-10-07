<template>
    <div class="container">
       <div class="card">
            <!-- loop for adress object START -->
           <div class="card-body" v-for="ad in address_list.data">
                <div class="table-responsive">
                    <table class="table table-striped">
                        
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>
                                    {{ad.first_name}} 
                                    <span class="alert alert-info p-2">
                                        ({{ad.name}})
                                    </span>
                                </td>
                                <th>last name</th>
                                <td>{{ad.last_name}}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{{ad.address}}</td>

                                <th>default shipping address</th>
                                <td>
                                    <span 
                                    class="alert alert-success"
                                    v-if="ad.is_default_address != 0">
                                        Yes
                                    </span>
                                    <span 
                                        class="alert alert-warning"
                                    v-else>No</span>
                                    
                                </td>
                            </tr>
                            <tr>
                                <th>city</th>
                                <td>{{ad.city}}</td>

                                <th>Stage</th>
                                <td>
                                    {{ad.stage}} - 
                                    <span class="alert alert-info">
                                        {{ad.country}}
                                    </span>
                                    
                                </td>

                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>{{ad.email}}</td>
                                <th>Tel</th>
                                <td>{{ad.tel}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="btn-group float-right">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="$emit('edit',ad.id)">
                                <b-icon icon="pen"></b-icon> Edit 
                            </button>

                            <button class="btn btn-outline-danger " 
                            @click.prevent="$emit('del',ad.id)">
                                <b-icon icon="trash"></b-icon> Remove 
                            </button>
                        </div>
                    </div>
                </div>

           </div>
            <!-- loop for adress object START -->

       </div>
    </div>
</template>

<script>

export default{
    name:"AddressList",
    props:["user_id","address_list","default_address_id"],
    data(){
        return{
            res_status:'',
        }
    },
    mounted(){

    },
methods:{


        },
}
</script>
