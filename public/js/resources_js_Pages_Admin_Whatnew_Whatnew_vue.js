(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Admin_Whatnew_Whatnew_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewForm.vue */ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue");
/* harmony import */ var _WhatnewList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewList.vue */ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue");
//
//
//
//
//
//
//
//
//
//
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
  name: "ManWhatnew",
  components: {
    WhatnewForm: _WhatnewForm_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    WhatnewList: _WhatnewList_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      whatnew: '',
      editId: '',
      res_status: '',
      template: ''
    };
  },
  mounted: function mounted() {
    this.getWn();
  },
  methods: {
    getWn: function getWn(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("awn_old_page", url);
      }

      url = this.$cookies.get("awn_old_page");

      if (!url) {
        url = "/admin/getWhatnew";
      }

      axios.get(url).then(function (res) {
        _this.whatnew = res.data.whatnew;
        _this.template = res.data.template;
      });
    },
    edit: function edit(id) {
      this.editId = id;
    },
    del: function del(id) {
      var _this2 = this;

      if (confirm("this will permantly delete ".concat(id, "! are you sure?")) == true) {
        var url = "/admin/whatnew/".concat(id);
        axios["delete"](url).then(function (res) {
          _this2.res_status = res.data.msg;
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");
        });
      }

      setTimeout(function () {
        _this2.getWn();
      }, 1200);
    },
    showBox: function showBox(msg) {
      this.res_status = msg;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "WhatnewForm",
  props: ["editId", "template"],
  watch: {
    "editId": function editId(x) {
      this.getEditData(x);
    }
  },
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
  methods: {
    getEditData: function getEditData(id) {
      var _this = this;

      if (id != 0) {
        this.$refs.title.focus();
        var url = "/admin/whatnew/".concat(id);
        axios.get(url).then(function (res) {
          //console.log(res.data.whatnew.whatnew_title)
          var fData = res.data.whatnew;
          _this.saveId = fData.id;
          _this.wnForm.title = fData.whatnew_title;
          _this.wnForm.body = fData.whatnew_body;

          if (parseInt(fData.is_public) != 0) {
            _this.wnForm.is_public = true;
          }
        });
      }
    },
    save: function save(id) {
      var _this2 = this;

      var url = "/admin/whatnew";

      if (id) {
        url = "/admin/whatnew/".concat(id);
        this.wnForm.submit("put", url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");
        });
      } else {
        this.wnForm.submit('post', url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");
        });
      }

      setTimeout(function () {
        _this2.clearForm();

        _this2.$emit('getWn');
      }, 3200);
    },
    clearForm: function clearForm() {
      this.wnForm.reset();
      this.res_status = '';
      this.saveId = 0;
    },
    getTemplate: function getTemplate() {
      var _this3 = this;

      var url = "/admin/template/".concat(this.$refs.sel_tmp.value);
      axios.get(url).then(function (res) {
        var tData = res.data.template;
        _this3.wnForm.title = tData.tm_title;
        _this3.wnForm.body = tData.tm_excerpt;
      });
      setTimeout(function () {
        _this3.$refs.sel_tmp.value = '0';
      }, 2300);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "WhatnewList",
  props: ["whatnew"],
  data: function data() {
    return {
      moment: moment
    };
  }
});

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/Whatnew.vue":
/*!******************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/Whatnew.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Whatnew.vue?vue&type=template&id=963f2f60& */ "./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60&");
/* harmony import */ var _Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Whatnew.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__.render,
  _Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Whatnew/Whatnew.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewForm.vue?vue&type=template&id=490d3b34& */ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34&");
/* harmony import */ var _WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__.render,
  _WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Whatnew/WhatnewForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewList.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatnewList.vue?vue&type=template&id=7d06620e& */ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e&");
/* harmony import */ var _WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatnewList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__.render,
  _WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Whatnew/WhatnewList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60&":
/*!*************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnew_vue_vue_type_template_id_963f2f60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnew.vue?vue&type=template&id=963f2f60& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60&");


/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewForm_vue_vue_type_template_id_490d3b34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewForm.vue?vue&type=template&id=490d3b34& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34&");


/***/ }),

