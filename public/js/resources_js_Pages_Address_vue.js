(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Address_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddressForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressForm.vue */ "./resources/js/Pages/AddressForm.vue");
/* harmony import */ var _AddressList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressList.vue */ "./resources/js/Pages/AddressList.vue");
//
//
//
//
//
//
//
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
  name: "ShippingAddress",
  props: ["user_id"],
  components: {
    AddressForm: _AddressForm_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    AddressList: _AddressList_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      address_list: [],
      editId: 0,
      default_address_id: 0,
      res_status: '',
      isDisabled: false,
      isShowForm: false
    };
  },
  mounted: function mounted() {
    this.getAddress();
  },
  methods: {
    getAddress: function getAddress(page) {
      var _this = this;

      this.res_status = "";
      this.default_address_id = 0;
      var url = "";

      if (page) {
        url = page;
        this.$cookies.set("adr_old_page", url);
      }

      url = this.$cookies.get("adr_old_page");
      if (!url) url = "/member/getAddress";
      axios.get(url).then(function (res) {
        _this.address_list = res.data.address;
      });
    },
    edit: function edit(id) {
      this.isDisabled = false, this.editId = id;
    },
    del: function del(id) {
      alert("this will remove ".concat(id));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
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
  name: "AddressForm",
  props: ["user_id", "default_address_id", "editId", "isDisabled", "isCartPage"],
  data: function data() {
    return {
      disabled: false,
      res_status: '',
      adrForm: new Form({
        first_name: '',
        last_name: '',
        tel: '',
        city: '',
        stage: '',
        country: '',
        zip_code: '',
        address: '',
        address_id: 0,
        is_default_address: 0
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

      this.adrForm.is_default_address = false;
      this.$refs.first_name.focus();

      if (x != 0) {
        var url = "/member/showAddress/".concat(x);
        axios.get(url).then(function (res) {
          //console.log(res.data.address)
          var fData = res.data.address;
          if (parseInt(fData.is_default_address) != 0) _this.adrForm.is_default_address = true;
          _this.adrForm.first_name = fData.first_name;
          _this.adrForm.last_name = fData.last_name;
          _this.adrForm.city = fData.city;
          _this.adrForm.stage = fData.stage;
          _this.adrForm.country = fData.country;
          _this.adrForm.tel = fData.tel;
          _this.adrForm.address = fData.address;
          _this.adrForm.zip_code = fData.zip_code;
          _this.adrForm.address_id = fData.id;
        });
      }
    },
    saveAddress: function saveAddress(id) {
      var _this2 = this;

      var url = "";

      if (id != 0) {
        url = "/member/updateAddress/".concat(id);
        this.adrForm.submit("put", url).then(function (res) {
          _this2.res_status = res.msg;

          _this2.$emit('getAddress');
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");
        });
      } else {
        url = "/member/saveAddress";
        this.adrForm.submit("post", url).then(function (res) {
          _this2.res_status = res.msg;

          _this2.$emit('getAddress');
        })["catch"](function (err) {
          _this2.res_status = "<span class=\"alert alert-danger\">\n                            ".concat(Object.values(err).join(), "</span>");
        });
      }

      setTimeout(function () {
        _this2.res_status = '';

        _this2.$emit("getAddress");
      }, 3200);
    },
    openAddress: function openAddress() {
      var url = "/member/address";
      location.href = url;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AddressList",
  props: ["user_id", "address_list", "default_address_id"],
  data: function data() {
    return {
      res_status: ''
    };
  },
  mounted: function mounted() {},
  methods: {}
});

/***/ }),

/***/ "./resources/js/Pages/Address.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Address.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Address.vue?vue&type=template&id=d53a4b4a& */ "./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a&");
/* harmony import */ var _Address_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Address.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Address.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Address_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__.render,
  _Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Address.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/AddressForm.vue":
/*!********************************************!*\
  !*** ./resources/js/Pages/AddressForm.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressForm.vue?vue&type=template&id=5fa1afbf& */ "./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf&");
/* harmony import */ var _AddressForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _AddressForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__.render,
  _AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/AddressForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/AddressList.vue":
/*!********************************************!*\
  !*** ./resources/js/Pages/AddressList.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressList.vue?vue&type=template&id=d8ca52ce& */ "./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce&");
/* harmony import */ var _AddressList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/AddressList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _AddressList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__.render,
  _AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/AddressList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Address.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/Address.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Address_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Address.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Address_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddressForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/AddressList.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/AddressList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddressList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Address_vue_vue_type_template_id_d53a4b4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Address.vue?vue&type=template&id=d53a4b4a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a&");


