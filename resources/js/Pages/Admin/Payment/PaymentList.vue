<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mt-2" v-for="pa in payment.data">

                <div class="float-right btn-group mb-2">
                    <button class="btn btn-outline-primary" 
                    @click.prevent="$emit('edit',pa.id)">
                        <b-icon icon="pen"></b-icon>
                    </button>

                    <button class="btn btn-outline-danger" 
                    @click.prevent="$emit('del',pa.id)">
                        <b-icon icon="trash"></b-icon>
                    </button>
                </div>
                <span class="text-center"
                style="max-height:320px;">
                    <img class="responsive mx-auto d-block" 
                        :src="pa.pay_pic_absolute_path" 
                        style="display:block;height:320px;width:320px;"
                    :alt="pa.pay_title">
                </span>
                <p class="text-center p-2">
                    <a :href="pa.pay_url" target="_blank">
                        {{pa.pay_title}} 
                    </a>

                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"PaymentList",
    props:["payment"],

}
</script>
