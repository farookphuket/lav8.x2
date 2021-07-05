<template>

    <!--
                <div class="col-xl-4 col-lg-5">
                    <aside class="right-wrapper">
                -->

                        <div class="sidebar-box tags-box">
                            <h4>Popular Tag</h4>
                            <ul>
                                <li v-for="ta in post_tag">
                                    <a href="/tag" 
                                       :title="ta.tag_name"
                                        class="button button-sm 
                                        border-button radius-30" v-show="ta.blogs.length != 0">
                                        {{ta.tag_name}} {{ta.blogs.length}}
                                    </a>
                                </li>

                            </ul>
                        </div>

<!--
                    </aside>
                </div>
-->

</template>


<script>
export default{
    name:"BlogTags",
    props:["post_tag"]
}
</script>