/***/ "./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WhatnewList_vue_vue_type_template_id_7d06620e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WhatnewList.vue?vue&type=template&id=7d06620e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/Whatnew.vue?vue&type=template&id=963f2f60& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "card mb-4" },
    [
      _vm._m(0),
      _vm._v(" "),
      _c("whatnew-form", {
        attrs: { editId: _vm.editId, template: _vm.template },
        on: {
          getWn: function($event) {
            return _vm.getWn($event)
          }
        }
      }),
      _vm._v(" "),
      _c("whatnew-list", {
        attrs: { whatnew: _vm.whatnew },
        on: {
          getWn: function($event) {
            return _vm.getWn($event)
          },
          edit: function($event) {
            return _vm.edit($event)
          },
          del: function($event) {
            return _vm.del($event)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h1", { staticClass: "mt-4" }, [_vm._v("What's going on?")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewForm.vue?vue&type=template&id=490d3b34& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card-body" }, [
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
              ref: "sel_tmp",
              staticClass: "form-control",
              attrs: { name: "sel_tmp" },
              on: { change: _vm.getTemplate }
            },
            [
              _c("option", { attrs: { value: "0" } }, [
                _vm._v("--- Easy template select here ---")
              ]),
              _vm._v(" "),
              _vm._l(_vm.template, function(tm) {
                return _c("option", { domProps: { value: tm.id } }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(tm.tm_title) +
                      "\n                "
                  )
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
              placeholder: "Enter the title"
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
              attrs: { height: "550" },
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
                staticClass: "form-control",
                staticStyle: { "margin-bottom": "1em" },
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
                          _vm.$set(_vm.wnForm, "is_public", $$a.concat([$$v]))
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
              }),
              _vm._v(" "),
              _vm.wnForm.is_public != true
                ? _c("span", { staticClass: "alert alert-warning" }, [
                    _vm._v(
                      "\n                        Private\n                    "
                    )
                  ])
                : _c("span", { staticClass: "alert alert-success" }, [
                    _vm._v(
                      "\n                        Public\n                    "
                    )
                  ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-4" }, [
            _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.res_status) +
                  "\n                "
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-4" }, [
            _c("div", { staticClass: "btn-group float-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary",
                  attrs: { type: "submit" }
                },
                [_c("b-icon", { attrs: { icon: "pencil" } })],
                1
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.clearForm }
                },
                [_c("b-icon", { attrs: { icon: "trash" } })],
                1
              )
            ])
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Whatnew/WhatnewList.vue?vue&type=template&id=7d06620e& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card-body" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-lg-12" }, [
        _c(
          "ul",
          { staticClass: "list-group" },
          _vm._l(_vm.whatnew.data, function(wn) {
            return _c("li", { staticClass: "list-group-item" }, [
              _c("div", { staticClass: "container" }, [
                _c("h3", { staticClass: "text-center" }, [
                  _vm._v(
                    "\n                                " +
                      _vm._s(wn.whatnew_title) +
                      "\n                            "
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: {
                      "margin-top": "2em",
                      "margin-bottom": "2em"
                    },
                    domProps: { innerHTML: _vm._s(wn.whatnew_body) }
                  },
                  [
                    _vm._v(
                      "\n                                " +
                        _vm._s(wn.whatnew_body) +
                        "\n                            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-lg-8" }, [
                    _c(
                      "span",
                      [
                        _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.moment(wn.created_at)) +
                            " · \n                                        " +
                            _vm._s(_vm.moment(wn.created_at).fromNow()) +
                            "\n                                    "
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-lg-4" }, [
                    _c("span", { staticClass: "float-right btn-group" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary btn-sm",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.$emit("edit", wn.id)
                            }
                          }
                        },
                        [_c("b-icon", { attrs: { icon: "pen" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-danger btn-sm",
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
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "float-right",
                        staticStyle: { "margin-right": "1em" }
                      },
                      [
                        _c("b-icon", { attrs: { icon: "person" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(wn.user.name) +
                            "\n                                    "
                        )
                      ],
                      1
                    )
                  ])
                ])
              ])
            ])
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "col-lg-12",
          staticStyle: { margin: "0 auto", "margin-top": "2em" }
        },
        [
          _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
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
                      _c("span", [_vm._v(_vm._s(_vm.whatnew.from))]),
                      _vm._v(" \n                                    to "),
                      _c("span", [_vm._v(_vm._s(_vm.whatnew.to))]),
                      _vm._v(" of \n                                    "),
                      _c("span", [_vm._v(_vm._s(_vm.whatnew.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.whatnew.links, function(li) {
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
                                  return _vm.$emit("getWn", li.url)
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
                              staticClass: "page-link disabled",
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
                              _vm._s(_vm.whatnew.current_page) +
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
          ])
        ]
      )
    ])
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