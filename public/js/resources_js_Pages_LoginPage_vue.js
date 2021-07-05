(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_LoginPage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
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
//
//
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
  name: "LoginPage",
  data: function data() {
    return {
      login: false,
      registerForm: new Form({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }),
      login_password: '',
      login_email: '',
      remember_me: false,
      resetForm: new Form({
        email: ''
      }),
      res_status: ''
    };
  },
  methods: {
    getRegister: function getRegister() {
      var _this = this;

      var url = "/register";
      this.registerForm.submit("post", url).then(function (res) {
        _this.res_status = res.msg;

        _this.$refs["onOk"].show();
      })["catch"](function (err) {
        //    console.log(err);
        var ob = Object.values(err);
        _this.res_status = "<span class=\"badge badge-danger\">\n                            ".concat(ob.join("").split(","), "</span>");
      });
      setTimeout(function () {
        location.reload();
      }, 8000);
    },
    getLogin: function getLogin() {
      var _this2 = this;

      var url = "/login";
      axios.post(url, {
        email: this.login_email,
        password: this.login_password
      }).then(function (res) {
        var ds = res.data.user;

        if (ds.id) {
          var _url = "";
          _url = "/member/dashboard"; //location.href=url

          if (ds.is_admin != 0) {
            _url = "/admin/dashboard";
          }

          location.href = _url;
        }

        _this2.res_status = "<span class=\"alert alert-success\">\n                        Welcome ".concat(ds.name, " </span>");
      }, function (err) {
        //alert(err.response.data.message)
        _this2.res_status = "<span class=\"alert alert-danger\">\n                        Error : ".concat(err.response.data.message, "</span>");
        setTimeout(function () {
          _this2.$refs.login_email.focus();
        }, 2500);
      });
      this.$refs["onOk"].show();
    },
    getResetPass: function getResetPass() {
      var _this3 = this;

      var url = "/isMemberEmail";
      this.resetForm.submit("post", url).then(function (res) {
        //console.log(res.data)
        _this3.res_status = res.msg;
      })["catch"](function (err) {
        var ob = Object.values(err);
        _this3.res_status = "<span class=\"alert alert-danger\">\n                        ".concat(ob.join(""), "</span>");
      });
      setTimeout(function () {
        _this3.res_status = '';
      }, 3000);
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/LoginPage.vue":
/*!******************************************!*\
  !*** ./resources/js/Pages/LoginPage.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginPage.vue?vue&type=template&id=2f157e3f& */ "./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f&");
/* harmony import */ var _LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginPage.vue?vue&type=script&lang=js& */ "./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__.render,
  _LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/LoginPage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LoginPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f&":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginPage_vue_vue_type_template_id_2f157e3f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LoginPage.vue?vue&type=template&id=2f157e3f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/LoginPage.vue?vue&type=template&id=2f157e3f& ***!
  \****************************************************************************************************************************************************************************************************************/
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
        _vm.login == false
          ? _c("label", { staticClass: "tab", attrs: { for: "tab-1" } }, [
              _vm._v("Sign In")
            ])
          : _c("label", { staticClass: "tab", attrs: { for: "tab-1" } }, [
              _vm._v("forgot")
            ]),
        _vm._v(" "),
        _c("input", {
          staticClass: "sign-up",
          attrs: { id: "tab-2", type: "radio", name: "tab" }
        }),
        _vm._v(" "),
        _c("label", { staticClass: "tab", attrs: { for: "tab-2" } }, [
          _vm._v("Sign Up")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "login-form" }, [
          _vm.login == true
            ? _c("div", { staticClass: "sign-in-htm" }, [
                _c(
                  "form",
                  {
                    attrs: { action: "" },
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.getResetPass()
                      },
                      keydown: function($event) {
                        return _vm.resetForm.errors.clear($event.target.name)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "group" }, [
                      _c(
                        "label",
                        { staticClass: "label", attrs: { for: "user" } },
                        [_vm._v("Email")]
                      ),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.resetForm.email,
                            expression: "resetForm.email"
                          }
                        ],
                        ref: "email",
                        staticClass: "input",
                        attrs: { type: "email", placeholder: "you email" },
                        domProps: { value: _vm.resetForm.email },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.resetForm,
                              "email",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.resetForm.errors.has("email")
                        ? _c("span", {
                            staticStyle: {
                              color: "red",
                              "font-weight": "bold"
                            },
                            domProps: {
                              textContent: _vm._s(
                                _vm.resetForm.errors.get("email")
                              )
                            }
                          })
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "group" }, [
                      _c(
                        "span",
                        { domProps: { innerHTML: _vm._s(_vm.res_status) } },
                        [_vm._v(_vm._s(_vm.res_status))]
                      )
                    ]),
                    _vm._v(" "),
                    _vm._m(0)
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "hr" }),
                _vm._v(" "),
                _c("div", { staticClass: "foot-lnk" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#forgot" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.login = false
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "bx bx-log-in" }),
                      _vm._v("\n              Login")
                    ]
                  ),
                  _vm._v(" or\n\t\t\t\t\t"),
                  _c("a", { attrs: { href: "/" } }, [_vm._v("go home")])
                ])
              ])
            : _c("div", { staticClass: "sign-in-htm" }, [
                _c("div", { staticClass: "group" }, [
                  _c(
                    "label",
                    { staticClass: "label", attrs: { for: "user" } },
                    [_vm._v("Username")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.login_email,
                        expression: "login_email"
                      }
                    ],
                    ref: "login_email",
                    staticClass: "input",
                    attrs: { type: "text" },
                    domProps: { value: _vm.login_email },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.login_email = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "group" }, [
                  _c(
                    "label",
                    { staticClass: "label", attrs: { for: "pass" } },
                    [_vm._v("Password")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.login_password,
                        expression: "login_password"
                      }
                    ],
                    staticClass: "input",
                    attrs: { type: "password", "data-type": "password" },
                    domProps: { value: _vm.login_password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.login_password = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "group" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button",
                      attrs: { type: "submit" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.getLogin($event)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "bx bx-log-in" }),
                      _vm._v("\n            Login\n          ")
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "hr" }),
                _vm._v(" "),
                _c("div", { staticClass: "foot-lnk" }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#forgot" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.login = true
                        }
                      }
                    },
                    [_vm._v("Forgot password ")]
                  ),
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
              ]),
          _vm._v(" "),
          _c("div", { staticClass: "sign-up-htm" }, [
            _c(
              "form",
              {
                attrs: { action: "" },
                on: {
                  keydown: function($event) {
                    return _vm.registerForm.errors.clear($event.target.name)
                  },
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.getRegister($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "group" }, [
                  _c(
                    "label",
                    { staticClass: "label", attrs: { for: "user" } },
                    [_vm._v("Username")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.registerForm.name,
                        expression: "registerForm.name"
                      }
                    ],
                    staticClass: "input",
                    attrs: { name: "name", type: "text" },
                    domProps: { value: _vm.registerForm.name },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.registerForm, "name", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.registerForm.errors.get("name")
                    ? _c("span", {
                        staticClass: "badge badge-danger",
                        domProps: {
                          textContent: _vm._s(
                            _vm.registerForm.errors.get("name")
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
                    [_vm._v("Password")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.registerForm.password,
                        expression: "registerForm.password"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      name: "password",
                      type: "password",
                      "data-type": "password"
                    },
                    domProps: { value: _vm.registerForm.password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.registerForm,
                          "password",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.registerForm.errors.get("password")
                    ? _c("span", {
                        staticClass: "badge badge-danger",
                        domProps: {
                          textContent: _vm._s(
                            _vm.registerForm.errors.get("password")
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
                    [_vm._v("Repeat Password")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.registerForm.password_confirmation,
                        expression: "registerForm.password_confirmation"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      type: "password",
                      name: "password_confirmation",
                      "data-type": "password"
                    },
                    domProps: { value: _vm.registerForm.password_confirmation },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.registerForm,
                          "password_confirmation",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.registerForm.errors.get("password_confirmation")
                    ? _c("span", {
                        staticClass: "badge badge-danger",
                        domProps: {
                          textContent: _vm._s(
                            _vm.registerForm.errors.get("password_confirmation")
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
                    [_vm._v("Email Address")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.registerForm.email,
                        expression: "registerForm.email"
                      }
                    ],
                    staticClass: "input",
                    attrs: { type: "text", name: "email" },
                    domProps: { value: _vm.registerForm.email },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.registerForm, "email", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.registerForm.errors.get("email")
                    ? _c("span", {
                        staticClass: "badge badge-danger",
                        domProps: {
                          textContent: _vm._s(
                            _vm.registerForm.errors.get("email")
                          )
                        }
                      })
                    : _vm._e()
                ]),
                _vm._v(" "),
                _vm._m(1)
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "hr" }),
            _vm._v(" "),
            _vm._m(2)
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "group" }, [
      _c("input", {
        staticClass: "button",
        attrs: { type: "submit", value: "reset password" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "group" }, [
      _c("button", { staticClass: "button", attrs: { type: "submit" } }, [
        _vm._v("Register")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "foot-lnk" }, [
      _c("label", { attrs: { for: "tab-1" } }, [
        _c("a", { attrs: { href: "/" } }, [
          _vm._v("\n                Back to home page")
        ])
      ])
    ])
  }
]
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