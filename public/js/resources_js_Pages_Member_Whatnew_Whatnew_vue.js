(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Member_Whatnew_Whatnew_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewForm.vue */ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue");
/* harmony import */ var _WhatnewList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewList.vue */ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue");
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
  name: "Whatnew",
  components: {
    WhatnewForm: _WhatnewForm_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    WhatnewList: _WhatnewList_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      wns: [],
      editId: '',
      res_status: '',
      templates: ''
    };
  },
  mounted: function mounted() {
    this.getWhatnew();
  },
  methods: {
    getWhatnew: function getWhatnew(page) {
      var _this = this;

      this.editId = 0;
      var url = '';

      if (page) {
        url = page;
        this.$cookies.set('mWhatnew_old_page', url);
      }

      url = this.$cookies.get('mWhatnew_old_page');

      if (!url) {
        url = "/member/getWhatnew";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data)
        _this.wns = res.data.whatnews;
        _this.templates = res.data.templates;
      });
    },
    edit: function edit(id) {
      this.editId = id;
    },
    del: function del(id) {
      var _this2 = this;

      if (confirm("this will delete item ".concat(id, " are you sure?")) == true) {
        var url = "/member/dashboard/".concat(id);
        axios["delete"](url).then(function (res) {
          _this2.res_status = res.data.msg;
        })["catch"](function (err) {
          var ob = Object.values(err);
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(ob.join(), "</span>");
        });
        this.$refs["onOk"].show();
        setTimeout(function () {
          _this2.getWhatnew();
        }, 3200);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jodit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jodit-vue */ "./node_modules/jodit-vue/dist/jodit-vue.esm.js");
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "WhatnewForm",
  props: ["editId", "templates"],
  data: function data() {
    return {
      saveId: 0,
      res_status: '',
      wnForm: new Form({
        title: '',
        body: '',
        is_public: false
      })
    };
  },
  watch: {
    "editId": function editId(x) {
      this.getEditData(x);
    }
  },
  methods: {
    getEditData: function getEditData(x) {
      var _this = this;

      this.clearForm();

      if (x != 0) {
        var url = "/member/dashboard/".concat(x, "/edit");
        axios.get(url).then(function (res) {
          var fData = res.data.whatnew;
          _this.wnForm.title = fData.whatnew_title;

          _this.$refs.title.focus();

          _this.wnForm.body = fData.whatnew_body;

          if (fData.is_public == '1') {
            _this.wnForm.is_public = true;
          }

          _this.saveId = fData.id; //console.log(res.data)
        });
      }
    },
    save: function save(id) {
      var _this2 = this;

      var url = "/member/dashboard";

      if (id) {
        url = "/member/dashboard/".concat(id);
        this.wnForm.submit("put", url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          var ob = Object.values(err);
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(ob.join(), "</span>");
        });
      } else {
        this.wnForm.submit("post", url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          var ob = Object.values(err);
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(ob.join(), "</span>");
        });
      }

      setTimeout(function () {
        _this2.res_status = '';

        _this2.$emit('getWhatnew');
      }, 3500);
    },
    clearForm: function clearForm() {
      this.res_status = '';
      this.saveId = 0;
      this.wnForm.reset();
    },
    getTemplate: function getTemplate() {
      var _this3 = this;

      var url = "/member/template/".concat(this.$refs.sel_tm.value);
      axios.get(url).then(function (res) {
        var tData = res.data.template;
        _this3.wnForm.title = tData.tm_title;
        _this3.wnForm.body = tData.tm_excerpt;
      });
      setTimeout(function () {
        _this3.$refs.sel_tm.value = 0;
      }, 600);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "WhatnewList",
  props: ["wns"],
  data: function data() {
    return {
      moment: moment,
      showMe: false,
      ownId: window.ownId
    };
  },
  methods: {
    toggMe: function toggMe(id) {
      this.showMe = !this.showMe;
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/Whatnew.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/Whatnew.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Whatnew.vue?vue&type=template&id=0139aedd& */ "./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd&");
/* harmony import */ var _Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Whatnew.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__.render,
  _Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Member/Whatnew/Whatnew.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue":
/*!***********************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewForm.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewForm.vue?vue&type=template&id=b9d3197e& */ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e&");
/* harmony import */ var _WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__.render,
  _WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Member/Whatnew/WhatnewForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue":
/*!***********************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewList.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewList.vue?vue&type=template&id=51e0cbca& */ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca&");
/* harmony import */ var _WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__.render,
  _WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Member/Whatnew/WhatnewList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_0139aedd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnew.vue?vue&type=template&id=0139aedd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd&");


/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e&":
/*!******************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_b9d3197e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewForm.vue?vue&type=template&id=b9d3197e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e&");


/***/ }),

