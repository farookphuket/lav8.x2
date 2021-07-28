(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Blog_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BlogTag_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlogTag.vue */ "./resources/js/Pages/BlogTag.vue");
/* harmony import */ var _BlogSearch_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlogSearch.vue */ "./resources/js/Pages/BlogSearch.vue");
/* harmony import */ var _BlogList_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BlogList.vue */ "./resources/js/Pages/BlogList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PubBlog",
  components: {
    BlogList: _BlogList_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    BlogTags: _BlogTag_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    BlogSearch: _BlogSearch_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      search: [],
      showSearch: false,
      blogs: [],
      post_tag: [],
      showPagination: false
    };
  },
  mounted: function mounted() {
    this.getBlogs();
    this.getTags();
  },
  methods: {
    getBlogs: function getBlogs(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("pblog_olg_page", url);
      }

      url = this.$cookies.get("pblog_olg_page");

      if (!url) {
        url = "api/getBlog";
      }

      axios.get(url).then(function (res) {
        //                    console.log(res.data)
        _this.blogs = res.data.blogs;
        if (Object.keys(_this.blogs.data).length >= 14) _this.showPagination = true;
      });
    },
    getTags: function getTags(page) {
      var _this2 = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("ptag_old_page", url);
      }

      url = this.$cookies.get("ptag_old_page");

      if (!url) {
        url = "/getTags";
      }

      axios(url).then(function (res) {
        _this2.post_tag = res.data.post_tag;
      });
    },
    getSearch: function getSearch(key) {
      var _this3 = this;

      if (!key) {
        this.showSearch = false;
      } else {
        this.showSearch = true;
        var url = "/blogSearch?search=".concat(key);
        axios.get(url).then(function (res) {
          //console.log(res.data)
          _this3.search = res.data.blogs;
        });
      }
    },
    openMe: function openMe(ir) {
      var url = "/blog/".concat(ir);
      location.href = url;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BlogList",
  props: ["blogs", "showPagination"],
  data: function data() {
    return {
      sTitle: new CustomText(),
      moment: moment
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BlogSearch",
  data: function data() {
    return {
      search: ''
    };
  },
  methods: {
    sentSearch: function sentSearch() {
      //let fSearch = this.$refs.search.value
      this.$emit('getSearch', this.search);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BlogTags",
  props: ["post_tag"]
});

/***/ }),

/***/ "./resources/js/Pages/Blog.vue":
/*!*************************************!*\
  !*** ./resources/js/Pages/Blog.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Blog.vue?vue&type=template&id=5ff005cb& */ "./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb&");
/* harmony import */ var _Blog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Blog.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Blog.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Blog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__.render,
  _Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Blog.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/BlogList.vue":
/*!*****************************************!*\
  !*** ./resources/js/Pages/BlogList.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlogList.vue?vue&type=template&id=98766bee& */ "./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee&");
/* harmony import */ var _BlogList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlogList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/BlogList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _BlogList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__.render,
  _BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/BlogList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/BlogSearch.vue":
/*!*******************************************!*\
  !*** ./resources/js/Pages/BlogSearch.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlogSearch.vue?vue&type=template&id=56d67d5a& */ "./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a&");
/* harmony import */ var _BlogSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlogSearch.vue?vue&type=script&lang=js& */ "./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _BlogSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__.render,
  _BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/BlogSearch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/BlogTag.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/BlogTag.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlogTag.vue?vue&type=template&id=122ca8ff& */ "./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff&");
/* harmony import */ var _BlogTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlogTag.vue?vue&type=script&lang=js& */ "./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _BlogTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__.render,
  _BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/BlogTag.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Blog.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/Pages/Blog.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Blog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Blog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Blog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/BlogList.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/Pages/BlogList.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogTag.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb&":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Blog_vue_vue_type_template_id_5ff005cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Blog.vue?vue&type=template&id=5ff005cb& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb&");


/***/ }),

