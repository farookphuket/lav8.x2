<template>
    <div class="card">
        <div class="card-heading">
            <h2 class="text-center">
                timeline list
            </h2>
        </div>
        <div class="card-body">
            <!--show data in table -->
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <th>User Name</th>
                        <th>Date Create</th>
                        <th>Date Report</th>
                        <th>Manage</th>
                    </thead>
                    <tbody>
                        <tr v-for="tl in timeline.data">
                            <td>{{tl.user.name}}</td>
                            <td>
                                <a href="" :title="moment(tl.created_at)">
                                    {{moment(tl.created_at).fromNow()}}
                                </a>
                            </td>
                            <td>
                                <a href="" :title="moment(tl.date_ref)">
                                    {{moment(tl.date_ref).fromNow()}}
                                </a>
                            </td>
                            <td>
                                <span v-if="tl.updated_at != tl.created_at">
                                    update : 
                                    <a href="" :title="moment(tl.updated_at)">
                                        {{moment(tl.updated_at).fromNow()}}
                                    </a>
                                </span>
                                <div class="btn-group float-right">
                                    <button class="btn btn-outline-primary btn-sm" 
                                        @click.prevent="$emit('edit',tl.id)">
                                        <b-icon icon="pen"></b-icon>
                                    </button>
                                    <button class="btn btn-outline-primary btn-sm">
                                        <b-icon icon="eye"></b-icon>
                                    </button>
                                    <button class="btn btn-outline-danger btn-sm" 
                                        @click.prevent="$emit('del',tl.id)">
                                        <b-icon icon="trash"></b-icon>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--show data in table -->
        </div><!-- end of div.card-body -->
    </div>
</template>

<script>
var moment = require("moment")

export default{
    name:"TimelineList",
    props:["timeline"],
    data(){
        return{
            moment:moment,
        }
    },
}
</script>
