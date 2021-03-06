/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */





import Form from './core/Form';
import axios from 'axios';
import CustomText from './core/CustomText';

window.axios = axios;
window.Form = Form;

window.CustomText = CustomText;


window.Vue = require('vue').default;


/* ============  Vue-cookies ========= 
 * npm install vue-cookies 
 */
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)



/* ======= moment ========
 * npm install moment --save
 */
import moment from 'moment';

/*
 * =========== Jodit-vue ===========
 * command npm install jodit-vue --save
 */
import 'jodit/build/jodit.min.css'
import JoditVue from 'jodit-vue'
Vue.use(JoditVue)



/**  ============ Bootstrap-vue 16 Apr 2021============ 
    * command  npm install bootstrap bootstrap-vue
    * */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



/* ============================================================================ 
 * Global variable
 * ============================================================================
 * */
//const EventBus = new Vue()

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/*   
 *
 *   ======= Public ==============
 *   */


//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('Visitors', ()=> import('./components/Visitors.vue'));

// support link on 3 Oct 2021
Vue.component('Support', ()=> import('./Pages/Support.vue'));


// pub-product  on 4 Oct 2021
Vue.component('PubProduct', ()=> import('./Pages/Pub/Product/Product.vue'));

Vue.component('LoginPage', ()=> import('./Pages/LoginPage.vue'));

Vue.component('PubBlog',()=>import('./Pages/Blog.vue'))
Vue.component('PubComment',()=>import('./Pages/BlogComment.vue'))

// contact form 
//Vue.component('ContactForm', ()=>import('./components/ContactForm.vue'))
Vue.component('FaqUs', ()=>import('./components/ContactList.vue'))

// show form reset password
Vue.component('ResetPassword', ()=> import('./Pages/resetPasswordForm.vue'));

Vue.component('PubPhoto',()=> import('./Pages/Photo.vue'));

// shipping address
Vue.component('ShippingAddress',()=> import('./Pages/Address.vue'));

Vue.component('PubWhatnews',()=> import('./Pages/Whatnews.vue'));


/* ======================== END public ============*/


/* ======================= Member Section ============== */
/* member section */
Vue.component('MemberWhatnew',()=>import('./Pages/Member/Whatnew/Whatnew.vue'))
Vue.component('MemberPhoto', ()=> import('./Pages/Member/Photo.vue'));
Vue.component('MemberTimeline', ()=> import('./Pages/Member/Timeline.vue'));
Vue.component('MemberBlog',()=>import('./Pages/Member/Blog/Blog.vue'))
Vue.component('BlogComment',()=>import('./Pages/Member/Blog/Comment.vue'))
Vue.component('MemberProfile',()=>import('./Pages/Member/Profile/profile.vue'))

// template 19 Jul 2021 
Vue.component('MemberTemplate',()=>import('./Pages/Member/Template/Template.vue'))

// comment 27 Jul 2021 
Vue.component('MemberComment',()=>import("./Pages/Member/Comment/Comment.vue"))


// member product 24 Aug 2021
Vue.component('MemberProduct',()=>import("./Pages/Member/Product/Product.vue"))


// product-order-form
Vue.component('ProductOrderForm',()=> import('./Pages/Member/Product/ProductOrderForm.vue'))


// Cart 
Vue.component('MyCart',()=>import('./Pages/Member/Product/Cart.vue'))

/* ======================= Member Section END ============== */
/* ========================================================= */


/* ======================= Admin section START ============= */
Vue.component('ManUser',()=> import('./Pages/Admin/User.vue'))
Vue.component('ManContact',()=>import('./Pages/Admin/Contact/Contact.vue'))
Vue.component('ManComment',()=>import('./Pages/Admin/Comment/Comment.vue'))
Vue.component('ManBlog',()=>import('./Pages/Admin/Blog/Blog.vue'))

// 8 Aug 2021 
Vue.component('AdminComment',()=>import('./Pages/Admin/Blog/BlogComment.vue'))

Vue.component('ManTag',()=>import('./Pages/Admin/Tag/Tag.vue'))
Vue.component('AdminProfile',()=>import('./Pages/Admin/Profile/Profile.vue'))
Vue.component('ManCategory',()=>import('./Pages/Admin/Category/Category.vue'))
Vue.component('ManWhatnew',()=>import('./Pages/Admin/Whatnew/Whatnew.vue'))

// timeline 16 Jul 2021
Vue.component('ManTimeline',()=>import('./Pages/Admin/Timeline/Timeline.vue'))

// template 
Vue.component('ManTemplate',()=>import('./Pages/Admin/Template/Template.vue'))



// Product 
Vue.component('ManProduct',()=>import('./Pages/Admin/Product/Product.vue'))


// Payment 
Vue.component('ManPayment',()=>import('./Pages/Admin/Payment/Payment.vue'))

/* ====================== Admin section END ================== */



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