/***/ "./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee&":
/*!************************************************************************!*\
  !*** ./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogList_vue_vue_type_template_id_98766bee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogList.vue?vue&type=template&id=98766bee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee&");


/***/ }),

/***/ "./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a&":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogSearch_vue_vue_type_template_id_56d67d5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogSearch.vue?vue&type=template&id=56d67d5a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a&");


/***/ }),

/***/ "./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BlogTag_vue_vue_type_template_id_122ca8ff___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BlogTag.vue?vue&type=template&id=122ca8ff& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Blog.vue?vue&type=template&id=5ff005cb& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-lg-12" },
      [
        _c("blog-list", {
          attrs: { blogs: _vm.blogs, showPagination: _vm.showPagination },
          on: {
            openMe: function($event) {
              return _vm.openMe($event)
            },
            getBlogs: function($event) {
              return _vm.getBlogs($event)
            }
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogList.vue?vue&type=template&id=98766bee& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "left-wrapper" }, [
    _c("div", { staticClass: "feature-style-6 bg-white pt-0 pb-60" }, [
      _c(
        "div",
        { staticClass: "row" },
        _vm._l(_vm.blogs.data, function(bl) {
          return _c("div", { staticClass: "col-lg-12 pt-2" }, [
            _c("div", { staticClass: "content" }, [
              _c("h5", [
                _c(
                  "a",
                  {
                    attrs: { href: "#", title: bl.title },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.$emit("openMe", bl.slug)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                                " +
                        _vm._s(_vm.sTitle.smartTitle(bl.title, 25))
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  [
                    _c("b-icon", { attrs: { icon: "person" } }),
                    _vm._v(
                      "\n                                " +
                        _vm._s(bl.user.name) +
                        "\n                            "
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { domProps: { innerHTML: _vm._s(bl.excerpt) } }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(bl.excerpt) +
                    "\n                        "
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-lg-8" }, [
                  _c("p", [_vm._v(_vm._s(bl.slug))])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-4" }, [
                  _c(
                    "div",
                    { staticClass: "float-right" },
                    _vm._l(bl.tags, function(ta) {
                      return _c(
                        "span",
                        {
                          staticStyle: {
                            "padding-right": "1em",
                            "font-weight": "bold",
                            color: "blue"
                          }
                        },
                        [
                          _c("b-icon", { attrs: { icon: "tags" } }),
                          _vm._v(
                            "\n                                        " +
                              _vm._s(ta.tag_name) +
                              "\n                                    "
                          )
                        ],
                        1
                      )
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-lg-4" },
                  [
                    _vm._v(
                      "\n                                category\n                                "
                    ),
                    _vm._l(bl.category, function(ca) {
                      return _c(
                        "span",
                        { staticClass: "badge badge-primary pt-2" },
                        [
                          _c("b-icon", { attrs: { icon: "bookmark-check" } }),
                          _vm._v(
                            "\n                                    " +
                              _vm._s(ca.cat_title) +
                              "\n                                "
                          )
                        ],
                        1
                      )
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-4" }, [
                  _vm._v(
                    "\n\n                                created :\n                                "
                  ),
                  _c("span", { staticClass: "badge badge-info p-2" }, [
                    _c(
                      "a",
                      {
                        staticClass: "text-white",
                        attrs: { href: "", title: _vm.moment(bl.created_at) }
                      },
                      [
                        _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.moment(bl.created_at).fromNow()) +
                            "\n                                    "
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  bl.created_at != bl.updated_at
                    ? _c("span", {}, [
                        _vm._v(
                          "\n                                    updated :\n                                    "
                        ),
                        _c(
                          "a",
                          {
                            attrs: {
                              href: "",
                              title: _vm.moment(bl.updated_at)
                            }
                          },
                          [
                            _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                            _vm._v(
                              "\n                                        " +
                                _vm._s(_vm.moment(bl.updated_at).fromNow()) +
                                "\n                                    "
                            )
                          ],
                          1
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-4" }, [
                  _c("div", { staticClass: "float-right btn-group" }, [
                    _c(
                      "span",
                      { staticClass: "badge badge-info p-2" },
                      [
                        _c("b-icon", { attrs: { icon: "eye" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(bl.read_count) +
                            "\n\n                                    "
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "badge badge-primary p-2" },
                      [
                        _c("b-icon", { attrs: { icon: "chat-right-text" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(bl.comment_count) +
                            "\n\n                                    "
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-info p-2",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("openMe", bl.slug)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                                        Read More...\n                                    "
                        )
                      ]
                    )
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("hr", {
              staticStyle: { "margin-top": "2em", "margin-bottom": "2em" }
            })
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showPagination,
              expression: "showPagination"
            }
          ],
          staticClass: "nav-scroller py-1 mb-2"
        },
        [
          _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
            _c(
              "ul",
              { staticClass: "pagination flex-wrap " },
              [
                _c("li", { staticClass: "page-item" }, [
                  _c("div", { staticClass: "page-link disabled " }, [
                    _vm._v(
                      "\n                                \n                                    showing from "
                    ),
                    _c("span", [_vm._v(_vm._s(_vm.blogs.from))]),
                    _vm._v(" \n                                    to "),
                    _c("span", [_vm._v(_vm._s(_vm.blogs.to))]),
                    _vm._v(" of \n                                    "),
                    _c("span", [_vm._v(_vm._s(_vm.blogs.total))])
                  ])
                ]),
                _vm._v(" "),
                _vm._l(_vm.blogs.links, function(li) {
                  return _c("li", { staticClass: "page-item" }, [
                    !li.active && li.url != null
                      ? _c(
                          "a",
                          {
                            staticClass: "page-link p-2",
                            domProps: { innerHTML: _vm._s(li.label) },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.$emit("getBlogs", li.url)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(li.label) +
                                " \n                                "
                            )
                          ]
                        )
                      : _c(
                          "span",
                          {
                            staticClass: "page-link active",
                            domProps: { innerHTML: _vm._s(li.label) }
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(li.label) +
                                "\n                                "
                            )
                          ]
                        )
                  ])
                }),
                _vm._v(" "),
                _c("li", { staticClass: "page-item active" }, [
                  _c("div", { staticClass: "page-link" }, [
                    _c(
                      "span",
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                                    " +
                            _vm._s(_vm.blogs.current_page) +
                            "\n                                "
                        )
                      ],
                      1
                    )
                  ])
                ])
              ],
              2
            )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogSearch.vue?vue&type=template&id=56d67d5a& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sidebar-box search-box" }, [
    _c("form", { attrs: { action: "#" }, on: { keyup: _vm.sentSearch } }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.search,
            expression: "search"
          }
        ],
        ref: "search",
        attrs: { type: "text", name: "search", placeholder: "Search" },
        domProps: { value: _vm.search },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.search = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _vm._m(0)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", [_c("i", { staticClass: "lni lni-search-alt" })])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/BlogTag.vue?vue&type=template&id=122ca8ff& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sidebar-box tags-box" }, [
    _c("h4", [_vm._v("Popular Tag")]),
    _vm._v(" "),
    _c(
      "ul",
      _vm._l(_vm.post_tag, function(ta) {
        return _c("li", [
          _c(
            "a",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: ta.blogs.length != 0,
                  expression: "ta.blogs.length != 0"
                }
              ],
              staticClass:
                "button button-sm \n                                        border-button radius-30",
              attrs: { href: "/tag", title: ta.tag_name }
            },
            [
              _vm._v(
                "\n                                        " +
                  _vm._s(ta.tag_name) +
                  " " +
                  _vm._s(ta.blogs.length) +
                  "\n                                    "
              )
            ]
          )
        ])
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);