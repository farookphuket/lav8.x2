(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Admin_Template_Template_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TemplateForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateForm.vue */ "./resources/js/Pages/Admin/Template/TemplateForm.vue");
/* harmony import */ var _TemplateList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateList.vue */ "./resources/js/Pages/Admin/Template/TemplateList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ManTemplate",
  components: {
    TemplateList: _TemplateList_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    TemplateForm: _TemplateForm_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {
      templates: '',
      show_template: '',
      show_pagination: false,
      editId: 0,
      res_status: ''
    };
  },
  mounted: function mounted() {
    this.getTemplate();
  },
  methods: {
    getTemplate: function getTemplate(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("atemplate_old", url);
      }

      url = this.$cookies.get("atemplate_old");
      if (!url) url = "/admin/getTemplate";
      axios.get(url).then(function (res) {
        _this.templates = res.data.templates;

        if (Object.keys(_this.templates.data).length >= 4) {
          _this.show_pagination = true;
        }
      });
    },
    view: function view(id) {
      var _this2 = this;

      var url = "/admin/template/".concat(id);
      axios.get(url).then(function (res) {
        _this2.show_template = res.data.template; //console.log(this.show_template)
      });
      this.$refs["big_box"].show();
    },
    edit: function edit(id) {
      this.editId = id;
    },
    del: function del(id) {
      var _this3 = this;

      if (confirm("This will be completely remove item ".concat(id, "\n \n            are your sure you want to remove?")) == true) {
        var url = "/admin/template/".concat(id);
        axios["delete"](url).then(function (res) {
          _this3.res_status = res.data.msg;
        });
        this.$refs["onOk"].show();
        setTimeout(function () {
          _this3.show_pagination = false;

          _this3.getTemplate();
        }, 500);
      }
    },
    showBox: function showBox(msg) {
      this.res_status = msg;
      this.$refs["onOk"].show();
    },
    closeBox: function closeBox() {
      this.res_status = '';
      this.$refs["onOk"].hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TemplateForm",
  props: ["editId"],
  data: function data() {
    return {
      res_status: '',
      saveId: 0,
      sel_approve: 0,
      tForm: new Form({
        tm_title: '',
        tm_method: '',
        tm_excerpt: '',
        tm_body: '',
        tm_public: '',
        tm_approved_at: ''
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

      if (x != 0) {
        var url = "/admin/template/".concat(x, "/edit");
        axios.get(url).then(function (res) {
          console.log(res.data.template);
          var fData = res.data.template;
          _this.saveId = fData.id;
          _this.tForm.tm_title = fData.tm_title;

          _this.$refs.tm_title.focus();

          _this.tForm.tm_method = fData.tm_method;
          _this.tForm.tm_excerpt = fData.tm_excerpt;
          _this.tForm.tm_body = fData.tm_body;

          if (fData.tm_public != 0) {
            _this.tForm.tm_public = true;
          }

          if (fData.tm_approved_at != null) {
            _this.sel_approve = "1";
          }
        });
      }
    },
    save: function save(id) {
      var _this2 = this;

      var url = "/admin/template";
      this.tForm.tm_approved_at = this.sel_approve;

      if (id) {
        url = "/admin/template/".concat(id);
        this.tForm.submit('put', url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");

          _this2.$emit('showBox', _this2.res_status);
        });
      } else {
        this.tForm.submit('post', url).then(function (res) {
          _this2.res_status = res.msg;
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");

          _this2.$emit('showBox', _this2.res_status);
        });
      }

      setTimeout(function () {
        _this2.res_status = '';

        _this2.$emit('getTemplate');
      }, 1000);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TemplateList",
  props: ["templates", "show_pagination"],
  data: function data() {
    return {
      moment: moment
    };
  }
});

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/Template.vue":
/*!********************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/Template.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Template.vue?vue&type=template&id=56ec6ad4& */ "./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4&");
/* harmony import */ var _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Template.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__.render,
  _Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Template/Template.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateForm.vue":
/*!************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateForm.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateForm.vue?vue&type=template&id=55dfeb0c& */ "./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c&");
/* harmony import */ var _TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__.render,
  _TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Template/TemplateForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateList.vue":
/*!************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateList.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateList.vue?vue&type=template&id=09093154& */ "./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154&");
/* harmony import */ var _TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplateList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__.render,
  _TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/Template/TemplateList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Template.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TemplateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TemplateList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Template_vue_vue_type_template_id_56ec6ad4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Template.vue?vue&type=template&id=56ec6ad4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4&");


/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateForm_vue_vue_type_template_id_55dfeb0c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TemplateForm.vue?vue&type=template&id=55dfeb0c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c&");


/***/ }),

