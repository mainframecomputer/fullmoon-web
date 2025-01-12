"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106";
exports.ids = ["vendor-chunks/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs ***!
  \*******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/../../node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n// packages/react/use-callback-ref/src/useCallbackRef.tsx\n\nfunction useCallbackRef(callback) {\n  const callbackRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(callback);\n  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {\n    callbackRef.current = callback;\n  });\n  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (...args) => callbackRef.current?.(...args), []);\n}\n\n//# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0ByYWRpeC11aStyZWFjdC11c2UtY2FsbGJhY2stcmVmQDEuMS4wX0B0eXBlcytyZWFjdEAxOC4zLjEyX3JlYWN0QDE5LjAuMC1yYy02Njg1NWI5Ni0yMDI0MTEwNi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUMrQjtBQUMvQjtBQUNBLHNCQUFzQix5Q0FBWTtBQUNsQyxFQUFFLDRDQUFlO0FBQ2pCO0FBQ0EsR0FBRztBQUNILFNBQVMsMENBQWE7QUFDdEI7QUFHRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvc2hpdi9kZXYvbWFpbmZyYW1lL2V4cGVyaW1lbnRzL2Z1bGxtb29uLXdlYi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LXVzZS1jYWxsYmFjay1yZWZAMS4xLjBfQHR5cGVzK3JlYWN0QDE4LjMuMTJfcmVhY3RAMTkuMC4wLXJjLTY2ODU1Yjk2LTIwMjQxMTA2L25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWNrYWdlcy9yZWFjdC91c2UtY2FsbGJhY2stcmVmL3NyYy91c2VDYWxsYmFja1JlZi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoY2FsbGJhY2spIHtcbiAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiBjYWxsYmFja1JlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.0_@types+react@18.3.12_react@19.0.0-rc-66855b96-20241106/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs\n");

/***/ })

};
;