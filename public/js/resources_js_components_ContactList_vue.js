(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ContactList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ContactForm",
  data: function data() {
    return {
      res_status: '',
      token: '',
      showToken: false,
      contactForm: new Form({
        name: '',
        email: '',
        token: '',
        title: '',
        body: ''
      })
    };
  },
  mounted: function mounted() {
    this.$emit('getFaq');
  },
  methods: {
    sentMessage: function sentMessage(id) {
      var _this = this;

      var url = "/contact";
      this.contactForm.token = this.token;
      this.contactForm.submit("post", url).then(function (res) {
        //console.log(res.msg)
        _this.res_status = res.msg;
        _this.showToken = false;
      })["catch"](function (err) {
        //    console.log(err);
        var ob = Object.values(err);
        _this.res_status = "<span\n                    class=\"res_status alert alert-danger\">\n                        ".concat(ob.join(""), "</span>");
      });
      setTimeout(function () {
        _this.clearForm();

        _this.$emit('getFaqs');
      }, 3000);
    },
    sendEmail: function sendEmail() {
      var _this2 = this;

      var url = "/confirmRealPerson"; //            console.log(this.$refs.email.value)

      if (!this.$refs.email.value) {
        return;
      } else {
        if (!this.$refs.name.value) {
          this.$refs.name.focus();
        } else {
          axios.post(url, {
            email: this.$refs.email.value,
            name: this.$refs.name.value
          }).then(function (res) {
            //    console.log(res.data)
            _this2.res_status = res.data.msg;
            _this2.showToken = true;

            _this2.$refs.token.focus();
          });
        }
      }
    },
    sentToken: function sentToken() {
      this.token = this.$refs.token.value;
      var url = "/isRealPerson/".concat(this.token);
      axios.post(url, {
        token: this.token
      }).then(function (res) {//console.log(res.data)
      });
    },
    clearForm: function clearForm() {
      this.res_status = ''; //  this.showToken = false
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContactForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContactForm.vue */ "./resources/js/components/ContactForm.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "FaqUs",
  components: {
    FaqForm: _ContactForm_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {
      faqs: [],
      moment: moment
    };
  },
  mounted: function mounted() {
    this.getFaqs();
  },
  methods: {
    getFaqs: function getFaqs(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set('pubfaq_old_page', url);
      }

      url = this.$cookies.get('pubfaq_old_page');

      if (!url) {
        url = "/api/getContact";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data)
        _this.faqs = res.data.getFaqs;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/ContactForm.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/ContactForm.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContactForm.vue?vue&type=template&id=76db242e& */ "./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e&");
/* harmony import */ var _ContactForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContactForm.vue?vue&type=script&lang=js& */ "./resources/js/components/ContactForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ContactForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__.render,
  _ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ContactForm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ContactList.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/ContactList.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContactList.vue?vue&type=template&id=0ee8d67a& */ "./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a&");
/* harmony import */ var _ContactList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContactList.vue?vue&type=script&lang=js& */ "./resources/js/components/ContactList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ContactList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__.render,
  _ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ContactList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ContactForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/ContactForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContactForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/ContactList.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/ContactList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContactList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactForm_vue_vue_type_template_id_76db242e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContactForm.vue?vue&type=template&id=76db242e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e&");


/***/ }),