/***/ "./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TemplateList_vue_vue_type_template_id_09093154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TemplateList.vue?vue&type=template&id=09093154& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/Template.vue?vue&type=template&id=56ec6ad4& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container-fluid" },
    [
      _c("h1", { staticClass: "mt-4" }, [_vm._v("Template")]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("template-form", {
        attrs: { editId: _vm.editId },
        on: {
          getTemplate: function($event) {
            return _vm.getTemplate($event)
          },
          showBox: function($event) {
            return _vm.showBox($event)
          }
        }
      }),
      _vm._v(" "),
      _c("template-list", {
        attrs: {
          templates: _vm.templates,
          show_pagination: _vm.show_pagination
        },
        on: {
          getTemplate: function($event) {
            return _vm.getTemplate($event)
          },
          view: function($event) {
            return _vm.view($event)
          },
          edit: function($event) {
            return _vm.edit($event)
          },
          del: function($event) {
            return _vm.del($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "server said : ", centered: "", "ok-only": "" },
          on: { ok: _vm.closeBox }
        },
        [
          _c("div", { staticClass: "container" }, [
            _c("div", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
              _vm._v(
                "\n            " + _vm._s(_vm.res_status) + "\n            "
              )
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "big_box",
          attrs: {
            title: _vm.show_template.tm_title,
            "ok-only": "",
            size: "xl"
          }
        },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12" }, [
              _c("h2", { staticClass: "text-center" }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.show_template.tm_title) +
                    "\n               "
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "clearfix" }, [
                _c("div", { staticClass: "float-right" }, [
                  _c("span", { staticClass: "badge badge-info p-4" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.show_template.tm_method) +
                        "\n                       "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "mt-2",
                  domProps: { innerHTML: _vm._s(_vm.show_template.tm_excerpt) }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.show_template.tm_excerpt) +
                      "\n                "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "mt-2",
                  domProps: { innerHTML: _vm._s(_vm.show_template.tm_body) }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.show_template.tm_body) +
                      "\n                "
                  )
                ]
              )
            ])
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ol", { staticClass: "breadcrumb mb-4" }, [
      _c("li", { staticClass: "breadcrumb-item" }, [
        _c("a", { attrs: { href: "/admin/dashboard" } }, [_vm._v("Dashboard")])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "breadcrumb-item active" }, [_vm._v("Template")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateForm.vue?vue&type=template&id=55dfeb0c& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "card-body" }, [
      _c("form", { attrs: { action: "" } }, [
        _c("div", { staticClass: "form-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.tForm.tm_title,
                expression: "tForm.tm_title"
              }
            ],
            ref: "tm_title",
            staticClass: "form-control",
            attrs: {
              type: "text",
              name: "tm_title",
              placeholder: "title eg: show video on page"
            },
            domProps: { value: _vm.tForm.tm_title },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.tForm, "tm_title", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.tForm.tm_method,
                expression: "tForm.tm_method"
              }
            ],
            staticClass: "form-control",
            attrs: {
              type: "text",
              name: "tm_method",
              placeholder: "method eg: blog,whatnew"
            },
            domProps: { value: _vm.tForm.tm_method },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.tForm, "tm_method", $event.target.value)
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
                value: _vm.tForm.tm_excerpt,
                callback: function($$v) {
                  _vm.$set(_vm.tForm, "tm_excerpt", $$v)
                },
                expression: "tForm.tm_excerpt"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c("jodit-editor", {
              attrs: { height: "450" },
              model: {
                value: _vm.tForm.tm_body,
                callback: function($$v) {
                  _vm.$set(_vm.tForm, "tm_body", $$v)
                },
                expression: "tForm.tm_body"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-lg-3" }, [
            _c("span", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
              _vm._v(_vm._s(_vm.res_status))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-3" }, [
            _c("label", { attrs: { for: "" } }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.tForm.tm_public,
                    expression: "tForm.tm_public"
                  }
                ],
                staticClass: "form-control mb-3",
                attrs: { type: "checkbox", name: "tm_public" },
                domProps: {
                  checked: Array.isArray(_vm.tForm.tm_public)
                    ? _vm._i(_vm.tForm.tm_public, null) > -1
                    : _vm.tForm.tm_public
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.tForm.tm_public,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(_vm.tForm, "tm_public", $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.tForm,
                            "tm_public",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.tForm, "tm_public", $$c)
                    }
                  }
                }
              }),
              _vm._v(" "),
              _vm.tForm.tm_public != 0
                ? _c("span", { staticClass: "alert alert-success mt-2" }, [
                    _vm._v(
                      "\n                            Public\n                        "
                    )
                  ])
                : _c("span", { staticClass: "alert alert-warning" }, [
                    _vm._v(
                      "\n                            Private\n                        "
                    )
                  ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-6" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.sel_approve,
                    expression: "sel_approve"
                  }
                ],
                staticClass: "form-control mb-2",
                attrs: { name: "tm_approved_at" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.sel_approve = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  }
                }
              },
              [
                _c("option", { attrs: { value: "0" } }, [
                  _vm._v("Not Approve")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "1" } }, [_vm._v("Approve")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "btn-group float-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary",
                  attrs: { type: "submit" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.save(_vm.saveId)
                    }
                  }
                },
                [_c("b-icon", { attrs: { icon: "pencil" } })],
                1
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/Template/TemplateList.vue?vue&type=template&id=09093154& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card" }, [
    _c("div", { staticClass: "card-body" }, [
      _c(
        "ul",
        { staticClass: "list-group" },
        [
          _vm._l(_vm.templates.data, function(tm) {
            return _c("li", { staticClass: "list-group-item" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-lg-12" }, [
                  _c("h3", { staticClass: "mb-4 text-center" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(tm.tm_title) +
                        "\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { domProps: { innerHTML: _vm._s(tm.tm_excerpt) } },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(tm.tm_excerpt) +
                          "\n                        "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-4" }, [
                  tm.tm_approved_at != null
                    ? _c(
                        "span",
                        { staticClass: "badge badge-success p-2" },
                        [
                          _c("b-icon", { attrs: { icon: "person" } }),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.moment(tm.tm_approved_at)) +
                              "\n                       "
                          )
                        ],
                        1
                      )
                    : _c(
                        "span",
                        { staticClass: "badge badge-warning p-2" },
                        [_c("b-icon", { attrs: { icon: "lock" } })],
                        1
                      ),
                  _vm._v(" "),
                  tm.tm_public != 0
                    ? _c(
                        "span",
                        { staticClass: "badge badge-success p-2" },
                        [
                          _c("b-icon", { attrs: { icon: "unlock" } }),
                          _vm._v(
                            "\n                        public\n                       "
                          )
                        ],
                        1
                      )
                    : _c(
                        "span",
                        { staticClass: "badge badge-warning p-2" },
                        [
                          _c("b-icon", { attrs: { icon: "unlock" } }),
                          _vm._v(
                            "\n                        private\n                       "
                          )
                        ],
                        1
                      )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-5" }, [
                  _c(
                    "span",
                    { staticClass: "badge badge-info p-2" },
                    [
                      _vm._v(
                        "\n                            created :\n                            "
                      ),
                      _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticStyle: {
                            color: "white",
                            "font-weight": "bold"
                          },
                          attrs: { href: "", title: _vm.moment(tm.created_at) }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.moment(tm.created_at).fromNow()) +
                              "\n                            "
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "badge badge-info p-2" },
                    [
                      _vm._v(
                        "\n                            updated :\n                            "
                      ),
                      _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticStyle: {
                            color: "white",
                            "font-weight": "bold"
                          },
                          attrs: { href: "", title: _vm.moment(tm.updated_at) }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.moment(tm.updated_at).fromNow()) +
                              "\n                            "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-3" }, [
                  _c("div", { staticClass: "btn-group float-right" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-info",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("view", tm.id)
                          }
                        }
                      },
                      [_c("b-icon", { attrs: { icon: "eye" } })],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("edit", tm.id)
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
                        staticClass: "btn btn-outline-danger",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.$emit("del", tm.id)
                          }
                        }
                      },
                      [_c("b-icon", { attrs: { icon: "trash" } })],
                      1
                    )
                  ])
                ])
              ])
            ])
          }),
          _vm._v(" "),
          _c(
            "li",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show_pagination,
                  expression: "show_pagination"
                }
              ],
              staticClass: "list-group-item"
            },
            [
              _c(
                "div",
                {
                  staticClass: "container ",
                  staticStyle: { "margin-top": "3em" }
                },
                [
                  _c("div", { staticClass: "nav-scroller py-1 mb-2" }, [
                    _c(
                      "nav",
                      { staticClass: "nav d-flex justify-content-center" },
                      [
                        _c(
                          "ul",
                          { staticClass: "pagination flex-wrap " },
                          [
                            _c("li", { staticClass: "page-item" }, [
                              _c(
                                "div",
                                { staticClass: "page-link disabled " },
                                [
                                  _vm._v(
                                    "\n                                        \n                                            showing from "
                                  ),
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.templates.from))
                                  ]),
                                  _vm._v(
                                    " \n                                            to "
                                  ),
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.templates.to))
                                  ]),
                                  _vm._v(
                                    " of \n                                            "
                                  ),
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.templates.total))
                                  ])
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.templates.links, function(li) {
                              return _c("li", { staticClass: "page-item" }, [
                                !li.active && li.url != null
                                  ? _c(
                                      "a",
                                      {
                                        staticClass: "page-link p-2",
                                        domProps: {
                                          innerHTML: _vm._s(li.label)
                                        },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            return _vm.$emit(
                                              "getTemplate",
                                              li.url
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(li.label) +
                                            " \n                                        "
                                        )
                                      ]
                                    )
                                  : _c(
                                      "span",
                                      {
                                        staticClass: "page-link active",
                                        domProps: {
                                          innerHTML: _vm._s(li.label)
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(li.label) +
                                            "\n                                        "
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
                                    _c("b-icon", {
                                      attrs: { icon: "book-half" }
                                    }),
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(_vm.templates.current_page) +
                                        "\n                                        "
                                    )
                                  ],
                                  1
                                )
                              ])
                            ])
                          ],
                          2
                        )
                      ]
                    )
                  ])
                ]
              )
            ]
          )
        ],
        2
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