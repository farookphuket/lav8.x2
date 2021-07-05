(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Photo_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PhotoList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoList.vue */ "./resources/js/Pages/PhotoList.vue");
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PubPhoto",
  components: {
    PhotoList: _PhotoList_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {
      photos: []
    };
  },
  mounted: function mounted() {
    this.getPhotos();
  },
  methods: {
    getPhotos: function getPhotos(page) {
      var _this = this;

      var url = '';

      if (page) {
        url = page;
        this.$cookies.set("pubpic_old_page", url);
      }

      url = this.$cookies.get("pubpic_old_page");

      if (!url) {
        url = "/api/getPhotos";
      }

      axios.get(url).then(function (res) {
        //console.log(res.data)
        _this.photos = res.data.photos;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js& ***!
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
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PhotoList",
  props: ["photos"],
  data: function data() {
    return {
      moment: moment,
      s_title: ''
    };
  },
  mounted: function mounted() {
    this.s_title = new CustomText();
  }
});

/***/ }),

/***/ "./resources/js/Pages/Photo.vue":
/*!**************************************!*\
  !*** ./resources/js/Pages/Photo.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Photo.vue?vue&type=template&id=33ec5559& */ "./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559&");
/* harmony import */ var _Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Photo.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Photo.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__.render,
  _Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Photo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/PhotoList.vue":
/*!******************************************!*\
  !*** ./resources/js/Pages/PhotoList.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoList.vue?vue&type=template&id=ea5abad2& */ "./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2&");
/* harmony import */ var _PhotoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoList.vue?vue&type=script&lang=js& */ "./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _PhotoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__.render,
  _PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/PhotoList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Photo.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/Pages/Photo.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Photo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PhotoList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559&":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_33ec5559___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Photo.vue?vue&type=template&id=33ec5559& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559&");


/***/ }),

/***/ "./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2&":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoList_vue_vue_type_template_id_ea5abad2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PhotoList.vue?vue&type=template&id=ea5abad2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Photo.vue?vue&type=template&id=33ec5559& ***!
  \************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container" },
    [
      _c("photo-list", {
        attrs: { photos: _vm.photos },
        on: {
          getPhotos: function($event) {
            return _vm.getPhotos($event)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/PhotoList.vue?vue&type=template&id=ea5abad2& ***!
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
    { staticClass: "row gallery-5" },
    [
      _vm.photos.data == 0
        ? _c("div", { staticClass: "col-lg-4 col-md-6 gallery-item " }, [
            _vm._m(0)
          ])
        : _vm._l(_vm.photos.data, function(pi) {
            return _c(
              "div",
              { staticClass: "col-lg-4 col-md-6 gallery-item " },
              [
                _c("div", { staticClass: "single-gallery" }, [
                  _c(
                    "div",
                    {
                      staticClass: "image",
                      staticStyle: { "max-height": "250px" }
                    },
                    [
                      _c("img", {
                        staticStyle: {
                          "min-height": "250px",
                          border: "1px dotted #ff0000"
                        },
                        attrs: { src: pi.url, alt: "" }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "overlay" }, [
                    _c("div", { staticClass: "overlay-content" }, [
                      _c("div", { staticClass: "info" }, [
                        _c("h5", { staticClass: "pt-4" }, [_vm._v("Photo")]),
                        _vm._v(" "),
                        _c("p", [_vm._v(_vm._s(pi.title))])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "action" }, [
                        _c(
                          "a",
                          {
                            attrs: {
                              href: pi.url,
                              title: pi.title,
                              target: "_blank"
                            }
                          },
                          [
                            _vm._v("\n                                    _"),
                            _c("i", { staticClass: "lni lni-link" }),
                            _vm._v("_\n                                ")
                          ]
                        )
                      ])
                    ])
                  ])
                ])
              ]
            )
          }),
      _vm._v(" "),
      _c("div", { staticClass: "col-lg-12 pt-2 mb-2" }, [_vm._v(" ")]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.photos.data != 0,
              expression: "photos.data != 0"
            }
          ],
          staticClass: "container "
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
                      _c("span", [_vm._v(_vm._s(_vm.photos.from))]),
                      _vm._v(" \n                                    to "),
                      _c("span", [_vm._v(_vm._s(_vm.photos.to))]),
                      _vm._v(" of \n                                    "),
                      _c("span", [_vm._v(_vm._s(_vm.photos.total))])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.photos.links, function(li) {
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
                                  return _vm.$emit("getPhotos", li.url)
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
                              _vm._s(_vm.photos.current_page) +
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
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "single-gallery" }, [
      _c("div", { staticClass: "image" }, [
        _c("img", {
          staticClass: "responsive",
          attrs: {
            src:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*",
            alt: "default image 1"
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "overlay" }, [
        _c("div", { staticClass: "overlay-content" }, [
          _c("div", { staticClass: "info" }, [
            _c("h5", [_vm._v("No photo")]),
            _vm._v(" "),
            _c("p", [_vm._v("There is no photo found")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "action" }, [
            _c("a", { attrs: { href: "#0" } }, [
              _vm._v("\n                                    _"),
              _c("i", { staticClass: "lni lni-link" }),
              _vm._v("_\n                                ")
            ])
          ])
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