/***/ }),

/***/ "./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressForm_vue_vue_type_template_id_5fa1afbf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddressForm.vue?vue&type=template&id=5fa1afbf& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf&");


/***/ }),

/***/ "./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressList_vue_vue_type_template_id_d8ca52ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddressList.vue?vue&type=template&id=d8ca52ce& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Address.vue?vue&type=template&id=d53a4b4a& ***!
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
  return _c(
    "div",
    { staticClass: "container-fluid" },
    [
      _c("address-form", {
        attrs: {
          user_id: _vm.user_id,
          default_address_id: _vm.default_address_id,
          isDisabled: _vm.isDisabled,
          editId: _vm.editId
        },
        on: {
          getAddress: function($event) {
            return _vm.getAddress($event)
          }
        }
      }),
      _vm._v(" "),
      _c("address-list", {
        attrs: {
          user_id: _vm.user_id,
          default_address_id: _vm.default_address_id,
          address_list: _vm.address_list
        },
        on: {
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
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressForm.vue?vue&type=template&id=5fa1afbf& ***!
  \******************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-lg-12" }, [
        _c("h2", { staticClass: "text-center" }, [
          _vm._v("\n                Shipping to \n           ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.isCartPage,
                expression: "isCartPage"
              }
            ],
            staticClass: "row"
          },
          [_vm._m(0), _vm._v(" "), _vm._m(1)]
        ),
        _vm._v(" "),
        _c("form", { staticClass: "mt-4 mb-4", attrs: { action: "" } }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-6" }, [
              _c("label", { attrs: { for: "" } }, [_vm._v("Name(ชื่อ)")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.adrForm.first_name,
                    expression: "adrForm.first_name"
                  }
                ],
                ref: "first_name",
                staticClass: "form-control",
                attrs: {
                  placeholder: "Name ชื่อ",
                  type: "text",
                  name: "first_name"
                },
                domProps: { value: _vm.adrForm.first_name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.adrForm, "first_name", $event.target.value)
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-6" }, [
              _c("label", { attrs: { for: "" } }, [
                _vm._v("Last name(นามสกุล)")
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.adrForm.last_name,
                    expression: "adrForm.last_name"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  placeholder: "Family Name นามสกุล",
                  type: "text",
                  name: "last_name"
                },
                domProps: { value: _vm.adrForm.last_name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.adrForm, "last_name", $event.target.value)
                  }
                }
              })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Address")]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.adrForm.address,
                  expression: "adrForm.address"
                }
              ],
              staticClass: "form-control",
              attrs: {
                name: "address",
                placeholder:
                  "Shipping address eg: 121/21 rmb road near KSC bank abnr branch"
              },
              domProps: { value: _vm.adrForm.address },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.adrForm, "address", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "" } }, [_vm._v("City (อำเภอ)")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.city,
                      expression: "adrForm.city"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", placeholder: "City เขต อำเภอ" },
                  domProps: { value: _vm.adrForm.city },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.adrForm, "city", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "" } }, [_vm._v("Stage(จังหวัด)")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.stage,
                      expression: "adrForm.stage"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    placeholder: "Stage/province eg: Krabi",
                    type: "text",
                    name: "stage"
                  },
                  domProps: { value: _vm.adrForm.stage },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.adrForm, "stage", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "" } }, [
                  _vm._v("Country(ประเทศ)")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.country,
                      expression: "adrForm.country"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    placeholder: "Thailand",
                    type: "text",
                    name: "country"
                  },
                  domProps: { value: _vm.adrForm.country },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.adrForm, "country", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-6" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "" } }, [_vm._v("Tel")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.tel,
                      expression: "adrForm.tel"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    placeholder: "phone number eg: +66 81 7887110",
                    type: "number",
                    name: "tel"
                  },
                  domProps: { value: _vm.adrForm.tel },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.adrForm, "tel", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-6" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "" } }, [_vm._v("zip code")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.zip_code,
                      expression: "adrForm.zip_code"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    placeholder: "zip code eg: 81110",
                    type: "number",
                    name: "zip_code"
                  },
                  domProps: { value: _vm.adrForm.zip_code },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.adrForm, "zip_code", $event.target.value)
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _vm._m(2),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c("label", { attrs: { for: "" } }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.adrForm.is_default_address,
                      expression: "adrForm.is_default_address"
                    }
                  ],
                  ref: "is_default_address",
                  attrs: {
                    type: "checkbox",
                    name: "is_default_address",
                    disabled: _vm.isDisabled
                  },
                  domProps: {
                    checked: Array.isArray(_vm.adrForm.is_default_address)
                      ? _vm._i(_vm.adrForm.is_default_address, null) > -1
                      : _vm.adrForm.is_default_address
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.adrForm.is_default_address,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.adrForm,
                              "is_default_address",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.adrForm,
                              "is_default_address",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.adrForm, "is_default_address", $$c)
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _vm.adrForm.is_default_address == true
                  ? _c(
                      "span",
                      { staticClass: "alert alert-success mr-4 ml-3 p-2" },
                      [
                        _vm._v(
                          "\n                                default address\n                            "
                        )
                      ]
                    )
                  : _c(
                      "span",
                      { staticClass: "alert alert-warning mr-4 ml-3 p-2" },
                      [
                        _vm._v(
                          "\n                                not default\n                            "
                        )
                      ]
                    )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c("span", { domProps: { innerHTML: _vm._s(_vm.res_status) } }, [
                _vm._v(_vm._s(_vm.res_status))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c("div", { staticClass: "btn-group float-right" }, [
                _vm.isDisabled == true
                  ? _c("span", [
                      _c(
                        "a",
                        {
                          staticClass: "btn btn-outline-primary p-2",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.openAddress($event)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                    Edit Shipping Address\n                                "
                          )
                        ]
                      )
                    ])
                  : _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary",
                        attrs: { type: "submit", disabled: _vm.isDisabled },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.saveAddress(_vm.adrForm.address_id)
                          }
                        }
                      },
                      [_c("b-icon", { attrs: { icon: "pen" } })],
                      1
                    )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._m(3)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-6" }, [
      _c("p", { staticClass: "mb-4 mt-4" }, [
        _vm._v(
          "\n                        your product will be shipping to this form  \n                   "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-6" }, [
      _c("p", { staticClass: "mb-4 mt-4" }, [
        _vm._v(
          '\n                        สินค้าจะถูกจัดส่งตามที่อยู่ในฟอร์มนี้ อย่างไรก็ตามหากท่านไม่เห็นที่อยู่ \n                        ของท่านในฟอร์มนี้ ท่านจะต้องคลิกปุ่ม "edit shipping address" \n                        ข้างล่างเพื่อกรอกข้อมูลและกำหนดให้เป็น "default shipping address" \n                   '
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-12" }, [_c("p", [_vm._v(" ")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-12 mt-8" }, [
      _c("p", [_vm._v(" ")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/AddressList.vue?vue&type=template&id=d8ca52ce& ***!
  \******************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "card" },
      _vm._l(_vm.address_list.data, function(ad) {
        return _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "table-responsive" }, [
            _c("table", { staticClass: "table table-striped" }, [
              _c("tbody", [
                _c("tr", [
                  _c("th", [_vm._v("Name")]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                " +
                        _vm._s(ad.first_name) +
                        " \n                                "
                    ),
                    _c("span", { staticClass: "alert alert-info p-2" }, [
                      _vm._v(
                        "\n                                    (" +
                          _vm._s(ad.name) +
                          ")\n                                "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("th", [_vm._v("last name")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(ad.last_name))])
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("th", [_vm._v("Address")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(ad.address))]),
                  _vm._v(" "),
                  _c("th", [_vm._v("default shipping address")]),
                  _vm._v(" "),
                  _c("td", [
                    ad.is_default_address != 0
                      ? _c("span", { staticClass: "alert alert-success" }, [
                          _vm._v(
                            "\n                                    Yes\n                                "
                          )
                        ])
                      : _c("span", { staticClass: "alert alert-warning" }, [
                          _vm._v("No")
                        ])
                  ])
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("th", [_vm._v("city")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(ad.city))]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Stage")]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      "\n                                " +
                        _vm._s(ad.stage) +
                        " - \n                                "
                    ),
                    _c("span", { staticClass: "alert alert-info" }, [
                      _vm._v(
                        "\n                                    " +
                          _vm._s(ad.country) +
                          "\n                                "
                      )
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("th", [_vm._v("E-mail")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(ad.email))]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Tel")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(ad.tel))])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12" }, [
              _c("div", { staticClass: "btn-group float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-primary",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.$emit("edit", ad.id)
                      }
                    }
                  },
                  [
                    _c("b-icon", { attrs: { icon: "pen" } }),
                    _vm._v(" Edit \n                        ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-danger ",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.$emit("del", ad.id)
                      }
                    }
                  },
                  [
                    _c("b-icon", { attrs: { icon: "trash" } }),
                    _vm._v(" Remove \n                        ")
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