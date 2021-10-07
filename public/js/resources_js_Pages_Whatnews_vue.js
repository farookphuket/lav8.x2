(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Whatnews_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js& ***!
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PubWhatnews",
  data: function data() {
    return {
      whatnews: [],
      moment: moment
    };
  },
  mounted: function mounted() {
    this.getWhatnew();
  },
  methods: {
    getWhatnew: function getWhatnew(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("pwhatnews_old_page", url);
      }

      url = this.$cookies.get("pwhatnews_old_page");

      if (!url) {
        url = "/api/getWhatnew";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data.whatnews)
        _this.whatnews = res.data.whatnews;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/Whatnews.vue":
/*!*****************************************!*\
  !*** ./resources/js/Pages/Whatnews.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Whatnews.vue?vue&type=template&id=2c4e56c0& */ "./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0&");
/* harmony import */ var _Whatnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Whatnews.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Whatnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Whatnews.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnews.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnews_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0&":
/*!************************************************************************!*\
  !*** ./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Whatnews_vue_vue_type_template_id_2c4e56c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Whatnews.vue?vue&type=template&id=2c4e56c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Whatnews.vue?vue&type=template&id=2c4e56c0& ***!
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
  return _c(
    "div",
    { staticClass: "row" },
    [
      _vm._m(0),
      _vm._v(" "),
      _vm.whatnews.data == 0
        ? _c("div", { staticClass: "item" }, [
            _vm._m(1),
            _vm._v(" "),
            _vm._m(2)
          ])
        : _vm._l(_vm.whatnews.data, function(wn) {
            return _c("div", { staticClass: "mt-10" }, [
              _c(
                "div",
                {
                  staticClass: "text-content",
                  staticStyle: { "margin-top": "2em" }
                },
                [
                  _c("h4", [_vm._v(_vm._s(wn.whatnew_title))]),
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
                      _vm._v("  \n                        "),
                      _c("span", [
                        _c(
                          "a",
                          {
                            attrs: {
                              href: "#",
                              title: _vm.moment(wn.created_at)
                            }
                          },
                          [
                            _c("b-icon", {
                              attrs: { icon: "calendar2-date-fill" }
                            })
                          ],
                          1
                        ),
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.moment(wn.created_at).fromNow()) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { domProps: { innerHTML: _vm._s(wn.whatnew_body) } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(wn.whatnew_body) +
                          "\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("hr", {
                    staticStyle: {
                      width: "80%",
                      color: "#e7e7e7",
                      "text-align": "center",
                      "margin-top": "2em"
                    }
                  })
                ]
              )
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
              value: _vm.whatnews.data != 0,
              expression: "whatnews.data != 0"
            }
          ],
          staticClass: "container ",
          staticStyle: { "margin-top": "4em" }
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
                        "\n\n                                        showing from "
                      ),
                      _c("span", [_vm._v(_vm._s(_vm.whatnews.from))]),
                      _vm._v("\n                                        to "),
                      _c("span", [_vm._v(_vm._s(_vm.whatnews.to))]),
                      _vm._v(" of\n                                        "),
                      _c("span", [_vm._v(_vm._s(_vm.whatnews.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.whatnews.links, function(li) {
                    return _c("li", { staticClass: "page-item" }, [
                      !li.active && li.url != null
                        ? _c(
                            "a",
                            {
                              staticClass: "page-link",
                              staticStyle: { padding: "0.5em" },
                              domProps: { innerHTML: _vm._s(li.label) },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.getWhatnew(li.url)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(li.label) +
                                  "\n                                    "
                              )
                            ]
                          )
                        : _c(
                            "span",
                            {
                              staticClass: "page-link active disabled",
                              staticStyle: { padding: "0.5em" },
                              domProps: { innerHTML: _vm._s(li.label) }
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(li.label) +
                                  "\n                                    "
                              )
                            ]
                          )
                    ])
                  }),
                  _vm._v(" "),
                  _c("li", { staticClass: "page-item active" }, [
                    _c(
                      "div",
                      { staticClass: "page-link" },
                      [
                        _c("b-icon", { attrs: { icon: "book-half" } }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.whatnews.current_page) +
                            "\n\n                                "
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "float_status" }, [
      _vm._v("this isn cmmc te\n                "),
      _c("p", [_vm._v("thisnf cmxlc shkdsj")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "image" }, [
      _c("img", {
        attrs: {
          src: "https://i.ibb.co/JBskcQ9/2021-04-15-laravel-X2-index.png",
          alt: "NO DATA"
        }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-content" }, [
      _c("h2", [_vm._v("I don't have data now 🤘")]),
      _vm._v(" "),
      _c("p", [
        _vm._v("if you want to be the first post please go ahead and ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "text-center view-all-btn" }, [
        _c(
          "a",
          {
            staticClass: "main-btn btn-hover",
            attrs: { href: "/login", title: "login or register " }
          },
          [_vm._v(" login/register")]
        )
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