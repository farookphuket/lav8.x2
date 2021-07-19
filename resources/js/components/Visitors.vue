<template>
    <ul class="links">
        <li v-for="mm in my_info">
                <span>{{mm.os}} &middot;
                {{mm.browser}}
                &middot; {{mm.ip}}</span>
        </li>
        <li>today {{day_num}}</li>
        <li>this month {{month_num}}</li>
        <li>this year {{year_num}}</li>
        <li>all time {{all_num}}</li>
    </ul>
</template>

<script>

export default{
    name:"Visitors",
    data(){
        return{
            all_num:'',
            day_num:'',
            month_num:'',
            year_num:'',
            my_info:[]
        }
    },
    mounted(){
        this.getVisitors()
    },
    methods:{
        getVisitors(){
            let url = `/api/getVisitors`
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    let fData = res.data;
                    this.my_info = fData.my_info
                    this.all_num = fData.all_time 
                    this.day_num = fData.day 
                    this.year_num = fData.year_visit
                    this.month_num = fData.month_visit
                })
        }
    },
}
</script>