/***/ "./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca&":
/*!******************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_51e0cbca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewList.vue?vue&type=template&id=51e0cbca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/Whatnew.vue?vue&type=template&id=0139aedd& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "section",
    { staticClass: "faq section-bg", attrs: { id: "faq" } },
    [
      _c(
        "div",
        {
          staticClass: "container aos-init aos-animate",
          attrs: { "data-aos": "fade-up" }
        },
        [
          _c("whatnew-form", {
            attrs: { editId: _vm.editId, templates: _vm.templates },
            on: {
              getWhatnew: function($event) {
                return _vm.getWhatnew($event)
              }
            }
          }),
          _vm._v(" "),
          _c("whatnew-list", {
            attrs: { wns: _vm.wns },
            on: {
              edit: function($event) {
                return _vm.edit($event)
              },
              del: function($event) {
                return _vm.del($event)
              },
              getWhatnew: function($event) {
                return _vm.getWhatnew($event)
              }
            }
          }),
          _vm._v(" "),
          _c(
            "b-modal",
            { ref: "onOk", attrs: { title: "server said :", "ok-only": "" } },
            [
              _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.res_status) +
                    "\n                "
                )
              ])
            ]
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewForm.vue?vue&type=template&id=b9d3197e& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "form form-horizontal",
        staticStyle: { "margin-bottom": "4em" }
      },
      [
        _c(
          "form",
          {
            attrs: { action: "" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.save(_vm.saveId)
              }
            }
          },
          [
            _c("div", { staticClass: "form-group" }, [
              _c(
                "select",
                {
                  ref: "sel_tm",
                  staticClass: "form-control",
                  on: { change: _vm.getTemplate }
                },
                [
                  _c("option", { attrs: { value: "0" } }, [
                    _vm._v("--- Easy template select here ---")
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.templates, function(tm) {
                    return _c("option", { domProps: { value: tm.id } }, [
                      _vm._v("\n                    " + _vm._s(tm.tm_title))
                    ])
                  })
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.wnForm.title,
                    expression: "wnForm.title"
                  }
                ],
                ref: "title",
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  name: "title",
                  placeholder: "enter the title"
                },
                domProps: { value: _vm.wnForm.title },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.wnForm, "title", $event.target.value)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("jodit-editor", {
                  attrs: { height: "450" },
                  model: {
                    value: _vm.wnForm.body,
                    callback: function($$v) {
                      _vm.$set(_vm.wnForm, "body", $$v)
                    },
                    expression: "wnForm.body"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-lg-4" }, [
                _c("div", { staticClass: "form-check " }, [
                  _c("label", { attrs: { for: "" } }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.wnForm.is_public,
                          expression: "wnForm.is_public"
                        }
                      ],
                      staticClass: "my-checkbox",
                      staticStyle: { "margin-right": "2.05em" },
                      attrs: { type: "checkbox", name: "is_public" },
                      domProps: {
                        checked: Array.isArray(_vm.wnForm.is_public)
                          ? _vm._i(_vm.wnForm.is_public, null) > -1
                          : _vm.wnForm.is_public
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.wnForm.is_public,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                _vm.$set(
                                  _vm.wnForm,
                                  "is_public",
                                  $$a.concat([$$v])
                                )
                            } else {
                              $$i > -1 &&
                                _vm.$set(
                                  _vm.wnForm,
                                  "is_public",
                                  $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                )
                            }
                          } else {
                            _vm.$set(_vm.wnForm, "is_public", $$c)
                          }
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _vm.wnForm.is_public != false
                    ? _c("span", { staticClass: "alert alert-success" }, [
                        _vm._v("is public")
                      ])
                    : _c("span", { staticClass: "alert alert-danger" }, [
                        _vm._v("Private")
                      ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-4" }, [
                _c(
                  "div",
                  {
                    staticStyle: { "margin-top": "2em" },
                    domProps: { innerHTML: _vm._s(_vm.res_status) }
                  },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.res_status) +
                        " status\n                    "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-4" }, [
                _c("div", { staticClass: "float-right" }, [
                  _c("div", { staticClass: "btn-group" }, [
                    _c(
                      "button",
                      { staticClass: "btn btn-outline-primary" },
                      [_c("b-icon", { attrs: { icon: "pen" } })],
                      1
                    )
                  ])
                ])
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Whatnew/WhatnewList.vue?vue&type=template&id=51e0cbca& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "row " },
    [
      _vm._l(_vm.wns.data, function(wn) {
        return _c(
          "div",
          {
            staticClass: "col-lg-12",
            staticStyle: { "margin-top": "1.5em", "min-height": "220px" }
          },
          [
            _c(
              "div",
              {
                staticClass: "pt-12 mb-12",
                attrs: {
                  "data-bs-toggle": "collapse",
                  "aria-expanded": "false"
                },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.toggMe(wn.id)
                  }
                }
              },
              [
                _c(
                  "span",
                  { staticStyle: { "font-weight": "bold", color: "green" } },
                  [
                    _c("a", { attrs: { href: "", title: wn.whatnew_title } }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(wn.whatnew_title) +
                          " \n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        attrs: { href: "", title: "click to read กดเพื่ออ่าน" }
                      },
                      [_c("b-icon", { attrs: { icon: "eye" } })],
                      1
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "clearfix" }, [
                  _c("div", { staticClass: "float-right" }, [
                    _c(
                      "span",
                      [
                        _c("b-icon", { attrs: { icon: "person" } }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(wn.user.name) +
                            "\n                        "
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("span", [
                      _c(
                        "a",
                        {
                          attrs: { href: "", title: _vm.moment(wn.created_at) }
                        },
                        [_c("b-icon", { attrs: { icon: "calendar2-day" } })],
                        1
                      ),
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.moment(wn.created_at).fromNow()) +
                          "\n                        "
                      )
                    ])
                  ])
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showMe,
                    expression: "showMe"
                  }
                ],
                staticClass: "collapse show",
                attrs: { "data-bs-parent": ".faq-list" },
                domProps: { innerHTML: _vm._s(wn.whatnew_body) }
              },
              [_vm._v("\n          " + _vm._s(wn.whatnew_body) + "\n        ")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "float-right" }, [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: wn.user_id == _vm.ownId,
                      expression: "wn.user_id == ownId"
                    }
                  ]
                },
                [
                  wn.is_public == false
                    ? _c(
                        "span",
                        { staticClass: "alert alert-warning" },
                        [_c("b-icon", { attrs: { icon: "lock-fill" } })],
                        1
                      )
                    : _c(
                        "span",
                        { staticClass: "alert alert-success" },
                        [_c("b-icon", { attrs: { icon: "unlock" } })],
                        1
                      ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary btn-sm",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("edit", wn.id)
                        }
                      }
                    },
                    [_c("b-icon", { attrs: { icon: "pencil" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-danger btn-sm",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("del", wn.id)
                        }
                      }
                    },
                    [_c("b-icon", { attrs: { icon: "trash" } })],
                    1
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("hr", {
              staticStyle: { "margin-top": "7em", "margin-bottom": "2em" }
            })
          ]
        )
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.wns.data != 0,
              expression: "wns.data != 0"
            }
          ],
          staticClass: "col-xl-12"
        },
        [
          _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
            _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
              _c(
                "ul",
                { staticClass: "pagination flex-wrap" },
                [
                  _c("li", { staticClass: "page-item disabled" }, [
                    _c("div", { staticClass: "page-link" }, [
                      _vm._v(
                        "\n                            showing from " +
                          _vm._s(_vm.wns.from) +
                          "\n                            to "
                      ),
                      _c("span", [_vm._v(_vm._s(_vm.wns.to))]),
                      _vm._v(" of\n                            "),
                      _c("span", [_vm._v(_vm._s(_vm.wns.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.wns.links, function(li) {
                    return _c("li", { staticClass: "page-item" }, [
                      !li.active && li.url != null
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link p-2",
                              attrs: { href: "" },
                              domProps: { innerHTML: _vm._s(li.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.$emit("getWhatnew", li.url)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(li.label) +
                                  "\n                        "
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
                                "\n                            " +
                                  _vm._s(li.label) +
                                  "\n                        "
                              )
                            ]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active" }, [
                    _c(
                      "span",
                      { staticClass: "page-link " },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.wns.current_page) +
                            "\n                        "
                        )
                      ],
                      1
                    )
                  ])
                ],
                2
              )
            ])
          ])
        ]
      )
    ],
    2
  )
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