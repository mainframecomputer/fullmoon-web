/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/throttleit@2.1.0";
exports.ids = ["vendor-chunks/throttleit@2.1.0"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/throttleit@2.1.0/node_modules/throttleit/index.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/.pnpm/throttleit@2.1.0/node_modules/throttleit/index.js ***!
  \**********************************************************************************/
/***/ ((module) => {

eval("function throttle(function_, wait) {\n\tif (typeof function_ !== 'function') {\n\t\tthrow new TypeError(`Expected the first argument to be a \\`function\\`, got \\`${typeof function_}\\`.`);\n\t}\n\n\t// TODO: Add `wait` validation too in the next major version.\n\n\tlet timeoutId;\n\tlet lastCallTime = 0;\n\n\treturn function throttled(...arguments_) { // eslint-disable-line func-names\n\t\tclearTimeout(timeoutId);\n\n\t\tconst now = Date.now();\n\t\tconst timeSinceLastCall = now - lastCallTime;\n\t\tconst delayForNextCall = wait - timeSinceLastCall;\n\n\t\tif (delayForNextCall <= 0) {\n\t\t\tlastCallTime = now;\n\t\t\tfunction_.apply(this, arguments_);\n\t\t} else {\n\t\t\ttimeoutId = setTimeout(() => {\n\t\t\t\tlastCallTime = Date.now();\n\t\t\t\tfunction_.apply(this, arguments_);\n\t\t\t}, delayForNextCall);\n\t\t}\n\t};\n}\n\nmodule.exports = throttle;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Rocm90dGxlaXRAMi4xLjAvbm9kZV9tb2R1bGVzL3Rocm90dGxlaXQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLGlGQUFpRixpQkFBaUI7QUFDbEc7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIvVXNlcnMvc2hpdi9kZXYvbWFpbmZyYW1lL2V4cGVyaW1lbnRzL2Z1bGxtb29uLXdlYi9ub2RlX21vZHVsZXMvLnBucG0vdGhyb3R0bGVpdEAyLjEuMC9ub2RlX21vZHVsZXMvdGhyb3R0bGVpdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB0aHJvdHRsZShmdW5jdGlvbl8sIHdhaXQpIHtcblx0aWYgKHR5cGVvZiBmdW5jdGlvbl8gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBcXGBmdW5jdGlvblxcYCwgZ290IFxcYCR7dHlwZW9mIGZ1bmN0aW9uX31cXGAuYCk7XG5cdH1cblxuXHQvLyBUT0RPOiBBZGQgYHdhaXRgIHZhbGlkYXRpb24gdG9vIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uXG5cblx0bGV0IHRpbWVvdXRJZDtcblx0bGV0IGxhc3RDYWxsVGltZSA9IDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCguLi5hcmd1bWVudHNfKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lc1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuXG5cdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblx0XHRjb25zdCB0aW1lU2luY2VMYXN0Q2FsbCA9IG5vdyAtIGxhc3RDYWxsVGltZTtcblx0XHRjb25zdCBkZWxheUZvck5leHRDYWxsID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG5cdFx0aWYgKGRlbGF5Rm9yTmV4dENhbGwgPD0gMCkge1xuXHRcdFx0bGFzdENhbGxUaW1lID0gbm93O1xuXHRcdFx0ZnVuY3Rpb25fLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0bGFzdENhbGxUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0ZnVuY3Rpb25fLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXHRcdFx0fSwgZGVsYXlGb3JOZXh0Q2FsbCk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/throttleit@2.1.0/node_modules/throttleit/index.js\n");

/***/ })

};
;