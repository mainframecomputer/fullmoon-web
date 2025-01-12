"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-compose-refs@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106";
exports.ids = ["vendor-chunks/@radix-ui+react-compose-refs@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-compose-refs/dist/index.mjs":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-compose-refs/dist/index.mjs ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   composeRefs: () => (/* binding */ composeRefs),\n/* harmony export */   useComposedRefs: () => (/* binding */ useComposedRefs)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/../../node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n// packages/react/compose-refs/src/composeRefs.tsx\n\nfunction setRef(ref, value) {\n  if (typeof ref === \"function\") {\n    ref(value);\n  } else if (ref !== null && ref !== void 0) {\n    ref.current = value;\n  }\n}\nfunction composeRefs(...refs) {\n  return (node) => refs.forEach((ref) => setRef(ref, node));\n}\nfunction useComposedRefs(...refs) {\n  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);\n}\n\n//# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYWRpeC11aStyZWFjdC1jb21wb3NlLXJlZnNAMS4xLjBfQHR5cGVzK3JlYWN0QDE4LjMuMTJfcmVhY3RAMTkuMC4wLXJjLTY2ODU1Yjk2LTIwMjQxMTA2L25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsOENBQWlCO0FBQzFCO0FBSUU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3NoaXYvZGV2L21haW5mcmFtZS9leHBlcmltZW50cy9mdWxsbW9vbi13ZWIvbm9kZV9tb2R1bGVzLy5wbnBtL0ByYWRpeC11aStyZWFjdC1jb21wb3NlLXJlZnNAMS4xLjBfQHR5cGVzK3JlYWN0QDE4LjMuMTJfcmVhY3RAMTkuMC4wLXJjLTY2ODU1Yjk2LTIwMjQxMTA2L25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzL2Rpc3QvaW5kZXgubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhY2thZ2VzL3JlYWN0L2NvbXBvc2UtcmVmcy9zcmMvY29tcG9zZVJlZnMudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHNldFJlZihyZWYsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZWYodmFsdWUpO1xuICB9IGVsc2UgaWYgKHJlZiAhPT0gbnVsbCAmJiByZWYgIT09IHZvaWQgMCkge1xuICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gIH1cbn1cbmZ1bmN0aW9uIGNvbXBvc2VSZWZzKC4uLnJlZnMpIHtcbiAgcmV0dXJuIChub2RlKSA9PiByZWZzLmZvckVhY2goKHJlZikgPT4gc2V0UmVmKHJlZiwgbm9kZSkpO1xufVxuZnVuY3Rpb24gdXNlQ29tcG9zZWRSZWZzKC4uLnJlZnMpIHtcbiAgcmV0dXJuIFJlYWN0LnVzZUNhbGxiYWNrKGNvbXBvc2VSZWZzKC4uLnJlZnMpLCByZWZzKTtcbn1cbmV4cG9ydCB7XG4gIGNvbXBvc2VSZWZzLFxuICB1c2VDb21wb3NlZFJlZnNcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-compose-refs/dist/index.mjs\n");

/***/ })

};
;