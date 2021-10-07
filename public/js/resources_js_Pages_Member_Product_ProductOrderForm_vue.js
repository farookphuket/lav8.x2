(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Member_Product_ProductOrderForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ProductOrderForm",
  props: ["user_id", "product", "my_cart"],
  data: function data() {
    return {
      isDisabled: false,
      price: 0,
      total_price: 0,
      cart_url: '',
      res_status: '',
      my_cart_id: 0,
      items_in_my_cart: [],
      my_product_id: '',
      orderForm: new Form({
        product_id: 0,
        order_unit_price: 0,
        order_total_price: 0,
        quantity: 1
      })
    };
  },
  mounted: function mounted() {
    this.checkUser();
    this.price = this.product.product_price;
    this.total_price = this.price;
    this.isItemInMyCart(); // get the product id in the form model

    this.orderForm.product_id = this.product.id;
    this.orderForm.order_unit_price = this.price;
  },
  methods: {
    checkUser: function checkUser() {
      if (this.user_id == this.product.user.id) this.isDisabled = true;
    },
    getTotalPrice: function getTotalPrice() {
      var total = this.price * this.orderForm.quantity;
      this.total_price = total;
    },
    isItemInMyCart: function isItemInMyCart() {
      var _this = this;

      this.res_status = '';
      this.my_cart_id = 0;
      var get_my_cart_url = "/member/getMyCart";
      axios.get(get_my_cart_url).then(function (res) {
        _this.items_in_my_cart = res.data.my_cart.data; //console.log(this.items_in_my_cart)

        _this.items_in_my_cart.forEach(function (ca) {
          ca.product.forEach(function (pd) {
            //console.log(pd)
            if (pd.id == _this.product.id) {
              _this.orderForm.quantity = ca.order_quantity;
              _this.total_price = ca.order_quantity * _this.price; // this item is in my cart

              _this.my_cart_id = ca.id; // update cart 

              _this.cart_url = "/member/cart/".concat(_this.my_cart_id);
            }
          });
        });
      });
    },
    saveToMyCart: function saveToMyCart(my_cart_id) {
      var _this2 = this;

      //alert(`my id is ${my_cart_id}`)
      if (my_cart_id == 0) {
        this.cart_url = "/member/cart";
        this.orderForm.submit('post', this.cart_url).then(function (res) {
          _this2.res_status = res.msg;
        });
      } else {
        //alert(`update ${my_cart_id} to url ${this.cart_url}`)
        this.orderForm.submit('put', this.cart_url).then(function (res) {
          _this2.res_status = res.msg;
        });
      }

      setTimeout(function () {
        _this2.isItemInMyCart();
      }, 2500);
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/Member/Product/ProductOrderForm.vue":
/*!****************************************************************!*\
  !*** ./resources/js/Pages/Member/Product/ProductOrderForm.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductOrderForm.vue?vue&type=template&id=7548b39f& */ "./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f&");
/* harmony import */ var _ProductOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductOrderForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ProductOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Member/Product/ProductOrderForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductOrderForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductOrderForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductOrderForm_vue_vue_type_template_id_7548b39f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductOrderForm.vue?vue&type=template&id=7548b39f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Member/Product/ProductOrderForm.vue?vue&type=template&id=7548b39f& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "col-lg-8" }, [
        _c("form", { staticClass: "form-horizontal", attrs: { action: "" } }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Quantity(จำนวน)")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.orderForm.quantity,
                  expression: "orderForm.quantity"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "number",
                name: "product_quantity",
                disabled: _vm.isDisabled
              },
              domProps: { value: _vm.orderForm.quantity },
              on: {
                change: function($event) {
                  $event.preventDefault()
                  return _vm.getTotalPrice($event)
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.orderForm, "quantity", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.orderForm.product_id,
                  expression: "orderForm.product_id"
                }
              ],
              attrs: { type: "hidden", name: "product_id" },
              domProps: { value: _vm.orderForm.product_id },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.orderForm, "product_id", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _vm.user_id == _vm.product.user.id
              ? _c("div", { staticClass: "btn-group float-right" }, [
                  _c("p", { staticClass: "alert alert-warning p-2" }, [
                    _vm._v(
                      "\n                                you're own \"" +
                        _vm._s(_vm.product.product_title) +
                        '".\n                            '
                    )
                  ])
                ])
              : _c("div", { staticClass: "btn-group float-right" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary",
                      attrs: { type: "submit" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.saveToMyCart(_vm.my_cart_id)
                        }
                      }
                    },
                    [_c("b-icon", { attrs: { icon: "cart-plus" } })],
                    1
                  )
                ]),
            _vm._v(" "),
            _c("div", { staticClass: "float-left mr-4" }, [
              _c(
                "span",
                {
                  staticClass: "mr-4 p-2",
                  domProps: { innerHTML: _vm._s(_vm.res_status) }
                },
                [
                  _vm._v(
                    "\n                                " +
                      _vm._s(_vm.res_status) +
                      "\n                            "
                  )
                ]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-4" }, [
        _c("p", { staticClass: "ml-4" }, [
          _vm._v("\n                    Total price : \n                    "),
          _c("span", { staticClass: "badge-info p-2" }, [
            _vm._v(
              "\n                        " +
                _vm._s(_vm.total_price) +
                "\n                    "
            )
          ])
        ])
      ])
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