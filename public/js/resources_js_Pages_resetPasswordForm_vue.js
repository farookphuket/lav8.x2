(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_resetPasswordForm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ResetPassword",
  data: function data() {
    return {
      res_status: '',
      time_left: window.time_left,
      s_msg: window.msg,
      is_disabled: false,
      token: window.token,
      formReset: new Form({
        password: '',
        password_confirmation: ''
      })
    };
  },
  mounted: function mounted() {
    this.getCount();
  },
  methods: {
    resetMyPassword: function resetMyPassword() {
      var _this = this;

      var url = "/passwordreset/".concat(this.token);
      this.formReset.submit('put', url).then(function (res) {
        //console.log(res.msg)
        _this.res_status = res.msg;

        _this.$refs["onOk"].show();

        setTimeout(function () {
          location.href = '/';
        }, 7000);
      });
    },
    getCount: function getCount() {
      //will be reload page until the off
      //then will disabled the send button 
      var timmer;

      if (this.time_left <= 1) {
        //console.log(`the time is clear ${this.time_left}`)
        this.is_disabled = true;
        clearTimeout(timmer);
      } else {
        timmer = setTimeout(function () {
          //alert(`ha ha go `)
          location.reload();
        }, 32500);
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/resetPasswordForm.vue":
/*!**************************************************!*\
  !*** ./resources/js/Pages/resetPasswordForm.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resetPasswordForm.vue?vue&type=template&id=2d7c93b5& */ "./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5&");
/* harmony import */ var _resetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resetPasswordForm.vue?vue&type=script&lang=js& */ "./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _resetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__.render,
  _resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/resetPasswordForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_resetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resetPasswordForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_resetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_resetPasswordForm_vue_vue_type_template_id_2d7c93b5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./resetPasswordForm.vue?vue&type=template&id=2d7c93b5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/resetPasswordForm.vue?vue&type=template&id=2d7c93b5& ***!
  \************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "login-wrap" },
    [
      _c("div", { staticClass: "login-html" }, [
        _c("input", {
          staticClass: "sign-in",
          attrs: { id: "tab-1", type: "radio", name: "tab", checked: "" }
        }),
        _vm._v(" "),
        _c("label", { staticClass: "tab", attrs: { for: "tab-1" } }, [
          _vm._v("form")
        ]),
        _vm._v(" "),
        _c("input", {
          staticClass: "sign-up",
          attrs: { id: "tab-2", type: "radio", name: "tab", disabled: "" }
        }),
        _vm._v(" "),
        _c("label", { staticClass: "tab", attrs: { for: "tab-2" } }, [
          _vm._v("reset")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "login-form" }, [
          _c("div", { staticClass: "sign-in-htm" }, [
            _c(
              "form",
              {
                attrs: { action: "" },
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.resetMyPassword()
                  },
                  keydown: function($event) {
                    return _vm.formReset.errors.clear($event.target.name)
                  }
                }
              },
              [
                _c("div", { staticClass: "group" }, [
                  _c(
                    "label",
                    { staticClass: "label", attrs: { for: "user" } },
                    [_vm._v("Password")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.formReset.password,
                        expression: "formReset.password"
                      }
                    ],
                    ref: "password",
                    staticClass: "input",
                    attrs: { type: "text", name: "password" },
                    domProps: { value: _vm.formReset.password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.formReset, "password", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.formReset.errors.get("password")
                    ? _c("span", {
                        staticStyle: { color: "red", "font-weight": "bold" },
                        domProps: {
                          textContent: _vm._s(
                            _vm.formReset.errors.get("password")
                          )
                        }
                      })
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "group" }, [
                  _c(
                    "label",
                    { staticClass: "label", attrs: { for: "pass" } },
                    [_vm._v("Confirm Password")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.formReset.password_confirmation,
                        expression: "formReset.password_confirmation"
                      }
                    ],
                    staticClass: "input",
                    attrs: { type: "text", name: "password_confirmation" },
                    domProps: { value: _vm.formReset.password_confirmation },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.formReset,
                          "password_confirmation",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.formReset.errors.get("password_confirmation")
                    ? _c("span", {
                        staticStyle: { color: "red", "font-weight": "bold" },
                        domProps: {
                          textContent: _vm._s(
                            _vm.formReset.errors.get("password_confirmation")
                          )
                        }
                      })
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "group" }, [
                  !_vm.is_disabled
                    ? _c(
                        "span",
                        {
                          staticStyle: { "margin-top": "2px" },
                          domProps: { innerHTML: _vm._s(_vm.s_msg) }
                        },
                        [_vm._v(_vm._s(_vm.s_msg))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "button",
                      attrs: { disabled: _vm.is_disabled, type: "submit" }
                    },
                    [
                      _c("i", { staticClass: "bx bx-log-in" }),
                      _vm._v(
                        "\n            Reset (" +
                          _vm._s(_vm.time_left) +
                          ")\n          "
                      )
                    ]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "hr" }),
            _vm._v(" "),
            _c("div", { staticClass: "foot-lnk" }, [
              _c("a", { attrs: { href: "#forgot" } }, [
                _vm._v("Forgot password ")
              ]),
              _vm._v(" or\n\n\t\t\t\t\t"),
              _c(
                "a",
                { attrs: { href: "/" } },
                [
                  _c("box-icon", { attrs: { name: "home-alt" } }),
                  _vm._v("\n              go home")
                ],
                1
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "onOk",
          attrs: { title: "server said :", centered: "", "ok-only": "" }
        },
        [
          _c(
            "div",
            {
              staticClass: "container",
              domProps: { innerHTML: _vm._s(_vm.res_status) }
            },
            [_vm._v("\n          " + _vm._s(_vm.res_status) + "\n      ")]
          )
        ]
      )
    ],
    1
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