/***/ "./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContactList_vue_vue_type_template_id_0ee8d67a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContactList.vue?vue&type=template&id=0ee8d67a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactForm.vue?vue&type=template&id=76db242e& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "pt-4 " }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "form",
      {
        attrs: { action: "#" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.sentMessage($event)
          },
          keydown: _vm.clearForm
        }
      },
      [
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            {
              staticClass: "col-12",
              staticStyle: { "margin-bottom": "1.2em" }
            },
            [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.contactForm.name,
                        expression: "contactForm.name"
                      }
                    ],
                    ref: "name",
                    staticClass: "form-control",
                    attrs: {
                      name: "name",
                      type: "text",
                      id: "name",
                      placeholder: "Your name...",
                      required: ""
                    },
                    domProps: { value: _vm.contactForm.name },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.contactForm, "name", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.contactForm.email,
                        expression: "contactForm.email"
                      }
                    ],
                    ref: "email",
                    staticClass: "form-control",
                    attrs: {
                      name: "email",
                      type: "email",
                      id: "email",
                      placeholder: "Your email...",
                      required: ""
                    },
                    domProps: { value: _vm.contactForm.email },
                    on: {
                      blur: _vm.sendEmail,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.contactForm, "email", $event.target.value)
                      }
                    }
                  })
                ])
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.contactForm.title,
                  expression: "contactForm.title"
                }
              ],
              staticClass: "form-control p-2",
              attrs: {
                name: "title",
                type: "text",
                id: "subject",
                placeholder: "Subject...",
                required: ""
              },
              domProps: { value: _vm.contactForm.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.contactForm, "title", $event.target.value)
                }
              }
            })
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showToken,
                expression: "showToken"
              }
            ],
            staticClass: "row"
          },
          [
            _c(
              "div",
              { staticClass: "col-12", staticStyle: { "margin-top": "1.2em" } },
              [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.token,
                      expression: "token"
                    }
                  ],
                  ref: "token",
                  staticClass: "form-control",
                  attrs: {
                    placeholder:
                      "we have send the token to your email  please paste the token in this text box."
                  },
                  domProps: { value: _vm.token },
                  on: {
                    blur: function($event) {
                      $event.preventDefault()
                      return _vm.sentToken($event)
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.token = $event.target.value
                    }
                  }
                })
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            {
              staticClass: "col-12",
              staticStyle: { "margin-top": "1.2em", "margin-bottom": "2.5em" }
            },
            [
              _c("jodit-editor", {
                attrs: { width: "100%", height: "450" },
                model: {
                  value: _vm.contactForm.body,
                  callback: function($$v) {
                    _vm.$set(_vm.contactForm, "body", $$v)
                  },
                  expression: "contactForm.body"
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _vm._m(1)
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "col-lg-12 pt-4" }, [_vm._v("??")]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "text-content ",
        domProps: { innerHTML: _vm._s(_vm.res_status) }
      },
      [_vm._v("\n            " + _vm._s(_vm.res_status) + "\n        ")]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "section-title",
        staticStyle: { "margin-bottom": "1.5em" }
      },
      [
        _c(
          "h3",
          { staticClass: "wow fadeInUp", attrs: { "data-wow-delay": ".2s" } },
          [
            _vm._v(
              "\n                    Not the answer you looking? well, let create one now.\n                "
            )
          ]
        ),
        _vm._v(" "),
        _c("ol", [
          _c("li", [_vm._v("enter your name ")]),
          _vm._v(" "),
          _c("li", [
            _vm._v(
              "enter your email then you will get the token in your \n                        email we need the token to confirm that you are a \n                        real person\n                    "
            )
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "clearfix" }, [
      _c("div", { staticClass: "float-right" }, [
        _c(
          "button",
          {
            staticClass: "main-btn btn-hover d-none d-md-block ",
            attrs: { type: "submit" }
          },
          [_c("i", { staticClass: "lni lni-telegram-original" })]
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ContactList.vue?vue&type=template&id=0ee8d67a& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
      { staticClass: "container" },
      [
        _vm._l(_vm.faqs.data, function(li) {
          return _c("div", { staticClass: "card mt-2" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h3", [_vm._v(_vm._s(li.title))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c("div", { domProps: { innerHTML: _vm._s(li.body) } }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(li.body) +
                    "\n                    "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-footer" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6" }, [
                  _vm._v(
                    "\n                            by :\n                            "
                  ),
                  _c(
                    "span",
                    [
                      _c("b-icon", { attrs: { icon: "person" } }),
                      _vm._v(
                        "\n                                " +
                          _vm._s(li.name) +
                          "\n                            "
                      )
                    ],
                    1
                  ),
                  _vm._v(
                    "\n                            ??\n                            "
                  ),
                  _c(
                    "span",
                    [
                      _c("b-icon", { attrs: { icon: "calendar2-day" } }),
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.moment(li.created_at)) +
                          " ??\n                                " +
                          _vm._s(_vm.moment(li.created_at).fromNow()) +
                          "\n                            "
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6" }, [
                  li.replied_at != "NO"
                    ? _c("span", [
                        _c(
                          "span",
                          { staticClass: "float-right" },
                          [
                            _vm._v(
                              "\n                                    replied\n                                    "
                            ),
                            _c("b-icon", { attrs: { icon: "person" } }),
                            _vm._v(
                              "\n                                    " +
                                _vm._s(li.reply_by) +
                                "\n                                    "
                            )
                          ],
                          1
                        ),
                        _vm._v(
                          "\n                                     ??\n                                    "
                        ),
                        _c("p", [
                          _vm._v(
                            "\n                                        " +
                              _vm._s(_vm.moment(li.replied_at)) +
                              " ??\n                                        " +
                              _vm._s(_vm.moment(li.replied_at).fromNow()) +
                              "\n                                    "
                          )
                        ])
                      ])
                    : _c("span", [_vm._v("No reply yet!")])
                ])
              ])
            ])
          ])
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.faqs.data != 0,
                expression: "faqs.data != 0"
              }
            ],
            staticClass: "nav-scroller py-1 mb-2 mt-4"
          },
          [
            _c("nav", { staticClass: "nav d-flex justify-content-center" }, [
              _c(
                "ul",
                { staticClass: "pagination flex-wrap" },
                [
                  _c("li", { staticClass: "page-item disabled " }, [
                    _c(
                      "div",
                      {
                        staticClass: "page-link",
                        staticStyle: { padding: "0.5em" }
                      },
                      [
                        _vm._v(
                          "\n                        showing from\n                        "
                        ),
                        _c("span", [_vm._v(_vm._s(_vm.faqs.from))]),
                        _vm._v(" to\n                        "),
                        _c("span", [_vm._v(_vm._s(_vm.faqs.to))]),
                        _vm._v(" of\n                        "),
                        _c("span", [_vm._v(_vm._s(_vm.faqs.total))])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.faqs.links, function(li) {
                    return _c("li", { staticClass: "page-item " }, [
                      li.active != true && li.url != null
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link p-2",
                              attrs: { href: "" },
                              domProps: { innerHTML: _vm._s(li.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.getFaqs(li.url)
                                }
                              }
                            },
                            [_vm._v(_vm._s(li.label))]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "page-link disabled",
                              domProps: { innerHTML: _vm._s(li.label) }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(li.label) +
                                  "\n                    "
                              )
                            ]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active " }, [
                    _c(
                      "span",
                      { staticClass: "page-link" },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.faqs.current_page) +
                            "\n                    "
                        )
                      ],
                      1
                    )
                  ])
                ],
                2
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticStyle: { "margin-top": "2em", "magin-bottom": "2em" } },
          [
            _c("faq-form", {
              on: {
                getFaqs: function($event) {
                  return _vm.getFaqs($event)
                }
              }
            })
          ],
          1
        )
      ],
      2
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