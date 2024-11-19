/*
@license

dhtmlxVault v.4.0.0 Professional

This software is covered by DHTMLX Enterprise License.
Usage without proper license is prohibited.

(c) XB Software.

*/
if (window.dhx){ window.dhx_legacy = dhx; delete window.dhx; }(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dhx"] = factory();
	else
		root["dhx"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(60);
exports.el = dom.defineElement;
exports.sv = dom.defineSvgElement;
exports.view = dom.defineView;
exports.create = dom.createView;
exports.inject = dom.injectView;
exports.KEYED_LIST = dom.KEYED_LIST;
function disableHelp() {
    dom.DEVMODE.mutations = false;
    dom.DEVMODE.warnings = false;
    dom.DEVMODE.verbose = false;
    dom.DEVMODE.UNKEYED_INPUT = false;
}
exports.disableHelp = disableHelp;
function resizer(handler) {
    var resize = window.ResizeObserver;
    var activeHandler = function (node) {
        var height = node.el.offsetHeight;
        var width = node.el.offsetWidth;
        handler(width, height);
    };
    if (resize) {
        return exports.el("div.dhx-resize-observer", {
            _hooks: {
                didInsert: function (node) {
                    new resize(function () { return activeHandler(node); }).observe(node.el);
                },
            },
        });
    }
    return exports.el("iframe.dhx-resize-observer", {
        _hooks: {
            didInsert: function (node) {
                node.el.contentWindow.onresize = function () { return activeHandler(node); };
                activeHandler(node);
            },
        },
    });
}
exports.resizer = resizer;
function resizeHandler(container, handler) {
    return exports.create({
        render: function () {
            return resizer(handler);
        },
    }).mount(container);
}
exports.resizeHandler = resizeHandler;
function awaitRedraw() {
    return new Promise(function (res) {
        requestAnimationFrame(function () {
            res();
        });
    });
}
exports.awaitRedraw = awaitRedraw;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
var counter = new Date().valueOf();
function uid() {
    return "u" + counter++;
}
exports.uid = uid;
function extend(target, source, deep) {
    if (deep === void 0) { deep = true; }
    if (source) {
        for (var key in source) {
            var sobj = source[key];
            var tobj = target[key];
            if (sobj === undefined) {
                delete target[key];
            }
            else if (deep &&
                typeof tobj === "object" &&
                !(tobj instanceof Date) &&
                !(tobj instanceof Array)) {
                extend(tobj, sobj);
            }
            else {
                target[key] = sobj;
            }
        }
    }
    return target;
}
exports.extend = extend;
function copy(source, withoutInner) {
    var result = {};
    for (var key in source) {
        if (!withoutInner || !key.startsWith("$")) {
            result[key] = source[key];
        }
    }
    return result;
}
exports.copy = copy;
function naturalSort(arr) {
    return arr.sort(function (a, b) {
        var nn = typeof a === "string" ? a.localeCompare(b) : a - b;
        return nn;
    });
}
exports.naturalSort = naturalSort;
function findIndex(arr, predicate) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function isEqualString(from, to) {
    if (from.length > to.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        if (from[i].toLowerCase() !== to[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}
exports.isEqualString = isEqualString;
function singleOuterClick(fn) {
    var click = function (e) {
        if (fn(e)) {
            document.removeEventListener("click", click);
        }
    };
    document.addEventListener("click", click);
}
exports.singleOuterClick = singleOuterClick;
function detectWidgetClick(widgetId, cb) {
    var click = function (e) { return cb(html_1.locate(e, "dhx_widget_id") === widgetId); };
    document.addEventListener("click", click);
    return function () { return document.removeEventListener("click", click); };
}
exports.detectWidgetClick = detectWidgetClick;
function unwrapBox(box) {
    if (Array.isArray(box)) {
        return box[0];
    }
    return box;
}
exports.unwrapBox = unwrapBox;
function wrapBox(unboxed) {
    if (Array.isArray(unboxed)) {
        return unboxed;
    }
    return [unboxed];
}
exports.wrapBox = wrapBox;
function isDefined(some) {
    return some !== null && some !== undefined;
}
exports.isDefined = isDefined;
function range(from, to) {
    if (from > to) {
        return [];
    }
    var result = [];
    while (from <= to) {
        result.push(from++);
    }
    return result;
}
exports.range = range;
function isNumeric(val) {
    return !isNaN(val - parseFloat(val));
}
exports.isNumeric = isNumeric;
function downloadFile(data, filename, mimeType) {
    if (mimeType === void 0) { mimeType = "text/plain"; }
    var file = new Blob([data], { type: mimeType });
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else {
        var a_1 = document.createElement("a");
        var url_1 = URL.createObjectURL(file);
        a_1.href = url_1;
        a_1.download = filename;
        document.body.appendChild(a_1);
        a_1.click();
        setTimeout(function () {
            document.body.removeChild(a_1);
            window.URL.revokeObjectURL(url_1);
        }, 0);
    }
}
exports.downloadFile = downloadFile;
function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(_this, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(this, args);
        }
    };
}
exports.debounce = debounce;
function compare(obj1, obj2) {
    for (var p in obj1) {
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
            return false;
        }
        switch (typeof obj1[p]) {
            case "object":
                if (!compare(obj1[p], obj2[p])) {
                    return false;
                }
                break;
            case "function":
                if (typeof obj2[p] === "undefined" ||
                    (p !== "compare" && obj1[p].toString() !== obj2[p].toString())) {
                    return false;
                }
                break;
            default:
                if (obj1[p] !== obj2[p]) {
                    return false;
                }
        }
    }
    for (var p in obj2) {
        if (typeof obj1[p] === "undefined") {
            return false;
        }
    }
    return true;
}
exports.compare = compare;
exports.isType = function (value) {
    var regex = /^\[object (\S+?)\]$/;
    var matches = Object.prototype.toString.call(value).match(regex) || [];
    return (matches[1] || "undefined").toLowerCase();
};
exports.isEmptyObj = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
exports.sign = function (x) {
    x = +x;
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function toNode(node) {
    return typeof node === "string"
        ? document.getElementById(node) || document.querySelector(node) || document.body
        : node || document.body;
}
exports.toNode = toNode;
function eventHandler(prepare, hash) {
    var keys = Object.keys(hash);
    return function (ev) {
        var data = prepare(ev);
        var node = ev.target;
        while (node) {
            var cssstring = node.getAttribute ? node.getAttribute("class") || "" : "";
            if (cssstring.length) {
                var css = cssstring.split(" ");
                for (var j = 0; j < keys.length; j++) {
                    if (css.includes(keys[j])) {
                        return hash[keys[j]](ev, data);
                    }
                }
            }
            node = node.parentNode;
        }
        return true;
    };
}
exports.eventHandler = eventHandler;
function locateNode(target, attr, dir) {
    if (attr === void 0) { attr = "dhx_id"; }
    if (dir === void 0) { dir = "target"; }
    if (target instanceof Event) {
        target = target[dir];
    }
    while (target) {
        if (target.getAttribute && target.getAttribute(attr)) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNode = locateNode;
function locate(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    var node = locateNode(target, attr);
    return node ? node.getAttribute(attr) : "";
}
exports.locate = locate;
function locateNodeByClassName(target, className) {
    if (target instanceof Event) {
        target = target.target;
    }
    while (target) {
        if (className) {
            if (target.classList && target.classList.contains(className)) {
                return target;
            }
        }
        else if (target.getAttribute && target.getAttribute("dhx_id")) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNodeByClassName = locateNodeByClassName;
function getBox(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var top = box.top + scrollTop;
    var left = box.left + scrollLeft;
    var right = body.offsetWidth - box.right;
    var bottom = body.offsetHeight - box.bottom;
    var width = box.right - box.left;
    var height = box.bottom - box.top;
    return { top: top, left: left, right: right, bottom: bottom, width: width, height: height };
}
exports.getBox = getBox;
var scrollWidth = -1;
function getScrollbarWidth() {
    if (scrollWidth > -1) {
        return scrollWidth;
    }
    var scrollDiv = document.createElement("div");
    document.body.appendChild(scrollDiv);
    scrollDiv.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;";
    scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.includes("MSIE ") || ua.includes("Trident/");
}
exports.isIE = isIE;
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset,
    };
}
exports.getRealPosition = getRealPosition;
function getWindowBorders() {
    return {
        rightBorder: window.pageXOffset + window.innerWidth,
        bottomBorder: window.pageYOffset + window.innerHeight,
    };
}
function horizontalCentering(pos, width, rightBorder) {
    var nodeWidth = pos.right - pos.left;
    var diff = (width - nodeWidth) / 2;
    var left = pos.left - diff;
    var right = pos.right + diff;
    if (left >= 0 && right <= rightBorder) {
        return left;
    }
    if (left < 0) {
        return 0;
    }
    return rightBorder - width;
}
function verticalCentering(pos, height, bottomBorder) {
    var nodeHeight = pos.bottom - pos.top;
    var diff = (height - nodeHeight) / 2;
    var top = pos.top - diff;
    var bottom = pos.bottom + diff;
    if (top >= 0 && bottom <= bottomBorder) {
        return top;
    }
    if (top < 0) {
        return 0;
    }
    return bottomBorder - height;
}
function placeBottomOrTop(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var bottomDiff = bottomBorder - pos.bottom - config.height;
    var topDiff = pos.top - config.height;
    if (config.mode === "bottom") {
        if (bottomDiff >= 0) {
            top = pos.bottom;
        }
        else if (topDiff >= 0) {
            top = topDiff;
        }
    }
    else {
        if (topDiff >= 0) {
            top = topDiff;
        }
        else if (bottomDiff >= 0) {
            top = pos.bottom;
        }
    }
    if (bottomDiff < 0 && topDiff < 0) {
        if (config.auto) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return placeRightOrLeft(pos, __assign(__assign({}, config), { mode: "right", auto: false }));
        }
        top = bottomDiff > topDiff ? pos.bottom : topDiff;
    }
    if (config.centering) {
        left = horizontalCentering(pos, config.width, rightBorder);
    }
    else {
        var leftDiff = rightBorder - pos.left - config.width;
        var rightDiff = pos.right - config.width;
        if (leftDiff >= 0) {
            left = pos.left;
        }
        else if (rightDiff >= 0) {
            left = rightDiff;
        }
        else {
            left = rightDiff > leftDiff ? pos.left : rightDiff;
        }
    }
    return { left: left, top: top };
}
function placeRightOrLeft(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var rightDiff = rightBorder - pos.right - config.width;
    var leftDiff = pos.left - config.width;
    if (config.mode === "right") {
        if (rightDiff >= 0) {
            left = pos.right;
        }
        else if (leftDiff >= 0) {
            left = leftDiff;
        }
    }
    else {
        if (leftDiff >= 0) {
            left = leftDiff;
        }
        else if (rightDiff >= 0) {
            left = pos.right;
        }
    }
    if (leftDiff < 0 && rightDiff < 0) {
        if (config.auto) {
            return placeBottomOrTop(pos, __assign(__assign({}, config), { mode: "bottom", auto: false }));
        }
        left = leftDiff > rightDiff ? leftDiff : pos.right;
    }
    if (config.centering) {
        top = verticalCentering(pos, config.height, rightBorder);
    }
    else {
        var bottomDiff = pos.bottom - config.height;
        var topDiff = bottomBorder - pos.top - config.height;
        if (topDiff >= 0) {
            top = pos.top;
        }
        else if (bottomDiff > 0) {
            top = bottomDiff;
        }
        else {
            top = bottomDiff > topDiff ? bottomDiff : pos.top;
        }
    }
    return { left: left, top: top };
}
function calculatePosition(pos, config) {
    var _a = config.mode === "bottom" || config.mode === "top"
        ? placeBottomOrTop(pos, config)
        : placeRightOrLeft(pos, config), left = _a.left, top = _a.top;
    return {
        left: Math.round(left) + "px",
        top: Math.round(top) + "px",
        minWidth: Math.round(config.width) + "px",
        position: "absolute",
    };
}
exports.calculatePosition = calculatePosition;
function fitPosition(node, config) {
    return calculatePosition(getRealPosition(node), config);
}
exports.fitPosition = fitPosition;
function getStrSize(str, textStyle) {
    textStyle = __assign({ fontSize: "14px", fontFamily: "Arial", lineHeight: "14px", fontWeight: "normal", fontStyle: "normal" }, textStyle);
    var span = document.createElement("span");
    var fontSize = textStyle.fontSize, fontFamily = textStyle.fontFamily, lineHeight = textStyle.lineHeight, fontWeight = textStyle.fontWeight, fontStyle = textStyle.fontStyle;
    span.style.fontSize = fontSize;
    span.style.fontFamily = fontFamily;
    span.style.lineHeight = lineHeight;
    span.style.fontWeight = fontWeight;
    span.style.fontStyle = fontStyle;
    span.style.display = "inline-flex";
    span.innerText = str;
    document.body.appendChild(span);
    var offsetWidth = span.offsetWidth, clientHeight = span.clientHeight;
    document.body.removeChild(span);
    return { width: offsetWidth, height: clientHeight };
}
exports.getStrSize = getStrSize;
function getPageCss() {
    var css = [];
    for (var sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
        var sheet = document.styleSheets[sheeti];
        var rules = "cssRules" in sheet ? sheet.cssRules : sheet.rules;
        for (var rulei = 0; rulei < rules.length; rulei++) {
            var rule = rules[rulei];
            if ("cssText" in rule) {
                css.push(rule.cssText);
            }
            else {
                css.push(rule.selectorText + " {\n" + rule.style.cssText + "\n}\n");
            }
        }
    }
    return css.join("\n");
}
exports.getPageCss = getPageCss;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(22));
__export(__webpack_require__(47));
__export(__webpack_require__(48));
__export(__webpack_require__(10));
__export(__webpack_require__(50));
__export(__webpack_require__(7));
__export(__webpack_require__(25));
__export(__webpack_require__(24));
__export(__webpack_require__(51));
__export(__webpack_require__(23));
__export(__webpack_require__(15));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TreeFilterType;
(function (TreeFilterType) {
    TreeFilterType["all"] = "all";
    TreeFilterType["level"] = "level";
    TreeFilterType["leafs"] = "leafs";
})(TreeFilterType = exports.TreeFilterType || (exports.TreeFilterType = {}));
var DataEvents;
(function (DataEvents) {
    DataEvents["afterAdd"] = "afteradd";
    DataEvents["beforeAdd"] = "beforeadd";
    DataEvents["removeAll"] = "removeall";
    DataEvents["beforeRemove"] = "beforeremove";
    DataEvents["afterRemove"] = "afterremove";
    DataEvents["change"] = "change";
    DataEvents["load"] = "load";
    DataEvents["loadError"] = "loaderror";
    DataEvents["beforeLazyLoad"] = "beforelazyload";
    DataEvents["afterLazyLoad"] = "afterlazyload";
})(DataEvents = exports.DataEvents || (exports.DataEvents = {}));
var DragEvents;
(function (DragEvents) {
    DragEvents["beforeDrag"] = "beforeDrag";
    DragEvents["dragStart"] = "dragStart";
    DragEvents["dragOut"] = "dragOut";
    DragEvents["dragIn"] = "dragIn";
    DragEvents["canDrop"] = "canDrop";
    DragEvents["cancelDrop"] = "cancelDrop";
    DragEvents["beforeDrop"] = "beforeDrop";
    DragEvents["afterDrop"] = "afterDrop";
    DragEvents["afterDrag"] = "afterDrag";
})(DragEvents = exports.DragEvents || (exports.DragEvents = {}));
var DataDriver;
(function (DataDriver) {
    DataDriver["json"] = "json";
    DataDriver["csv"] = "csv";
    DataDriver["xml"] = "xml";
})(DataDriver = exports.DataDriver || (exports.DataDriver = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventSystem = /** @class */ (function () {
    function EventSystem(context) {
        this.events = {};
        this.context = context || this;
    }
    EventSystem.prototype.on = function (name, callback, context) {
        var event = name.toLowerCase();
        this.events[event] = this.events[event] || [];
        this.events[event].push({ callback: callback, context: context || this.context });
    };
    EventSystem.prototype.detach = function (name, context) {
        var event = name.toLowerCase();
        var eStack = this.events[event];
        if (context && eStack && eStack.length) {
            for (var i = eStack.length - 1; i >= 0; i--) {
                if (eStack[i].context === context) {
                    eStack.splice(i, 1);
                }
            }
        }
        else {
            this.events[event] = [];
        }
    };
    EventSystem.prototype.fire = function (name, args) {
        if (typeof args === "undefined") {
            args = [];
        }
        var event = name.toLowerCase();
        if (this.events[event]) {
            var res = this.events[event].map(function (e) { return e.callback.apply(e.context, args); });
            return !res.includes(false);
        }
        return true;
    };
    EventSystem.prototype.clear = function () {
        this.events = {};
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
function EventsMixin(obj) {
    obj = obj || {};
    var eventSystem = new EventSystem(obj);
    obj.detachEvent = eventSystem.detach.bind(eventSystem);
    obj.attachEvent = eventSystem.on.bind(eventSystem);
    obj.callEvent = eventSystem.fire.bind(eventSystem);
}
exports.EventsMixin = EventsMixin;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      // Promises can be rejected with other promises, which should pass through
      if (state == 2) {
        return cn()
      }
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (true) {
    module['exports'] = Deferred
  } else {}
})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14), __webpack_require__(41).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(10);
var drivers_1 = __webpack_require__(23);
function isEqualObj(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualObj = isEqualObj;
function naturalCompare(a, b) {
    if (isNaN(a) || isNaN(b)) {
        var ax_1 = [];
        var bx_1 = [];
        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            ax_1.push([$1 || Infinity, $2 || ""]);
        });
        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            bx_1.push([$1 || Infinity, $2 || ""]);
        });
        while (ax_1.length && bx_1.length) {
            var an = ax_1.shift();
            var bn = bx_1.shift();
            var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
            if (nn) {
                return nn;
            }
        }
        return ax_1.length - bx_1.length;
    }
    return a - b;
}
exports.naturalCompare = naturalCompare;
function findByConf(item, conf) {
    if (typeof conf === "function") {
        if (conf.call(this, item)) {
            return item;
        }
    }
    else if (conf.by && conf.match) {
        if (item[conf.by] === conf.match) {
            return item;
        }
    }
}
exports.findByConf = findByConf;
function isDebug() {
    var dhx = window.dhx;
    if (typeof dhx !== "undefined") {
        return typeof dhx.debug !== "undefined" && dhx.debug;
    }
    // return typeof DHX_DEBUG_MODE !== "undefined" && DHX_DEBUG_MODE;
}
exports.isDebug = isDebug;
function dhxWarning(msg) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
}
exports.dhxWarning = dhxWarning;
function dhxError(msg) {
    throw new Error(msg);
}
exports.dhxError = dhxError;
function toProxy(proxy) {
    var type = typeof proxy;
    if (type === "string") {
        return new dataproxy_1.DataProxy(proxy);
    }
    else if (type === "object") {
        return proxy;
    }
}
exports.toProxy = toProxy;
function toDataDriver(driver) {
    if (typeof driver === "string") {
        var dhx = window.dhx;
        var drivers = (dhx && dhx.dataDrivers) || drivers_1.dataDrivers;
        if (drivers[driver]) {
            return new drivers[driver]();
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("Incorrect data driver type:", driver);
            // tslint:disable-next-line:no-console
            console.warn("Available types:", JSON.stringify(Object.keys(drivers)));
        }
    }
    else if (typeof driver === "object") {
        return driver;
    }
}
exports.toDataDriver = toDataDriver;
function copyWithoutInner(obj, forbidden) {
    var result = {};
    for (var key in obj) {
        if (!key.startsWith("$") && (!forbidden || !forbidden[key])) {
            result[key] = obj[key];
        }
    }
    return result;
}
exports.copyWithoutInner = copyWithoutInner;
function isTreeCollection(obj) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return Boolean(obj.getRoot);
}
exports.isTreeCollection = isTreeCollection;
function hasJsonOrArrayStructure(str) {
    if (typeof str === "object") {
        return true;
    }
    if (typeof str !== "string") {
        return false;
    }
    try {
        var result = JSON.parse(str);
        return Object.prototype.toString.call(result) === "[object Object]" || Array.isArray(result);
    }
    catch (err) {
        return false;
    }
}
exports.hasJsonOrArrayStructure = hasJsonOrArrayStructure;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var html_1 = __webpack_require__(2);
var View = /** @class */ (function () {
    function View(_container, config) {
        this._uid = core_1.uid();
        this.config = config || {};
    }
    View.prototype.mount = function (container, vnode) {
        if (vnode) {
            this._view = vnode;
        }
        if (container && this._view && this._view.mount) {
            // init view inside of HTML container
            this._container = html_1.toNode(container);
            if (this._container.tagName) {
                this._view.mount(this._container);
            }
            else if (this._container.attach) {
                this._container.attach(this);
            }
        }
    };
    View.prototype.unmount = function () {
        var rootView = this.getRootView();
        if (rootView && rootView.node) {
            rootView.unmount();
            this._view = null;
        }
    };
    View.prototype.getRootView = function () {
        return this._view;
    };
    View.prototype.getRootNode = function () {
        return this._view && this._view.node && this._view.node.el;
    };
    View.prototype.paint = function () {
        if (this._view && // was mounted
            (this._view.node || // already rendered node
                this._container)) {
            // not rendered, but has container
            this._doNotRepaint = false;
            this._view.redraw();
        }
    };
    return View;
}());
exports.View = View;
function toViewLike(view) {
    return {
        getRootView: function () { return view; },
        paint: function () { return view.node && view.redraw(); },
        mount: function (container) { return view.mount(container); },
    };
}
exports.toViewLike = toViewLike;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    dragAndDrop: "Drag & drop",
    or: "or",
    grid: "Grid",
    list: "List",
    browse: "Browse files",
    filesOrFoldersHere: "files or folders here",
    cancel: "Cancel",
    clearAll: "Clear all",
    clearAllSelected: "Clear selected",
    clear: "Clear",
    add: "Add",
    upload: "Upload",
    download: "Download",
    error: "error",
    byte: "B",
    kilobyte: "KB",
    megabyte: "MB",
    gigabyte: "GB",
};
exports.default = locale;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ajax_1 = __webpack_require__(15);
var DataProxy = /** @class */ (function () {
    function DataProxy(url, config) {
        this.url = this._url = url;
        this.config = config;
    }
    DataProxy.prototype.updateUrl = function (url, params) {
        if (params === void 0) { params = {}; }
        this._url = this.url = url || this._url;
        this.url += "?";
        for (var param in params) {
            this.config[param] = params[param];
            this.url += param + "=" + encodeURIComponent(params[param]) + "&";
        }
        this.url = this.url.slice(0, -1);
    };
    DataProxy.prototype.load = function () {
        return ajax_1.ajax.get(this.url, null, { responseType: "text" });
    };
    DataProxy.prototype.save = function (data, mode) {
        switch (mode) {
            case "delete":
                return ajax_1.ajax.delete(this.url, data);
            case "update":
            case "insert":
            default:
                return ajax_1.ajax.post(this.url, data);
        }
    };
    return DataProxy;
}());
exports.DataProxy = DataProxy;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function getCount(item, widgetClass, isLimited) {
    var countColor = {
        danger: " dhx_navbar-count--color_danger",
        secondary: " dhx_navbar-count--color_secondary",
        primary: " dhx_navbar-count--color_primary",
        success: " dhx_navbar-count--color_success",
    }[item.countColor] || " dhx_navbar-count--color_danger";
    return dom_1.el(".dhx_navbar-count", {
        class: widgetClass +
            countColor +
            (!isLimited && parseInt(item.count, 10) > 99 ? " dhx_navbar-count--overlimit" : ""),
    }, isLimited && parseInt(item.count, 10) > 99 ? "99+" : item.count);
}
exports.getCount = getCount;
function getIcon(iconName, type) {
    if (iconName === void 0) { iconName = ""; }
    if (iconName.startsWith("dxi")) {
        iconName = "dxi " + iconName;
    }
    return dom_1.el("span", {
        class: "dhx_" + type + "__icon " + iconName,
    });
}
exports.getIcon = getIcon;
var getNavbarItemClass = function (widgetName, item, asMenuItem) {
    var baseClassName = "";
    var resultClassName = "";
    if (asMenuItem) {
        baseClassName = "dhx_menu-item";
    }
    else {
        baseClassName = "dhx_" + widgetName + "__item";
    }
    resultClassName = baseClassName + (item.css ? " " + item.css : "");
    if (item.type === "spacer" || item.type === "separator") {
        resultClassName += " " + baseClassName + "--" + item.type;
    }
    if (item.type === "button" && widgetName === "sidebar" && !item.icon) {
        resultClassName += " dhx_navbar-item--colapse_hidden";
    }
    return resultClassName;
};
function navbarComponentMixin(widgetName, item, asMenuItem, body) {
    var itemClass = getNavbarItemClass(widgetName, item, asMenuItem);
    var hasRibbonSize = widgetName === "ribbon" && (item.type === "navItem" || item.type === "imageButton");
    return dom_1.el("li", {
        _key: item.id,
        class: itemClass +
            (item.icon && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.src && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.size && hasRibbonSize ? " dhx_ribbon__item--" + item.size : ""),
        ".innerHTML": item.type === "customHTML" ? item.html : undefined,
        dhx_id: item.type === "customHTML" ? item.id : undefined,
    }, item.type !== "customHTML" ? [body] : undefined);
}
exports.navbarComponentMixin = navbarComponentMixin;
function getNavbarButtonCSS(_a, widgetName) {
    var color = _a.color, size = _a.size, view = _a.view, full = _a.full, icon = _a.icon, circle = _a.circle, loading = _a.loading, value = _a.value, active = _a.active;
    var colorsCss = {
        danger: " dhx_button--color_danger",
        secondary: " dhx_button--color_secondary",
        primary: " dhx_button--color_primary",
        success: " dhx_button--color_success",
    }[color] || " dhx_button--color_primary";
    var sizeCss = {
        small: " dhx_button--size_small",
        medium: " dhx_button--size_medium",
    }[size] || " dhx_button--size_medium";
    var viewCss = {
        flat: " dhx_button--view_flat",
        link: " dhx_button--view_link",
    }[view] || " dhx_button--view_flat";
    var fullCss = full ? " dhx_button--width_full" : "";
    var circleCss = circle ? " dhx_button--circle" : "";
    var loadingCss = loading ? " dhx_button--loading" : "";
    var iconViewCss = icon && !value ? " dhx_button--icon" : "";
    var activeCss = active ? " dhx_button--active" : "";
    return colorsCss + sizeCss + viewCss + fullCss + circleCss + loadingCss + activeCss + iconViewCss;
}
exports.getNavbarButtonCSS = getNavbarButtonCSS;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UploaderEvents;
(function (UploaderEvents) {
    UploaderEvents["uploadBegin"] = "uploadbegin";
    UploaderEvents["beforeUploadFile"] = "beforeuploadfile";
    UploaderEvents["uploadFile"] = "uploadfile";
    UploaderEvents["uploadFail"] = "uploadfail";
    UploaderEvents["uploadComplete"] = "uploadcomplete";
    UploaderEvents["uploadProgress"] = "uploadprogress";
})(UploaderEvents = exports.UploaderEvents || (exports.UploaderEvents = {}));
var ProgressBarEvents;
(function (ProgressBarEvents) {
    ProgressBarEvents["cancel"] = "cancel";
})(ProgressBarEvents = exports.ProgressBarEvents || (exports.ProgressBarEvents = {}));
var FileStatus;
(function (FileStatus) {
    FileStatus["queue"] = "queue";
    FileStatus["uploaded"] = "uploaded";
    FileStatus["failed"] = "failed";
    FileStatus["inprogress"] = "inprogress";
})(FileStatus = exports.FileStatus || (exports.FileStatus = {}));
var VaultMode;
(function (VaultMode) {
    VaultMode["grid"] = "grid";
    VaultMode["list"] = "list";
})(VaultMode = exports.VaultMode || (exports.VaultMode = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LayoutEvents;
(function (LayoutEvents) {
    LayoutEvents["beforeShow"] = "beforeShow";
    LayoutEvents["afterShow"] = "afterShow";
    LayoutEvents["beforeHide"] = "beforeHide";
    LayoutEvents["afterHide"] = "afterHide";
    LayoutEvents["beforeResizeStart"] = "beforeResizeStart";
    LayoutEvents["resize"] = "resize";
    LayoutEvents["afterResizeEnd"] = "afterResizeEnd";
    LayoutEvents["beforeAdd"] = "beforeAdd";
    LayoutEvents["afterAdd"] = "afterAdd";
    LayoutEvents["beforeRemove"] = "beforeRemove";
    LayoutEvents["afterRemove"] = "afterRemove";
    LayoutEvents["beforeCollapse"] = "beforeCollapse";
    LayoutEvents["afterCollapse"] = "afterCollapse";
    LayoutEvents["beforeExpand"] = "beforeExpand";
    LayoutEvents["afterExpand"] = "afterExpand";
})(LayoutEvents = exports.LayoutEvents || (exports.LayoutEvents = {}));
var resizeMode;
(function (resizeMode) {
    resizeMode[resizeMode["unknown"] = 0] = "unknown";
    resizeMode[resizeMode["percents"] = 1] = "percents";
    resizeMode[resizeMode["pixels"] = 2] = "pixels";
    resizeMode[resizeMode["mixedpx1"] = 3] = "mixedpx1";
    resizeMode[resizeMode["mixedpx2"] = 4] = "mixedpx2";
    resizeMode[resizeMode["mixedperc1"] = 5] = "mixedperc1";
    resizeMode[resizeMode["mixedperc2"] = 6] = "mixedperc2";
})(resizeMode = exports.resizeMode || (exports.resizeMode = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(7);
function toQueryString(data) {
    return Object.keys(data)
        .reduce(function (entries, key) {
        var value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
        entries.push(key + "=" + encodeURIComponent(value));
        return entries;
    }, [])
        .join("&");
}
function inferResponseType(contentType) {
    if (!contentType) {
        return "text";
    }
    if (contentType.includes("json")) {
        return "json";
    }
    if (contentType.includes("xml")) {
        return "xml";
    }
    return "text";
}
function send(url, data, method, headers, responseType) {
    function parseResponse(responseText, genResponseType) {
        switch (genResponseType) {
            case "json": {
                return JSON.parse(responseText);
            }
            case "text": {
                return responseText;
            }
            case "xml": {
                var driver = helpers_1.toDataDriver(types_1.DataDriver.xml);
                if (driver) {
                    return driver.toJsonObject(responseText);
                }
                else {
                    return { parseError: "Incorrect data driver type: 'xml'" };
                }
            }
            default: {
                return responseText;
            }
        }
    }
    var allHeaders = headers || {};
    if (responseType) {
        allHeaders.Accept = "application/" + responseType;
    }
    if (method !== "GET") {
        allHeaders["Content-Type"] = allHeaders["Content-Type"] || "application/json";
    }
    if (method === "GET") {
        var urlData = data && typeof data === "object"
            ? toQueryString(data)
            : data && typeof data === "string"
                ? data
                : "";
        if (urlData) {
            url += !url.includes("?") ? "?" : "&";
            url += urlData;
        }
        data = null;
    }
    if (!window.fetch) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (responseType === "raw") {
                        resolve({
                            url: xhr.responseURL,
                            headers: xhr
                                .getAllResponseHeaders()
                                .trim()
                                .split(/[\r\n]+/)
                                .reduce(function (acc, cur) {
                                var kv = cur.split(": ");
                                acc[kv[0]] = kv[1];
                                return acc;
                            }, {}),
                            body: xhr.response,
                        });
                    }
                    if (xhr.status === 204) {
                        resolve();
                    }
                    else {
                        resolve(parseResponse(xhr.responseText, responseType || inferResponseType(xhr.getResponseHeader("Content-Type"))));
                    }
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    message: xhr.responseText,
                });
            };
            xhr.open(method, url);
            for (var headerKey in allHeaders) {
                xhr.setRequestHeader(headerKey, allHeaders[headerKey]);
            }
            switch (method) {
                case "POST":
                case "DELETE":
                case "PUT":
                    xhr.send(data !== undefined ? JSON.stringify(data) : "");
                    break;
                case "GET":
                    xhr.send();
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    }
    else {
        return window
            .fetch(url, {
            method: method,
            body: data ? JSON.stringify(data) : null,
            headers: allHeaders,
        })
            .then(function (response) {
            if (response.ok) {
                var genResponseType = responseType || inferResponseType(response.headers.get("Content-Type"));
                if (genResponseType === "raw") {
                    return {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        headers: Object.fromEntries(response.headers.entries()),
                        url: response.url,
                        body: response.body,
                    };
                }
                if (response.status !== 204) {
                    switch (genResponseType) {
                        case "json": {
                            return response.json();
                        }
                        case "xml": {
                            var driver_1 = helpers_1.toDataDriver(types_1.DataDriver.xml);
                            if (driver_1) {
                                return response.text().then(function (xmlData) { return driver_1.toJsonObject(xmlData); });
                            }
                            else {
                                return response.text();
                            }
                        }
                        default:
                            return response.text();
                    }
                }
            }
            else {
                return response.text().then(function (message) {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                        message: message,
                    });
                });
            }
        });
    }
}
exports.ajax = {
    get: function (url, data, config) {
        return send(url, data, "GET", config && config.headers, config !== undefined ? config.responseType : undefined);
    },
    post: function (url, data, config) {
        return send(url, data, "POST", config && config.headers, config !== undefined ? config.responseType : undefined);
    },
    put: function (url, data, config) {
        return send(url, data, "PUT", config && config.headers, config !== undefined ? config.responseType : undefined);
    },
    delete: function (url, data, config) {
        return send(url, data, "DELETE", config && config.headers, config !== undefined ? config.responseType : undefined);
    },
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(52));
__export(__webpack_require__(53));
__export(__webpack_require__(54));
__export(__webpack_require__(55));
__export(__webpack_require__(17));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RealPosition;
(function (RealPosition) {
    RealPosition["left"] = "left";
    RealPosition["right"] = "right";
    RealPosition["top"] = "top";
    RealPosition["bottom"] = "bottom";
    RealPosition["center"] = "center";
})(RealPosition = exports.RealPosition || (exports.RealPosition = {}));
var Position;
(function (Position) {
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["center"] = "center";
})(Position = exports.Position || (exports.Position = {}));
var MessageContainerPosition;
(function (MessageContainerPosition) {
    MessageContainerPosition["topLeft"] = "top-left";
    MessageContainerPosition["topRight"] = "top-right";
    MessageContainerPosition["bottomLeft"] = "bottom-left";
    MessageContainerPosition["bottomRight"] = "bottom-right";
})(MessageContainerPosition = exports.MessageContainerPosition || (exports.MessageContainerPosition = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var key;
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90)) {
                // A-Z 0-9
                key = String.fromCharCode(e.which);
            }
            else {
                // dirty: added space binding
                if (e.which === 32 && !html_1.isIE()) {
                    key = e.code;
                }
                else {
                    key = e.key;
                }
            }
            var code = comp + (key && key.toLowerCase());
            var actions = _this._keysStorage[code];
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    actions[i].handler(e);
                }
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        if (!this._keysStorage[code]) {
            this._keysStorage[code] = [];
        }
        this._keysStorage[code].push({
            handler: handler,
            scope: scope,
        });
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                var toDelete = []; // items index to delete
                for (var i = 0; i < keyStorage[code].length; i++) {
                    if (keyStorage[code][i].scope === scope) {
                        toDelete.push(i);
                    }
                }
                if (keyStorage[code].length === toDelete.length) {
                    delete keyStorage[code];
                }
                else {
                    for (var i = toDelete.length - 1; i >= 0; i--) {
                        // begin from last coz splice change other index
                        keyStorage[code].splice(toDelete[i], 1);
                    }
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();
function addHotkeys(handlers, beforeCall) {
    var context = new Date();
    var wrapHandler = function (handler) { return function (e) {
        if (beforeCall && beforeCall() === false) {
            return;
        }
        handler(e);
    }; };
    for (var key in handlers) {
        exports.keyManager.addHotKey(key, wrapHandler(handlers[key]), context);
    }
    return function () { return exports.keyManager.removeHotKey(undefined, context); };
}
exports.addHotkeys = addHotkeys;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_data_1 = __webpack_require__(3);
exports.DataEvents = ts_data_1.DataEvents;
var NavigationBarEvents;
(function (NavigationBarEvents) {
    NavigationBarEvents["inputCreated"] = "inputCreated";
    NavigationBarEvents["click"] = "click";
    NavigationBarEvents["openMenu"] = "openmenu";
    NavigationBarEvents["beforeHide"] = "beforeHide";
    NavigationBarEvents["afterHide"] = "afterHide";
    NavigationBarEvents["inputFocus"] = "inputfocus";
    NavigationBarEvents["inputBlur"] = "inputblur";
})(NavigationBarEvents = exports.NavigationBarEvents || (exports.NavigationBarEvents = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListEvents;
(function (ListEvents) {
    ListEvents["click"] = "click";
    ListEvents["doubleClick"] = "doubleclick";
    ListEvents["focusChange"] = "focuschange";
    ListEvents["beforeEditStart"] = "beforeEditStart";
    ListEvents["afterEditStart"] = "afterEditStart";
    ListEvents["beforeEditEnd"] = "beforeEditEnd";
    ListEvents["afterEditEnd"] = "afterEditEnd";
    ListEvents["itemRightClick"] = "itemRightClick";
    ListEvents["itemMouseOver"] = "itemMouseOver";
    // TODO: remove suite_7.0
    ListEvents["contextmenu"] = "contextmenu";
})(ListEvents = exports.ListEvents || (exports.ListEvents = {}));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataViewEvents;
(function (DataViewEvents) {
    DataViewEvents["click"] = "click";
    DataViewEvents["doubleClick"] = "doubleclick";
    DataViewEvents["focusChange"] = "focuschange";
    DataViewEvents["beforeEditStart"] = "beforeEditStart";
    DataViewEvents["afterEditStart"] = "afterEditStart";
    DataViewEvents["beforeEditEnd"] = "beforeEditEnd";
    DataViewEvents["afterEditEnd"] = "afterEditEnd";
    DataViewEvents["itemRightClick"] = "itemRightClick";
    DataViewEvents["itemMouseOver"] = "itemMouseOver";
    // TODO: remove suite_7.0
    DataViewEvents["contextmenu"] = "contextmenu";
})(DataViewEvents = exports.DataViewEvents || (exports.DataViewEvents = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(5);
var loader_1 = __webpack_require__(40);
var sort_1 = __webpack_require__(46);
var dataproxy_1 = __webpack_require__(10);
var helpers_1 = __webpack_require__(7);
var types_1 = __webpack_require__(4);
var core_1 = __webpack_require__(1);
var DataCollection = /** @class */ (function () {
    function DataCollection(config, events) {
        this.config = config || {};
        this._order = [];
        this._pull = {};
        this._changes = { order: [] };
        this._initOrder = null;
        this._sort = new sort_1.Sort();
        this._loader = new loader_1.Loader(this, this._changes);
        this.events = events || new events_1.EventSystem(this);
        this.events.on(types_1.DataEvents.loadError, function (response) {
            if (typeof response !== "string") {
                helpers_1.dhxError(response);
            }
            else {
                helpers_1.dhxWarning(response);
            }
        });
    }
    DataCollection.prototype.add = function (obj, index) {
        var _this = this;
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        if (Array.isArray(obj)) {
            return obj.map(function (element, key) {
                if (key !== 0) {
                    index = index + 1;
                }
                return _this._add(element, index);
            });
        }
        else {
            return this._add(obj, index);
        }
    };
    DataCollection.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            if (id instanceof Array) {
                id.map(function (elementId) {
                    _this._remove(elementId);
                });
            }
            else {
                this._remove(id);
            }
        }
    };
    DataCollection.prototype.removeAll = function () {
        this._removeAll();
        this.events.fire(types_1.DataEvents.removeAll);
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.exists = function (id) {
        return !!this._pull[id];
    };
    DataCollection.prototype.getNearId = function (id) {
        var item = this._pull[id];
        if (!item) {
            return this._order[0].id || "";
        }
    };
    DataCollection.prototype.getItem = function (id) {
        return this._pull[id];
    };
    DataCollection.prototype.update = function (id, obj, silent) {
        var item = this.getItem(id);
        if (item) {
            if (helpers_1.isEqualObj(obj, item)) {
                return;
            }
            if (obj.id && id !== obj.id) {
                helpers_1.dhxWarning("this method doesn't allow change id");
                if (helpers_1.isDebug()) {
                    // eslint-disable-next-line no-debugger
                    debugger;
                }
            }
            else {
                if (obj.parent && item.parent && obj.parent !== item.parent) {
                    this.move(id, -1, this, obj.parent);
                }
                core_1.extend(this._pull[id], obj, false);
                if (this.config.update) {
                    this.config.update(this._pull[id]);
                }
                if (!silent) {
                    this._onChange("update", id, this._pull[id]);
                }
            }
        }
        else {
            helpers_1.dhxWarning("item not found");
        }
    };
    DataCollection.prototype.getIndex = function (id) {
        if (!id) {
            return -1;
        }
        var res = core_1.findIndex(this._order, function (item) { return item.id.toString() === id.toString(); });
        if (this._pull[id] && res >= 0) {
            return res;
        }
    };
    DataCollection.prototype.getId = function (index) {
        if (!this._order[index]) {
            return;
        }
        return this._order[index].id;
    };
    DataCollection.prototype.getLength = function () {
        return this._order.length;
    };
    DataCollection.prototype.isDataLoaded = function (from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = this._order.length; }
        if (core_1.isNumeric(from) && core_1.isNumeric(to)) {
            return this._order.slice(from, to).filter(function (item) { return item.$empty; }).length === 0;
        }
        return !this.find(function (item) { return item.$empty; });
    };
    DataCollection.prototype.filter = function (rule, config) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        config = core_1.extend({
            add: false,
            multiple: true,
        }, config);
        if (!config.add) {
            this._order = this._initOrder || this._order;
            this._initOrder = null;
        }
        this._filters = this._filters || {};
        if (!config.multiple || !rule) {
            this._filters = {};
        }
        if (rule) {
            if (typeof rule === "function") {
                var f = "_";
                this._filters[f] = {
                    match: f,
                    compare: rule,
                };
            }
            else {
                if (!rule.match) {
                    delete this._filters[rule.by];
                }
                else {
                    rule.compare = rule.compare || (function (val, match) { return val === match; });
                    this._filters[rule.by] = rule;
                }
            }
            this._applyFilters();
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.find = function (conf) {
        for (var key in this._pull) {
            var res = helpers_1.findByConf(this._pull[key], conf);
            if (res) {
                return res;
            }
        }
        return null;
    };
    DataCollection.prototype.findAll = function (conf) {
        var res = [];
        for (var key in this._pull) {
            var item = helpers_1.findByConf(this._pull[key], conf);
            if (item) {
                res.push(item);
            }
        }
        return res;
    };
    DataCollection.prototype.sort = function (by) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        if (!by) {
            this._order = [];
            for (var key in this._pull) {
                this._order.push(this._pull[key]);
            }
            this._applyFilters();
        }
        else {
            this._sort.sort(this._order, by);
            if (this._initOrder && this._initOrder.length) {
                this._sort.sort(this._initOrder, by);
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.copy = function (id, index, target, targetId) {
        var _this = this;
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                return _this._copy(elementId, index, target, targetId, key);
            });
        }
        else {
            return this._copy(id, index, target, targetId);
        }
    };
    DataCollection.prototype.move = function (id, index, target, targetId) {
        var _this = this;
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                return _this._move(elementId, index, target, targetId, key);
            });
        }
        else {
            return this._move(id, index, target, targetId);
        }
    };
    DataCollection.prototype.forEach = function (cb) {
        for (var i = 0; i < this._order.length; i++) {
            cb.call(this, this._order[i], i, this._order);
        }
    };
    DataCollection.prototype.load = function (url, driver) {
        if (typeof url === "string") {
            this.dataProxy = url = new dataproxy_1.DataProxy(url);
        }
        this.dataProxy = url;
        return this._loader.load(url, driver);
    };
    DataCollection.prototype.parse = function (data, driver) {
        this._removeAll();
        return this._loader.parse(data, driver);
    };
    DataCollection.prototype.$parse = function (data) {
        var apx = this.config.approximate;
        if (apx) {
            data = this._approximate(data, apx.value, apx.maxNum);
        }
        this._parse_data(data);
        this.events.fire(types_1.DataEvents.change, ["load"]);
        this.events.fire(types_1.DataEvents.load);
    };
    DataCollection.prototype.save = function (url) {
        this._loader.save(url);
    };
    DataCollection.prototype.changeId = function (id, newId, silent) {
        if (newId === void 0) { newId = core_1.uid(); }
        if (!silent && !this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        var item = this.getItem(id);
        if (!item) {
            helpers_1.dhxWarning("item not found");
        }
        else {
            item.id = newId;
            core_1.extend(this._pull[id], item);
            this._pull[newId] = this._pull[id];
            if (!silent) {
                this._onChange("update", newId, this._pull[newId]);
            }
            delete this._pull[id];
        }
    };
    // todo: loop through the array and check saved statuses
    DataCollection.prototype.isSaved = function () {
        return !this._changes.order.length; // todo: bad solution, errors and holded elments are missed...
    };
    DataCollection.prototype.map = function (cb) {
        var result = [];
        for (var i = 0; i < this._order.length; i++) {
            result.push(cb.call(this, this._order[i], i, this._order));
        }
        return result;
    };
    DataCollection.prototype.mapRange = function (from, to, cb) {
        if (from < 0) {
            from = 0;
        }
        if (to > this._order.length - 1) {
            to = this._order.length - 1;
        }
        var arr = this._order.slice(from, to);
        var result = [];
        for (var i = from; i <= to; i++) {
            result.push(cb.call(this, this._order[i], i, arr));
        }
        return result;
    };
    DataCollection.prototype.reduce = function (cb, acc) {
        for (var i = 0; i < this._order.length; i++) {
            acc = cb.call(this, acc, this._order[i], i);
        }
        return acc;
    };
    DataCollection.prototype.serialize = function (driver) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        // remove $ attrs
        var data = this.map(function (item) {
            var newItem = __assign({}, item);
            Object.keys(newItem).forEach(function (key) {
                if (key.startsWith("$")) {
                    delete newItem[key];
                }
            });
            return newItem;
        });
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    DataCollection.prototype.getInitialData = function () {
        return this._initOrder;
    };
    DataCollection.prototype._add = function (obj, index) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        var id = this._addCore(obj, index);
        this._onChange("add", obj.id, obj);
        this.events.fire(types_1.DataEvents.afterAdd, [obj]);
        return id;
    };
    DataCollection.prototype._remove = function (id) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        var obj = this._pull[id];
        if (obj) {
            if (!this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                return;
            }
            this._removeCore(obj.id);
            this._onChange("remove", id, obj);
        }
        this.events.fire(types_1.DataEvents.afterRemove, [obj]);
    };
    DataCollection.prototype._copy = function (id, index, target, targetId, key) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        if (!this.exists(id)) {
            return null;
        }
        var newid = core_1.uid();
        if (key) {
            index = index === -1 ? -1 : index + key;
        }
        if (target) {
            if (!(target instanceof DataCollection) && targetId) {
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                return;
            }
            if (target.exists(id)) {
                target.add(__assign(__assign({}, helpers_1.copyWithoutInner(this.getItem(id))), { id: newid }), index);
                return newid;
            }
            else {
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                return id;
            }
        }
        this.add(__assign(__assign({}, helpers_1.copyWithoutInner(this.getItem(id))), { id: newid }), index);
        return newid;
    };
    DataCollection.prototype._move = function (id, index, target, targetId, key) {
        if (!this.isDataLoaded()) {
            helpers_1.dhxWarning("the method doesn't work with lazyLoad");
            return;
        }
        if (key) {
            index = index === -1 ? -1 : index + key;
        }
        if (target && target !== this && this.exists(id)) {
            var item = core_1.copy(this.getItem(id), true);
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            if (targetId) {
                item.parent = targetId;
            }
            target.add(item, index);
            // remove data from original collection
            this.remove(id);
            return item.id;
        }
        if (this.getIndex(id) === index) {
            return null;
        }
        // move other elements
        var spliced = this._order.splice(this.getIndex(id), 1)[0];
        if (index === -1) {
            index = this._order.length;
        }
        this._order.splice(index, 0, spliced);
        this.events.fire(types_1.DataEvents.change, [id, "update", this.getItem(id)]);
        return id;
    };
    DataCollection.prototype._removeAll = function () {
        this._pull = {};
        this._order = [];
        this._changes.order = [];
        this._initOrder = null;
    };
    DataCollection.prototype._addCore = function (obj, index) {
        if (this.config.init) {
            obj = this.config.init(obj);
        }
        obj.id = obj.id ? obj.id.toString() : core_1.uid();
        if (this._pull[obj.id]) {
            helpers_1.dhxError("Item already exist");
        }
        // todo: not ideal solution
        if (this._initOrder && this._initOrder.length) {
            this._addToOrder(this._initOrder, obj, index);
        }
        this._addToOrder(this._order, obj, index);
        return obj.id;
    };
    DataCollection.prototype._removeCore = function (id) {
        if (this.getIndex(id) >= 0) {
            this._order = this._order.filter(function (el) { return el.id !== id; });
            delete this._pull[id];
        }
        if (this._initOrder && this._initOrder.length) {
            this._initOrder = this._initOrder.filter(function (el) { return el.id !== id; });
        }
    };
    DataCollection.prototype._parse_data = function (data) {
        var index = this._order.length;
        if (this.config.prep) {
            data = this.config.prep(data);
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = obj.id || obj.id === 0 ? obj.id : core_1.uid();
            this._pull[obj.id] = obj;
            this._order[index++] = obj;
        }
    };
    DataCollection.prototype._approximate = function (data, values, maxNum) {
        var len = data.length;
        var vlen = values.length;
        var rlen = Math.floor(len / maxNum);
        var newData = Array(Math.ceil(len / rlen));
        var index = 0;
        for (var i = 0; i < len; i += rlen) {
            var newItem = core_1.copy(data[i]);
            var end = Math.min(len, i + rlen);
            for (var j = 0; j < vlen; j++) {
                var sum = 0;
                for (var z = i; z < end; z++) {
                    sum += data[z][values[j]];
                }
                newItem[values[j]] = sum / (end - i);
            }
            newData[index++] = newItem;
        }
        return newData;
    };
    DataCollection.prototype._onChange = function (status, id, obj) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var item = _a[_i];
            // update pending item if previous state is "saving" or if item not saved yet
            if (item.id === id && !item.saving) {
                // update item
                if (item.error) {
                    item.error = false;
                }
                item = __assign(__assign({}, item), { obj: obj, status: status });
                this.events.fire(types_1.DataEvents.change, [id, status, obj]);
                return;
            }
        }
        this._changes.order.push({ id: id, status: status, obj: __assign({}, obj), saving: false });
        this.events.fire(types_1.DataEvents.change, [id, status, obj]);
    };
    DataCollection.prototype._addToOrder = function (array, obj, index) {
        if (index >= 0 && array[index]) {
            this._pull[obj.id] = obj;
            array.splice(index, 0, obj);
        }
        else {
            this._pull[obj.id] = obj;
            array.push(obj);
        }
    };
    DataCollection.prototype._applyFilters = function () {
        var _this = this;
        if (this._filters && Object.keys(this._filters).length) {
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key]
                        ? _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
            }
            this._order = fOrder;
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver_1 = __webpack_require__(24);
var CsvDriver_1 = __webpack_require__(25);
var XMLDriver_1 = __webpack_require__(44);
exports.dataDrivers = {
    json: JsonDriver_1.JsonDriver,
    csv: CsvDriver_1.CsvDriver,
};
exports.dataDriversPro = __assign(__assign({}, exports.dataDrivers), { xml: XMLDriver_1.XMLDriver });


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver = /** @class */ (function () {
    function JsonDriver() {
    }
    JsonDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    JsonDriver.prototype.serialize = function (data) {
        return data;
    };
    JsonDriver.prototype.getFields = function (row) {
        return row;
    };
    JsonDriver.prototype.getRows = function (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
    };
    return JsonDriver;
}());
exports.JsonDriver = JsonDriver;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDriver = /** @class */ (function () {
    function CsvDriver(config) {
        var initConfig = {
            skipHeader: 0,
            nameByHeader: false,
            rowDelimiter: "\n",
            columnDelimiter: ",",
        };
        this.config = __assign(__assign({}, initConfig), config);
        if (this.config.nameByHeader) {
            this.config.skipHeader = 1;
        }
    }
    CsvDriver.prototype.getFields = function (row, headers) {
        var parts = row.trim().split(this.config.columnDelimiter);
        var obj = {};
        for (var i = 0; i < parts.length; i++) {
            obj[headers ? headers[i] : i + 1] = isNaN(Number(parts[i])) ? parts[i] : parseFloat(parts[i]);
        }
        return obj;
    };
    CsvDriver.prototype.getRows = function (data) {
        return data.trim().split(this.config.rowDelimiter);
    };
    CsvDriver.prototype.toJsonArray = function (data) {
        var _this = this;
        var rows = this.getRows(data);
        var names = this.config.names;
        if (this.config.skipHeader) {
            var top_1 = rows.splice(0, this.config.skipHeader);
            if (this.config.nameByHeader) {
                names = top_1[0].trim().split(this.config.columnDelimiter);
            }
        }
        return rows.map(function (row) { return _this.getFields(row, names); });
    };
    CsvDriver.prototype.serialize = function (data, withoutHeader) {
        var header = data[0]
            ? Object.keys(data[0])
                .filter(function (key) { return !key.startsWith("$"); })
                .join(this.config.columnDelimiter)
            : "";
        var readyData = this._serialize(data);
        if (withoutHeader) {
            return readyData;
        }
        return header + readyData;
    };
    CsvDriver.prototype._serialize = function (data) {
        var _this = this;
        return data.reduce(function (csv, row) {
            var cells = Object.keys(row).reduce(function (total, key, i) {
                if (key.startsWith("$") || key === "items") {
                    return total;
                }
                return "" + total + row[key] + (i === row.length - 1 ? "" : _this.config.columnDelimiter);
            }, "");
            if (row.items) {
                return "" + csv + (csv ? "\n" : "") + cells + _this._serialize(row.items);
            }
            return "" + csv + (csv ? _this.config.rowDelimiter : "") + cells;
        }, "");
    };
    return CsvDriver;
}());
exports.CsvDriver = CsvDriver;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionEvents;
(function (SelectionEvents) {
    SelectionEvents["beforeUnSelect"] = "beforeunselect";
    SelectionEvents["afterUnSelect"] = "afterunselect";
    SelectionEvents["beforeSelect"] = "beforeselect";
    SelectionEvents["afterSelect"] = "afterselect";
    SelectionEvents["beforeEnable"] = "beforeEnable";
    SelectionEvents["beforeDisable"] = "beforeDisable";
    SelectionEvents["afterEnable"] = "afterEnable";
    SelectionEvents["afterDisable"] = "afterDisable";
})(SelectionEvents = exports.SelectionEvents || (exports.SelectionEvents = {}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    apply: "apply",
    reject: "reject",
};
exports.default = locale;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function blockKeys(e) {
    var active = document.activeElement;
    if (!active.classList.contains("dhx_alert__confirm-reject") &&
        !active.classList.contains("dhx_alert__confirm-aply")) {
        e.preventDefault();
    }
}
function blockScreen(css) {
    var blocker = document.createElement("div");
    blocker.className = "dhx_alert__overlay " + (css || "");
    document.body.appendChild(blocker);
    document.addEventListener("keydown", blockKeys);
    return function () {
        document.body.removeChild(blocker);
        document.removeEventListener("keydown", blockKeys);
    };
}
exports.blockScreen = blockScreen;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(65));
__export(__webpack_require__(66));
__export(__webpack_require__(19));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(9);
var basis = ["byte", "kilobyte", "megabyte", "gigabyte"];
function getBasis(size, current) {
    if (size === void 0) { size = 0; }
    if (current === void 0) { current = 0; }
    return size < 1024
        ? size + " " + en_1.default[basis[current]]
        : this.getBasis(Math.round(size / 1024), current + 1);
}
exports.getBasis = getBasis;
var MAX_WORD_LENGTH = 13;
function truncateWord(word, len) {
    if (len === void 0) { len = MAX_WORD_LENGTH; }
    var start;
    var end;
    if (word.length <= len) {
        return word;
    }
    var dotIndex = word.lastIndexOf(".");
    if (dotIndex === -1) {
        end = word.substr(word.length - 4);
        start = word.substr(0, len - 7);
    }
    else {
        var endStartFrom = dotIndex - 3;
        end = word.substr(endStartFrom);
        start = word.substr(0, len - (word.length - endStartFrom));
    }
    return start + "..." + end;
}
exports.truncateWord = truncateWord;
function calculateCover(image) {
    var width = image.width, height = image.height;
    var imageAspectRatio = width / height;
    var sHeight;
    var sWidth;
    var sx;
    var sy;
    if (imageAspectRatio > 1) {
        // width > height
        sWidth = height;
        sHeight = height;
        sx = (width - sWidth) / 2;
        sy = 0;
    }
    else if (imageAspectRatio < 1) {
        // width < height
        sWidth = width;
        sHeight = width;
        sx = 0;
        sy = (height - sHeight) / 2;
    }
    else {
        // width == height
        sHeight = width;
        sWidth = width;
        sx = 0;
        sy = 0;
    }
    return {
        sx: sx,
        sy: sy,
        sWidth: sWidth,
        sHeight: sHeight,
        dx: 0,
        dy: 0,
    };
}
exports.calculateCover = calculateCover;
var FileType;
(function (FileType) {
    FileType["image"] = "image";
    FileType["video"] = "video";
    FileType["archive"] = "archive";
    FileType["table"] = "table";
    FileType["document"] = "document";
    FileType["presentation"] = "presentation";
    FileType["application"] = "application";
    FileType["web"] = "web";
    FileType["apple"] = "apple";
    FileType["pdf"] = "pdf";
    FileType["psd"] = "psd";
    FileType["audio"] = "audio";
    FileType["other"] = "other";
    FileType["text"] = "text";
})(FileType = exports.FileType || (exports.FileType = {}));
function getMimeAndExtension(fileWrapper) {
    var extension = fileWrapper.name.split(".").pop() || "none";
    var mime = fileWrapper.file ? fileWrapper.file.type : "";
    return {
        extension: extension,
        mime: mime,
    };
}
function getFileType(extension, mime) {
    switch (extension) {
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
        case "tiff":
        case "pcx":
        case "svg":
        case "ico":
            return FileType.image;
        case "avi":
        case "mpg":
        case "mpeg":
        case "rm":
        case "move":
        case "mov":
        case "mkv":
        case "flv":
        case "f4v":
        case "mp4":
        case "3gp":
        case "wmv":
        case "webm":
        case "vob":
            return FileType.video;
        case "rar":
        case "zip":
        case "tar":
        case "tgz":
        case "arj":
        case "gzip":
        case "bzip2":
        case "7z":
        case "ace":
        case "apk":
        case "deb":
        case "zipx":
        case "cab":
        case "tar-gz":
        case "rpm":
        case "xar":
            return FileType.archive;
        case "xlr":
        case "xls":
        case "xlsm":
        case "xlsx":
        case "ods":
        case "csv":
        case "tsv":
            return FileType.table;
        case "doc":
        case "docx":
        case "docm":
        case "dot":
        case "dotx":
        case "odt":
        case "wpd":
        case "wps":
        case "pages":
            return FileType.document;
        case "wav":
        case "aiff":
        case "au":
        case "mp3":
        case "aac":
        case "wma":
        case "ogg":
        case "flac":
        case "ape":
        case "wv":
        case "m4a":
        case "mid":
        case "midi":
            return FileType.audio;
        case "pot":
        case "potm":
        case "potx":
        case "pps":
        case "ppsm":
        case "ppsx":
        case "ppt":
        case "pptx":
        case "pptm":
        case "odp":
            return FileType.presentation;
        case "html":
        case "htm":
        case "eml":
            return FileType.web;
        case "exe":
            return FileType.application;
        case "dmg":
            return FileType.apple;
        case "pdf":
        case "ps":
        case "eps":
            return FileType.pdf;
        case "psd":
            return FileType.psd;
        case "txt":
        case "djvu":
        case "nfo":
        case "xml":
            return FileType.text;
        default:
            switch (mime.split("/")[0]) {
                case "image":
                    return FileType.image;
                case "audio":
                    return FileType.audio;
                case "video":
                    return FileType.video;
                default:
                    return FileType.other;
            }
    }
}
exports.getFileType = getFileType;
function getFileClassName(fileWrapper) {
    var _a = getMimeAndExtension(fileWrapper), mime = _a.mime, extension = _a.extension;
    return getFileType(extension, mime) + " extension-" + extension;
}
exports.getFileClassName = getFileClassName;
function isImage(fileWrapper) {
    var _a = getMimeAndExtension(fileWrapper), mime = _a.mime, extension = _a.extension;
    var fileType = getFileType(extension, mime);
    return fileType === FileType.image;
}
exports.isImage = isImage;
function removeItem(data, id) {
    if (data.exists(id)) {
        data.update(id, { $toRemove: true });
        setTimeout(function () {
            data.update(id, { $toRemove: false }, true);
            data.remove(id);
        }, 200);
    }
}
exports.removeItem = removeItem;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(83));
__export(__webpack_require__(32));
__export(__webpack_require__(20));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(26);
var ts_data_1 = __webpack_require__(3);
var Selection = /** @class */ (function () {
    function Selection(config, data) {
        var _this = this;
        this._disable = false;
        this.config = config;
        this.events = data.events;
        this._data = data;
        this._disable = this.config.disable;
        this._selected = [];
        this._lastShiftSelectedIndexes = [];
        this._data.events.on(ts_data_1.DataEvents.removeAll, function () {
            _this._selected = [];
        });
        if (typeof this.config.multiselection === "string") {
            var types = ["click", "ctrlClick"];
            if (!types.includes(this.config.multiselection)) {
                this.config.multiselection = false;
            }
        }
        this._data.events.on(ts_data_1.DataEvents.afterRemove, function (obj) {
            _this.remove(obj && obj.id);
            if (_this.config.multiselection && _this.getId().length !== 0) {
                _this._lastSelectedIndex = _this._data.getIndex(_this._selected[_this._selected.length - 1]);
                return;
            }
            var id = _this._data.getId(_this._lastSelectedIndex);
            if (id && id === _this._selected[0]) {
                _this.add(id);
            }
            else if (!id && _this._data.getLength() - _this._lastSelectedIndex === 0) {
                var lastItemId = _this._data.getId(_this._data.getLength() - 1);
                if (lastItemId) {
                    _this.add(lastItemId);
                }
            }
            else if (id && !_this._selected.length) {
                _this.add(id);
            }
            return;
        });
    }
    Selection.prototype.getId = function () {
        if (this.config.multiselection) {
            return this._selected;
        }
        return this._selected[0];
    };
    Selection.prototype.getItem = function () {
        var _this = this;
        if (this._selected.length) {
            var items = this._selected.map(function (id) { return _this._data.getItem(id); });
            return this.config.multiselection ? items : items[0];
        }
        return null;
    };
    Selection.prototype.contains = function (id) {
        if (this._disable)
            return;
        if (id) {
            return this._selected.includes(id);
        }
        return this._selected.length > 0;
    };
    Selection.prototype.remove = function (id) {
        var _this = this;
        if (this._disable)
            return;
        if (id) {
            return this._unselectItem(id);
        }
        this._selected.forEach(function (selectedId) { return _this._unselectItem(selectedId); });
        return true;
    };
    Selection.prototype.add = function (id, isCtrl, isShift, silent) {
        var multiselection = this.config.multiselection;
        if (this._disable || !this._data.exists(id) || (!multiselection && this._selected.includes(id))) {
            return;
        }
        !multiselection && this.remove();
        var silentEvent = silent ? null : !this.events.fire(types_1.SelectionEvents.beforeSelect, [id]);
        if (!this._selected.includes(id) && silentEvent) {
            return;
        }
        if (multiselection) {
            this._addMulti(id, isCtrl, isShift, silent);
        }
        else {
            this._addSingle(id, isCtrl, silent);
        }
    };
    Selection.prototype.enable = function () {
        if (!this.events.fire(types_1.SelectionEvents.beforeEnable, []))
            return;
        this._disable = false;
        this.events.fire(types_1.SelectionEvents.afterEnable, []);
    };
    Selection.prototype.disable = function () {
        if (!this.events.fire(types_1.SelectionEvents.beforeDisable, []))
            return;
        this.remove();
        this._disable = true;
        this.events.fire(types_1.SelectionEvents.afterDisable, []);
    };
    Selection.prototype.isDisabled = function () {
        return this._disable;
    };
    Selection.prototype._addMulti = function (id, isCtrl, isShift, silent) {
        var currentSelectedItemIndex = this._data.getIndex(id);
        if (this.config.multiselection === "click" || this.config.multiselection === true) {
            if (isShift) {
                this._addWithShift(currentSelectedItemIndex);
                this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
            }
            else {
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id, silent);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
        }
        if (this.config.multiselection === "ctrlClick") {
            if (!isShift && !isCtrl) {
                this.remove();
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id, silent);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
            if (isShift) {
                this._addWithShift(currentSelectedItemIndex);
                this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
            }
            if (isCtrl) {
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id, silent);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
        }
    };
    Selection.prototype._addWithShift = function (currentSelectedItemIndex) {
        var _this = this;
        if (currentSelectedItemIndex >= this._lastSelectedIndex) {
            // remove last selection with shift
            this._data.map(function (item, index) {
                if (_this._lastShiftSelectedIndexes.includes(index)) {
                    item.$selected = false;
                    _this._selected = _this._selected.filter(function (i) { return i !== _this._data.getId(index); });
                    _this._lastShiftSelectedIndexes = _this._lastShiftSelectedIndexes.filter(function (i) {
                        return i !== index && i !== _this._lastSelectedIndex;
                    });
                }
            });
            // add new selection with shift
            this._data.map(function (item, index) {
                if (index >= _this._lastSelectedIndex && index <= currentSelectedItemIndex) {
                    item.$selected = true;
                    if (!_this._selected.includes(item.id)) {
                        _this._selected.push(item.id);
                    }
                    if (index !== _this._lastSelectedIndex) {
                        if (!_this._lastShiftSelectedIndexes.includes(index)) {
                            _this._lastShiftSelectedIndexes.push(index);
                        }
                    }
                }
            });
        }
        if (currentSelectedItemIndex <= this._lastSelectedIndex) {
            // remove last selection with shift
            this._data.map(function (item, index) {
                if (_this._lastShiftSelectedIndexes.includes(index)) {
                    item.$selected = false;
                    _this._selected = _this._selected.filter(function (i) { return i !== _this._data.getId(index); });
                    _this._lastShiftSelectedIndexes = _this._lastShiftSelectedIndexes.filter(function (i) {
                        return i !== index && i !== _this._lastSelectedIndex;
                    });
                }
            });
            // add new selection with shift
            this._data.map(function (item, index) {
                if (index <= _this._lastSelectedIndex && index >= currentSelectedItemIndex) {
                    item.$selected = true;
                    if (!_this._selected.includes(item.id)) {
                        _this._selected.push(item.id);
                    }
                    if (index !== _this._lastSelectedIndex) {
                        if (!_this._lastShiftSelectedIndexes.includes(index)) {
                            _this._lastShiftSelectedIndexes.push(index);
                        }
                    }
                }
            });
        }
    };
    Selection.prototype._addSingle = function (id, isCtrl, silent) {
        this.remove();
        if (this.config && this.config.multiselection !== "ctrlClick") {
            this._selectItem(id, silent);
        }
        else {
            if (isCtrl) {
                this._selectItem(id, silent);
            }
        }
    };
    Selection.prototype._isSelected = function (id) {
        return this._selected.includes(id);
    };
    Selection.prototype._selectItem = function (id, silent) {
        this._selected.push(id);
        this._data.update(id, { $selected: true }, silent);
        this._lastSelectedIndex = this._data.getIndex(id);
        !silent && this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
    };
    Selection.prototype._unselectItem = function (id) {
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._selected = this._selected.filter(function (selectedId) { return selectedId !== id; });
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            if (this._data.exists(id)) {
                this._data.update(id, { $selected: false });
            }
            return true;
        }
        return false;
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
module.exports = __webpack_require__(38);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

Object.values = Object.values
    ? Object.values
    : function (obj) {
        var allowedTypes = [
            "[object String]",
            "[object Object]",
            "[object Array]",
            "[object Function]",
        ];
        var objType = Object.prototype.toString.call(obj);
        if (obj === null || typeof obj === "undefined") {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        else if (!~allowedTypes.indexOf(objType)) {
            return [];
        }
        else {
            // if ES6 is supported
            if (Object.keys) {
                return Object.keys(obj).map(function (key) {
                    return obj[key];
                });
            }
            var result = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    result.push(obj[prop]);
                }
            }
            return result;
        }
    };


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line @typescript-eslint/unbound-method
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        value: function (searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            // 1. Let O be ? ToObject(this value).
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            function sameValueZero(x, y) {
                return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
            }
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }
            // 8. Return false
            return false;
        },
        configurable: true,
        writable: true,
    });
}
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== "function") {
                throw new TypeError("predicate must be a function");
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true,
    });
}
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        if (this == null) {
            throw new TypeError("Array.prototype.findIndex called on null or undefined");
        }
        if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        "use strict";
        if (typeof start !== "number") {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        }
        else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        },
    });
}
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || " ");
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/unbound-method */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches =
        proto.matchesSelector ||
            proto.mozMatchesSelector ||
            proto.msMatchesSelector ||
            proto.oMatchesSelector ||
            proto.webkitMatchesSelector;
}
// Source: https://github.com/naminho/svg-classlist-polyfill/blob/master/polyfill.js
if (!("classList" in SVGElement.prototype)) {
    Object.defineProperty(SVGElement.prototype, "classList", {
        get: function get() {
            var _this = this;
            return {
                contains: function contains(className) {
                    return _this.className.baseVal.split(" ").indexOf(className) !== -1;
                },
                add: function add(className) {
                    return _this.setAttribute("class", _this.getAttribute("class") + " " + className);
                },
                remove: function remove(className) {
                    var removedClass = _this
                        .getAttribute("class")
                        .replace(new RegExp("(\\s|^)".concat(className, "(\\s|$)"), "g"), "$2");
                    if (_this.classList.contains(className)) {
                        _this.setAttribute("class", removedClass);
                    }
                },
                toggle: function toggle(className) {
                    if (this.contains(className)) {
                        this.remove(className);
                    }
                    else {
                        this.add(className);
                    }
                },
            };
        },
        configurable: true,
    });
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(39);
var en_1 = __webpack_require__(9);
var ts_data_1 = __webpack_require__(3);
exports.DataCollection = ts_data_1.DataCollection;
var ts_message_1 = __webpack_require__(16);
exports.message = ts_message_1.message;
__export(__webpack_require__(56));
__export(__webpack_require__(12));
var w = window;
exports.i18n = w.dhx && w.dhx.i18n ? w.dhx.i18 : {};
exports.i18n.setLocale = function (component, value) {
    var target = exports.i18n[component];
    for (var key in value) {
        target[key] = value[key];
    }
};
exports.i18n.vault = exports.i18n.vault || en_1.default;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(7);
var types_1 = __webpack_require__(4);
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        // TODO: change way for checking lazyLoad
        if (url.config && !this._parent.events.fire(types_1.DataEvents.beforeLazyLoad, [])) {
            return;
        }
        return (this._parent.loadData = url
            .load()
            .then(function (data) {
            if (data) {
                return _this.parse(data, driver);
            }
            else {
                return [];
            }
        })
            .catch(function (error) {
            _this._parent.events.fire(types_1.DataEvents.loadError, [error]);
        }));
    };
    Loader.prototype.parse = function (data, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        if (driver === "json" && !helpers_1.hasJsonOrArrayStructure(data)) {
            this._parent.events.fire(types_1.DataEvents.loadError, ["Uncaught SyntaxError: Unexpected end of input"]);
        }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        if (!(data instanceof Array)) {
            var totalCount = data.total_count - 1;
            var from_1 = data.from;
            data = data.data;
            if (this._parent.getLength() === 0) {
                var newData = [];
                for (var i = 0, j = 0; i <= totalCount; i++) {
                    if (i >= from_1 && i <= from_1 + data.length - 1) {
                        newData.push(data[j]);
                        j++;
                    }
                    else {
                        newData.push({ $empty: true });
                    }
                }
                data = newData;
            }
            else {
                data.forEach(function (newItem, i) {
                    var index = from_1 + i;
                    var oldId = _this._parent.getId(index);
                    if (oldId) {
                        var emptyItem = _this._parent.getItem(oldId);
                        if (emptyItem && emptyItem.$empty) {
                            _this._parent.changeId(oldId, newItem.id, true);
                            _this._parent.update(newItem.id, __assign(__assign({}, newItem), { $empty: undefined }), true);
                        }
                    }
                    else {
                        helpers_1.dhxWarning("item not found");
                    }
                });
                this._parent.events.fire(types_1.DataEvents.afterLazyLoad, [from_1, data.length]);
                this._parent.events.fire(types_1.DataEvents.change);
                return data;
            }
        }
        if (this._parent.getInitialData()) {
            this._parent.removeAll();
        }
        this._parent.$parse(data);
        return data;
    };
    Loader.prototype.save = function (url) {
        var _this = this;
        var _loop_1 = function (el) {
            if (el.saving || el.pending) {
                helpers_1.dhxWarning("item is saving");
            }
            else {
                var prevEl_1 = this_1._findPrevState(el.id);
                if (prevEl_1 && prevEl_1.saving) {
                    var pending = new Promise(function (res, rej) {
                        prevEl_1.promise
                            .then(function () {
                            el.pending = false;
                            res(_this._setPromise(el, url));
                        })
                            .catch(function (err) {
                            _this._removeFromOrder(prevEl_1);
                            _this._setPromise(el, url);
                            helpers_1.dhxWarning(err);
                            rej(err);
                        });
                    });
                    this_1._addToChain(pending);
                    el.pending = true;
                }
                else {
                    this_1._setPromise(el, url);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            _loop_1(el);
        }
        this._parent.saveData.then(function () {
            _this._saving = false;
        });
    };
    Loader.prototype._setPromise = function (el, url) {
        var _this = this;
        el.promise = url.save(el.obj, el.status);
        el.promise
            .then(function () {
            _this._removeFromOrder(el);
        })
            .catch(function (err) {
            el.saving = false;
            el.error = true;
            helpers_1.dhxError(err);
        });
        el.saving = true;
        this._saving = true;
        this._addToChain(el.promise);
        return el.promise;
    };
    Loader.prototype._addToChain = function (promise) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (this._parent.saveData && this._saving) {
            this._parent.saveData = this._parent.saveData.then(function () { return promise; });
        }
        else {
            this._parent.saveData = promise;
        }
    };
    Loader.prototype._findPrevState = function (id) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id) {
                return el;
            }
        }
        return null;
    };
    Loader.prototype._removeFromOrder = function (el) {
        this._changes.order = this._changes.order.filter(function (item) { return !helpers_1.isEqualObj(item, el); });
    };
    return Loader;
}());
exports.Loader = Loader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(42);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14), __webpack_require__(43)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_1 = __webpack_require__(45);
var ARRAY_NAME = "items";
var ITEM_NAME = "item";
// convert xml tag to js object, all subtags and attributes are mapped to the properties of result object
function tagToObject(tag, initialObj) {
    initialObj = initialObj || {};
    // map attributes
    var a = tag.attributes;
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            initialObj[a[i].name] = a[i].value;
        }
    }
    // map subtags
    var b = tag.childNodes;
    for (var i = 0; i < b.length; i++) {
        if (b[i].nodeType === 1) {
            var name_1 = b[i].tagName;
            if (initialObj[name_1]) {
                if (typeof initialObj[name_1].push !== "function") {
                    initialObj[name_1] = [initialObj[name_1]];
                }
                initialObj[name_1].push(tagToObject(b[i], {}));
            }
            else {
                initialObj[name_1] = tagToObject(b[i], {}); // sub-object for complex subtags
            }
        }
    }
    return initialObj;
}
var XMLDriver = /** @class */ (function () {
    function XMLDriver() {
    }
    XMLDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    XMLDriver.prototype.toJsonObject = function (data) {
        var doc;
        if (typeof data === "string") {
            doc = this._fromString(data);
        }
        return tagToObject(doc);
    };
    XMLDriver.prototype.serialize = function (data) {
        return xml_1.jsonToXML(data);
    };
    XMLDriver.prototype.getFields = function (row) {
        return row;
    };
    XMLDriver.prototype.getRows = function (data) {
        if (typeof data === "string") {
            data = this._fromString(data);
        }
        if (data) {
            var childNodes = data.childNodes && data.childNodes[0] && data.childNodes[0].childNodes;
            if (!childNodes || !childNodes.length) {
                return null;
            }
            return this._getRows(childNodes);
        }
        return [];
    };
    XMLDriver.prototype._getRows = function (nodes) {
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName === ITEM_NAME) {
                result.push(this._nodeToJS(nodes[i]));
            }
        }
        return result;
    };
    XMLDriver.prototype._fromString = function (data) {
        try {
            return new DOMParser().parseFromString(data, "text/xml");
        }
        catch (_a) {
            return null;
        }
    };
    XMLDriver.prototype._nodeToJS = function (node) {
        var result = {};
        if (this._haveAttrs(node)) {
            var attrs = node.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var _a = attrs[i], name_2 = _a.name, value = _a.value;
                result[name_2] = this._toType(value);
            }
        }
        if (node.nodeType === 3) {
            result.value = result.value || this._toType(node.textContent);
            return result;
        }
        var childNodes = node.childNodes;
        if (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var subNode = childNodes[i];
                var tag = subNode.tagName;
                if (!tag) {
                    continue;
                }
                if (tag === ARRAY_NAME && subNode.childNodes) {
                    result[tag] = this._getRows(subNode.childNodes);
                }
                else {
                    if (this._haveAttrs(subNode)) {
                        result[tag] = this._nodeToJS(subNode);
                    }
                    else {
                        result[tag] = this._toType(subNode.textContent);
                    }
                }
            }
        }
        return result;
    };
    XMLDriver.prototype._toType = function (val) {
        if (val === "false" || val === "true") {
            return val === "true";
        }
        if (!isNaN(val)) {
            return Number(val);
        }
        return val;
    };
    XMLDriver.prototype._haveAttrs = function (node) {
        return node.attributes && node.attributes.length;
    };
    return XMLDriver;
}());
exports.XMLDriver = XMLDriver;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var INDENT_STEP = 4;
function ws(count) {
    return " ".repeat(count);
}
function itemToXML(item, indent) {
    if (indent === void 0) { indent = INDENT_STEP; }
    var result = ws(indent) + "<item>\n";
    for (var key in item) {
        if (Array.isArray(item[key])) {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">\n");
            result +=
                item[key].map(function (subItem) { return itemToXML(subItem, indent + INDENT_STEP * 2); }).join("\n") +
                    "\n";
            result += ws(indent + INDENT_STEP) + ("</" + key + ">\n");
        }
        else {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">" + item[key] + "</" + key + ">\n");
        }
    }
    result += ws(indent) + "</item>";
    return result;
}
function jsonToXML(data, root) {
    if (root === void 0) { root = "root"; }
    var result = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<" + root + ">";
    for (var i = 0; i < data.length; i++) {
        result += "\n" + itemToXML(data[i]);
    }
    return result + ("\n</" + root + ">");
}
exports.jsonToXML = jsonToXML;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(7);
var Sort = /** @class */ (function () {
    function Sort() {
    }
    Sort.prototype.sort = function (array, by) {
        var _this = this;
        if (by.rule && typeof by.rule === "function") {
            this._sort(array, by);
        }
        else if (by.by) {
            by.rule = function (a, b) {
                var aa = _this._checkVal(by.as, a[by.by]);
                var bb = _this._checkVal(by.as, b[by.by]);
                return helpers_1.naturalCompare(aa.toString(), bb.toString());
            };
            this._sort(array, by);
        }
    };
    Sort.prototype._checkVal = function (method, val) {
        return method ? method.call(this, val) : val;
    };
    Sort.prototype._sort = function (arr, conf) {
        var _this = this;
        var dir = {
            asc: 1,
            desc: -1,
        };
        return arr.sort(function (a, b) {
            return conf.rule.call(_this, a, b) * (dir[conf.dir] || dir.asc);
        });
    };
    return Sort;
}());
exports.Sort = Sort;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var datacollection_1 = __webpack_require__(22);
var dataproxy_1 = __webpack_require__(10);
var helpers_1 = __webpack_require__(7);
var types_1 = __webpack_require__(4);
function addToOrder(store, obj, parent, index) {
    if (index !== undefined && index !== -1 && store[parent] && store[parent][index]) {
        store[parent].splice(index, 0, obj);
    }
    else {
        if (!store[parent]) {
            store[parent] = [];
        }
        store[parent].push(obj);
    }
}
var TreeCollection = /** @class */ (function (_super) {
    __extends(TreeCollection, _super);
    function TreeCollection(config, events) {
        var _a;
        var _this = _super.call(this, config, events) || this;
        var root = (_this._root = "_ROOT_" + core_1.uid());
        _this._childs = (_a = {}, _a[root] = [], _a);
        _this._initChilds = null;
        return _this;
    }
    TreeCollection.prototype.add = function (obj, index, parent) {
        var _this = this;
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj,
            };
        }
        if (Array.isArray(obj)) {
            return obj.map(function (element, key) {
                return _this._add(element, index, parent, key);
            });
        }
        else {
            return this._add(obj, index, parent);
        }
    };
    TreeCollection.prototype.getRoot = function () {
        return this._root;
    };
    TreeCollection.prototype.getParent = function (id, asObj) {
        if (asObj === void 0) { asObj = false; }
        if (!this._pull[id]) {
            return null;
        }
        var parent = this._pull[id].parent;
        return asObj ? this._pull[parent] : parent;
    };
    TreeCollection.prototype.getItems = function (id) {
        if (this._childs && this._childs[id]) {
            return this._childs[id];
        }
        return [];
    };
    TreeCollection.prototype.getLength = function (id) {
        if (id === void 0) { id = this._root; }
        if (!this._childs[id]) {
            return null;
        }
        return this._childs[id].length;
    };
    TreeCollection.prototype.removeAll = function (id) {
        var _a;
        if (!id) {
            _super.prototype.removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
        else if (this._childs[id]) {
            var childs = __spreadArrays(this._childs[id]);
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var child = childs_1[_i];
                this.remove(child.id);
            }
        }
    };
    TreeCollection.prototype.getIndex = function (id) {
        var parent = this.getParent(id);
        if (!parent || !this._childs[parent]) {
            return -1;
        }
        return core_1.findIndex(this._childs[parent], function (item) { return item.id === id; });
    };
    TreeCollection.prototype.sort = function (by) {
        var _this = this;
        if (!by) {
            this._childs = {};
            // [dirty]
            this._parse_data(Object.keys(this._pull).map(function (key) { return _this._pull[key]; }));
            if (this._filters) {
                for (var key in this._filters) {
                    var filter = this._filters[key];
                    this.filter(filter.rule, filter.config);
                }
            }
        }
        else {
            for (var key in this._childs) {
                this._sort.sort(this._childs[key], by);
            }
            if (this._initChilds && Object.keys(this._initChilds).length) {
                for (var key in this._initChilds) {
                    this._sort.sort(this._initChilds[key], by);
                }
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.filter = function (rule, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (!rule) {
            this.restoreOrder();
            return;
        }
        if (!this._initChilds) {
            this._initChilds = this._childs;
        }
        config.type = config.type || types_1.TreeFilterType.all;
        // [todo] we can store multiple filter rules, like in datacollection
        this._filters = {};
        this._filters._ = {
            rule: rule,
            config: config,
        };
        var newChilds = {};
        this._recursiveFilter(rule, config, this._root, 0, newChilds);
        Object.keys(newChilds).forEach(function (key) {
            var parentId = _this.getParent(key);
            var current = _this.getItem(key);
            while (parentId) {
                if (!newChilds[parentId]) {
                    newChilds[parentId] = [];
                }
                if (current && !newChilds[parentId].find(function (x) { return x.id === current.id; })) {
                    newChilds[parentId].push(current);
                }
                current = _this.getItem(parentId);
                parentId = _this.getParent(parentId);
            }
        });
        this._childs = newChilds;
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.restoreOrder = function () {
        if (this._initChilds) {
            this._childs = this._initChilds;
            this._initChilds = null;
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.copy = function (id, index, target, targetId) {
        var _this = this;
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                return _this._copy(elementId, index, target, targetId, key);
            });
        }
        else {
            return this._copy(id, index, target, targetId);
        }
    };
    TreeCollection.prototype.move = function (id, index, target, targetId) {
        var _this = this;
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                return _this._move(elementId, index, target, targetId, key);
            });
        }
        else {
            return this._move(id, index, target, targetId);
        }
    };
    TreeCollection.prototype.forEach = function (cb, parent, level) {
        if (parent === void 0) { parent = this._root; }
        if (level === void 0) { level = Infinity; }
        if (!this.haveItems(parent) || level < 1) {
            return;
        }
        var array = this._childs[parent];
        for (var i = 0; i < array.length; i++) {
            cb.call(this, array[i], i, array);
            if (this.haveItems(array[i].id)) {
                this.forEach(cb, array[i].id, --level);
            }
        }
    };
    TreeCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        if (checkItem === void 0) { checkItem = function () { return true; }; }
        if (!this.haveItems(id)) {
            return;
        }
        for (var i = 0; i < this._childs[id].length; i++) {
            cb.call(this, this._childs[id][i], i);
            if (direct && checkItem(this._childs[id][i])) {
                this.eachChild(this._childs[id][i].id, cb, direct, checkItem);
            }
        }
    };
    TreeCollection.prototype.getNearId = function (id) {
        return id; // for selection
    };
    TreeCollection.prototype.loadItems = function (id, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        var url = this.config.autoload + "?id=" + id;
        var proxy = new dataproxy_1.DataProxy(url);
        proxy.load().then(function (data) {
            driver = helpers_1.toDataDriver(driver);
            data = driver.toJsonArray(data);
            _this._parse_data(data, id);
            _this.events.fire(types_1.DataEvents.change);
        });
    };
    TreeCollection.prototype.refreshItems = function (id, driver) {
        if (driver === void 0) { driver = "json"; }
        this.removeAll(id);
        this.loadItems(id, driver);
    };
    TreeCollection.prototype.eachParent = function (id, cb, self) {
        if (self === void 0) { self = false; }
        var item = this.getItem(id);
        if (!item) {
            return;
        }
        if (self) {
            cb.call(this, item);
        }
        if (item.parent === this._root) {
            return;
        }
        var parent = this.getItem(item.parent);
        cb.call(this, parent);
        this.eachParent(item.parent, cb);
    };
    TreeCollection.prototype.haveItems = function (id) {
        return id in this._childs;
    };
    TreeCollection.prototype.canCopy = function (id, target) {
        if (id === target) {
            return false;
        }
        var canCopy = true;
        this.eachParent(target, function (item) { return (item.id === id ? (canCopy = false) : null); }); // locate return string
        return canCopy;
    };
    TreeCollection.prototype.serialize = function (driver, checkItem) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        var data = this._serialize(this._root, checkItem);
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    TreeCollection.prototype.getId = function (index, parent) {
        if (parent === void 0) { parent = this._root; }
        if (!this._childs[parent] || !this._childs[parent][index]) {
            return;
        }
        return this._childs[parent][index].id;
    };
    // Non public API from suite_6.4
    TreeCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveItems(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i, this._childs));
            if (direct) {
                var childResult = this.map(cb, this._childs[parent][i].id, direct);
                result = result.concat(childResult);
            }
        }
        return result;
    };
    TreeCollection.prototype._add = function (obj, index, parent, key) {
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        obj.parent = obj.parent ? obj.parent.toString() : parent;
        if (key > 0 && index !== -1) {
            index = index + 1;
        }
        var id = _super.prototype._add.call(this, obj, index);
        if (Array.isArray(obj.items)) {
            for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.add(item, -1, obj.id);
            }
        }
        return id;
    };
    TreeCollection.prototype._copy = function (id, index, target, targetId, key) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        var currentChilds = this._childs[id];
        if (key) {
            index = index === -1 ? -1 : index + key;
        }
        if (target === this && !this.canCopy(id, targetId)) {
            return null;
        }
        var itemCopy = helpers_1.copyWithoutInner(this.getItem(id), { items: true });
        if (target.exists(id)) {
            itemCopy.id = core_1.uid();
        }
        if (!helpers_1.isTreeCollection(target)) {
            target.add(itemCopy, index);
            return;
        }
        if (this.exists(id)) {
            itemCopy.parent = targetId;
            if (target !== this && targetId === this._root) {
                itemCopy.parent = target.getRoot();
            }
            target.add(itemCopy, index);
            id = itemCopy.id;
        }
        if (currentChilds) {
            for (var _i = 0, currentChilds_1 = currentChilds; _i < currentChilds_1.length; _i++) {
                var child = currentChilds_1[_i];
                var childId = child.id;
                var childIndex = this.getIndex(childId);
                if (typeof id === "string") {
                    this.copy(childId, childIndex, target, id);
                }
            }
        }
        return id;
    };
    TreeCollection.prototype._move = function (id, index, target, targetId, key) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        if (key) {
            index = index === -1 ? -1 : index + key;
        }
        if (target !== this) {
            if (!helpers_1.isTreeCollection(target)) {
                // move to datacollection
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                this.remove(id);
                return;
            }
            var returnId = this.copy(id, index, target, targetId);
            this.remove(id);
            return returnId;
        }
        // move inside
        if (!this.canCopy(id, targetId)) {
            return null;
        }
        var parent = this.getParent(id);
        var parentIndex = this.getIndex(id);
        // get item from parent array and move to target array
        var spliced = this._childs[parent].splice(parentIndex, 1)[0];
        spliced.parent = targetId; // need for next moving, ... not best solution, may be full method for get item
        if (!this._childs[parent].length) {
            delete this._childs[parent];
        }
        if (!this.haveItems(targetId)) {
            this._childs[targetId] = [];
        }
        if (index === -1) {
            index = this._childs[targetId].push(spliced);
        }
        else {
            this._childs[targetId].splice(index, 0, spliced);
        }
        this.events.fire(types_1.DataEvents.change, [id, "update", this.getItem(id)]);
        return id;
    };
    TreeCollection.prototype._removeAll = function (id) {
        var _a;
        if (id) {
            var childs = __spreadArrays(this._childs[id]);
            for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                var child = childs_2[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype._removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype._removeCore = function (id) {
        if (this._pull[id]) {
            var parent_1 = this.getParent(id);
            this._childs[parent_1] = this._childs[parent_1].filter(function (item) { return item.id !== id; });
            if (parent_1 !== this._root && !this._childs[parent_1].length) {
                delete this._childs[parent_1];
            }
            if (this._initChilds && this._initChilds[parent_1]) {
                this._initChilds[parent_1] = this._initChilds[parent_1].filter(function (item) { return item.id !== id; });
                if (parent_1 !== this._root && !this._initChilds[parent_1].length) {
                    delete this._initChilds[parent_1];
                }
            }
            this._fastDeleteChilds(this._childs, id);
            if (this._initChilds) {
                this._fastDeleteChilds(this._initChilds, id);
            }
        }
    };
    TreeCollection.prototype._addToOrder = function (_order, obj, index) {
        var childs = this._childs;
        var initChilds = this._initChilds;
        var parent = obj.parent;
        this._pull[obj.id] = obj;
        addToOrder(childs, obj, parent, index);
        if (initChilds) {
            addToOrder(initChilds, obj, parent, index);
        }
    };
    TreeCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            if (typeof obj !== "object") {
                obj = {
                    value: obj,
                };
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            if (obj.items && obj.items instanceof Object) {
                this._parse_data(obj.items, obj.id);
            }
        }
    };
    TreeCollection.prototype._fastDeleteChilds = function (target, id) {
        if (this._pull[id]) {
            delete this._pull[id];
        }
        if (!target[id]) {
            return;
        }
        for (var i = 0; i < target[id].length; i++) {
            this._fastDeleteChilds(target, target[id][i].id);
        }
        delete target[id];
    };
    TreeCollection.prototype._recursiveFilter = function (rule, config, current, level, newChilds) {
        var _this = this;
        var childs = this._childs[current];
        if (!childs) {
            return;
        }
        var condition = function (item) {
            switch (config.type) {
                case types_1.TreeFilterType.all: {
                    return true;
                }
                case types_1.TreeFilterType.level: {
                    return level === config.level;
                }
                case types_1.TreeFilterType.leafs: {
                    return !_this.haveItems(item.id);
                }
            }
        };
        if (typeof rule === "function") {
            var customRule = function (item) { return condition(item) && rule(item); };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        else if (rule.by && rule.match) {
            var customRule = function (item) {
                return condition(item) &&
                    item[rule.by] &&
                    item[rule.by]
                        .toString()
                        .toLowerCase()
                        .indexOf(rule.match.toString().toLowerCase()) !== -1;
            };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
            var child = childs_3[_i];
            this._recursiveFilter(rule, config, child.id, level + 1, newChilds);
        }
    };
    TreeCollection.prototype._serialize = function (parent, fn) {
        var _this = this;
        if (parent === void 0) { parent = this._root; }
        return this.map(function (item) {
            var itemCopy = {};
            for (var key in item) {
                if (key === "parent" || key === "items") {
                    continue;
                }
                itemCopy[key] = item[key];
            }
            if (fn) {
                itemCopy = fn(itemCopy);
            }
            if (_this.haveItems(item.id)) {
                itemCopy.items = _this._serialize(item.id, fn);
            }
            return itemCopy;
        }, parent, false);
    };
    return TreeCollection;
}(datacollection_1.DataCollection));
exports.TreeCollection = TreeCollection;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
var CollectionStore_1 = __webpack_require__(49);
var types_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(7);
function getPosition(e) {
    var y = e.clientY;
    var element = html_1.locateNode(e);
    if (!element) {
        return null;
    }
    var treeLine = element.childNodes[0];
    var _a = treeLine.getBoundingClientRect(), top = _a.top, height = _a.height;
    return (y - top) / height;
}
function dragEventContent(element, elements, exhaustiveList) {
    if (exhaustiveList === void 0) { exhaustiveList = false; }
    var rect = element.getBoundingClientRect();
    var ghost = document.createElement("div");
    var clone = element.cloneNode(true);
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.maxHeight = rect.height + "px";
    clone.style.fontSize = window.getComputedStyle(element.parentElement).fontSize;
    clone.style.opacity = "0.8";
    clone.style.fontSize = window.getComputedStyle(element.parentElement).fontSize;
    if (!exhaustiveList || !elements || !elements.length) {
        ghost.appendChild(clone);
    }
    if (elements && elements.length) {
        elements.forEach(function (node, key) {
            var nodeClone = node.cloneNode(true);
            nodeClone.style.width = rect.width + "px";
            nodeClone.style.height = rect.height + "px";
            nodeClone.style.maxHeight = rect.height + "px";
            nodeClone.style.top = (key + 1) * 12 - rect.height - rect.height * key + "px";
            nodeClone.style.left = (key + 1) * 12 + "px";
            nodeClone.style.opacity = "0.6";
            nodeClone.style.zIndex = "" + (-key - 1);
            ghost.appendChild(nodeClone);
        });
    }
    ghost.className = "dhx_drag-ghost";
    return ghost;
}
var DragManager = /** @class */ (function () {
    function DragManager() {
        var _this = this;
        this._transferData = {};
        this._canMove = true;
        this._isDrag = false;
        this._onMouseMove = function (e) {
            if (!_this._transferData.start) {
                return;
            }
            var pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
            var pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
            var _a = _this._transferData, x = _a.x, y = _a.y, start = _a.start, componentId = _a.componentId;
            if (!_this._transferData.ghost) {
                if (Math.abs(x - pageX) < 3 && Math.abs(y - pageY) < 3) {
                    return;
                }
                else {
                    var ghost = _this._onDragStart(start, componentId, e);
                    if (!ghost) {
                        _this._endDrop(e);
                        return;
                    }
                    else {
                        _this._transferData.ghost = ghost;
                        document.body.appendChild(_this._transferData.ghost);
                    }
                }
            }
            _this._moveGhost(pageX, pageY);
            _this._onDrag(e);
        };
        this._onMouseUp = function (e) {
            if (!_this._transferData.x) {
                return;
            }
            if (_this._transferData.ghost) {
                _this._removeGhost();
                _this._onDrop(e);
            }
            else {
                _this._endDrop(e);
            }
            if (!e.targetTouches) {
                document.removeEventListener("mousemove", _this._onMouseMove);
                document.removeEventListener("mouseup", _this._onMouseUp);
            }
            else {
                document.removeEventListener("touchmove", _this._onMouseMove);
                document.removeEventListener("touchend", _this._onMouseUp);
            }
        };
    }
    DragManager.prototype.setItem = function (id, item) {
        CollectionStore_1.collectionStore.setItem(id, item);
    };
    DragManager.prototype.onMouseDown = function (e, source, itemsForGhost) {
        // onmousedown only for target objects
        if (e.which !== 1 && !e.targetTouches) {
            return;
        }
        if (!e.targetTouches) {
            document.addEventListener("mousemove", this._onMouseMove);
            document.addEventListener("mouseup", this._onMouseUp);
        }
        else {
            document.addEventListener("touchmove", this._onMouseMove, false);
            document.addEventListener("touchend", this._onMouseUp, false);
        }
        var item = html_1.locateNode(e, "dhx_id");
        var id = item && item.getAttribute("dhx_id");
        var componentId = html_1.locate(e, "dhx_widget_id");
        if (source && source.includes(id) && source.length > 1) {
            this._transferData.source = source;
            this._itemsForGhost = itemsForGhost;
        }
        else {
            this._transferData.source = [id];
            this._itemsForGhost = null;
        }
        if (id && componentId) {
            var _a = html_1.getBox(item), left = _a.left, top_1 = _a.top;
            var pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
            var pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
            this._transferData.initXOffset = pageX - left;
            this._transferData.initYOffset = pageY - top_1;
            this._transferData.x = pageX;
            this._transferData.y = pageY;
            this._transferData.componentId = componentId;
            this._transferData.start = id;
            this._transferData.item = item;
        }
    };
    DragManager.prototype.isDrag = function () {
        return this._isDrag;
    };
    DragManager.prototype._moveGhost = function (x, y) {
        if (this._transferData.ghost) {
            this._transferData.ghost.style.left = x - this._transferData.initXOffset + "px";
            this._transferData.ghost.style.top = y - this._transferData.initYOffset + "px";
        }
    };
    DragManager.prototype._removeGhost = function () {
        document.body.removeChild(this._transferData.ghost);
    };
    DragManager.prototype._onDrop = function (e) {
        if (!this._canMove) {
            this._endDrop(e);
            return;
        }
        var _a = this._transferData, start = _a.start, source = _a.source, target = _a.target, dropComponentId = _a.dropComponentId, dropPosition = _a.dropPosition;
        var data = { start: start, source: source, target: target, dropPosition: dropPosition };
        var component = CollectionStore_1.collectionStore.getItem(dropComponentId);
        var config = component && component.config;
        if (!component || config.dragMode === "source") {
            this._endDrop(e);
            return;
        }
        if (component.events.fire(types_1.DragEvents.beforeDrop, [data, e])) {
            var to = {
                id: target,
                component: component,
            };
            var from = {
                id: start,
                component: this._transferData.component,
            };
            this._move(from, to);
            to.component.events.fire(types_1.DragEvents.afterDrop, [data, e]);
        }
        this._endDrop(e);
    };
    DragManager.prototype._onDragStart = function (id, componentId, e) {
        var component = CollectionStore_1.collectionStore.getItem(componentId);
        var config = component.config;
        var _a = this._transferData, start = _a.start, source = _a.source, target = _a.target;
        var data = {
            start: start,
            source: source,
            target: target,
        };
        if (config.dragMode === "target") {
            return null;
        }
        var ghost = dragEventContent(this._transferData.item, this._itemsForGhost, config.dragItem === "column");
        var ans = component.events.fire(types_1.DragEvents.beforeDrag, [data, e, ghost]);
        if (!ans || !id) {
            return null;
        }
        component.events.fire(types_1.DragEvents.dragStart, [data, e]);
        this._isDrag = true;
        this._toggleTextSelection(true);
        this._transferData.component = component;
        this._transferData.dragConfig = config;
        return ghost;
    };
    DragManager.prototype._onDrag = function (e) {
        var clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
        var clientY = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
        var element = document.elementFromPoint(clientX, clientY);
        var collectionId = html_1.locate(element, "dhx_widget_id");
        if (!collectionId) {
            if (this._canMove) {
                this._cancelCanDrop(e);
            }
            return;
        }
        var _a = this._transferData, dropComponentId = _a.dropComponentId, start = _a.start, source = _a.source, target = _a.target, componentId = _a.componentId, dropPosition = _a.dropPosition;
        var component = CollectionStore_1.collectionStore.getItem(collectionId);
        var id = html_1.locate(element, "dhx_id");
        if (!id) {
            this._cancelCanDrop(e);
            this._transferData.dropComponentId = collectionId;
            this._transferData.target = null;
            this._canDrop(e);
            return;
        }
        if (component.config.dropBehaviour === "complex") {
            var pos = getPosition(e);
            if (pos <= 0.25) {
                this._transferData.dropPosition = "top";
            }
            else if (pos >= 0.75) {
                this._transferData.dropPosition = "bottom";
            }
            else {
                this._transferData.dropPosition = "in";
            }
        }
        else if (target === id && dropComponentId === collectionId) {
            return;
        }
        var from = {
            id: start,
            component: this._transferData.component,
        };
        if (component.config.dragMode === "source") {
            return;
        }
        from.component.events.fire(types_1.DragEvents.dragOut, [
            {
                start: start,
                source: source,
                target: target,
            },
            e,
        ]);
        if (collectionId !== componentId ||
            !helpers_1.isTreeCollection(from.component.data) ||
            (helpers_1.isTreeCollection(from.component.data) && from.component.data.canCopy(from.id, id))) {
            this._cancelCanDrop(e); // clear last
            this._transferData.target = id;
            this._transferData.dropComponentId = collectionId;
            var canMove = from.component.events.fire(types_1.DragEvents.dragIn, [
                {
                    start: start,
                    source: source,
                    target: target,
                    dropPosition: dropPosition,
                },
                e,
            ]);
            if (canMove) {
                this._canDrop(e);
            }
        }
        else {
            this._cancelCanDrop(e);
        }
    };
    DragManager.prototype._move = function (from, to) {
        var fromData = from.component.data;
        var toData = to.component.data;
        var index = 0;
        var componentId = to.id;
        var behaviour = helpers_1.isTreeCollection(toData) ? to.component.config.dropBehaviour : undefined;
        var gridConfig = from.component.config.columns
            ? from.component.config
            : undefined;
        var isColumnDrag = gridConfig &&
            (gridConfig.dragItem === "complex" || gridConfig.dragItem === "column") &&
            gridConfig.columns.map(function (c) { return c.id; }).filter(function (id) { return id === from.id || id === to.id; }).length;
        if (isColumnDrag && from.component === to.component && from.id !== to.id) {
            var grid = from.component;
            var currentCols = grid.config.columns.map(function (c) { return (__assign({}, c)); });
            var sourceIndex = currentCols.findIndex(function (c) { return c.id === from.id; });
            var componentIndex = currentCols.findIndex(function (c) { return c.id === to.id; });
            currentCols.splice(componentIndex, 0, currentCols.splice(sourceIndex, 1)[0]);
            grid.setColumns(currentCols);
            grid.paint();
            return;
        }
        switch (behaviour) {
            case "child":
                break;
            case "sibling":
                componentId = toData.getParent(componentId);
                index = toData.getIndex(to.id) + 1;
                break;
            case "complex": {
                var dropPosition = this._transferData.dropPosition;
                if (dropPosition === "top") {
                    componentId = toData.getParent(componentId);
                    index = toData.getIndex(to.id);
                }
                else if (dropPosition === "bottom") {
                    componentId = toData.getParent(componentId);
                    index = toData.getIndex(to.id) + 1;
                }
                break;
            }
            default:
                // list move
                if (!to.id) {
                    index = -1;
                }
                else if (from.component === to.component &&
                    toData.getIndex(from.id) < toData.getIndex(to.id)) {
                    index = toData.getIndex(to.id) - 1;
                }
                else {
                    index = toData.getIndex(to.id);
                }
        }
        if (this._transferData.dragConfig.dragCopy) {
            if (this._transferData.source instanceof Array && this._transferData.source.length > 1) {
                this._transferData.source.map(function (selctedId) {
                    fromData.copy(selctedId, index, toData, componentId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.copy(from.id, index, toData, componentId);
            }
        }
        else {
            if (this._transferData.source instanceof Array && this._transferData.source.length > 1) {
                this._transferData.source.map(function (selctedId) {
                    fromData.move(selctedId, index, toData, componentId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.move(from.id, index, toData, componentId); // typescript bug??
            }
        }
    };
    DragManager.prototype._endDrop = function (e) {
        this._toggleTextSelection(false);
        if (this._transferData.component) {
            var _a = this._transferData, start = _a.start, source = _a.source, target = _a.target;
            var data = { start: start, source: source, target: target };
            this._transferData.component.events.fire(types_1.DragEvents.afterDrag, [data, e]);
        }
        this._cancelCanDrop(e);
        this._canMove = true;
        this._transferData = {};
        this._transferData.target = null;
        this._transferData.dropComponentId = null;
    };
    DragManager.prototype._cancelCanDrop = function (e) {
        this._canMove = false;
        this._isDrag = false;
        var _a = this._transferData, start = _a.start, source = _a.source, target = _a.target, dropComponentId = _a.dropComponentId;
        var data = {
            start: start,
            source: source,
            target: target,
        };
        var collection = CollectionStore_1.collectionStore.getItem(dropComponentId);
        if (collection && target) {
            collection.events.fire(types_1.DragEvents.cancelDrop, [data, e]);
        }
        this._transferData.dropComponentId = null;
        this._transferData.target = null;
    };
    DragManager.prototype._canDrop = function (e) {
        this._canMove = true;
        var _a = this._transferData, start = _a.start, source = _a.source, target = _a.target, dropPosition = _a.dropPosition;
        var data = {
            start: start,
            source: source,
            target: target,
            dropPosition: dropPosition,
        };
        var component = CollectionStore_1.collectionStore.getItem(this._transferData.dropComponentId);
        if (component && this._transferData.target) {
            component.events.fire(types_1.DragEvents.canDrop, [data, e]);
        }
    };
    DragManager.prototype._toggleTextSelection = function (add) {
        if (add) {
            document.body.classList.add("dhx_no-select");
        }
        else {
            document.body.classList.remove("dhx_no-select");
        }
    };
    return DragManager;
}());
var dhx = (window.dhxHelpers = window.dhxHelpers || {});
dhx.dragManager = dhx.dragManager || new DragManager();
exports.dragManager = dhx.dragManager;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionStore = /** @class */ (function () {
    function CollectionStore() {
        this._store = {};
    }
    CollectionStore.prototype.setItem = function (id, target) {
        this._store[id] = target;
    };
    CollectionStore.prototype.getItem = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id];
    };
    return CollectionStore;
}());
var dhx = (window.dhxHelpers = window.dhxHelpers || {});
dhx.collectionStore = dhx.collectionStore || new CollectionStore();
exports.collectionStore = dhx.collectionStore;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(10);
var core_1 = __webpack_require__(1);
var ajax_1 = __webpack_require__(15);
var LazyDataProxy = /** @class */ (function (_super) {
    __extends(LazyDataProxy, _super);
    function LazyDataProxy(url, config) {
        var _this = _super.call(this, url) || this;
        _this.config = core_1.extend({
            from: 0,
            limit: 50,
            delay: 50,
            prepare: 0,
        }, config);
        _this.updateUrl(url, { from: _this.config.from, limit: _this.config.limit });
        return _this;
    }
    LazyDataProxy.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this._timeout) {
                ajax_1.ajax.get(_this.url, { responseType: "text" }).then(resolve);
                _this._cooling = true;
                _this._timeout = setTimeout(function () {
                    return;
                });
            }
            else {
                clearTimeout(_this._timeout);
                _this._timeout = setTimeout(function () {
                    ajax_1.ajax.get(_this.url, { responseType: "text" }).then(resolve);
                    _this._cooling = true;
                }, _this.config.delay);
                if (_this._cooling) {
                    resolve(null);
                    _this._cooling = false;
                }
            }
        });
    };
    return LazyDataProxy;
}(dataproxy_1.DataProxy));
exports.LazyDataProxy = LazyDataProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(5);
var types_1 = __webpack_require__(26);
var types_2 = __webpack_require__(4);
var Selection = /** @class */ (function () {
    function Selection(_config, data, events) {
        var _this = this;
        this._disable = false;
        this.events = events || new events_1.EventSystem(this);
        this._data = data;
        this._disable = _config.disable;
        this._data.events.on(types_2.DataEvents.removeAll, function () {
            _this._selected = null;
        });
        this._data.events.on(types_2.DataEvents.change, function () {
            if (_this._selected) {
                var near = _this._data.getNearId(_this._selected);
                if (near !== _this._selected) {
                    _this._selected = null;
                    if (near) {
                        _this.add(near);
                    }
                }
            }
        });
    }
    Selection.prototype.getId = function () {
        return this._selected;
    };
    Selection.prototype.getItem = function () {
        if (this._selected) {
            return this._data.getItem(this._selected);
        }
        return null;
    };
    Selection.prototype.remove = function (id) {
        if (this._disable)
            return;
        id = id || this._selected;
        if (!id) {
            return true;
        }
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false }, true);
            this._selected = null;
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    Selection.prototype.add = function (id) {
        if (this._selected === id || this._disable || !this._data.exists(id)) {
            return;
        }
        this.remove();
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected = id;
            this._data.update(id, { $selected: true }, true);
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    Selection.prototype.enable = function () {
        if (!this.events.fire(types_1.SelectionEvents.beforeEnable, []))
            return;
        this._disable = false;
        this.events.fire(types_1.SelectionEvents.afterEnable, []);
    };
    Selection.prototype.disable = function () {
        if (!this.events.fire(types_1.SelectionEvents.beforeDisable, []))
            return;
        this.remove();
        this._disable = true;
        this.events.fire(types_1.SelectionEvents.afterDisable, []);
    };
    Selection.prototype.isDisabled = function () {
        return this._disable;
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
var types_1 = __webpack_require__(17);
var nodeTimeout = new WeakMap();
var containers = new Map();
function createMessageContainer(parent, position) {
    var messageContainer = document.createElement("div");
    messageContainer.setAttribute("data-position", position);
    messageContainer.className =
        "dhx_message-container " +
            "dhx_message-container--" +
            position +
            (parent === document.body ? " dhx_message-container--in-body" : "");
    return messageContainer;
}
function onExpire(node, fromClick) {
    if (fromClick) {
        clearTimeout(nodeTimeout.get(node));
    }
    var container = node.parentNode;
    var position = container.getAttribute("data-position");
    var parent = container.parentNode;
    var messageContainerInfo = containers.get(parent);
    if (!messageContainerInfo) {
        return;
    }
    var positionInfo = messageContainerInfo[position];
    if (!positionInfo) {
        return;
    }
    var stack = positionInfo.stack;
    var index = stack.indexOf(node);
    if (index !== -1) {
        container.removeChild(node);
        stack.splice(index, 1);
        if (stack.length === 0) {
            parent.removeChild(container);
        }
        return;
    }
}
function message(props) {
    var _a;
    if (typeof props === "string") {
        props = { text: props };
    }
    props.position = props.position || types_1.MessageContainerPosition.topRight;
    var messageBox = document.createElement("div");
    messageBox.className = "dhx_widget dhx_message " + (props.css || "");
    if (props.html) {
        messageBox.innerHTML = props.html;
    }
    else {
        messageBox.innerHTML = "<span class=\"dhx_message__text\">" + props.text + "</span>\n\t\t" + (props.icon ? "<span class=\"dhx_message__icon dxi " + props.icon + "\"></span>" : "");
    }
    var parent = props.node ? html_1.toNode(props.node) : document.body;
    var position = getComputedStyle(parent).position;
    if (position === "static") {
        parent.style.position = "relative";
    }
    var messageContainerInfo = containers.get(parent);
    if (!messageContainerInfo) {
        containers.set(parent, (_a = {},
            _a[props.position] = {
                stack: [],
                container: createMessageContainer(parent, props.position),
            },
            _a));
    }
    else if (!messageContainerInfo[props.position]) {
        messageContainerInfo[props.position] = {
            stack: [],
            container: createMessageContainer(parent, props.position),
        };
    }
    var _b = containers.get(parent)[props.position], stack = _b.stack, container = _b.container;
    if (stack.length === 0) {
        parent.appendChild(container);
    }
    stack.push(messageBox);
    container.appendChild(messageBox);
    if (props.expire) {
        var timeout = setTimeout(function () { return onExpire(messageBox); }, props.expire);
        nodeTimeout.set(messageBox, timeout);
    }
    messageBox.onclick = function () { return onExpire(messageBox, true); };
}
exports.message = message;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(27);
var common_1 = __webpack_require__(28);
function alert(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var unblock = common_1.blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var alertBox = document.createElement("div");
        alertBox.className = "dhx_widget dhx_alert " + (props.css || "");
        alertBox.innerHTML = "\n\t\t\t" + (props.header ? "<div class=\"dhx_alert__header\"> " + props.header + " </div>" : "") + "\n\t\t\t" + (props.text ? "<div class=\"dhx_alert__content\">" + props.text + "</div>" : "") + "\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? "dhx_alert__footer--" + props.buttonsAlignment : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__apply-button dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(alertBox);
        alertBox.querySelector(".dhx_alert__apply-button").focus();
        alertBox.querySelector("button").addEventListener("click", function () {
            unblock();
            document.body.removeChild(alertBox);
            res(true);
        });
    });
}
exports.alert = alert;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(27);
var common_1 = __webpack_require__(28);
function confirm(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var reject = props.buttons && props.buttons[1] ? props.buttons[1] : en_1.default.reject;
    var unblock = common_1.blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var confirmBox = document.createElement("div");
        var answer = function (val) {
            unblock();
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            confirmBox.removeEventListener("click", clickHandler);
            document.body.removeChild(confirmBox);
            res(val);
        };
        var clickHandler = function (e) {
            if (e.target.tagName === "BUTTON") {
                answer(e.target.classList.contains("dhx_alert__confirm-aply"));
            }
        };
        confirmBox.className = "dhx_widget dhx_alert dhx_alert--confirm" + (props.css ? " " + props.css : "");
        confirmBox.innerHTML = "\n\t\t" + (props.header ? "<div class=\"dhx_alert__header\"> " + props.header + " </div>" : "") + "\n\t\t" + (props.text ? "<div class=\"dhx_alert__content\">" + props.text + "</div>" : "") + "\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? "dhx_alert__footer--" + props.buttonsAlignment : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__confirm-aply dhx_button dhx_button--view_link dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t\t<button class=\"dhx_alert__confirm-reject dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium\">" + reject + "</button>\n\t\t\t</div>";
        document.body.appendChild(confirmBox);
        confirmBox.querySelector(".dhx_alert__confirm-reject").focus();
        confirmBox.addEventListener("click", clickHandler);
    });
}
exports.confirm = confirm;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
var types_1 = __webpack_require__(17);
var DEFAULT_SHOW_DELAY = 750;
var DEFAULT_HIDE_DELAY = 200;
function findPosition(targetRect, position, width, height) {
    var margin = 8; // margin top/bot, left/right
    var pos;
    var left;
    var top;
    switch (position) {
        case types_1.Position.center:
            left = targetRect.left + window.pageXOffset + (targetRect.width - width) / 2;
            if (left + margin < window.pageXOffset) {
                left = targetRect.left + window.pageXOffset;
            }
            top = targetRect.top + window.pageYOffset + (targetRect.height - height) / 2;
            pos = types_1.RealPosition.center;
            return { left: left, top: top, pos: pos };
        case types_1.Position.right:
            pos = types_1.RealPosition.right;
            left = targetRect.right + window.pageXOffset;
            if (left + width + margin > window.innerWidth + window.pageXOffset) {
                // set left
                left = window.pageXOffset + targetRect.left - width;
                pos = types_1.RealPosition.left;
            }
            top = window.pageYOffset + targetRect.top + (targetRect.height - height) / 2;
            return { left: left, top: top, pos: pos };
        case types_1.Position.bottom:
        default:
            left = window.pageXOffset + targetRect.left + (targetRect.width - width) / 2;
            if (left + width > window.innerWidth + window.pageXOffset) {
                left = window.innerWidth + window.pageXOffset - width;
            }
            else if (left < 0) {
                left = 0;
            }
            pos = types_1.RealPosition.bottom;
            top = window.pageYOffset + targetRect.bottom;
            if (top + height + margin > window.innerHeight + window.pageYOffset) {
                // set top
                top = window.pageYOffset + targetRect.top - height;
                pos = types_1.RealPosition.top;
            }
            return { left: left, top: top, pos: pos };
    }
}
exports.findPosition = findPosition;
// tooltip init
var tooltipBox = document.createElement("div");
var tooltipText = document.createElement("span");
tooltipText.className = "dhx_tooltip__text";
tooltipBox.appendChild(tooltipText);
tooltipBox.style.position = "absolute";
var lastNode = null;
var isActive = false;
var hideTimeout = null;
var showTimeout = null;
var activeListenersDestructor;
function showTooltip(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    var rects = node.getBoundingClientRect();
    tooltipText.textContent = text;
    document.body.appendChild(tooltipBox);
    tooltipBox.className = "dhx_widget dhx_tooltip" + (force ? " dhx_tooltip--forced" : "");
    var _a = tooltipBox.getBoundingClientRect(), width = _a.width, height = _a.height;
    var _b = findPosition(rects, position, width, height), left = _b.left, top = _b.top, pos = _b.pos;
    switch (pos) {
        case types_1.RealPosition.bottom:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.top:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.left:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.right:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.center:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
    }
    tooltipBox.className += " dhx_tooltip--" + pos + " " + (css || "");
    isActive = true;
    if (!force) {
        setTimeout(function () {
            tooltipBox.className += " dhx_tooltip--animate";
        });
    }
}
function hideTooltip(delay) {
    if (lastNode) {
        hideTimeout = setTimeout(function () {
            document.body.removeChild(tooltipBox);
            isActive = false;
            hideTimeout = null;
        }, delay || DEFAULT_HIDE_DELAY);
    }
}
function addListeners(node, text, config) {
    var force = config.force, showDelay = config.showDelay, hideDelay = config.hideDelay, position = config.position, css = config.css;
    if (!force) {
        showTimeout = setTimeout(function () {
            showTooltip(node, text, position || types_1.Position.bottom, css);
        }, showDelay || DEFAULT_SHOW_DELAY);
    }
    var hide = function () {
        if (isActive) {
            hideTooltip(hideDelay);
        }
        clearTimeout(showTimeout);
        node.removeEventListener("mouseleave", hide);
        node.removeEventListener("blur", hide);
        document.removeEventListener("mousedown", hide);
        lastNode = null;
        activeListenersDestructor = null;
    };
    if (force) {
        showTooltip(node, text, position, css, force);
    }
    node.addEventListener("mouseleave", hide);
    node.addEventListener("blur", hide);
    document.addEventListener("mousedown", hide);
    activeListenersDestructor = hide;
}
// default
function tooltip(text, config) {
    var node = html_1.toNode(config.node);
    if (node === lastNode) {
        return;
    }
    if (activeListenersDestructor) {
        activeListenersDestructor();
        activeListenersDestructor = null;
    }
    lastNode = node;
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
        addListeners(node, text, __assign(__assign({}, config), { force: true }));
    }
    else {
        addListeners(node, text, config);
    }
}
exports.tooltip = tooltip;
function _mousemove(e) {
    var node = html_1.locateNode(e, "dhx_tooltip_text");
    if (!node) {
        return;
    }
    tooltip(node.getAttribute("dhx_tooltip_text"), {
        position: node.getAttribute("dhx_tooltip_position") || types_1.Position.bottom,
        node: node,
    });
}
function enableTooltip() {
    document.addEventListener("mousemove", _mousemove);
}
exports.enableTooltip = enableTooltip;
function disableTooltip() {
    document.removeEventListener("mousemove", _mousemove);
}
exports.disableTooltip = disableTooltip;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var events_1 = __webpack_require__(5);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(3);
var ts_layout_1 = __webpack_require__(57);
var ts_toolbar_1 = __webpack_require__(63);
var en_1 = __webpack_require__(9);
var types_1 = __webpack_require__(12);
var Uploader_1 = __webpack_require__(77);
var configs_1 = __webpack_require__(78);
var helper_1 = __webpack_require__(30);
var ProgressBar_1 = __webpack_require__(79);
var ReadStackPreview_1 = __webpack_require__(80);
var ts_dataview_1 = __webpack_require__(81);
var ts_list_1 = __webpack_require__(31);
var dom_1 = __webpack_require__(0);
var Vault = /** @class */ (function (_super) {
    __extends(Vault, _super);
    function Vault(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, null, core_1.extend({
            mode: types_1.VaultMode.list,
            modeControls: true,
            toolbar: true,
            updateFromResponse: true,
            scaleFactor: 4,
            customScroll: true,
            uploader: {},
            progressBar: {},
        }, config)) || this;
        if (!_this.config.toolbar) {
            _this.config.uploader.autosend = true;
        }
        if (config.data) {
            _this.data = config.data;
            _this.events = config.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.data.config.init = function (obj) {
            obj.status = obj.status || types_1.FileStatus.uploaded;
            if (obj.file) {
                obj.size = obj.file.size;
                obj.name = obj.file.name;
            }
            else {
                obj.size = obj.size || 0;
                obj.name = obj.name || "";
            }
            if (obj.file && helper_1.isImage(obj)) {
                _this._readStack.add(obj, _this.uploader.config.autosend);
            }
            return obj;
        };
        _this._readStack = new ReadStackPreview_1.ReadStackPreview(_this.data);
        _this.uploader = new Uploader_1.Uploader(_this.config.uploader, _this.data, _this.events);
        _this._progressBar = new ProgressBar_1.ProgressBar(_this.events, _this.config.progressBar);
        _this.events.on(types_1.UploaderEvents.uploadProgress, function (progress, current, total) {
            return _this._progressBar.setState(progress, { current: current, total: total });
        });
        _this._initUI(container);
        _this._initEvents();
        return _this;
    }
    Vault.prototype.destructor = function () {
        this.toolbar.destructor();
        this._readStack.stop();
        this.uploader.unlinkDropArea();
        this.uploader.abort();
        this.unmount();
    };
    Vault.prototype.getRootView = function () {
        return this._layout.getRootView();
    };
    Vault.prototype.paint = function () {
        var isEmpty = this._canDrop || !this.data.getLength();
        this._activeView = isEmpty
            ? this._emptyField
            : this.config.mode === types_1.VaultMode.grid ||
                (this.toolbar && this.toolbar.getState().mode === types_1.VaultMode.grid)
                ? this.grid
                : this.list;
        this._layout.getCell("vault").attach(this._activeView);
    };
    Vault.prototype._initUI = function (container) {
        var vaultElements = [
            {
                id: "toolbar",
                css: "dhx_vault--toolbar",
                height: "content",
            },
            {
                id: "vault",
                css: "dhx_vault--container",
            },
        ];
        var layout = (this._layout = new ts_layout_1.Layout(container, {
            css: "dhx_vault",
            rows: vaultElements,
            on: this._getDragEvents(),
        }));
        this._initToolbar();
        layout.getCell("toolbar").attach(this.toolbar);
        this._initEmpty();
        this._initList();
        this._initGrid(container);
        if (!this.config.toolbar) {
            layout.getCell("toolbar").hide();
        }
        this.paint();
    };
    Vault.prototype._initList = function () {
        var supportsTouch = "ontouchstart" in document.documentElement;
        this.list = new ts_list_1.List(null, {
            data: this.data,
            dragMode: "both",
            multiselection: supportsTouch ? true : "ctrlClick",
            template: configs_1.listTemplate,
            eventHandlers: configs_1.getContainersEvents(this.data),
            keyNavigation: true,
        });
    };
    Vault.prototype._initGrid = function (container) {
        var supportsTouch = "ontouchstart" in document.documentElement;
        this.grid = new ts_dataview_1.DataView(null, {
            gap: 8,
            itemsInRow: 4,
            dragMode: "both",
            multiselection: supportsTouch ? true : "ctrlClick",
            data: this.data,
            template: configs_1.gridTemplate,
            eventHandlers: configs_1.getContainersEvents(this.data),
            keyNavigation: true,
        });
        this.grid.selection = this.list.selection;
        if (container) {
            if (typeof container === "string") {
                container = document.getElementById(container);
            }
            this.grid.config.itemsInRow = Math.floor(container.offsetWidth / 100);
        }
    };
    Vault.prototype._initToolbar = function () {
        this.toolbar = new ts_toolbar_1.Toolbar(null, { css: "vault-toolbar" });
        this.toolbar.data.parse([
            {
                id: "add",
                tooltip: en_1.default.add,
                type: "navItem",
                css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                icon: "dxi dxi-plus",
            },
            {
                id: "mode-separator",
                type: "separator",
            },
            {
                id: "list",
                tooltip: en_1.default.list,
                type: "navItem",
                css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                icon: "dxi dxi-view-sequential",
                active: this.config.mode === types_1.VaultMode.list,
                group: "mode",
            },
            {
                id: "grid",
                tooltip: en_1.default.grid,
                type: "navItem",
                css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                icon: "dxi dxi-view-grid",
                active: this.config.mode === types_1.VaultMode.grid,
                group: "mode",
            },
            {
                id: "upload-separator",
                type: "separator",
            },
            {
                id: "upload",
                tooltip: en_1.default.upload,
                type: "navItem",
                css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                icon: "dxi dxi-vault",
            },
            {
                id: "spacer",
                type: "spacer",
            },
            {
                id: "remove-all",
                tooltip: en_1.default.clearAll,
                type: "navItem",
                css: "dhx_toolbar-button--circle dhx_toolbar-button--icon",
                icon: "dxi dxi-delete-forever",
            },
        ]);
        if (!this.config.modeControls) {
            this.toolbar.hide(["mode-separator", "list", "grid", "upload-separator"]);
        }
        this._hideAdditionalButtons();
    };
    Vault.prototype._initEmpty = function () {
        var _this = this;
        return (this._emptyField = view_1.toViewLike(dom_1.create({
            render: function () {
                return dom_1.el(".dhx-dropable-area.drop-files-here", [
                    dom_1.el(".dhx-big-icon-block", [dom_1.el(".dxi.dxi-vault")]),
                    !_this._canDrop && dom_1.el(".drop-area-bold-text", en_1.default.dragAndDrop),
                    !_this._canDrop && dom_1.el(".drop-area-bold-text", en_1.default.filesOrFoldersHere),
                    !_this._canDrop && dom_1.el(".drop-area-light-text", en_1.default.or),
                    !_this._canDrop &&
                        dom_1.el("button.dhx_button.dhx_button--view_flat.dhx_btn--small.dhx_button--color_primary.dhx_button--size_small", {
                            onclick: function () { return _this.uploader.selectFile(); },
                        }, en_1.default.browse),
                ]);
            },
        })));
    };
    Vault.prototype._changeUI = function (mode) {
        this.config.mode = mode;
        this._activeView = mode === types_1.VaultMode.grid ? this.grid : this.list;
        if (!this.data.getLength()) {
            return;
        }
        this.paint();
    };
    Vault.prototype._initEvents = function () {
        var _this = this;
        this.data.events.on(ts_data_1.DataEvents.change, function () {
            if (!_this.data.getLength()) {
                _this._hideAdditionalButtons();
            }
            else {
                _this._showAdditionalButtons();
            }
            if (_this.config.downloadURL) {
                _this.data.forEach(function (item) {
                    if (!item.downloadURL) {
                        item.downloadURL = _this.config.downloadURL;
                    }
                });
            }
            _this.paint();
        });
        this.events.on(types_1.UploaderEvents.uploadBegin, function () {
            if (_this.config.toolbar) {
                _this._layout.getCell("toolbar").attach(_this._progressBar);
            }
        });
        this.events.on(types_1.UploaderEvents.uploadComplete, function () {
            if (_this.config.toolbar) {
                _this._layout.getCell("toolbar").attach(_this.toolbar);
            }
        });
        this.toolbar.events.on(ts_toolbar_1.NavigationBarEvents.click, function (id) {
            switch (id) {
                case "add":
                    _this.uploader.selectFile();
                    break;
                case "remove-all":
                    if (_this.data.getLength()) {
                        var items = _this._activeView.selection.getItem();
                        if (items && items.length > 0) {
                            items.forEach(function (item) {
                                helper_1.removeItem(_this.data, item.id);
                            });
                        }
                        else {
                            _this.data.removeAll();
                        }
                    }
                    break;
                case "list":
                case "grid":
                    _this._changeUI(id);
                    break;
                case "upload":
                    _this.uploader.send();
                    break;
            }
        });
        this.events.on(types_1.ProgressBarEvents.cancel, function () {
            _this.uploader.abort();
            _this.paint();
        });
    };
    Vault.prototype._getDragEvents = function () {
        var _this = this;
        var rect = {
            left: null,
            top: null,
            width: null,
            height: null,
        };
        return {
            dragleave: function (e) {
                if (!_this._canDrop) {
                    return;
                }
                if (e.pageX > rect.left + rect.width - 1 ||
                    e.pageX < rect.left ||
                    e.pageY > rect.top + rect.height - 1 ||
                    e.pageY < rect.top) {
                    _this._canDrop = false;
                    if (_this.config.toolbar) {
                        _this._layout.getCell("toolbar").show();
                    }
                    _this._layout.config.css = "dhx_vault";
                    _this.paint();
                }
            },
            dragenter: function (e) {
                e.preventDefault();
                if (_this.uploader.isActive || _this._canDrop) {
                    return;
                }
                var types = e.dataTransfer.types;
                for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
                    var type = types_2[_i];
                    if (type !== "Files" && type !== "application/x-moz-file") {
                        _this._canDrop = false;
                        return;
                    }
                }
                _this._canDrop = true;
                var clientRect = _this.getRootView().node.el.getBoundingClientRect();
                rect.left = clientRect.left + window.pageXOffset;
                rect.top = clientRect.top + window.pageYOffset;
                rect.width = clientRect.width;
                rect.height = clientRect.height;
                _this._canDrop = true;
                if (_this.config.toolbar) {
                    _this._layout.getCell("toolbar").hide();
                }
                _this._layout.config.css = "dhx_vault dhx-dragin " + (_this._canDrop ? " drop-here" : "");
                _this.paint();
            },
            dragover: function (e) {
                e.preventDefault();
            },
            drop: function (e) {
                e.preventDefault();
                if (!_this._canDrop) {
                    return;
                }
                var dataTransfer = e.dataTransfer;
                _this.uploader.parseFiles(dataTransfer);
                _this._canDrop = false;
                if (_this.config.toolbar) {
                    _this._layout.getCell("toolbar").show();
                }
                _this._layout.config.css = "dhx_vault";
                _this.paint();
            },
        };
    };
    Vault.prototype._hideAdditionalButtons = function () {
        var _this = this;
        var modeControls = ["mode-separator", "list", "grid"];
        var uploadControls = ["upload", this.config.modeControls ? "upload-separator" : ""];
        var elementsList = __spreadArrays(modeControls, uploadControls, ["remove-all"]);
        elementsList.forEach(function (item) {
            if (_this.toolbar.data.getItem(item) && !_this.toolbar.data.getItem(item).hidden) {
                _this.toolbar.hide(item);
            }
        });
    };
    Vault.prototype._showAdditionalButtons = function () {
        var _this = this;
        var modeControls = this.config.modeControls ? ["mode-separator", "list", "grid"] : [];
        var uploadControls = !this.uploader.config.autosend
            ? ["upload", this.config.modeControls ? "upload-separator" : ""]
            : [];
        var elementsList = __spreadArrays(modeControls, uploadControls, ["remove-all"]);
        this.toolbar.data.update("remove-all", {
            tooltip: this._activeView.selection && this._activeView.selection.getItem()
                ? en_1.default.clearAllSelected
                : en_1.default.clearAll,
        });
        elementsList.forEach(function (item) {
            if (_this.toolbar.data.getItem(item) && _this.toolbar.data.getItem(item).hidden) {
                _this.toolbar.show(item);
            }
        });
    };
    return Vault;
}(view_1.View));
exports.Vault = Vault;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(58));
__export(__webpack_require__(13));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __webpack_require__(59);
var types_1 = __webpack_require__(13);
var dom_1 = __webpack_require__(0);
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        // root layout
        _this._root = _this.config.parent || _this;
        _this._all = {};
        _this._parseConfig();
        if (_this.config.activeTab) {
            _this.config.activeView = _this.config.activeTab;
        }
        // Need replace to tabbar
        if (_this.config.views) {
            _this.config.activeView = _this.config.activeView || _this._cells[0].id;
            _this._isViewLayout = true;
        }
        if (!config.parent) {
            var view = dom_1.create({ render: function () { return _this.toVDOM(); } }, _this);
            _this.mount(parent, view);
        }
        return _this;
    }
    Layout.prototype.toVDOM = function () {
        if (this._isViewLayout) {
            var roots = [this.getCell(this.config.activeView).toVDOM()];
            return _super.prototype.toVDOM.call(this, roots);
        }
        var nodes = [];
        this._cells.forEach(function (cell) {
            var node = cell.toVDOM();
            if (Array.isArray(node)) {
                nodes = nodes.concat(node);
            }
            else {
                nodes.push(node);
            }
        });
        return _super.prototype.toVDOM.call(this, nodes);
    };
    Layout.prototype.removeCell = function (id) {
        if (!this.events.fire(types_1.LayoutEvents.beforeRemove, [id])) {
            return;
        }
        var root = this.config.parent || this;
        if (root !== this) {
            return root.removeCell(id);
        }
        // this === root layout
        var view = this.getCell(id);
        if (view) {
            var parent_1 = view.getParent();
            delete this._all[id];
            parent_1._cells = parent_1._cells.filter(function (cell) { return cell.id !== id; });
            parent_1.paint();
        }
        this.events.fire(types_1.LayoutEvents.afterRemove, [id]);
    };
    Layout.prototype.addCell = function (config, index) {
        if (index === void 0) { index = -1; }
        if (!this.events.fire(types_1.LayoutEvents.beforeAdd, [config.id])) {
            return;
        }
        var view = this._createCell(config);
        if (index < 0) {
            index = this._cells.length + index + 1;
        }
        this._cells.splice(index, 0, view);
        this.paint();
        if (!this.events.fire(types_1.LayoutEvents.afterAdd, [config.id])) {
            return;
        }
    };
    Layout.prototype.getId = function (index) {
        if (index < 0) {
            index = this._cells.length + index;
        }
        return this._cells[index] ? this._cells[index].id : undefined;
    };
    Layout.prototype.getRefs = function (name) {
        return this._root.getRootView().refs[name];
    };
    Layout.prototype.getCell = function (id) {
        return this._root._all[id];
    };
    Layout.prototype.forEach = function (cb, parent, level) {
        if (level === void 0) { level = Infinity; }
        if (!this._haveCells(parent) || level < 1) {
            return;
        }
        var array;
        if (parent) {
            array = this._root._all[parent]._cells;
        }
        else {
            array = this._root._cells;
        }
        for (var index = 0; index < array.length; index++) {
            var cell = array[index];
            cb.call(this, cell, index, array);
            if (this._haveCells(cell.id)) {
                cell.forEach(cb, cell.id, --level);
            }
        }
    };
    // TODO: remove suite_7.0
    Layout.prototype.cell = function (id) {
        return this.getCell(id);
    };
    Layout.prototype._getCss = function (content) {
        var layoutCss = this._xLayout ? "dhx_layout-columns" : "dhx_layout-rows";
        var directionCss = this.config.align ? " " + layoutCss + "--" + this.config.align : "";
        if (content) {
            return (layoutCss +
                " dhx_layout-cell" +
                (this.config.align ? " dhx_layout-cell--" + this.config.align : ""));
        }
        else {
            var cellCss = this.config.parent ? _super.prototype._getCss.call(this) : "dhx_widget dhx_layout";
            var fullModeCss = this.config.parent ? "" : " dhx_layout-cell";
            return cellCss + (this.config.full ? fullModeCss : " " + layoutCss) + directionCss;
        }
    };
    Layout.prototype._parseConfig = function () {
        var _this = this;
        var config = this.config;
        var cells = config.rows || config.cols || config.views || [];
        this._xLayout = !config.rows;
        this._cells = cells.map(function (a) { return _this._createCell(a); });
    };
    Layout.prototype._createCell = function (cell) {
        var view;
        if (cell.rows || cell.cols || cell.views) {
            if (!cell.type && this._root.config.type) {
                cell.type = this._root.config.type;
            }
            cell.parent = this._root;
            view = new Layout(this, cell);
        }
        else {
            view = new Cell_1.Cell(this, cell);
        }
        // FIxME
        this._root._all[view.id] = view;
        return view;
    };
    Layout.prototype._haveCells = function (id) {
        if (id) {
            var array = this._root._all[id];
            return array._cells && array._cells.length > 0;
        }
        return Object.keys(this._all).length > 0;
    };
    return Layout;
}(Cell_1.Cell));
exports.Layout = Layout;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var types_1 = __webpack_require__(13);
var helpers_1 = __webpack_require__(61);
var events_1 = __webpack_require__(5);
var CssManager_1 = __webpack_require__(62);
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        _this._disabled = [];
        var p = parent;
        if (p && p.isVisible) {
            _this._parent = p;
        }
        if (_this._parent && _this._parent.events) {
            _this.events = _this._parent.events;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
        }
        _this._cssManager = new CssManager_1.CssManager();
        _this.config.full =
            _this.config.full === undefined
                ? Boolean(_this.config.header ||
                    _this.config.collapsable ||
                    _this.config.headerHeight ||
                    _this.config.headerIcon ||
                    _this.config.headerImage)
                : _this.config.full;
        _this._initHandlers();
        _this.id = _this.config.id || core_1.uid();
        return _this;
    }
    Cell.prototype.paint = function () {
        if (this.isVisible()) {
            var view = this.getRootView();
            if (view) {
                view.redraw();
            }
            else {
                this._parent.paint();
            }
        }
    };
    Cell.prototype.isVisible = function () {
        // top level node
        if (!this._parent) {
            if (this._container && this._container.tagName) {
                return true;
            }
            return Boolean(this.getRootNode());
        }
        // check active view in case of multiview
        var active = this._parent.config.activeView;
        if (active && active !== this.id) {
            return false;
        }
        // check that all parents of the cell are visible as well
        return !this.config.hidden && (!this._parent || this._parent.isVisible());
    };
    Cell.prototype.hide = function () {
        if (!this.events.fire(types_1.LayoutEvents.beforeHide, [this.id])) {
            return;
        }
        this.config.hidden = true;
        if (this._parent && this._parent.paint) {
            this._parent.paint();
        }
        this.events.fire(types_1.LayoutEvents.afterHide, [this.id]);
    };
    Cell.prototype.show = function () {
        if (!this.events.fire(types_1.LayoutEvents.beforeShow, [this.id])) {
            return;
        }
        if (this._parent && this._parent.config && this._parent.config.activeView !== undefined) {
            this._parent.config.activeView = this.id;
        }
        else {
            this.config.hidden = false;
        }
        if (this._parent && !this._parent.isVisible()) {
            this._parent.show();
        }
        this.paint();
        this.events.fire(types_1.LayoutEvents.afterShow, [this.id]);
    };
    Cell.prototype.expand = function () {
        if (!this.events.fire(types_1.LayoutEvents.beforeExpand, [this.id])) {
            return;
        }
        this.config.collapsed = false;
        this.events.fire(types_1.LayoutEvents.afterExpand, [this.id]);
        this.paint();
    };
    Cell.prototype.collapse = function () {
        if (!this.events.fire(types_1.LayoutEvents.beforeCollapse, [this.id])) {
            return;
        }
        this.config.collapsed = true;
        this.events.fire(types_1.LayoutEvents.afterCollapse, [this.id]);
        this.paint();
    };
    Cell.prototype.toggle = function () {
        if (this.config.collapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    };
    Cell.prototype.getParent = function () {
        return this._parent;
    };
    Cell.prototype.destructor = function () {
        this.config = null;
        this.unmount();
    };
    Cell.prototype.getWidget = function () {
        return this._ui;
    };
    Cell.prototype.getCellView = function () {
        return this._parent && this._parent.getRefs(this._uid);
    };
    Cell.prototype.attach = function (name, config) {
        this.config.html = null;
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    },
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Cell.prototype.attachHTML = function (html) {
        this.config.html = html;
        this.paint();
    };
    Cell.prototype.toVDOM = function (nodes) {
        var _a;
        if (this.config === null) {
            this.config = {};
        }
        if (this.config.hidden) {
            return;
        }
        var style = this._calculateStyle();
        var stylePadding = core_1.isDefined(this.config.padding)
            ? !isNaN(Number(this.config.padding))
                ? { padding: this.config.padding + "px" }
                : { padding: this.config.padding }
            : "";
        var fullStyle = this.config.full || this.config.html ? style : __assign(__assign({}, style), stylePadding);
        var cssClassName = this._cssManager.add(fullStyle);
        var kids;
        if (this._ui) {
            var view = this._ui.getRootView();
            if (view.render) {
                view = dom_1.inject(view);
            }
            kids = [view];
        }
        else {
            kids = nodes || null;
        }
        var resizer = this.config.resizable && !this._isLastCell() && !this.config.collapsed
            ? dom_1.el(".dhx_layout-resizer." +
                (this._isXDirection() ? "dhx_layout-resizer--x" : "dhx_layout-resizer--y"), __assign(__assign({}, this._resizerHandlers), { _ref: "resizer_" + this._uid }), [
                dom_1.el("span.dhx_layout-resizer__icon", {
                    class: "dxi " +
                        (this._isXDirection() ? "dxi-dots-vertical" : "dxi-dots-horizontal"),
                }),
            ])
            : null;
        var handlers = {};
        if (this.config.on) {
            for (var key in this.config.on) {
                handlers["on" + key] = this.config.on[key];
            }
        }
        var typeClass = "";
        var isParent = this.config.cols || this.config.rows;
        if (this.config.type && isParent) {
            switch (this.config.type) {
                case "line":
                    typeClass = " dhx_layout-line";
                    break;
                case "wide":
                    typeClass = " dhx_layout-wide";
                    break;
                case "space":
                    typeClass = " dhx_layout-space";
                    break;
                default:
                    break;
            }
        }
        var cell = dom_1.el("div", __assign(__assign((_a = { _key: this._uid, _ref: this._uid }, _a["aria-labelledby"] = this.config.id ? "tab-content-" + this.config.id : null, _a), handlers), { class: this._getCss(false) +
                (this.config.css ? " " + this.config.css : "") +
                (fullStyle ? " " + cssClassName : "") +
                (this.config.collapsed ? " dhx_layout-cell--collapsed" : "") +
                (this.config.resizable ? " dhx_layout-cell--resizable" : "") +
                (this.config.type ? typeClass : "") }), this.config.full
            ? [
                dom_1.el("div", {
                    tabindex: this.config.collapsable ? "0" : "-1",
                    class: "dhx_layout-cell-header" +
                        (this._isXDirection()
                            ? " dhx_layout-cell-header--col"
                            : " dhx_layout-cell-header--row") +
                        (this.config.collapsable ? " dhx_layout-cell-header--collapseble" : "") +
                        (this.config.collapsed ? " dhx_layout-cell-header--collapsed" : "") +
                        (((this.getParent() || {}).config || {}).isAccordion
                            ? " dhx_layout-cell-header--accordion"
                            : ""),
                    style: {
                        height: this.config.headerHeight,
                    },
                    onclick: this._handlers.toggle,
                    onkeydown: this._handlers.enterCollapse,
                }, [
                    this.config.headerIcon &&
                        dom_1.el("span.dhx_layout-cell-header__icon", {
                            class: this.config.headerIcon,
                        }),
                    this.config.headerImage &&
                        dom_1.el(".dhx_layout-cell-header__image-wrapper", [
                            dom_1.el("img", {
                                src: this.config.headerImage,
                                class: "dhx_layout-cell-header__image",
                            }),
                        ]),
                    this.config.header &&
                        dom_1.el("h3.dhx_layout-cell-header__title", this.config.header),
                    this.config.collapsable
                        ? dom_1.el("div.dhx_layout-cell-header__collapse-icon", {
                            class: this._getCollapseIcon(),
                        })
                        : dom_1.el("div.dhx_layout-cell-header__collapse-icon", {
                            class: "dxi dxi-empty",
                        }),
                ]),
                !this.config.collapsed
                    ? dom_1.el("div", {
                        style: __assign(__assign({}, stylePadding), { height: "calc(100% - " + (this.config.headerHeight || 37) + "px)" }),
                        ".innerHTML": this.config.html,
                        class: this._getCss(true) + " dhx_layout-cell-content",
                    }, kids)
                    : null,
            ]
            : this.config.html && !kids
                ? [
                    dom_1.el(".dhx_layout-cell-content", {
                        ".innerHTML": this.config.html,
                        style: stylePadding,
                    }),
                ]
                : kids);
        return resizer ? [cell, resizer] : cell;
    };
    Cell.prototype._getCss = function (_content) {
        return "dhx_layout-cell";
    };
    Cell.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            enterCollapse: function (e) {
                if (e.keyCode === 13) {
                    _this._handlers.toggle();
                }
            },
            collapse: function () {
                if (!_this.config.collapsable) {
                    return;
                }
                _this.collapse();
            },
            expand: function () {
                if (!_this.config.collapsable) {
                    return;
                }
                _this.expand();
            },
            toggle: function () {
                if (!_this.config.collapsable) {
                    return;
                }
                _this.toggle();
            },
        };
        var blockOpts = {
            left: null,
            top: null,
            isActive: false,
            range: null,
            xLayout: null,
            nextCell: null,
            size: null,
            resizerLength: null,
            mode: null,
            percentsum: null,
            margin: null,
        };
        var resizeMove = function (event) {
            if (!blockOpts.isActive || blockOpts.mode === types_1.resizeMode.unknown) {
                return;
            }
            var clientX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
            var clientY = event.targetTouches ? event.targetTouches[0].clientY : event.clientY;
            var newValue = blockOpts.xLayout
                ? clientX - blockOpts.range.min + window.pageXOffset
                : clientY - blockOpts.range.min + window.pageYOffset;
            var prop = blockOpts.xLayout ? "width" : "height";
            if (newValue < 0) {
                newValue = blockOpts.resizerLength / 2;
            }
            else if (newValue > blockOpts.size) {
                newValue = blockOpts.size - blockOpts.resizerLength;
            }
            switch (blockOpts.mode) {
                case types_1.resizeMode.pixels:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    blockOpts.nextCell.config[prop] =
                        blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case types_1.resizeMode.mixedpx1:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case types_1.resizeMode.mixedpx2:
                    blockOpts.nextCell.config[prop] =
                        blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case types_1.resizeMode.percents:
                    _this.config[prop] = (newValue / blockOpts.size) * blockOpts.percentsum + "%";
                    blockOpts.nextCell.config[prop] =
                        ((blockOpts.size - newValue) / blockOpts.size) * blockOpts.percentsum + "%";
                    break;
                case types_1.resizeMode.mixedperc1:
                    _this.config[prop] = (newValue / blockOpts.size) * blockOpts.percentsum + "%";
                    break;
                case types_1.resizeMode.mixedperc2:
                    blockOpts.nextCell.config[prop] =
                        ((blockOpts.size - newValue) / blockOpts.size) * blockOpts.percentsum + "%";
                    break;
            }
            _this.paint();
            _this.events.fire(types_1.LayoutEvents.resize, [_this.id]);
        };
        var resizeEnd = function (event) {
            blockOpts.isActive = false;
            document.body.classList.remove("dhx_no-select--resize");
            if (!event.targetTouches) {
                document.removeEventListener("mouseup", resizeEnd);
                document.removeEventListener("mousemove", resizeMove);
            }
            else {
                document.removeEventListener("touchend", resizeEnd);
                document.removeEventListener("touchmove", resizeMove);
            }
            _this.events.fire(types_1.LayoutEvents.afterResizeEnd, [_this.id]);
        };
        var resizeStart = function (event) {
            event.targetTouches && event.preventDefault();
            if (event.which === 3) {
                return;
            }
            if (blockOpts.isActive) {
                resizeEnd(event);
            }
            if (!_this.events.fire(types_1.LayoutEvents.beforeResizeStart, [_this.id])) {
                return;
            }
            document.body.classList.add("dhx_no-select--resize");
            var block = _this.getCellView();
            var nextCell = _this._getNextCell();
            var nextBlock = nextCell.getCellView();
            var resizerBlock = _this._getResizerView();
            var blockOffsets = block.el.getBoundingClientRect();
            var resizerOffsets = resizerBlock.el.getBoundingClientRect();
            var nextBlockOffsets = nextBlock.el.getBoundingClientRect();
            blockOpts.xLayout = _this._isXDirection();
            blockOpts.left = blockOffsets.left + window.pageXOffset;
            blockOpts.top = blockOffsets.top + window.pageYOffset;
            blockOpts.margin = helpers_1.getMarginSize(_this.getParent().config, blockOpts.xLayout);
            blockOpts.range = helpers_1.getBlockRange(blockOffsets, nextBlockOffsets, blockOpts.xLayout);
            blockOpts.size = blockOpts.range.max - blockOpts.range.min - blockOpts.margin;
            blockOpts.isActive = true;
            blockOpts.nextCell = nextCell;
            blockOpts.resizerLength = blockOpts.xLayout ? resizerOffsets.width : resizerOffsets.height;
            blockOpts.mode = helpers_1.getResizeMode(blockOpts.xLayout, _this.config, nextCell.config);
            if (blockOpts.mode === types_1.resizeMode.percents) {
                var field = blockOpts.xLayout ? "width" : "height";
                blockOpts.percentsum =
                    parseFloat(_this.config[field].slice(0, -1)) +
                        parseFloat(nextCell.config[field].slice(0, -1));
            }
            if (blockOpts.mode === types_1.resizeMode.mixedperc1) {
                var field = blockOpts.xLayout ? "width" : "height";
                blockOpts.percentsum =
                    (1 / (blockOffsets[field] / (blockOpts.size - blockOpts.resizerLength))) *
                        parseFloat(_this.config[field].slice(0, -1));
            }
            if (blockOpts.mode === types_1.resizeMode.mixedperc2) {
                var field = blockOpts.xLayout ? "width" : "height";
                blockOpts.percentsum =
                    (1 / (nextBlockOffsets[field] / (blockOpts.size - blockOpts.resizerLength))) *
                        parseFloat(nextCell.config[field]);
            }
        };
        this._resizerHandlers = {
            onmousedown: function (e) {
                resizeStart(e);
                document.addEventListener("mouseup", resizeEnd);
                document.addEventListener("mousemove", resizeMove);
            },
            ontouchstart: function (e) {
                resizeStart(e);
                document.addEventListener("touchend", resizeEnd);
                document.addEventListener("touchmove", resizeMove);
            },
            ondragstart: function (e) { return e.preventDefault(); },
        };
    };
    Cell.prototype._getCollapseIcon = function () {
        if (this._isXDirection() && this.config.collapsed) {
            return "dxi dxi-chevron-right";
        }
        if (this._isXDirection() && !this.config.collapsed) {
            return "dxi dxi-chevron-left";
        }
        if (!this._isXDirection() && this.config.collapsed) {
            return "dxi dxi-chevron-up";
        }
        if (!this._isXDirection() && !this.config.collapsed) {
            return "dxi dxi-chevron-down";
        }
    };
    Cell.prototype._isLastCell = function () {
        var parent = this._parent;
        return parent && parent._cells.indexOf(this) === parent._cells.length - 1;
    };
    Cell.prototype._getNextCell = function () {
        var parent = this._parent;
        var index = parent._cells.indexOf(this);
        return parent._cells[index + 1];
    };
    Cell.prototype._getResizerView = function () {
        return this._parent.getRefs("resizer_" + this._uid);
    };
    Cell.prototype._isXDirection = function () {
        return this._parent && this._parent._xLayout;
    };
    Cell.prototype._calculateStyle = function () {
        var config = this.config;
        if (!config) {
            return;
        }
        var style = {};
        var autoWidth = false;
        var autoHeight = false;
        if (!isNaN(Number(config.width)))
            config.width = config.width + "px";
        if (!isNaN(Number(config.height)))
            config.height = config.height + "px";
        if (!isNaN(Number(config.minWidth)))
            config.minWidth = config.minWidth + "px";
        if (!isNaN(Number(config.minHeight)))
            config.minHeight = config.minHeight + "px";
        if (!isNaN(Number(config.maxWidth)))
            config.maxWidth = config.maxWidth + "px";
        if (!isNaN(Number(config.maxHeight)))
            config.maxHeight = config.maxHeight + "px";
        if (config.width === "content")
            autoWidth = true;
        if (config.height === "content")
            autoHeight = true;
        var _a = config, width = _a.width, height = _a.height, cols = _a.cols, rows = _a.rows, minWidth = _a.minWidth, minHeight = _a.minHeight, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, gravity = _a.gravity, collapsed = _a.collapsed;
        var gravityNumber = core_1.sign(gravity) === -1 ? 0 : gravity;
        if (typeof gravity === "boolean") {
            gravityNumber = gravity ? 1 : 0;
        }
        var fixed = typeof gravity === "boolean" ? !gravity : core_1.sign(gravity) === -1;
        if (this._isXDirection()) {
            if (width || (gravity === undefined && (minWidth || maxWidth))) {
                fixed = true;
            }
        }
        else {
            if (height || (gravity === undefined && (minHeight || maxHeight))) {
                fixed = true;
            }
        }
        var grow = fixed ? 0 : gravityNumber || 1;
        var fillSpace = this._isXDirection() ? "x" : "y";
        if (minWidth !== undefined)
            style.minWidth = minWidth;
        if (minHeight !== undefined)
            style.minHeight = minHeight;
        if (maxWidth !== undefined)
            style.maxWidth = maxWidth;
        if (maxHeight !== undefined)
            style.maxHeight = maxHeight;
        if (this._parent === undefined && !fillSpace !== undefined) {
            fillSpace = true;
        }
        if (width !== undefined && width !== "content") {
            style.width = width;
        }
        else {
            if (fillSpace === true) {
                style.width = "100%";
            }
            else if (fillSpace === "x") {
                if (autoWidth) {
                    style.flex = "0 0 auto";
                }
                else {
                    var isAuto = this._isXDirection() ? "1px" : "auto";
                    style.flex = grow + " " + (cols || rows ? "0 " + isAuto : "1 auto");
                }
            }
        }
        if (height !== undefined && height !== "content") {
            style.height = height;
        }
        else {
            if (fillSpace === true) {
                style.height = "100%";
            }
            else if (fillSpace === "y") {
                if (autoHeight) {
                    style.flex = "0 0 auto";
                }
                else {
                    var isAuto = !this._isXDirection() ? "1px" : "auto";
                    style.flex = grow + " " + (cols || rows ? "0 " + isAuto : "1 auto");
                }
            }
        }
        if (fillSpace === true && config.width === undefined && config.height === undefined) {
            style.flex = grow + " 1 auto";
        }
        if (collapsed) {
            if (this._isXDirection()) {
                style.width = "auto";
            }
            else {
                style.height = "auto";
            }
            style.flex = "0 0 auto";
        }
        return style;
    };
    return Cell;
}(view_1.View));
exports.Cell = Cell;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
*/

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

// NOTE: if adding a new *VNode* type, make it < COMMENT and renumber rest.
// There are some places that test <= COMMENT to assert if node is a VNode

// VNode types
var ELEMENT	= 1;
var TEXT		= 2;
var COMMENT	= 3;

// placeholder types
var VVIEW		= 4;
var VMODEL		= 5;

var ENV_DOM = typeof window !== "undefined";
var win = ENV_DOM ? window : {};
var rAF = win.requestAnimationFrame;

var emptyObj = {};

function noop() {}

var isArr = Array.isArray;

function isSet(val) {
	return val != null;
}

function isPlainObj(val) {
	return val != null && val.constructor === Object;		//  && typeof val === "object"
}

function insertArr(targ, arr, pos, rem) {
	targ.splice.apply(targ, [pos, rem].concat(arr));
}

function isVal(val) {
	var t = typeof val;
	return t === "string" || t === "number";
}

function isFunc(val) {
	return typeof val === "function";
}

function isProm(val) {
	return typeof val === "object" && isFunc(val.then);
}



function assignObj(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++)
		{ for (var k in args[i])
			{ targ[k] = args[i][k]; } }

	return targ;
}

// export const defProp = Object.defineProperty;

function deepSet(targ, path, val) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			{ targ[seg] = val; }
		else
			{ targ[seg] = targ = targ[seg] || {}; }
	}
}

/*
export function deepUnset(targ, path) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			targ[seg] = val;
		else
			targ[seg] = targ = targ[seg] || {};
	}
}
*/

function sliceArgs(args, offs) {
	var arr = [];
	for (var i = offs; i < args.length; i++)
		{ arr.push(args[i]); }
	return arr;
}

function cmpObj(a, b) {
	for (var i in a)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

function cmpArr(a, b) {
	var alen = a.length;

	if (b.length !== alen)
		{ return false; }

	for (var i = 0; i < alen; i++)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

// https://github.com/darsain/raft
// rAF throttler, aggregates multiple repeated redraw calls within single animframe
function raft(fn) {
	if (!rAF)
		{ return fn; }

	var id, ctx, args;

	function call() {
		id = 0;
		fn.apply(ctx, args);
	}

	return function() {
		ctx = this;
		args = arguments;
		if (!id) { id = rAF(call); }
	};
}

function curry(fn, args, ctx) {
	return function() {
		return fn.apply(ctx, args);
	};
}

/*
export function prop(val, cb, ctx, args) {
	return function(newVal, execCb) {
		if (newVal !== undefined && newVal !== val) {
			val = newVal;
			execCb !== false && isFunc(cb) && cb.apply(ctx, args);
		}

		return val;
	};
}
*/

/*
// adapted from https://github.com/Olical/binary-search
export function binaryKeySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

    return -1;
}
*/

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
// impl borrowed from https://github.com/ivijs/ivi
function longestIncreasingSubsequence(a) {
	var p = a.slice();
	var result = [];
	result.push(0);
	var u;
	var v;

	for (var i = 0, il = a.length; i < il; ++i) {
		var j = result[result.length - 1];
		if (a[j] < a[i]) {
			p[i] = j;
			result.push(i);
			continue;
		}

		u = 0;
		v = result.length - 1;

		while (u < v) {
			var c = ((u + v) / 2) | 0;
			if (a[result[c]] < a[i]) {
				u = c + 1;
			} else {
				v = c;
			}
		}

		if (a[i] < a[result[u]]) {
			if (u > 0) {
				p[i] = result[u - 1];
			}
			result[u] = i;
		}
	}

	u = result.length;
	v = result[u - 1];

	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}

	return result;
}

// based on https://github.com/Olical/binary-search
function binaryFindLarger(item, list) {
	var min = 0;
	var max = list.length - 1;
	var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

	return (min == list.length) ? null : min;

//	return -1;
}

function isEvProp(name) {
	return name[0] === "o" && name[1] === "n";
}

function isSplProp(name) {
	return name[0] === "_";
}

function isStyleProp(name) {
	return name === "style";
}

function repaint(node) {
	node && node.el && node.el.offsetHeight;
}

function isHydrated(vm) {
	return vm.node != null && vm.node.el != null;
}

// tests interactive props where real val should be compared
function isDynProp(tag, attr) {
//	switch (tag) {
//		case "input":
//		case "textarea":
//		case "select":
//		case "option":
			switch (attr) {
				case "value":
				case "checked":
				case "selected":
//				case "selectedIndex":
					return true;
			}
//	}

	return false;
}

function getVm(n) {
	n = n || emptyObj;
	while (n.vm == null && n.parent)
		{ n = n.parent; }
	return n.vm;
}

function VNode() {}

var VNodeProto = VNode.prototype = {
	constructor: VNode,

	type:	null,

	vm:		null,

	// all this stuff can just live in attrs (as defined) just have getters here for it
	key:	null,
	ref:	null,
	data:	null,
	hooks:	null,
	ns:		null,

	el:		null,

	tag:	null,
	attrs:	null,
	body:	null,

	flags:	0,

	_class:	null,
	_diff:	null,

	// pending removal on promise resolution
	_dead:	false,
	// part of longest increasing subsequence?
	_lis:	false,

	idx:	null,
	parent:	null,

	/*
	// break out into optional fluent module
	key:	function(val) { this.key	= val; return this; },
	ref:	function(val) { this.ref	= val; return this; },		// deep refs
	data:	function(val) { this.data	= val; return this; },
	hooks:	function(val) { this.hooks	= val; return this; },		// h("div").hooks()
	html:	function(val) { this.html	= true; return this.body(val); },

	body:	function(val) { this.body	= val; return this; },
	*/
};

function defineText(body) {
	var node = new VNode;
	node.type = TEXT;
	node.body = body;
	return node;
}

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh

var tagCache = {};

var RE_ATTRS = /\[(\w+)(?:=(\w+))?\]/g;

function cssTag(raw) {
	{
		var cached = tagCache[raw];

		if (cached == null) {
			var tag, id, cls, attr;

			tagCache[raw] = cached = {
				tag:	(tag	= raw.match( /^[-\w]+/))		?	tag[0]						: "div",
				id:		(id		= raw.match( /#([-\w]+)/))		? 	id[1]						: null,
				class:	(cls	= raw.match(/\.([-\w.]+)/))		?	cls[1].replace(/\./g, " ")	: null,
				attrs:	null,
			};

			while (attr = RE_ATTRS.exec(raw)) {
				if (cached.attrs == null)
					{ cached.attrs = {}; }
				cached.attrs[attr[1]] = attr[2] || "";
			}
		}

		return cached;
	}
}

// (de)optimization flags

// forces slow bottom-up removeChild to fire deep willRemove/willUnmount hooks,
var DEEP_REMOVE = 1;
// prevents inserting/removing/reordering of children
var FIXED_BODY = 2;
// enables fast keyed lookup of children via binary search, expects homogeneous keyed body
var KEYED_LIST = 4;
// indicates an vnode match/diff/recycler function for body
var LAZY_LIST = 8;

function initElementNode(tag, attrs, body, flags) {
	var node = new VNode;

	node.type = ELEMENT;

	if (isSet(flags))
		{ node.flags = flags; }

	node.attrs = attrs;

	var parsed = cssTag(tag);

	node.tag = parsed.tag;

	// meh, weak assertion, will fail for id=0, etc.
	if (parsed.id || parsed.class || parsed.attrs) {
		var p = node.attrs || {};

		if (parsed.id && !isSet(p.id))
			{ p.id = parsed.id; }

		if (parsed.class) {
			node._class = parsed.class;		// static class
			p.class = parsed.class + (isSet(p.class) ? (" " + p.class) : "");
		}
		if (parsed.attrs) {
			for (var key in parsed.attrs)
				{ if (!isSet(p[key]))
					{ p[key] = parsed.attrs[key]; } }
		}

//		if (node.attrs !== p)
			node.attrs = p;
	}

	var mergedAttrs = node.attrs;

	if (isSet(mergedAttrs)) {
		if (isSet(mergedAttrs._key))
			{ node.key = mergedAttrs._key; }

		if (isSet(mergedAttrs._ref))
			{ node.ref = mergedAttrs._ref; }

		if (isSet(mergedAttrs._hooks))
			{ node.hooks = mergedAttrs._hooks; }

		if (isSet(mergedAttrs._data))
			{ node.data = mergedAttrs._data; }

		if (isSet(mergedAttrs._flags))
			{ node.flags = mergedAttrs._flags; }

		if (!isSet(node.key)) {
			if (isSet(node.ref))
				{ node.key = node.ref; }
			else if (isSet(mergedAttrs.id))
				{ node.key = mergedAttrs.id; }
			else if (isSet(mergedAttrs.name))
				{ node.key = mergedAttrs.name + (mergedAttrs.type === "radio" || mergedAttrs.type === "checkbox" ? mergedAttrs.value : ""); }
		}
	}

	if (body != null)
		{ node.body = body; }

	return node;
}

function setRef(vm, name, node) {
	var path = ["refs"].concat(name.split("."));
	deepSet(vm, path, node);
}

function setDeepRemove(node) {
	while (node = node.parent)
		{ node.flags |= DEEP_REMOVE; }
}

// vnew, vold
function preProc(vnew, parent, idx, ownVm) {
	if (vnew.type === VMODEL || vnew.type === VVIEW)
		{ return; }

	vnew.parent = parent;
	vnew.idx = idx;
	vnew.vm = ownVm;

	if (vnew.ref != null)
		{ setRef(getVm(vnew), vnew.ref, vnew); }

	var nh = vnew.hooks,
		vh = ownVm && ownVm.hooks;

	if (nh && (nh.willRemove || nh.didRemove) ||
		vh && (vh.willUnmount || vh.didUnmount))
		{ setDeepRemove(vnew); }

	if (isArr(vnew.body))
		{ preProcBody(vnew); }
	else {}
}

function preProcBody(vnew) {
	var body = vnew.body;

	for (var i = 0; i < body.length; i++) {
		var node2 = body[i];

		// remove false/null/undefined
		if (node2 === false || node2 == null)
			{ body.splice(i--, 1); }
		// flatten arrays
		else if (isArr(node2)) {
			insertArr(body, node2, i--, 1);
		}
		else {
			if (node2.type == null)
				{ body[i] = node2 = defineText(""+node2); }

			if (node2.type === TEXT) {
				// remove empty text nodes
				if (node2.body == null || node2.body === "")
					{ body.splice(i--, 1); }
				// merge with previous text node
				else if (i > 0 && body[i-1].type === TEXT) {
					body[i-1].body += node2.body;
					body.splice(i--, 1);
				}
				else
					{ preProc(node2, vnew, i, null); }
			}
			else
				{ preProc(node2, vnew, i, null); }
		}
	}
}

var unitlessProps = {
	animationIterationCount: true,
	boxFlex: true,
	boxFlexGroup: true,
	boxOrdinalGroup: true,
	columnCount: true,
	flex: true,
	flexGrow: true,
	flexPositive: true,
	flexShrink: true,
	flexNegative: true,
	flexOrder: true,
	gridRow: true,
	gridColumn: true,
	order: true,
	lineClamp: true,

	borderImageOutset: true,
	borderImageSlice: true,
	borderImageWidth: true,
	fontWeight: true,
	lineHeight: true,
	opacity: true,
	orphans: true,
	tabSize: true,
	widows: true,
	zIndex: true,
	zoom: true,

	fillOpacity: true,
	floodOpacity: true,
	stopOpacity: true,
	strokeDasharray: true,
	strokeDashoffset: true,
	strokeMiterlimit: true,
	strokeOpacity: true,
	strokeWidth: true
};

function autoPx(name, val) {
	{
		// typeof val === 'number' is faster but fails for numeric strings
		return !isNaN(val) && !unitlessProps[name] ? (val + "px") : val;
	}
}

// assumes if styles exist both are objects or both are strings
function patchStyle(n, o) {
	var ns =     (n.attrs || emptyObj).style;
	var os = o ? (o.attrs || emptyObj).style : null;

	// replace or remove in full
	if (ns == null || isVal(ns))
		{ n.el.style.cssText = ns; }
	else {
		for (var nn in ns) {
			var nv = ns[nn];

			if (os == null || nv != null && nv !== os[nn])
				{ n.el.style[nn] = autoPx(nn, nv); }
		}

		// clean old
		if (os) {
			for (var on in os) {
				if (ns[on] == null)
					{ n.el.style[on] = ""; }
			}
		}
	}
}

var didQueue = [];

function fireHook(hooks, name, o, n, immediate) {
	if (hooks != null) {
		var fn = o.hooks[name];

		if (fn) {
			if (name[0] === "d" && name[1] === "i" && name[2] === "d") {	// did*
				//	console.log(name + " should queue till repaint", o, n);
				immediate ? repaint(o.parent) && fn(o, n) : didQueue.push([fn, o, n]);
			}
			else {		// will*
				//	console.log(name + " may delay by promise", o, n);
				return fn(o, n);		// or pass  done() resolver
			}
		}
	}
}

function drainDidHooks(vm) {
	if (didQueue.length) {
		repaint(vm.node);

		var item;
		while (item = didQueue.shift())
			{ item[0](item[1], item[2]); }
	}
}

var doc = ENV_DOM ? document : null;

function closestVNode(el) {
	while (el._node == null)
		{ el = el.parentNode; }
	return el._node;
}

function createElement(tag, ns) {
	if (ns != null)
		{ return doc.createElementNS(ns, tag); }
	return doc.createElement(tag);
}

function createTextNode(body) {
	return doc.createTextNode(body);
}

function createComment(body) {
	return doc.createComment(body);
}

// ? removes if !recycled
function nextSib(sib) {
	return sib.nextSibling;
}

// ? removes if !recycled
function prevSib(sib) {
	return sib.previousSibling;
}

// TODO: this should collect all deep proms from all hooks and return Promise.all()
function deepNotifyRemove(node) {
	var vm = node.vm;

	var wuRes = vm != null && fireHook(vm.hooks, "willUnmount", vm, vm.data);

	var wrRes = fireHook(node.hooks, "willRemove", node);

	if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE && isArr(node.body)) {
		for (var i = 0; i < node.body.length; i++)
			{ deepNotifyRemove(node.body[i]); }
	}

	return wuRes || wrRes;
}

function _removeChild(parEl, el, immediate) {
	var node = el._node, vm = node.vm;

	if (isArr(node.body)) {
		if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE) {
			for (var i = 0; i < node.body.length; i++)
				{ _removeChild(el, node.body[i].el); }
		}
		else
			{ deepUnref(node); }
	}

	delete el._node;

	parEl.removeChild(el);

	fireHook(node.hooks, "didRemove", node, null, immediate);

	if (vm != null) {
		fireHook(vm.hooks, "didUnmount", vm, vm.data, immediate);
		vm.node = null;
	}
}

// todo: should delay parent unmount() by returning res prom?
function removeChild(parEl, el) {
	var node = el._node;

	// already marked for removal
	if (node._dead) { return; }

	var res = deepNotifyRemove(node);

	if (res != null && isProm(res)) {
		node._dead = true;
		res.then(curry(_removeChild, [parEl, el, true]));
	}
	else
		{ _removeChild(parEl, el); }
}

function deepUnref(node) {
	var obody = node.body;

	for (var i = 0; i < obody.length; i++) {
		var o2 = obody[i];
		delete o2.el._node;

		if (o2.vm != null)
			{ o2.vm.node = null; }

		if (isArr(o2.body))
			{ deepUnref(o2); }
	}
}

function clearChildren(parent) {
	var parEl = parent.el;

	if ((parent.flags & DEEP_REMOVE) === 0) {
		isArr(parent.body) && deepUnref(parent);
		parEl.textContent = null;
	}
	else {
		var el = parEl.firstChild;

		do {
			var next = nextSib(el);
			removeChild(parEl, el);
		} while (el = next);
	}
}

// todo: hooks
function insertBefore(parEl, el, refEl) {
	var node = el._node, inDom = el.parentNode != null;

	// el === refEl is asserted as a no-op insert called to fire hooks
	var vm = (el === refEl || !inDom) ? node.vm : null;

	if (vm != null)
		{ fireHook(vm.hooks, "willMount", vm, vm.data); }

	fireHook(node.hooks, inDom ? "willReinsert" : "willInsert", node);
	parEl.insertBefore(el, refEl);
	fireHook(node.hooks, inDom ? "didReinsert" : "didInsert", node);

	if (vm != null)
		{ fireHook(vm.hooks, "didMount", vm, vm.data); }
}

function insertAfter(parEl, el, refEl) {
	insertBefore(parEl, el, refEl ? nextSib(refEl) : null);
}

var onemit = {};

function emitCfg(cfg) {
	assignObj(onemit, cfg);
}

function emit(evName) {
	var targ = this,
		src = targ;

	var args = sliceArgs(arguments, 1).concat(src, src.data);

	do {
		var evs = targ.onemit;
		var fn = evs ? evs[evName] : null;

		if (fn) {
			fn.apply(targ, args);
			break;
		}
	} while (targ = targ.parent());

	if (onemit[evName])
		{ onemit[evName].apply(targ, args); }
}

var onevent = noop;

function config(newCfg) {
	onevent = newCfg.onevent || onevent;

	{
		if (newCfg.onemit)
			{ emitCfg(newCfg.onemit); }
	}


}

function bindEv(el, type, fn) {
	el[type] = fn;
}

function exec(fn, args, e, node, vm) {
	var out = fn.apply(vm, args.concat([e, node, vm, vm.data]));

	// should these respect out === false?
	vm.onevent(e, node, vm, vm.data, args);
	onevent.call(null, e, node, vm, vm.data, args);

	if (out === false) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function handle(e) {
	var node = closestVNode(e.target);
	var vm = getVm(node);

	var evDef = e.currentTarget._node.attrs["on" + e.type], fn, args;

	if (isArr(evDef)) {
		fn = evDef[0];
		args = evDef.slice(1);
		exec(fn, args, e, node, vm);
	}
	else {
		for (var sel in evDef) {
			if (e.target.matches(sel)) {
				var evDef2 = evDef[sel];

				if (isArr(evDef2)) {
					fn = evDef2[0];
					args = evDef2.slice(1);
				}
				else {
					fn = evDef2;
					args = [];
				}

				exec(fn, args, e, node, vm);
			}
		}
	}
}

function patchEvent(node, name, nval, oval) {
	if (nval === oval)
		{ return; }

	var el = node.el;

	if (nval == null || isFunc(nval))
		{ bindEv(el, name, nval); }
	else if (oval == null)
		{ bindEv(el, name, handle); }
}

function remAttr(node, name, asProp) {
	if (name[0] === ".") {
		name = name.substr(1);
		asProp = true;
	}

	if (asProp)
		{ node.el[name] = ""; }
	else
		{ node.el.removeAttribute(name); }
}

// setAttr
// diff, ".", "on*", bool vals, skip _*, value/checked/selected selectedIndex
function setAttr(node, name, val, asProp, initial) {
	var el = node.el;

	if (val == null)
		{ !initial && remAttr(node, name, false); }		// will also removeAttr of style: null
	else if (node.ns != null)
		{ el.setAttribute(name, val); }
	else if (name === "class")
		{ el.className = val; }
	else if (name === "id" || typeof val === "boolean" || asProp)
		{ el[name] = val; }
	else if (name[0] === ".")
		{ el[name.substr(1)] = val; }
	else
		{ el.setAttribute(name, val); }
}

function patchAttrs(vnode, donor, initial) {
	var nattrs = vnode.attrs || emptyObj;
	var oattrs = donor.attrs || emptyObj;

	if (nattrs === oattrs) {

	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

			if (nval === oval) {}
			else if (isStyleProp(key))
				{ patchStyle(vnode, donor); }
			else if (isSplProp(key)) {}
			else if (isEvProp(key))
				{ patchEvent(vnode, key, nval, oval); }
			else
				{ setAttr(vnode, key, nval, isDyn, initial); }
		}

		// TODO: bench style.cssText = "" vs removeAttribute("style")
		for (var key in oattrs) {
			!(key in nattrs) &&
			!isSplProp(key) &&
			remAttr(vnode, key, isDynProp(vnode.tag, key) || isEvProp(key));
		}
	}
}

function createView(view, data, key, opts) {
	if (view.type === VVIEW) {
		data	= view.data;
		key		= view.key;
		opts	= view.opts;
		view	= view.view;
	}

	return new ViewModel(view, data, key, opts);
}

//import { XML_NS, XLINK_NS } from './defineSvgElement';
function hydrateBody(vnode) {
	for (var i = 0; i < vnode.body.length; i++) {
		var vnode2 = vnode.body[i];
		var type2 = vnode2.type;

		// ELEMENT,TEXT,COMMENT
		if (type2 <= COMMENT)
			{ insertBefore(vnode.el, hydrate(vnode2)); }		// vnode.el.appendChild(hydrate(vnode2))
		else if (type2 === VVIEW) {
			var vm = createView(vnode2.view, vnode2.data, vnode2.key, vnode2.opts)._redraw(vnode, i, false);		// todo: handle new data updates
			type2 = vm.node.type;
			insertBefore(vnode.el, hydrate(vm.node));
		}
		else if (type2 === VMODEL) {
			var vm = vnode2.vm;
			vm._redraw(vnode, i);					// , false
			type2 = vm.node.type;
			insertBefore(vnode.el, vm.node.el);		// , hydrate(vm.node)
		}
	}
}

//  TODO: DRY this out. reusing normal patch here negatively affects V8's JIT
function hydrate(vnode, withEl) {
	if (vnode.el == null) {
		if (vnode.type === ELEMENT) {
			vnode.el = withEl || createElement(vnode.tag, vnode.ns);

		//	if (vnode.tag === "svg")
		//		vnode.el.setAttributeNS(XML_NS, 'xmlns:xlink', XLINK_NS);

			if (vnode.attrs != null)
				{ patchAttrs(vnode, emptyObj, true); }

			if ((vnode.flags & LAZY_LIST) === LAZY_LIST)	// vnode.body instanceof LazyList
				{ vnode.body.body(vnode); }

			if (isArr(vnode.body))
				{ hydrateBody(vnode); }
			else if (vnode.body != null && vnode.body !== "")
				{ vnode.el.textContent = vnode.body; }
		}
		else if (vnode.type === TEXT)
			{ vnode.el = withEl || createTextNode(vnode.body); }
		else if (vnode.type === COMMENT)
			{ vnode.el = withEl || createComment(vnode.body); }
	}

	vnode.el._node = vnode;

	return vnode.el;
}

// prevent GCC from inlining some large funcs (which negatively affects Chrome's JIT)
//window.syncChildren = syncChildren;
window.lisMove = lisMove;

function nextNode(node, body) {
	return body[node.idx + 1];
}

function prevNode(node, body) {
	return body[node.idx - 1];
}

function parentNode(node) {
	return node.parent;
}

var BREAK = 1;
var BREAK_ALL = 2;

function syncDir(advSib, advNode, insert, sibName, nodeName, invSibName, invNodeName, invInsert) {
	return function(node, parEl, body, state, convTest, lis) {
		var sibNode, tmpSib;

		if (state[sibName] != null) {
			// skip dom elements not created by domvm
			if ((sibNode = state[sibName]._node) == null) {
				state[sibName] = advSib(state[sibName]);
				return;
			}

			if (parentNode(sibNode) !== node) {
				tmpSib = advSib(state[sibName]);
				sibNode.vm != null ? sibNode.vm.unmount(true) : removeChild(parEl, state[sibName]);
				state[sibName] = tmpSib;
				return;
			}
		}

		if (state[nodeName] == convTest)
			{ return BREAK_ALL; }
		else if (state[nodeName].el == null) {
			insert(parEl, hydrate(state[nodeName]), state[sibName]);	// should lis be updated here?
			state[nodeName] = advNode(state[nodeName], body);		// also need to advance sib?
		}
		else if (state[nodeName].el === state[sibName]) {
			state[nodeName] = advNode(state[nodeName], body);
			state[sibName] = advSib(state[sibName]);
		}
		// head->tail or tail->head
		else if (!lis && sibNode === state[invNodeName]) {
			tmpSib = state[sibName];
			state[sibName] = advSib(tmpSib);
			invInsert(parEl, tmpSib, state[invSibName]);
			state[invSibName] = tmpSib;
		}
		else {
			if (lis && state[sibName] != null)
				{ return lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state); }

			return BREAK;
		}
	};
}

function lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state) {
	if (sibNode._lis) {
		insert(parEl, state[nodeName].el, state[sibName]);
		state[nodeName] = advNode(state[nodeName], body);
	}
	else {
		// find closest tomb
		var t = binaryFindLarger(sibNode.idx, state.tombs);
		sibNode._lis = true;
		var tmpSib = advSib(state[sibName]);
		insert(parEl, state[sibName], t != null ? body[state.tombs[t]].el : t);

		if (t == null)
			{ state.tombs.push(sibNode.idx); }
		else
			{ state.tombs.splice(t, 0, sibNode.idx); }

		state[sibName] = tmpSib;
	}
}

var syncLft = syncDir(nextSib, nextNode, insertBefore, "lftSib", "lftNode", "rgtSib", "rgtNode", insertAfter);
var syncRgt = syncDir(prevSib, prevNode, insertAfter, "rgtSib", "rgtNode", "lftSib", "lftNode", insertBefore);

function syncChildren(node, donor) {
	var obody	= donor.body,
		parEl	= node.el,
		body	= node.body,
		state = {
			lftNode:	body[0],
			rgtNode:	body[body.length - 1],
			lftSib:		((obody)[0] || emptyObj).el,
			rgtSib:		(obody[obody.length - 1] || emptyObj).el,
		};

	converge:
	while (1) {
//		from_left:
		while (1) {
			var l = syncLft(node, parEl, body, state, null, false);
			if (l === BREAK) { break; }
			if (l === BREAK_ALL) { break converge; }
		}

//		from_right:
		while (1) {
			var r = syncRgt(node, parEl, body, state, state.lftNode, false);
			if (r === BREAK) { break; }
			if (r === BREAK_ALL) { break converge; }
		}

		sortDOM(node, parEl, body, state);
		break;
	}
}

// TODO: also use the state.rgtSib and state.rgtNode bounds, plus reduce LIS range
function sortDOM(node, parEl, body, state) {
	var kids = Array.prototype.slice.call(parEl.childNodes);
	var domIdxs = [];

	for (var k = 0; k < kids.length; k++) {
		var n = kids[k]._node;

		if (n.parent === node)
			{ domIdxs.push(n.idx); }
	}

	// list of non-movable vnode indices (already in correct order in old dom)
	var tombs = longestIncreasingSubsequence(domIdxs).map(function (i) { return domIdxs[i]; });

	for (var i = 0; i < tombs.length; i++)
		{ body[tombs[i]]._lis = true; }

	state.tombs = tombs;

	while (1) {
		var r = syncLft(node, parEl, body, state, null, true);
		if (r === BREAK_ALL) { break; }
	}
}

function alreadyAdopted(vnode) {
	return vnode.el._node.parent !== vnode.parent;
}

function takeSeqIndex(n, obody, fromIdx) {
	return obody[fromIdx];
}

function findSeqThorough(n, obody, fromIdx) {		// pre-tested isView?
	for (; fromIdx < obody.length; fromIdx++) {
		var o = obody[fromIdx];

		if (o.vm != null) {
			// match by key & viewFn || vm
			if (n.type === VVIEW && o.vm.view === n.view && o.vm.key === n.key || n.type === VMODEL && o.vm === n.vm)
				{ return o; }
		}
		else if (!alreadyAdopted(o) && n.tag === o.tag && n.type === o.type && n.key === o.key && (n.flags & ~DEEP_REMOVE) === (o.flags & ~DEEP_REMOVE))
			{ return o; }
	}

	return null;
}

function findHashKeyed(n, obody, fromIdx) {
	return obody[obody._keys[n.key]];
}

/*
// list must be a sorted list of vnodes by key
function findBinKeyed(n, list) {
	var idx = binaryKeySearch(list, n.key);
	return idx > -1 ? list[idx] : null;
}
*/

// have it handle initial hydrate? !donor?
// types (and tags if ELEM) are assumed the same, and donor exists
function patch(vnode, donor) {
	fireHook(donor.hooks, "willRecycle", donor, vnode);

	var el = vnode.el = donor.el;

	var obody = donor.body;
	var nbody = vnode.body;

	el._node = vnode;

	// "" => ""
	if (vnode.type === TEXT && nbody !== obody) {
		el.nodeValue = nbody;
		return;
	}

	if (vnode.attrs != null || donor.attrs != null)
		{ patchAttrs(vnode, donor, false); }

	// patch events

	var oldIsArr = isArr(obody);
	var newIsArr = isArr(nbody);
	var lazyList = (vnode.flags & LAZY_LIST) === LAZY_LIST;

//	var nonEqNewBody = nbody != null && nbody !== obody;

	if (oldIsArr) {
		// [] => []
		if (newIsArr || lazyList)
			{ patchChildren(vnode, donor); }
		// [] => "" | null
		else if (nbody !== obody) {
			if (nbody != null)
				{ el.textContent = nbody; }
			else
				{ clearChildren(donor); }
		}
	}
	else {
		// "" | null => []
		if (newIsArr) {
			clearChildren(donor);
			hydrateBody(vnode);
		}
		// "" | null => "" | null
		else if (nbody !== obody) {
			if (el.firstChild)
				{ el.firstChild.nodeValue = nbody; }
			else
				{ el.textContent = nbody; }
		}
	}

	fireHook(donor.hooks, "didRecycle", donor, vnode);
}

// larger qtys of KEYED_LIST children will use binary search
//const SEQ_FAILS_MAX = 100;

// TODO: modify vtree matcher to work similar to dom reconciler for keyed from left -> from right -> head/tail -> binary
// fall back to binary if after failing nri - nli > SEQ_FAILS_MAX
// while-advance non-keyed fromIdx
// [] => []
function patchChildren(vnode, donor) {
	var nbody		= vnode.body,
		nlen		= nbody.length,
		obody		= donor.body,
		olen		= obody.length,
		isLazy		= (vnode.flags & LAZY_LIST) === LAZY_LIST,
		isFixed		= (vnode.flags & FIXED_BODY) === FIXED_BODY,
		isKeyed		= (vnode.flags & KEYED_LIST) === KEYED_LIST,
		domSync		= !isFixed && vnode.type === ELEMENT,
		doFind		= true,
		find		= (
			isKeyed ? findHashKeyed :				// keyed lists/lazyLists
			isFixed || isLazy ? takeSeqIndex :		// unkeyed lazyLists and FIXED_BODY
			findSeqThorough							// more complex stuff
		);

	if (isKeyed) {
		var keys = {};
		for (var i = 0; i < obody.length; i++)
			{ keys[obody[i].key] = i; }
		obody._keys = keys;
	}

	if (domSync && nlen === 0) {
		clearChildren(donor);
		if (isLazy)
			{ vnode.body = []; }	// nbody.tpl(all);
		return;
	}

	var donor2,
		node2,
		foundIdx,
		patched = 0,
		everNonseq = false,
		fromIdx = 0;		// first unrecycled node (search head)

	if (isLazy) {
		var fnode2 = {key: null};
		var nbodyNew = Array(nlen);
	}

	for (var i = 0; i < nlen; i++) {
		if (isLazy) {
			var remake = false;
			var diffRes = null;

			if (doFind) {
				if (isKeyed)
					{ fnode2.key = nbody.key(i); }

				donor2 = find(fnode2, obody, fromIdx);
			}

			if (donor2 != null) {
                foundIdx = donor2.idx;
				diffRes = nbody.diff(i, donor2);

				// diff returns same, so cheaply adopt vnode without patching
				if (diffRes === true) {
					node2 = donor2;
					node2.parent = vnode;
					node2.idx = i;
					node2._lis = false;
				}
				// diff returns new diffVals, so generate new vnode & patch
				else
					{ remake = true; }
			}
			else
				{ remake = true; }

			if (remake) {
				node2 = nbody.tpl(i);			// what if this is a VVIEW, VMODEL, injected element?
				preProc(node2, vnode, i);

				node2._diff = diffRes != null ? diffRes : nbody.diff(i);

				if (donor2 != null)
					{ patch(node2, donor2); }
			}
			else {
				// TODO: flag tmp FIXED_BODY on unchanged nodes?

				// domSync = true;		if any idx changes or new nodes added/removed
			}

			nbodyNew[i] = node2;
		}
		else {
			var node2 = nbody[i];
			var type2 = node2.type;

			// ELEMENT,TEXT,COMMENT
			if (type2 <= COMMENT) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {
					patch(node2, donor2);
					foundIdx = donor2.idx;
				}
			}
			else if (type2 === VVIEW) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {		// update/moveTo
					foundIdx = donor2.idx;
					var vm = donor2.vm._update(node2.data, vnode, i);		// withDOM
				}
				else
					{ var vm = createView(node2.view, node2.data, node2.key, node2.opts)._redraw(vnode, i, false); }	// createView, no dom (will be handled by sync below)

				type2 = vm.node.type;
			}
			else if (type2 === VMODEL) {
				// if the injected vm has never been rendered, this vm._update() serves as the
				// initial vtree creator, but must avoid hydrating (creating .el) because syncChildren()
				// which is responsible for mounting below (and optionally hydrating), tests .el presence
				// to determine if hydration & mounting are needed
				var withDOM = isHydrated(node2.vm);

				var vm = node2.vm._update(node2.data, vnode, i, withDOM);
				type2 = vm.node.type;
			}
		}

		// found donor & during a sequential search ...at search head
		if (!isKeyed && donor2 != null) {
			if (foundIdx === fromIdx) {
				// advance head
				fromIdx++;
				// if all old vnodes adopted and more exist, stop searching
				if (fromIdx === olen && nlen > olen) {
					// short-circuit find, allow loop just create/init rest
					donor2 = null;
					doFind = false;
				}
			}
			else
				{ everNonseq = true; }

			if (olen > 100 && everNonseq && ++patched % 10 === 0)
				{ while (fromIdx < olen && alreadyAdopted(obody[fromIdx]))
					{ fromIdx++; } }
		}
	}

	// replace List w/ new body
	if (isLazy)
		{ vnode.body = nbodyNew; }

	domSync && syncChildren(vnode, donor);
}

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

	if (opts) {
		vm.opts = opts;
		vm.config(opts);
	}

	var out = isPlainObj(view) ? view : view.call(vm, vm, data, key, opts);

	if (isFunc(out))
		{ vm.render = out; }
	else {
		vm.render = out.render;
		vm.config(out);
	}

	// these must be wrapped here since they're debounced per view
	vm._redrawAsync = raft(function (_) { return vm.redraw(true); });
	vm._updateAsync = raft(function (newData) { return vm.update(newData, true); });

	vm.init && vm.init.call(vm, vm, vm.data, vm.key, opts);
}

var ViewModelProto = ViewModel.prototype = {
	constructor: ViewModel,

	_diff:	null,	// diff cache

	init:	null,
	view:	null,
	key:	null,
	data:	null,
	state:	null,
	api:	null,
	opts:	null,
	node:	null,
	hooks:	null,
	onevent: noop,
	refs:	null,
	render:	null,

	mount: mount,
	unmount: unmount,
	config: function(opts) {
		var t = this;

		if (opts.init)
			{ t.init = opts.init; }
		if (opts.diff)
			{ t.diff = opts.diff; }
		if (opts.onevent)
			{ t.onevent = opts.onevent; }

		// maybe invert assignment order?
		if (opts.hooks)
			{ t.hooks = assignObj(t.hooks || {}, opts.hooks); }

		{
			if (opts.onemit)
				{ t.onemit = assignObj(t.onemit || {}, opts.onemit); }
		}
	},
	parent: function() {
		return getVm(this.node.parent);
	},
	root: function() {
		var p = this.node;

		while (p.parent)
			{ p = p.parent; }

		return p.vm;
	},
	redraw: function(sync) {
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
		var vm = this;
		sync ? vm._update(newData, null, null, isHydrated(vm)) : vm._updateAsync(newData);
		return vm;
	},

	_update: updateSync,
	_redraw: redrawSync,
	_redrawAsync: null,
	_updateAsync: null,
};

function mount(el, isRoot) {
	var vm = this;

	if (isRoot) {
		clearChildren({el: el, flags: 0});

		vm._redraw(null, null, false);

		// if placeholder node doesnt match root tag
		if (el.nodeName.toLowerCase() !== vm.node.tag) {
			hydrate(vm.node);
			insertBefore(el.parentNode, vm.node.el, el);
			el.parentNode.removeChild(el);
		}
		else
			{ insertBefore(el.parentNode, hydrate(vm.node, el), el); }
	}
	else {
		vm._redraw(null, null);

		if (el)
			{ insertBefore(el, vm.node.el); }
	}

	if (el)
		{ drainDidHooks(vm); }

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

	var node = vm.node;
	var parEl = node.el.parentNode;

	// edge bug: this could also be willRemove promise-delayed; should .then() or something to make sure hooks fire in order
	removeChild(parEl, node.el);

	if (!asSub)
		{ drainDidHooks(vm); }
}

function reParent(vm, vold, newParent, newIdx) {
	if (newParent != null) {
		newParent.body[newIdx] = vold;
		vold.idx = newIdx;
		vold.parent = newParent;
		vold._lis = false;
	}
	return vm;
}

function redrawSync(newParent, newIdx, withDOM) {
	var isRedrawRoot = newParent == null;
	var vm = this;
	var isMounted = vm.node && vm.node.el && vm.node.el.parentNode;

	var vold = vm.node, oldDiff, newDiff;

	if (vm.diff != null) {
		oldDiff = vm._diff;
		vm._diff = newDiff = vm.diff(vm, vm.data);

		if (vold != null) {
			var cmpFn = isArr(oldDiff) ? cmpArr : cmpObj;
			var isSame = oldDiff === newDiff || cmpFn(oldDiff, newDiff);

			if (isSame)
				{ return reParent(vm, vold, newParent, newIdx); }
		}
	}

	isMounted && fireHook(vm.hooks, "willRedraw", vm, vm.data);

	var vnew = vm.render.call(vm, vm, vm.data, oldDiff, newDiff);

	if (vnew === vold)
		{ return reParent(vm, vold, newParent, newIdx); }

	// todo: test result of willRedraw hooks before clearing refs
	vm.refs = null;

	// always assign vm key to root vnode (this is a de-opt)
	if (vm.key != null && vnew.key !== vm.key)
		{ vnew.key = vm.key; }

	vm.node = vnew;

	if (newParent) {
		preProc(vnew, newParent, newIdx, vm);
		newParent.body[newIdx] = vnew;
	}
	else if (vold && vold.parent) {
		preProc(vnew, vold.parent, vold.idx, vm);
		vold.parent.body[vold.idx] = vnew;
	}
	else
		{ preProc(vnew, null, null, vm); }

	if (withDOM !== false) {
		if (vold) {
			// root node replacement
			if (vold.tag !== vnew.tag || vold.key !== vnew.key) {
				// hack to prevent the replacement from triggering mount/unmount
				vold.vm = vnew.vm = null;

				var parEl = vold.el.parentNode;
				var refEl = nextSib(vold.el);
				removeChild(parEl, vold.el);
				insertBefore(parEl, hydrate(vnew), refEl);

				// another hack that allows any higher-level syncChildren to set
				// reconciliation bounds using a live node
				vold.el = vnew.el;

				// restore
				vnew.vm = vm;
			}
			else
				{ patch(vnew, vold); }
		}
		else
			{ hydrate(vnew); }
	}

	isMounted && fireHook(vm.hooks, "didRedraw", vm, vm.data);

	if (isRedrawRoot && isMounted)
		{ drainDidHooks(vm); }

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;


		}
	}

	return vm._redraw(newParent, newIdx, withDOM);
}

function defineElement(tag, arg1, arg2, flags) {
	var attrs, body;

	if (arg2 == null) {
		if (isPlainObj(arg1))
			{ attrs = arg1; }
		else
			{ body = arg1; }
	}
	else {
		attrs = arg1;
		body = arg2;
	}

	return initElementNode(tag, attrs, body, flags);
}

//export const XML_NS = "http://www.w3.org/2000/xmlns/";
var SVG_NS = "http://www.w3.org/2000/svg";

function defineSvgElement(tag, arg1, arg2, flags) {
	var n = defineElement(tag, arg1, arg2, flags);
	n.ns = SVG_NS;
	return n;
}

function defineComment(body) {
	var node = new VNode;
	node.type = COMMENT;
	node.body = body;
	return node;
}

// placeholder for declared views
function VView(view, data, key, opts) {
	this.view = view;
	this.data = data;
	this.key = key;
	this.opts = opts;
}

VView.prototype = {
	constructor: VView,

	type: VVIEW,
	view: null,
	data: null,
	key: null,
	opts: null,
};

function defineView(view, data, key, opts) {
	return new VView(view, data, key, opts);
}

// placeholder for injected ViewModels
function VModel(vm) {
	this.vm = vm;
}

VModel.prototype = {
	constructor: VModel,

	type: VMODEL,
	vm: null,
};

function injectView(vm) {
//	if (vm.node == null)
//		vm._redraw(null, null, false);

//	return vm.node;

	return new VModel(vm);
}

function injectElement(el) {
	var node = new VNode;
	node.type = ELEMENT;
	node.el = node.key = el;
	return node;
}

function lazyList(items, cfg) {
	var len = items.length;

	var self = {
		items: items,
		length: len,
		// defaults to returning item identity (or position?)
		key: function(i) {
			return cfg.key(items[i], i);
		},
		// default returns 0?
		diff: function(i, donor) {
			var newVals = cfg.diff(items[i], i);
			if (donor == null)
				{ return newVals; }
			var oldVals = donor._diff;
			var same = newVals === oldVals || isArr(oldVals) ? cmpArr(newVals, oldVals) : cmpObj(newVals, oldVals);
			return same || newVals;
		},
		tpl: function(i) {
			return cfg.tpl(items[i], i);
		},
		map: function(tpl) {
			cfg.tpl = tpl;
			return self;
		},
		body: function(vnode) {
			var nbody = Array(len);

			for (var i = 0; i < len; i++) {
				var vnode2 = self.tpl(i);

			//	if ((vnode.flags & KEYED_LIST) === KEYED_LIST && self. != null)
			//		vnode2.key = getKey(item);

				vnode2._diff = self.diff(i);			// holds oldVals for cmp

				nbody[i] = vnode2;

				// run preproc pass (should this be just preProc in above loop?) bench
				preProc(vnode2, vnode, i);
			}

			// replace List with generated body
			vnode.body = nbody;
		}
	};

	return self;
}

var nano = {
	config: config,

	ViewModel: ViewModel,
	VNode: VNode,

	createView: createView,

	defineElement: defineElement,
	defineSvgElement: defineSvgElement,
	defineText: defineText,
	defineComment: defineComment,
	defineView: defineView,

	injectView: injectView,
	injectElement: injectElement,

	lazyList: lazyList,

	FIXED_BODY: FIXED_BODY,
	DEEP_REMOVE: DEEP_REMOVE,
	KEYED_LIST: KEYED_LIST,
	LAZY_LIST: LAZY_LIST,
};

function protoPatch(n, doRepaint) {
	patch$1(this, n, doRepaint);
}

// newNode can be either {class: style: } or full new VNode
// will/didPatch hooks?
function patch$1(o, n, doRepaint) {
	if (n.type != null) {
		// no full patching of view roots, just use redraw!
		if (o.vm != null)
			{ return; }

		preProc(n, o.parent, o.idx, null);
		o.parent.body[o.idx] = n;
		patch(n, o);
		doRepaint && repaint(n);
		drainDidHooks(getVm(n));
	}
	else {
		// TODO: re-establish refs

		// shallow-clone target
		var donor = Object.create(o);
		// fixate orig attrs
		donor.attrs = assignObj({}, o.attrs);
		// assign new attrs into live targ node
		var oattrs = assignObj(o.attrs, n);
		// prepend any fixed shorthand class
		if (o._class != null) {
			var aclass = oattrs.class;
			oattrs.class = aclass != null && aclass !== "" ? o._class + " " + aclass : o._class;
		}

		patchAttrs(o, donor);

		doRepaint && repaint(o);
	}
}

VNodeProto.patch = protoPatch;

function nextSubVms(n, accum) {
	var body = n.body;

	if (isArr(body)) {
		for (var i = 0; i < body.length; i++) {
			var n2 = body[i];

			if (n2.vm != null)
				{ accum.push(n2.vm); }
			else
				{ nextSubVms(n2, accum); }
		}
	}

	return accum;
}

function defineElementSpread(tag) {
	var args = arguments;
	var len = args.length;
	var body, attrs;

	if (len > 1) {
		var bodyIdx = 1;

		if (isPlainObj(args[1])) {
			attrs = args[1];
			bodyIdx = 2;
		}

		if (len === bodyIdx + 1 && (isVal(args[bodyIdx]) || isArr(args[bodyIdx]) || attrs && (attrs._flags & LAZY_LIST) === LAZY_LIST))
			{ body = args[bodyIdx]; }
		else
			{ body = sliceArgs(args, bodyIdx); }
	}

	return initElementNode(tag, attrs, body);
}

function defineSvgElementSpread() {
	var n = defineElementSpread.apply(null, arguments);
	n.ns = SVG_NS;
	return n;
}

ViewModelProto.emit = emit;
ViewModelProto.onemit = null;

ViewModelProto.body = function() {
	return nextSubVms(this.node, []);
};

nano.defineElementSpread = defineElementSpread;
nano.defineSvgElementSpread = defineSvgElementSpread;

return nano;

})));
//# sourceMappingURL=domvm.micro.js.map


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(13);
function getResizeMode(isXLayout, conf1, conf2) {
    var field = isXLayout ? "width" : "height";
    var is1perc = conf1[field] && conf1[field].includes("%");
    var is2perc = conf2[field] && conf2[field].includes("%");
    var is1px = conf1[field] && conf1[field].includes("px");
    var is2px = conf2[field] && conf2[field].includes("px");
    if (is1perc && is2perc) {
        return types_1.resizeMode.percents;
    }
    if (is1px && is2px) {
        return types_1.resizeMode.pixels;
    }
    if (is1px && !is2px) {
        return types_1.resizeMode.mixedpx1;
    }
    if (is2px && !is1px) {
        return types_1.resizeMode.mixedpx2;
    }
    if (is1perc) {
        return types_1.resizeMode.mixedperc1;
    }
    if (is2perc) {
        return types_1.resizeMode.mixedperc2;
    }
    return types_1.resizeMode.unknown;
}
exports.getResizeMode = getResizeMode;
function getBlockRange(block1, block2, isXLayout) {
    if (isXLayout === void 0) { isXLayout = true; }
    if (isXLayout) {
        return {
            min: block1.left + window.pageXOffset,
            max: block2.right + window.pageXOffset,
        };
    }
    return {
        min: block1.top + window.pageYOffset,
        max: block2.bottom + window.pageYOffset,
    };
}
exports.getBlockRange = getBlockRange;
function getMarginSize(config, xLayout) {
    if (!config) {
        return 0;
    }
    if (config.type === "space" || (config.type === "wide" && xLayout)) {
        return 10;
    }
    return 0;
}
exports.getMarginSize = getMarginSize;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var CssManager = /** @class */ (function () {
    function CssManager() {
        this._classes = {};
        var styles = document.createElement("style");
        styles.id = "dhx_generated_styles";
        this._styleCont = document.head.appendChild(styles);
    }
    CssManager.prototype.update = function () {
        if (this._styleCont.innerHTML !== this._generateCss()) {
            document.head.appendChild(this._styleCont);
            this._styleCont.innerHTML = this._generateCss();
        }
    };
    CssManager.prototype.remove = function (className) {
        delete this._classes[className];
        this.update();
    };
    CssManager.prototype.add = function (cssList, customId, silent) {
        if (silent === void 0) { silent = false; }
        var cssString = this._toCssString(cssList);
        var id = this._findSameClassId(cssString);
        if (id && customId && customId !== id) {
            this._classes[customId] = this._classes[id];
            return customId;
        }
        if (id) {
            return id;
        }
        return this._addNewClass(cssString, customId, silent);
    };
    CssManager.prototype.get = function (className) {
        if (this._classes[className]) {
            var props = {};
            var css = this._classes[className].split(";");
            for (var _i = 0, css_1 = css; _i < css_1.length; _i++) {
                var item = css_1[_i];
                if (item) {
                    var prop = item.split(":");
                    props[prop[0]] = prop[1];
                }
            }
            return props;
        }
        return null;
    };
    CssManager.prototype._findSameClassId = function (cssString) {
        for (var key in this._classes) {
            if (cssString === this._classes[key]) {
                return key;
            }
        }
        return null;
    };
    CssManager.prototype._addNewClass = function (cssString, customId, silent) {
        var id = customId || "dhx_generated_class_" + core_1.uid();
        this._classes[id] = cssString;
        if (!silent) {
            this.update();
        }
        return id;
    };
    CssManager.prototype._toCssString = function (cssList) {
        var cssString = "";
        for (var key in cssList) {
            var prop = cssList[key];
            var name_1 = key.replace(/[A-Z]{1}/g, function (letter) { return "-" + letter.toLowerCase(); });
            cssString += name_1 + ":" + prop + ";";
        }
        return cssString;
    };
    CssManager.prototype._generateCss = function () {
        var result = "";
        for (var key in this._classes) {
            var cssProps = this._classes[key];
            result += "." + key + "{" + cssProps + "}\n";
        }
        return result;
    };
    return CssManager;
}());
exports.CssManager = CssManager;
exports.cssManager = new CssManager();


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(64));
__export(__webpack_require__(76));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(2);
var ts_navbar_1 = __webpack_require__(29);
var ts_message_1 = __webpack_require__(16);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            navigationType: "click",
        }, config)) || this;
        _this._currentRoot = null;
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Toolbar.prototype.getState = function () {
        var state = {};
        this.data.eachChild(this.data.getRoot(), function (item) {
            if (item.twoState && !item.group) {
                state[item.id] = item.active;
            }
            else if (item.type === "input" || item.type === "selectButton") {
                state[item.id] = item.value;
            }
        }, false);
        for (var key in this._groups) {
            if (this._groups[key].active) {
                state[key] = this._groups[key].active;
            }
        }
        return state;
    };
    Toolbar.prototype.setState = function (state) {
        for (var key in state) {
            if (this._groups && this._groups[key]) {
                if (this._groups[key].active) {
                    this.data.update(this._groups[key].active, { active: false });
                    this._groups[key].active = state[key];
                    this.data.update(state[key], { active: true });
                }
            }
            else {
                var item = this.data.getItem(key);
                if (item.type === "input" || item.type === "selectButton") {
                    this.data.update(key, { value: state[key] });
                }
                else {
                    this.data.update(key, { active: state[key] });
                }
            }
        }
    };
    Toolbar.prototype._customHandlers = function () {
        var _this = this;
        return {
            input: function (e) {
                var id = html_1.locate(e);
                _this.data.update(id, { value: e.target.value });
            },
            tooltip: function (e) {
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.tooltip) {
                    ts_message_1.tooltip(item.tooltip, {
                        node: elem,
                        position: ts_message_1.Position.bottom,
                    });
                }
            },
        };
    };
    Toolbar.prototype._getFactory = function () {
        return ts_navbar_1.createFactory({
            widget: this,
            defaultType: "navItem",
            allowedTypes: [
                "button",
                "customHTMLButton",
                "imageButton",
                "input",
                "selectButton",
                "separator",
                "spacer",
                "title",
                "navItem",
                "menuItem",
                "customHTML",
            ],
            widgetName: "toolbar",
        });
    };
    Toolbar.prototype._draw = function () {
        var _this = this;
        return dom_1.el("nav.dhx_widget.dhx_toolbar", {
            class: this.config.css ? this.config.css : "",
        }, [
            dom_1.el("ul.dhx_navbar.dhx_navbar--horizontal", {
                dhx_widget_id: this._uid,
                tabindex: 0,
                onclick: this._handlers.onclick,
                onmousedown: this._handlers.onmousedown,
                oninput: this._handlers.input,
                onmouseover: this._handlers.tooltip,
                _hooks: {
                    didInsert: function (node) {
                        node.el.addEventListener("keyup", function (e) {
                            if (e.which !== 9) {
                                return;
                            }
                            var elem = html_1.locateNode(document.activeElement);
                            if (!elem) {
                                return;
                            }
                            var id = elem.getAttribute("dhx_id");
                            var item = _this.data.getItem(id);
                            if (item.tooltip) {
                                ts_message_1.tooltip(item.tooltip, {
                                    node: elem,
                                    position: ts_message_1.Position.bottom,
                                    force: true,
                                });
                            }
                        }, true);
                    },
                },
            }, this.data.map(function (item) { return _this._factory(item); }, this.data.getRoot(), false)),
        ]);
    };
    Toolbar.prototype._getMode = function (item, root) {
        return item.id === root ? "bottom" : "right";
    };
    Toolbar.prototype._close = function (e) {
        this._activePosition = null;
        this._currentRoot = null;
        _super.prototype._close.call(this, e);
    };
    Toolbar.prototype._setRoot = function (id) {
        if (this.data.getParent(id) === this.data.getRoot()) {
            this._currentRoot = id;
        }
    };
    return Toolbar;
}(ts_navbar_1.Navbar));
exports.Toolbar = Toolbar;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(5);
var html_1 = __webpack_require__(2);
var Keymanager_1 = __webpack_require__(18);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(3);
var types_1 = __webpack_require__(19);
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id],
        };
    }
}
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({}, config)) || this;
        _this._isContextMenu = false;
        _this._documentHaveListener = false;
        _this._rootItem = {};
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        _this._documentClick = function (e) {
            if (_this._documentHaveListener) {
                var element_1 = html_1.locateNode(e);
                var supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
                document.removeEventListener("click", _this._documentClick);
                _this._documentHaveListener = false;
                if ((supportsTouch && !element_1) || !_this._isContextMenu) {
                    _this._close(e);
                }
            }
        };
        _this._currentRoot = _this.data.getRoot();
        _this._factory = _this._getFactory();
        _this._initHandlers();
        _this._init();
        _this._initEvents();
        if (Array.isArray(_this.config.data)) {
            _this.data.parse(_this.config.data);
        }
        return _this;
    }
    Navbar.prototype.paint = function () {
        _super.prototype.paint.call(this);
        this._vpopups.redraw();
    };
    Navbar.prototype.disable = function (ids) {
        this._setProp(ids, "disabled", true);
    };
    Navbar.prototype.enable = function (ids) {
        this._setProp(ids, "disabled", false);
    };
    Navbar.prototype.isDisabled = function (id) {
        var item = this.data.getItem(id);
        if (item) {
            return item.disabled || false;
        }
    };
    Navbar.prototype.show = function (ids) {
        this._setProp(ids, "hidden", false);
    };
    Navbar.prototype.hide = function (ids) {
        this._setProp(ids, "hidden", true);
    };
    Navbar.prototype.destructor = function () {
        this.unmount();
        Keymanager_1.keyManager.removeHotKey(null, this);
        this._vpopups.unmount();
    };
    Navbar.prototype.select = function (id, unselect) {
        var _this = this;
        if (unselect === void 0) { unselect = true; }
        if (!id) {
            throw new Error("Function argument cannot be empty, for more info check documentation https://docs.dhtmlx.com");
        }
        unselect && this.unselect();
        this.data.update(id, { active: true });
        this.data.eachParent(id, function (parent) {
            _this.data.update(parent.id, { active: true });
        });
    };
    Navbar.prototype.unselect = function (id) {
        var _this = this;
        if (!id) {
            this.data.forEach(function (item) {
                _this.data.update(item.id, { active: false });
            });
        }
        else {
            this.data.update(id, { active: false });
            this.data.eachChild(id, function (parent) {
                _this.data.update(parent.id, { active: false });
            });
        }
    };
    Navbar.prototype.isSelected = function (id) {
        if (!id || !this.data.getItem(id)) {
            return;
        }
        return !!this.data.getItem(id).active;
    };
    Navbar.prototype.getSelected = function () {
        var selected = [];
        this.data.forEach(function (item) {
            item.active && selected.push(item.id);
        });
        return selected;
    };
    Navbar.prototype._customHandlers = function () {
        return {};
    };
    Navbar.prototype._close = function (e) {
        var _this = this;
        if (!this._popupActive || !this.events.fire(types_1.NavigationBarEvents.beforeHide, [this._activeMenu, e])) {
            return;
        }
        if (this._activeParents) {
            this._activeParents.forEach(function (parentId) { return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: false }); });
        }
        if (this.config.navigationType === "click") {
            this._isActive = false;
        }
        clearTimeout(this._currentTimeout);
        this._popupActive = false;
        this._activeMenu = null;
        this.events.fire(types_1.NavigationBarEvents.afterHide, [e]);
        this.paint();
    };
    Navbar.prototype._init = function () {
        var _this = this;
        var render = function () {
            return dom_1.el("div", {
                dhx_widget_id: _this._uid,
                class: (_this._isContextMenu ? " dhx_context-menu" : "") + " " + (_this.config.css
                    ? _this.config.css
                        .split(" ")
                        .map(function (i) { return i + "--context-menu"; })
                        .join(" ")
                    : ""),
                onmousemove: _this._handlers.onmousemove,
                onmouseleave: _this._handlers.onmouseleave,
                onclick: _this._handlers.onclick,
                onmousedown: _this._handlers.onmousedown,
            }, _this._drawPopups());
        };
        this._vpopups = dom_1.create({
            render: render,
        });
        this._vpopups.mount(document.body);
    };
    Navbar.prototype._initHandlers = function () {
        var _this = this;
        /*
            for navigation type click:
            first click open menu, _isActive = true
            after navigation use mousemove
            can be closed after outer click or menu leaf item click
        */
        this._isActive = this.config.navigationType !== "click";
        this._handlers = __assign({ onmousemove: function (e) {
                if (!_this._isActive) {
                    return;
                }
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                if (_this._activeMenu !== id) {
                    if (_this.data.haveItems(id)) {
                        var position = html_1.getRealPosition(elem);
                        _this.data.update(id, { $position: position }, false);
                    }
                    _this._activeItemChange(id, e);
                }
            }, onmouseleave: function (e) {
                if (_this.config.navigationType !== "click") {
                    // maybe all time when mouse leave close menu
                    if (_this._popupActive) {
                        var element = html_1.locateNode(e, "dhx_id", "relatedTarget");
                        if (element) {
                            var id = element.getAttribute("dhx_id");
                            if (!_this.data.getItem(id)) {
                                _this._close(e);
                            }
                        }
                        else {
                            _this._close(e);
                        }
                    }
                    _this._activeItemChange(null, e);
                }
            }, onclick: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.multiClick) {
                    return;
                }
                if (_this.data.haveItems(id)) {
                    if (id === _this._currentRoot) {
                        return;
                    }
                    if (!_this._isActive) {
                        _this._isActive = true;
                    }
                    _this._setRoot(id);
                    var position = html_1.getRealPosition(element);
                    _this.data.update(id, { $position: position }, false);
                    _this._activeItemChange(id, e);
                }
                else {
                    switch (item.type) {
                        case "input":
                        case "title":
                            break;
                        case "menuItem":
                        case "selectButton":
                            _this._onMenuItemClick(id, e);
                            break;
                        case "imageButton":
                        case "button":
                        case "customButton":
                        case "customHTML":
                        case "navItem":
                            if (item.twoState) {
                                _this.data.update(item.id, { active: !item.active });
                            }
                            _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                            _this._close(e);
                            break;
                        default:
                            _this._close(e);
                    }
                }
            }, onmousedown: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (!item.multiClick) {
                    return;
                }
                var fireTime = 365;
                var timeout;
                var fireAction = function () {
                    _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                    if (fireTime > 50) {
                        fireTime -= 55;
                    }
                    timeout = setTimeout(fireAction, fireTime);
                };
                var mouseup = function () {
                    clearTimeout(timeout);
                    document.removeEventListener("mouseup", mouseup);
                };
                fireAction();
                document.addEventListener("mouseup", mouseup);
            } }, this._customHandlers());
    };
    Navbar.prototype._initEvents = function () {
        var _this = this;
        var timeout = null;
        this.data.events.on(types_1.DataEvents.change, function () {
            _this.paint();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var groups = {};
                _this.data.eachChild(_this.data.getRoot(), function (item) {
                    if (item.group) {
                        item.twoState = true;
                        addInGroups(groups, item);
                    }
                }, true);
                _this._groups = groups;
                _this._resetHotkeys();
                timeout = null;
                _this.paint();
            }, 100);
        });
        this.events.on(types_1.NavigationBarEvents.click, function (id) {
            var item = _this.data.getItem(id);
            var parent = _this.data.getItem(item.parent);
            if (parent && parent.type === "selectButton") {
                _this.data.update(item.parent, { value: item.value, icon: item.icon });
            }
            if (item.group) {
                var group = _this._groups[item.group];
                if (group.active) {
                    _this.data.update(group.active, { active: false });
                }
                group.active = item.id;
                _this.data.update(item.id, { active: true });
            }
        });
        this._customInitEvents();
    };
    Navbar.prototype._getMode = function (item, root, _active) {
        if (_active === void 0) { _active = false; }
        return item.parent === root ? "bottom" : "right";
    };
    Navbar.prototype._drawMenuItems = function (id, asMenuItem) {
        var _this = this;
        if (asMenuItem === void 0) { asMenuItem = true; }
        return this.data.map(function (item) { return _this._factory(item, asMenuItem); }, id, false);
    };
    Navbar.prototype._setRoot = function (_id) {
        return; // need only for toolbar
    };
    Navbar.prototype._getParents = function (id, root) {
        var parentIds = [];
        var afterRoot = false;
        var currentItem = this.data.getItem(id);
        var disabled = currentItem && currentItem.disabled;
        this.data.eachParent(id, function (item) {
            if (item.id === root) {
                parentIds.push(item.id);
                afterRoot = true;
            }
            else if (!afterRoot) {
                parentIds.push(item.id);
            }
        }, !disabled);
        if (this._isContextMenu && this._activePosition) {
            parentIds.push(root);
        }
        return parentIds;
    };
    Navbar.prototype._listenOuterClick = function () {
        if (this._documentHaveListener) {
            return;
        }
        document.addEventListener("click", this._documentClick, true);
        this._documentHaveListener = true;
    };
    Navbar.prototype._customInitEvents = function () {
        return;
    };
    Navbar.prototype._drawPopups = function () {
        var _this = this;
        var id = this._activeMenu;
        if (!this._isContextMenu && !id) {
            return null;
        }
        var root = this._currentRoot;
        if (this._isContextMenu && !this._activePosition) {
            return null;
        }
        var parentIds = this._getParents(id, root);
        this._activeParents = parentIds;
        parentIds.forEach(function (parentId) {
            return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: true }, false);
        });
        return parentIds
            .map(function (itemId) {
            if (!_this.data.haveItems(itemId)) {
                return null;
            }
            var item = _this.data.getItem(itemId) || _this._rootItem; // for root item
            _this._popupActive = true;
            return dom_1.el("ul", {
                class: "dhx_widget dhx_menu" + (_this.config.menuCss ? " " + _this.config.menuCss : ""),
                _key: itemId,
                _hooks: {
                    didInsert: function (vnode) {
                        var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                        var position = _this._isContextMenu && _this._activePosition && itemId === root
                            ? _this._activePosition
                            : item.$position;
                        var mode = _this._getMode(item, root, position === _this._activePosition);
                        var style = html_1.calculatePosition(position, {
                            mode: mode,
                            width: width,
                            height: height,
                        });
                        item.$style = style;
                        vnode.patch({ style: style });
                    },
                    didRecycle: function (_, vnode) {
                        if (_this._isContextMenu && _this._activePosition && itemId === root) {
                            var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                            var style = html_1.calculatePosition(_this._activePosition, {
                                mode: _this._getMode(item, root, true),
                                width: width,
                                height: height,
                            });
                            item.$style = style;
                            vnode.patch({ style: style });
                        }
                    },
                },
                tabindex: 0,
                style: item.$style || {
                    position: "absolute",
                },
            }, _this._drawMenuItems(itemId));
        })
            .reverse();
    };
    Navbar.prototype._onMenuItemClick = function (id, e) {
        var item = this.data.getItem(id);
        if (item.disabled) {
            return;
        }
        if (item.twoState) {
            this.data.update(item.id, { active: !item.active });
        }
        this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
        this._close(e);
    };
    Navbar.prototype._activeItemChange = function (id, e) {
        var _this = this;
        if (this._activeParents) {
            var parentIds_1 = this._getParents(id, this._currentRoot);
            this._activeParents.forEach(function (parentId) {
                if (_this.data.exists(parentId) && !parentIds_1.includes(parentId)) {
                    _this.data.update(parentId, { $activeParent: false }, false);
                }
            });
        }
        if (id && !this._documentHaveListener) {
            this._listenOuterClick();
        }
        if (id && this.data.haveItems(id)) {
            if (this._activeMenu !== id || !this._popupActive) {
                this.events.fire(types_1.NavigationBarEvents.openMenu, [id]);
            }
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this.paint();
        }
        else {
            clearTimeout(this._currentTimeout);
            this._currentTimeout = setTimeout(function () { return _this.paint(); }, 400);
        }
    };
    Navbar.prototype._resetHotkeys = function () {
        var _this = this;
        Keymanager_1.keyManager.removeHotKey(null, this);
        this.data.map(function (item) {
            if (item.hotkey) {
                Keymanager_1.keyManager.addHotKey(item.hotkey, function () { return _this._onMenuItemClick(item.id, null); }, _this);
            }
        });
    };
    Navbar.prototype._setProp = function (id, key, value) {
        var _a;
        var _this = this;
        if (Array.isArray(id)) {
            id.forEach(function (itemId) {
                var _a;
                return _this.data.update(itemId, (_a = {}, _a[key] = value, _a));
            });
        }
        else {
            this.data.update(id, (_a = {}, _a[key] = value, _a));
        }
    };
    return Navbar;
}(view_1.View));
exports.Navbar = Navbar;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(67);
var navItem_1 = __webpack_require__(68);
var customHTMLButton_1 = __webpack_require__(69);
var imageButton_1 = __webpack_require__(70);
var input_1 = __webpack_require__(71);
var menuItem_1 = __webpack_require__(72);
var separator_1 = __webpack_require__(73);
var spacer_1 = __webpack_require__(74);
var title_1 = __webpack_require__(75);
var helpers_1 = __webpack_require__(11);
function itemfactory(item, events, widgetName, props) {
    switch (item.type) {
        case "navItem":
        case "selectButton":
            return navItem_1.navItem(item, widgetName, props.collapsed);
        case "button":
            return button_1.button(item, widgetName);
        case "title":
            return title_1.title(item, widgetName);
        case "separator":
            return separator_1.separator(item, widgetName);
        case "spacer":
            return spacer_1.spacer(item, widgetName);
        case "input":
            return input_1.input(item, events, widgetName);
        case "imageButton":
            return imageButton_1.imageButton(item, widgetName);
        case "menuItem":
            return menuItem_1.menuItem(item, widgetName, props.asMenuItem);
        case "customHTMLButton":
            return customHTMLButton_1.customHTMLButton(item, widgetName, props.asMenuItem);
        case "block":
        default:
            throw new Error("unknown item type " + item.type);
    }
}
function normalizeOpenIcon(widgetName, item, data) {
    switch (widgetName) {
        case "sidebar":
        case "context-menu":
            item.$openIcon = "right";
            break;
        case "toolbar":
            if (item.parent === data.getRoot()) {
                item.$openIcon = "right";
            }
            else {
                item.$openIcon = "bottom";
            }
            break;
        case "menu":
            if (item.parent !== this.data.getRoot()) {
                item.$openIcon = "right";
            }
            break;
        case "ribbon": {
            var parent_1 = data.getItem(item.parent);
            if (parent_1 && item.type !== "block") {
                if (parent_1.type === "block") {
                    item.$openIcon = "bottom";
                }
                else {
                    item.$openIcon = "right";
                }
            }
            break;
        }
    }
}
function createFactory(_a) {
    var defaultType = _a.defaultType, allowedTypes = _a.allowedTypes, widgetName = _a.widgetName, widget = _a.widget;
    var allowedSet = new Set();
    for (var _i = 0, allowedTypes_1 = allowedTypes; _i < allowedTypes_1.length; _i++) {
        var type = allowedTypes_1[_i];
        allowedSet.add(type);
    }
    var config = widget.config, events = widget.events, data = widget.data;
    return function (item, asMenuItem) {
        if (item.hidden) {
            return null;
        }
        if (!item.type || item.type === "button" || item.type === "navItem" || item.type === "menuItem") {
            if (!item.value && !item.icon && !item.html) {
                return null;
            }
        }
        item.type = item.type || defaultType;
        if (allowedSet && !allowedSet.has(item.type)) {
            item.type = defaultType;
        }
        if (item.type === "imageButton" && widgetName !== "ribbon") {
            item.active = false;
        }
        if (asMenuItem && item.type !== "spacer" && item.type !== "separator" && item.type !== "customHTML") {
            item.type = "menuItem";
        }
        if (data.haveItems(item.id)) {
            normalizeOpenIcon(widgetName, item, data);
        }
        if (widgetName === "toolbar" && item.items) {
            item.items.forEach(function (element) {
                if (!element.type) {
                    element.type = "menuItem";
                }
            });
        }
        var itemVNode = item.type !== "customHTML" &&
            itemfactory(item, events, widgetName, {
                asMenuItem: asMenuItem,
                collapsed: widgetName !== "sidebar" || config.collapsed,
            });
        return helpers_1.navbarComponentMixin(widgetName, item, asMenuItem, itemVNode);
    };
}
exports.createFactory = createFactory;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(11);
function button(item, widgetName) {
    var isIconButton = item.icon && !item.value;
    var counterClass = isIconButton ? " dhx_navbar-count--absolute" : " dhx_navbar-count--button-inline";
    return dom_1.el("button.dhx_button", {
        class: helpers_1.getNavbarButtonCSS(item, widgetName),
        dhx_id: item.id,
        disabled: item.disabled,
        type: "button",
    }, [
        item.icon ? helpers_1.getIcon(item.icon, "button") : null,
        item.html
            ? dom_1.el("div.dhx_button__text", { ".innerHTML": item.html })
            : item.value && dom_1.el("span.dhx_button__text", item.value),
        item.count > 0 && helpers_1.getCount(item, counterClass, isIconButton),
        item.value && item.$openIcon
            ? dom_1.el("span.dhx_button__icon.dhx_button__icon--menu.dxi.dxi-menu-right")
            : null,
        item.loading &&
            dom_1.el("span.dhx_button__loading", [dom_1.el("span.dhx_button__loading-icon.dxi.dxi-loading")]),
    ]);
}
exports.button = button;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(11);
function navItem(item, widgetName, collapsed) {
    var baseClass = " dhx_" + widgetName + "-button";
    return dom_1.el("button", {
        class: "dhx_button" +
            baseClass +
            (item.active || item.$activeParent ? baseClass + "--active" : "") +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.$openIcon ? baseClass + "--select" : "") +
            (item.circle ? baseClass + "--circle" : "") +
            (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.icon ? baseClass + "--icon" : "") +
            (item.css ? " " + item.css : ""),
        dhx_id: item.id,
        disabled: item.disabled,
        type: "button",
    }, [
        item.icon &&
            dom_1.el("span", {
                class: item.icon + baseClass + "__icon",
            }),
        item.html &&
            dom_1.el("div", {
                class: baseClass.trim() + "__html",
                ".innerHTML": item.html,
            }),
        !item.html &&
            item.value &&
            dom_1.el("span", {
                class: baseClass.trim() + "__text",
            }, item.value),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", collapsed),
        item.$openIcon &&
            dom_1.el("span.dxi.dxi-menu-right", {
                class: baseClass + "__caret",
            }),
    ]);
}
exports.navItem = navItem;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function customHTMLButton(item, widgetName, asMenuItem) {
    var baseClass = asMenuItem ? " dhx_button dhx_menu-button" : " dhx_button dhx_nav-menu-button";
    return dom_1.el("button", {
        class: "dhx_custom-button" + baseClass + (item.$activeParent ? baseClass + "--active" : ""),
        dhx_id: item.id,
        type: "button",
        ".innerHTML": item.html,
    }, item.html ? "" : item.value);
}
exports.customHTMLButton = customHTMLButton;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(11);
function imageButton(item, widgetName) {
    var baseClass = "dhx_" + widgetName + "-button-image";
    var isRibbon = widgetName === "ribbon";
    return dom_1.el("button.dhx_button", {
        class: baseClass +
            (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.src ? " " + baseClass + "--icon" : "") +
            (isRibbon && item.$openIcon ? " " + baseClass + "--select" : "") +
            (item.active ? " " + baseClass + "--active" : ""),
        dhx_id: item.id,
        type: "button",
    }, [
        isRibbon &&
            item.value &&
            item.$openIcon &&
            dom_1.el("span.dxi.dxi-menu-right", {
                class: baseClass + "__caret",
            }),
        item.html
            ? dom_1.el("div", {
                class: baseClass + "__text",
                ".innerHTML": item.html,
            })
            : item.value &&
                dom_1.el("span", {
                    class: baseClass + "__text",
                }, item.value),
        item.src &&
            dom_1.el("span", {
                class: baseClass + "__image",
                style: { backgroundImage: "url(" + item.src + ")" },
            }),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", true),
    ]);
}
exports.imageButton = imageButton;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(19);
function onBlur(events, id) {
    events.fire(types_1.NavigationBarEvents.inputBlur, [id]);
}
function onFocus(events, id) {
    events.fire(types_1.NavigationBarEvents.inputFocus, [id]);
}
function input(item, events, widgetName) {
    return dom_1.el(".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr" +
        (".dhx_" + widgetName + "__input"), {
        style: {
            width: item.width ? item.width : "200px",
        },
    }, [
        dom_1.el("label.dhx_label", { for: item.id }, item.label),
        dom_1.el(".dhx_input__wrapper", [
            dom_1.el("input.dhx_input", {
                placeholder: item.placeholder,
                class: item.icon ? "dhx_input--icon-padding" : "",
                value: item.value,
                onblur: [onBlur, events, item.id],
                onfocus: [onFocus, events, item.id],
                dhx_id: item.id,
                _hooks: {
                    didInsert: function (node) {
                        if (events) {
                            events.fire(types_1.NavigationBarEvents.inputCreated, [item.id, node.el]);
                        }
                    },
                },
                _key: item.id,
            }),
            item.icon
                ? dom_1.el(".dhx_input__icon", {
                    class: item.icon,
                })
                : null,
        ]),
    ]);
}
exports.input = input;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(11);
function menuItem(item, widgetName, asMenuItem) {
    var baseClass = asMenuItem ? " dhx_menu-button" : " dhx_nav-menu-button";
    return dom_1.el("button", {
        class: "dhx_button" +
            baseClass +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.active || item.$activeParent ? baseClass + "--active" : ""),
        disabled: item.disabled,
        dhx_id: item.id,
        type: "button",
    }, asMenuItem
        ? [
            item.icon || item.value || item.html
                ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--left", [
                    item.icon &&
                        dom_1.el("span.dhx_menu-button__icon", {
                            class: item.icon,
                        }),
                    item.html
                        ? dom_1.el("div.dhx_menu-button__text", { ".innerHTML": item.html })
                        : item.value && dom_1.el("span.dhx_menu-button__text", item.value),
                ])
                : null,
            item.count > 0 || item.hotkey || item.items
                ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--right", [
                    item.count > 0 && helpers_1.getCount(item, " dhx_menu-button__count", false),
                    item.hotkey && dom_1.el("span.dhx_menu-button__hotkey", item.hotkey),
                    item.items && dom_1.el("span.dhx_menu-button__caret.dxi.dxi-menu-right"),
                ])
                : null,
        ]
        : [
            item.icon &&
                dom_1.el("span.dhx_menu-button__icon", {
                    class: item.icon,
                }),
            item.html
                ? dom_1.el("div.dhx_menu-button__text", { ".innerHTML": item.html })
                : item.value && dom_1.el("span.dhx_nav-menu-button__text", item.value),
        ]);
}
exports.menuItem = menuItem;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function separator(item, widgetName) {
    return null;
}
exports.separator = separator;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function spacer(item, widgetName) {
    return null;
}
exports.spacer = spacer;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function title(item, widgetName) {
    return dom_1.el("span", {
        class: "dhx_navbar-title" + " dhx_navbar-title--" + widgetName,
        ".innerHTML": item.html,
    }, !item.html ? item.value : null);
}
exports.title = title;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_navbar_1 = __webpack_require__(29);
exports.NavigationBarEvents = ts_navbar_1.NavigationBarEvents;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var html_1 = __webpack_require__(2);
var ts_data_1 = __webpack_require__(3);
var types_1 = __webpack_require__(12);
var Uploader = /** @class */ (function () {
    function Uploader(config, data, events) {
        if (config === void 0) { config = {}; }
        this.config = core_1.extend({
            autosend: true,
            updateFromResponse: true,
            fieldName: "file",
        }, config);
        this.data = data || new ts_data_1.DataCollection();
        this.events = events || this.data.events;
        this.isActive = false;
        this._fileInput = document.createElement("input");
        this._fileInput.type = "file";
        this._fileInput.multiple = true;
        this._initEvents();
        this._dropAreas = new Map();
    }
    Uploader.prototype.selectFile = function () {
        this._fileInput.click();
    };
    Uploader.prototype.linkDropArea = function (element) {
        var _this = this;
        var node = html_1.toNode(element);
        var dragover = function (e) { return e.preventDefault(); };
        var drop = function (e) {
            e.preventDefault();
            _this.parseFiles(e.dataTransfer);
        };
        node.addEventListener("dragover", dragover);
        node.addEventListener("drop", drop);
        this._dropAreas.set(node, {
            dragover: dragover,
            drop: drop,
        });
    };
    Uploader.prototype.unlinkDropArea = function (element) {
        var _this = this;
        if (!element) {
            this._dropAreas.forEach(function (_, node) {
                _this._unlinkDropArea(node);
            });
            this._dropAreas.clear();
        }
        else {
            var node = html_1.toNode(element);
            this._unlinkDropArea(node);
            this._dropAreas.delete(node);
        }
    };
    Uploader.prototype.parseFiles = function (dataTransfer) {
        if (!dataTransfer.items || !dataTransfer.items[0] || !dataTransfer.items[0].webkitGetAsEntry) {
            var files = dataTransfer.files;
            for (var i = 0; i < files.length; i++) {
                this._addFile(files[i]);
            }
            if (this.config.autosend) {
                this.send();
            }
        }
        else {
            this._parseAsWebkitEntry(dataTransfer.items);
        }
    };
    Uploader.prototype.send = function (params) {
        var _this = this;
        if (this._uploadInfo && this.isActive) {
            // cancel two active sends
            return;
        }
        var all = this.data.findAll(function (item) { return item.status === types_1.FileStatus.queue || item.status === types_1.FileStatus.failed; });
        var files = all.filter(function (file) { return _this.events.fire(types_1.UploaderEvents.beforeUploadFile, [file]); });
        if (!files.length) {
            return;
        }
        this.isActive = true;
        this._uploadInfo = {
            files: files,
            count: files.length,
            size: files.reduce(function (s, f) { return s + f.file.size; }, 0),
        };
        this.events.fire(types_1.UploaderEvents.uploadBegin, [files]);
        this.events.fire(types_1.UploaderEvents.uploadProgress, [0, 0, this._uploadInfo.size]);
        if (this.config.singleRequest) {
            this._xhrSend(files, params);
        }
        else {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var fileWrapper = files_1[_i];
                this._xhrSend([fileWrapper], params);
            }
        }
    };
    Uploader.prototype.abort = function (id) {
        if (!id) {
            if (!this._uploadInfo || !this._uploadInfo.files) {
                return;
            }
            for (var _i = 0, _a = this._uploadInfo.files; _i < _a.length; _i++) {
                var fileWrapper = _a[_i];
                this.abort(fileWrapper.id);
            }
            return;
        }
        else {
            var item = this.data.getItem(id);
            if (!item || !item.request || item.request.readyState === 4) {
                return;
            }
            item.request.abort();
        }
    };
    Uploader.prototype._unlinkDropArea = function (node) {
        var handlers = this._dropAreas.get(node);
        if (!handlers) {
            return;
        }
        var dragover = handlers.dragover, drop = handlers.drop;
        node.removeEventListener("dragover", dragover);
        node.removeEventListener("drop", drop);
    };
    Uploader.prototype._initEvents = function () {
        var _this = this;
        this._fileInput.addEventListener("change", function () {
            var files = _this._fileInput.files;
            for (var i = 0; i < files.length; i++) {
                _this._addFile(files[i]);
            }
            if (_this.config.autosend) {
                _this.send();
            }
            _this._fileInput.value = null; // clear file input after get info about files
        });
    };
    Uploader.prototype._xhrSend = function (fileWrappers, params) {
        var _this = this;
        var formData = this._createFormData(fileWrappers, params);
        var request = new XMLHttpRequest();
        var headerParams = this.config.headerParams;
        for (var _i = 0, fileWrappers_1 = fileWrappers; _i < fileWrappers_1.length; _i++) {
            var fileWrapper = fileWrappers_1[_i];
            this.data.update(fileWrapper.id, {
                request: request,
                status: types_1.FileStatus.inprogress,
                progress: 0,
            });
        }
        request.open("POST", this.config.target);
        if (headerParams) {
            for (var headerItem in headerParams) {
                request.setRequestHeader(headerItem, headerParams[headerItem]);
            }
        }
        request.upload.onprogress = function (ev) {
            for (var _i = 0, fileWrappers_2 = fileWrappers; _i < fileWrappers_2.length; _i++) {
                var fileWrapper = fileWrappers_2[_i];
                _this.data.update(fileWrapper.id, {
                    progress: ev.loaded / ev.total,
                    status: types_1.FileStatus.inprogress,
                });
            }
            var current = _this._uploadInfo.files.reduce(function (tot, file) { return tot + file.size * file.progress; }, 0) || 0;
            var total = _this._uploadInfo.size;
            var progress = (current / _this._uploadInfo.size) * 100 || 0;
            _this.events.fire(types_1.UploaderEvents.uploadProgress, [progress, current, total]);
        };
        request.onloadend = function () {
            _this._uploadInfo.count = _this.config.singleRequest ? 0 : _this._uploadInfo.count - 1;
            var status = request.status === 200 ? types_1.FileStatus.uploaded : types_1.FileStatus.failed;
            var extra = request.status === 200 && request.response ? JSON.parse(request.response) : null;
            for (var _i = 0, fileWrappers_3 = fileWrappers; _i < fileWrappers_3.length; _i++) {
                var fileWrapper = fileWrappers_3[_i];
                _this.data.update(fileWrapper.id, { status: status });
                if (status === types_1.FileStatus.uploaded) {
                    if (_this.config.updateFromResponse && extra) {
                        if (_this.config.singleRequest && extra[fileWrapper.id]) {
                            _this.data.update(fileWrapper.id, extra[fileWrapper.id]);
                        }
                        else if (!_this.config.singleRequest) {
                            _this.data.update(fileWrapper.id, extra);
                        }
                    }
                    _this.events.fire(types_1.UploaderEvents.uploadFile, [fileWrapper, extra]);
                }
                else {
                    _this.events.fire(types_1.UploaderEvents.uploadFail, [fileWrapper]);
                }
            }
            if (_this._uploadInfo.count === 0) {
                _this.isActive = false;
                _this.events.fire(types_1.UploaderEvents.uploadComplete, [_this._uploadInfo.files]);
            }
        };
        request.send(formData);
    };
    Uploader.prototype._parseAsWebkitEntry = function (items) {
        var _this = this;
        var reads = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i].webkitGetAsEntry();
            reads.push(this._traverseFileTree(item));
        }
        Promise.all(reads).then(function () {
            if (_this.config.autosend) {
                _this.send();
            }
        });
    };
    Uploader.prototype._createFormData = function (fileWrappers, params) {
        var fieldName = this.config.fieldName;
        var formData = new FormData();
        var extraParams = this.config.params;
        if (params) {
            for (var key in params) {
                formData.append(key, params[key]);
            }
        }
        if (extraParams) {
            for (var key in extraParams) {
                formData.append(key, extraParams[key]);
            }
        }
        var brackets = fileWrappers.length > 1 ? "[]" : "";
        for (var _i = 0, fileWrappers_4 = fileWrappers; _i < fileWrappers_4.length; _i++) {
            var fileWrapper = fileWrappers_4[_i];
            formData.append(fieldName + brackets, fileWrapper.file, fileWrapper.file.name);
            formData.append(fieldName + "_fullname" + brackets, fileWrapper.path + fileWrapper.file.name);
            formData.append(fieldName + "_id" + brackets, fileWrapper.id);
        }
        return formData;
    };
    Uploader.prototype._addFile = function (file, path) {
        if (path === void 0) { path = ""; }
        var fileWrapper = {
            id: core_1.uid(),
            file: file,
            progress: 0,
            status: types_1.FileStatus.queue,
            src: null,
            path: path,
        };
        this.data.add(fileWrapper);
    };
    Uploader.prototype._traverseFileTree = function (item) {
        var _this = this;
        return new Promise(function (res) {
            var count = 0;
            var readDirectory = function (reader, path) {
                count++;
                reader.readEntries(function (entries) {
                    count--;
                    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                        var entry = entries_1[_i];
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        readEntry(entry, path);
                    }
                    if (count === 0) {
                        res();
                    }
                });
            };
            var readEntry = function (entry, path) {
                if (entry.isFile) {
                    count++;
                    entry.file(function (file) {
                        count--;
                        _this._addFile(file, path);
                        if (count === 0) {
                            res();
                        }
                    });
                }
                else if (entry.isDirectory) {
                    var reader = entry.createReader();
                    readDirectory(reader, path + entry.name + "/");
                }
            };
            readEntry(item, "");
        });
    };
    return Uploader;
}());
exports.Uploader = Uploader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(2);
var ts_message_1 = __webpack_require__(16);
var helper_1 = __webpack_require__(30);
var types_1 = __webpack_require__(12);
var en_1 = __webpack_require__(9);
exports.gridTemplate = function (item) {
    var inProgress = item.status === types_1.FileStatus.inprogress;
    var isError = item.status === types_1.FileStatus.failed;
    var notUploaded = item.status !== types_1.FileStatus.uploaded;
    var className = "dhx_dataview-item--file__";
    switch (item.status) {
        case types_1.FileStatus.inprogress:
            className += "progress";
            break;
        case types_1.FileStatus.queue:
            className += "queue";
            break;
        case types_1.FileStatus.failed:
            className += "failed";
            break;
        default:
            className = "";
            break;
    }
    var link = "";
    var downloadName = "";
    if (item.link) {
        link = (item.downloadURL || "") + item.link;
        downloadName = link
            .split("/")
            .pop()
            .split("?")[0];
    }
    var imagePreview = "";
    if (/image/.exec(helper_1.getFileClassName(item))) {
        if (item.image && item.image.src) {
            imagePreview = "style=\"background:url('" + item.image.src + "') center center no-repeat;background-size:cover\"";
        }
        else if (item.link) {
            imagePreview = "style=\"background:url('" + link + "') center center no-repeat;background-size:cover\"";
        }
    }
    return "<div class=\"dhx_dataview-item--file " + className + "\">\n\t\t<div class=\"dhx_dataview-item--file-type " + helper_1.getFileClassName(item) + "\" " + imagePreview + "></div>\n\t\t" + (inProgress
        ? "<div class=\"dhx_dataview-item--progress-block\">\n\t\t\t\t\t<div class=\"dhx_dataview-item--progress-value\">" + ((item.progress * 100).toFixed(1) + "%") + "</div>\n\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"dhx_vault-item--progress-circle\" viewBox=\"0 0 60 60\">\n\t\t\t\t\t\t<circle cx=\"30\" cy=\"30\" r=\"28\" stroke-width=\"4\" class=\"dhx_vault-item--progress-bar-background\"></circle>\n\t\t\t\t\t\t<circle cx=\"30\" cy=\"30\" r=\"28\" stroke-width=\"4\" stroke-dasharray=\"175.9 175.9\" stroke-dashoffset=\"" + (1 -
            item.progress) *
            175.9 + "\" class=\"active-circle dhx_vault-item--progress-bar-active\"></circle>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>"
        : "<div class=\"dhx_dataview-item--default-block\">\n\t\t\t\t\t" + (isError
            ? "<div class=\"dhx_dataview-item--error-mark dxi dxi-alert-circle\"></div>"
            : notUploaded
                ? "<div class=\"dhx_dataview-item--error-mark dxi dxi-vault\"></div>"
                : "<div class=\"dhx_dataview-item--success-mark dxi dxi-checkbox-marked-circle\"></div>") + "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"dhx_dataview-item--hover-block\">\n\t\t\t\t\t<div class=\"dhx_dataview-item--control-block " + (isError || notUploaded || !item.link
            ? "dhx_dataview-item--control-block__withoutLink"
            : "") + "\">\n\t\t\t\t\t\t" + (!isError && !notUploaded && item.link
            ? "<a href=\"" + link + "\" class=\"dhx_dataview-item--download-btn dxi dxi-download\" download=\"" + downloadName + "\"></a>\n\t\t\t\t\t\t\t\t\t<div class=\"dhx_dataview-item--remove-btn dxi dxi-delete-forever\"></div>"
            : "<div class=\"dhx_dataview-item--remove-btn dxi dxi-delete-forever\"></div>") + "\n\t\t\t\t\t</div>\n\t\t\t\t\t" + (isError
            ? "<div class=\"dhx_dataview-item--error-text\">" + en_1.default.error + "</div>"
            : "<div class=\"dhx_dataview-item--file-size\">" + helper_1.getBasis(item.size) + "</div>") + "\n\t\t\t\t</div>") + "\n\t\t</div>\n\t<div class=\"dhx_dataview-item--file-name\">" + helper_1.truncateWord(item.name) + "</div>";
};
exports.listTemplate = function (item) {
    var isError = item.status === types_1.FileStatus.failed;
    var inProgress = item.status === types_1.FileStatus.inprogress;
    var notUploaded = item.status !== types_1.FileStatus.uploaded && !isError;
    var link = "";
    var downloadName = "";
    if (item.link) {
        link = (item.downloadURL || "") + item.link;
        downloadName = link
            .split("/")
            .pop()
            .split("?")[0];
    }
    return "<div class=\"dhx_list-item--icon " + (notUploaded ? "dhx_list-item--queue" : "") + "\">\n\t\t\t<div class=\"dhx_list-item--file-type " + helper_1.getFileClassName(item) + "\"></div>\n\t\t</div>\n\t\t<div class=\"dhx_list-item--content\">\n\t\t" + (inProgress
        ? "<div class=\"dhx_list-item--name\">" + item.name + "\n\t\t\t\t\t<p class=\"dhx_item--progress-value\">" + ((item.progress * 100).toFixed(1) + "%") + "</p>\n\t\t\t\t</div>"
        : "<div class=\"dhx_list-item--name\">" + item.name + "\n\t\t\t\t\t" + (isError ? "<div class=\"dhx_list-item--error-info\">" + en_1.default.error + "</div>" : "") + "\n\t\t\t\t\t<div class=\"dhx_list-item--size " + (isError ? "error" : "") + "\">" + helper_1.getBasis(item.size) + "</div>\t\n\t\t\t\t</div>") + "\n\t\t</div>\n\t\t" + (inProgress
        ? "<div class=\"dhx_item--download-progress\" style=\"width:" + (item.progress * 100).toFixed(1) + "%\"></div>"
        : "<div class=\"dhx_item--info\">\n\t\t\t\t\t" + (isError
            ? "<div class=\"dhx_item--error-mark dxi dxi-alert-circle\"></div><div class=\"dhx_item--btn-remove dxi dxi-delete-forever\"></div>"
            : (notUploaded
                ? "<div class=\"dhx_item--error-mark dxi dxi-vault\"></div>"
                : "<div class=\"dhx_item--success-mark dxi dxi-checkbox-marked-circle\"></div>") + "\n\t\t\t\t\t\t\t<div class=\"dhx_item--hover-block\">\n\t\t\t\t\t\t\t\t" + (!isError && !notUploaded && item.link
                ? "<a href=\"" + link + "\" class=\"dhx_item--download-btn dxi dxi-download\" download=\"" + downloadName + "\"></a>"
                : "") + "\n\t\t\t\t\t\t\t\t<div class=\"dhx_item--btn-remove dxi dxi-delete-forever\"></div>\n\t\t\t\t\t\t\t</div>") + "\n\t\t\t\t</div>");
};
exports.getContainersEvents = function (data) {
    var mouseOverFileNameHandler = function (event) {
        var id = html_1.locate(event);
        if (!id) {
            return;
        }
        var item = data.getItem(id);
        ts_message_1.tooltip(item.name, {
            node: event.target,
            position: ts_message_1.Position.bottom,
        });
    };
    return {
        onclick: {
            "dxi-delete-forever": function (event) {
                var id = html_1.locate(event);
                if (!id) {
                    return;
                }
                helper_1.removeItem(data, id);
            },
        },
        onmouseover: {
            "dxi-download": function (event) {
                ts_message_1.tooltip(en_1.default.download, {
                    node: event.target,
                    position: ts_message_1.Position.bottom,
                });
            },
            "dxi-delete-forever": function (event) {
                ts_message_1.tooltip(en_1.default.clear, {
                    node: event.target,
                    position: ts_message_1.Position.bottom,
                });
            },
            "dhx_list-item--name": mouseOverFileNameHandler,
            "dhx_dataview-item--file-name": mouseOverFileNameHandler,
        },
    };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var en_1 = __webpack_require__(9);
var types_1 = __webpack_require__(12);
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(events, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = events;
        _this._progress = 0;
        var render = function () { return _this._draw(); };
        _this.mount(null, dom_1.create({
            render: render,
        }));
        _this._abortUpload = function () {
            _this.events.fire(types_1.ProgressBarEvents.cancel);
        };
        return _this;
    }
    ProgressBar.prototype.setState = function (progress, extra) {
        this._progress = progress;
        if (this.config.template) {
            this._progressText = this.config.template(progress, extra);
        }
        else {
            this._progressText = this._progress.toFixed(1) + "%";
        }
        this.paint();
    };
    ProgressBar.prototype._draw = function () {
        return dom_1.el(".progress-bar", {
            _key: this._uid,
        }, [
            dom_1.el(".progress-indicator", {
                style: {
                    width: this._progress + "%",
                },
            }),
            dom_1.el(".progress-text", {
                ".innerHTML": this._progressText,
            }),
            dom_1.el("button", {
                class: "dhx_button dhx_button--color_primary dhx_button--size_small dhx_button--view_flat action-abort-all",
                onclick: this._abortUpload,
            }, en_1.default.cancel),
        ]);
    };
    return ProgressBar;
}(view_1.View));
exports.ProgressBar = ProgressBar;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReadStackPreview = /** @class */ (function () {
    function ReadStackPreview(data) {
        this._readerStack = [];
        this._isActive = false;
        this._data = data;
    }
    ReadStackPreview.prototype.add = function (fileWrapper, wait) {
        if (wait === void 0) { wait = false; }
        this._readerStack.push(fileWrapper);
        if (!wait) {
            this.read();
        }
    };
    ReadStackPreview.prototype.read = function () {
        var _this = this;
        if (!this._readerStack.length || this._isActive) {
            return;
        }
        var fileWrapper = this._readerStack.shift();
        this._isActive = true;
        var reader = new FileReader();
        reader.readAsDataURL(fileWrapper.file);
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                if (_this._data.exists(fileWrapper.id)) {
                    _this._data.update(fileWrapper.id, { image: image });
                }
                _this._isActive = false;
                _this.read();
            };
        };
        reader.onerror = function () {
            _this._isActive = false;
            _this.read();
        };
    };
    ReadStackPreview.prototype.stop = function () {
        this._readerStack = [];
    };
    return ReadStackPreview;
}());
exports.ReadStackPreview = ReadStackPreview;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(82));
__export(__webpack_require__(21));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var Keymanager_1 = __webpack_require__(18);
var ts_list_1 = __webpack_require__(31);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(3);
var events_1 = __webpack_require__(5);
var html_1 = __webpack_require__(2);
var types_1 = __webpack_require__(21);
var editors_1 = __webpack_require__(87);
var DataView = /** @class */ (function (_super) {
    __extends(DataView, _super);
    function DataView(node, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, node, core_1.extend({
            keyNavigation: true,
            itemsInRow: 1,
            selection: true,
            multiselectionMode: config.multiselectionMode ? config.multiselectionMode : "click",
            gap: "0px",
            editable: false,
        }, config)) || this;
        _this._events = {};
        _this._touch = {
            duration: 350,
            dblDuration: 300,
            timer: null,
            start: false,
            timeStamp: null,
        };
        if (_this.config.multiselectionMode === "ctrlClick") {
            _this.config.multiselection = "ctrlClick"; // TODO: remove suite_7.0
        }
        _this.config.editable = _this.config.editable || _this.config.editing; // TODO: remove suite_7.0
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
            _this.data.parse(_this.config.data);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.selection = new ts_list_1.Selection({
            multiselection: _this.config.multiselection,
            disable: !_this.config.selection,
        }, _this.data);
        _this._focusIndex = !_this.config.selection && _this.config.keyNavigation ? 0 : undefined;
        _this._getHotkeys();
        var updater = function (updateObj) { return function (_a) {
            var source = _a.source, target = _a.target, start = _a.start;
            if (source && source instanceof Array && source.length > 1) {
                source.map(function (selectedId) { return _this.data.exists(selectedId) && _this.data.update(selectedId, updateObj); });
                return;
            }
            if (_this.data.exists(target)) {
                _this.data.update(target, updateObj);
            }
            if (_this.data.exists(start)) {
                _this.data.update(start, updateObj);
            }
        }; };
        _this.events.on(ts_data_1.DataEvents.beforeRemove, function (obj) {
            var delIndex = _this.data.getIndex(obj.id);
            if (delIndex < _this._focusIndex) {
                _this._focusIndex--;
            }
        });
        _this.events.on(ts_data_1.DataEvents.afterRemove, function () {
            var id = _this.selection.getId();
            if (!id && !_this._focusIndex) {
                return;
            }
            if (!id && _this._focusIndex) {
                id = _this.data.getId(_this._focusIndex);
                _this.setFocus(id);
                return;
            }
            _this.setFocus(id[id.length - 1]);
        });
        _this.events.on(ts_data_1.DataEvents.change, function () {
            _this.paint();
        });
        _this.events.on(ts_data_1.DragEvents.canDrop, updater({ $drophere: true }));
        _this.events.on(ts_data_1.DragEvents.cancelDrop, updater({ $drophere: undefined }));
        _this.events.on(ts_data_1.DragEvents.dragStart, updater({ $dragtarget: true }));
        _this.events.on(ts_data_1.DragEvents.afterDrag, updater({ $dragtarget: undefined }));
        _this.events.on(types_1.DataViewEvents.afterEditEnd, function (value, id) {
            var item = _this.data.getItem(id);
            _this.data.update(id, __assign(__assign({}, item), { value: value }));
            _this._edited = null;
            _this._getHotkeys();
            _this.paint();
        });
        _this._handlers = {
            onmousedown: function (e) {
                _this._dragStart(e);
            },
            ontouchstart: function (e) {
                _this._touch.timer = setTimeout(function () {
                    _this._dragStart(e);
                }, _this._touch.duration);
                if (!_this._touch.timeStamp) {
                    _this._touch.timeStamp = +e.timeStamp.toFixed();
                }
                else {
                    var dblTap = _this._touch.dblDuration >= _this._touch.timeStamp - +e.timeStamp.toFixed();
                    if (dblTap) {
                        e.preventDefault();
                        _this._dblClick(e);
                    }
                    _this._touch.timeStamp = null;
                }
                setTimeout(function () {
                    _this._touch.timeStamp = null;
                }, _this._touch.dblDuration);
            },
            ontouchmove: function (e) {
                _this._touch.start && e.preventDefault();
                _this._clearTouchTimer();
            },
            ontouchend: function () {
                _this._touch.start = false;
                _this._clearTouchTimer();
            },
            ondragstart: function () { return (_this.config.dragMode && !_this._edited ? false : null); },
            oncontextmenu: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                if (!id) {
                    return;
                }
                _this.events.fire(types_1.DataViewEvents.itemRightClick, [id, e]);
                _this.events.fire(types_1.DataViewEvents.contextmenu, [id, e]); // TODO: remove suite_7.0
            },
            ondblclick: function (e) {
                _this._dblClick(e);
            },
            onclick: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                if (!id) {
                    return;
                }
                _this.setFocus(id);
                _this.selection.add(id, e.ctrlKey || e.metaKey, e.shiftKey);
                _this.events.fire(types_1.DataViewEvents.click, [id, e]);
            },
            onmouseover: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                var element = html_1.locateNode(e, "dhx_id", "relatedTarget");
                if (!element && id) {
                    _this.events.fire(types_1.DataViewEvents.itemMouseOver, [id, e]);
                    return;
                }
                else if (!element) {
                    return;
                }
                var attr = element.getAttribute("dhx_id") ? element.getAttribute("dhx_id") : null;
                var prevId = attr ? attr : "";
                if (!id || id === prevId) {
                    return;
                }
                _this.events.fire(types_1.DataViewEvents.itemMouseOver, [id, e]);
            },
        };
        if (_this.config.dragMode) {
            ts_data_1.dragManager.setItem(_this._uid, _this);
        }
        if (_this.config.eventHandlers) {
            for (var key in _this.config.eventHandlers) {
                if (_this.config.eventHandlers.hasOwnProperty(key)) {
                    var events = _this.config.eventHandlers[key];
                    _this._events[key] = html_1.eventHandler(function (e) { return html_1.locate(e, "dhx_id"); }, __assign({}, events));
                }
            }
        }
        var view = dom_1.create({
            render: function () { return _this._draw(); },
            hooks: {
                didRedraw: function (vm) {
                    var rootEl = vm.node.el;
                    var hasScroll = rootEl.scrollHeight > rootEl.offsetHeight;
                    var classAttr = vm.node.attrs.class.replace(" dhx_dataview--has-scroll", "");
                    var newClassName = hasScroll ? classAttr + " dhx_dataview--has-scroll" : classAttr;
                    vm.node.patch({ class: newClassName });
                },
            },
        });
        _this.mount(node, view);
        return _this;
    }
    DataView.prototype.editItem = function (id) {
        this._edited = id;
        if (!this.data.getItem(this._edited) || !this.events.fire(types_1.DataViewEvents.beforeEditStart, [id])) {
            this._edited = null;
            return;
        }
        this._getHotkeys();
        this.paint();
        this.events.fire(types_1.DataViewEvents.afterEditStart, [id]);
    };
    DataView.prototype.getFocusItem = function () {
        return this.data.getItem(this.data.getId(this._focusIndex));
    };
    DataView.prototype.setItemInRow = function (amount) {
        this.config.itemsInRow = amount;
        this.paint();
    };
    DataView.prototype.setFocus = function (id) {
        var index = this.data.getIndex(id);
        this._setFocusIndex(index);
    };
    DataView.prototype.getFocus = function () {
        var item = this.data.getItem(this.data.getId(this._focusIndex));
        if (item) {
            return item.id;
        }
    };
    DataView.prototype.destructor = function () {
        this.events.clear();
        if (this._navigationDestructor) {
            this._navigationDestructor();
        }
        if (this._documentClickDestuctor) {
            this._documentClickDestuctor();
        }
        this.unmount();
    };
    // TODO: remove suite_7.0
    DataView.prototype.getFocusIndex = function () {
        return this._focusIndex;
    };
    // TODO: remove suite_7.0
    DataView.prototype.setFocusIndex = function (index) {
        this._setFocusIndex(index);
    };
    // TODO: remove suite_7.0
    DataView.prototype.edit = function (id) {
        this.editItem(id);
    };
    // TODO: remove suite_7.0
    DataView.prototype.disableSelection = function () {
        this.selection.disable();
        this.paint();
    };
    // TODO: remove suite_7.0
    DataView.prototype.enableSelection = function () {
        this.selection.enable();
        this.paint();
    };
    DataView.prototype._dblClick = function (e) {
        var id = html_1.locate(e);
        if (!id) {
            return;
        }
        if (this.config.editable) {
            this.editItem(id);
        }
        this.events.fire(types_1.DataViewEvents.doubleClick, [id, e]);
    };
    DataView.prototype._clearTouchTimer = function () {
        if (this._touch.timer) {
            clearTimeout(this._touch.timer);
            this._touch.timer = null;
        }
    };
    DataView.prototype._dragStart = function (e) {
        var _this = this;
        this._touch.start = true;
        var itemsForGhost = [];
        var item = html_1.locateNode(e, "dhx_id");
        var itemId = item && item.getAttribute("dhx_id");
        var selectionIds = this.selection.getId();
        if (this.config.multiselection && selectionIds instanceof Array) {
            selectionIds.map(function (id) {
                if (id !== itemId && _this.getRootView().refs[id]) {
                    itemsForGhost.push(_this.getRootView().refs[id].el);
                }
            });
        }
        return this.config.dragMode && !this._edited
            ? ts_data_1.dragManager.onMouseDown(e, this.selection.getId() || itemId, itemsForGhost)
            : null;
    };
    DataView.prototype._setFocusIndex = function (index) {
        if (index < 0 || index > this.data.getLength() - 1) {
            return;
        }
        this._focusIndex = index;
        var node = this.getRootNode();
        if (!node || !node.parentNode) {
            return;
        }
        var itemRow = node.children[Math.floor(this._focusIndex / this.config.itemsInRow)];
        if (itemRow) {
            var item = itemRow.children[this._focusIndex % this.config.itemsInRow];
            var gap = parseInt(this.config.gap.toString().replace("px", ""), null);
            if (item.offsetTop >= node.clientHeight + node.scrollTop - item.clientHeight) {
                node.scrollTop = item.offsetTop - node.clientHeight + item.clientHeight + gap;
            }
            else if (item.offsetTop < node.scrollTop - gap) {
                node.scrollTop = item.offsetTop - gap;
            }
        }
        this.events.fire(types_1.DataViewEvents.focusChange, [this._focusIndex, this.data.getId(this._focusIndex)]);
        this.paint();
        return;
    };
    DataView.prototype._renderItem = function (item, focus, isLastItemInRow) {
        var _a = this.config, itemsInRow = _a.itemsInRow, gap = _a.gap, template = _a.template, itemHeight = _a.itemHeight;
        var html = template ? template(item) : item.htmlContent;
        var gapWithPx = function (gapSize) { return parseFloat(gapSize); };
        var id = item.id.toString();
        if (id === this._edited) {
            var editor = editors_1.getEditor(item, this);
            return editor.toHTML(isLastItemInRow);
        }
        return dom_1.el("div", __assign(__assign({}, this._events), { class: "dhx_dataview-item" +
                (item.$selected ? " dhx_dataview-item--selected" : "") +
                (focus ? " dhx_dataview-item--focus" : "") +
                (item.$drophere && !this._edited ? " dhx_dataview-item--drophere" : "") +
                (item.$dragtarget && !this._edited ? " dhx_dataview-item--dragtarget" : "") +
                (this.config.dragMode && !this._edited ? " dhx_dataview-item--drag" : "") +
                (gapWithPx(gap) ? " dhx_dataview-item--with-gap" : "") +
                ((item.css && item.$selected) || (item.css && focus)
                    ? ""
                    : item.css
                        ? " " + item.css
                        : "") +
                (isLastItemInRow ? " dhx_dataview-item--last-item-in-row" : ""), style: {
                width: "calc(" + 100 / itemsInRow + "% - " + gapWithPx(gap) + " * " + (itemsInRow - 1) /
                    itemsInRow + "px)",
                "margin-right": isLastItemInRow ? "" : gap,
                height: template ? null : itemHeight,
            }, _key: id, dhx_id: id, _ref: id }), html
            ? [
                dom_1.el(".dhx_dataview-item__inner-html", {
                    ".innerHTML": html,
                }),
            ]
            : item.value || item.text || item.value);
    };
    DataView.prototype._draw = function () {
        var _this = this;
        var _a = this.config, itemsInRow = _a.itemsInRow, css = _a.css, gap = _a.gap;
        var currentCounter = 0;
        var rows = this.data.reduce(function (items, obj, index) {
            if (currentCounter === 0) {
                items.push([]);
            }
            items[items.length - 1].push(_this._renderItem(obj, index === _this._focusIndex, currentCounter === itemsInRow - 1));
            currentCounter = (currentCounter + 1) % itemsInRow;
            return items;
        }, []);
        return dom_1.el("", __assign(__assign({}, this._handlers), { dhx_widget_id: this._uid, class: (css ? css : "") +
                " dhx_widget dhx_dataview" +
                (this.config.multiselection && this.selection.getItem() ? " dhx_no-select--pointer" : ""), style: {
                height: this.config.height,
            } }), rows.map(function (row) {
            return dom_1.el(".dhx_dataview-row", {
                style: { margin: gap },
            }, row);
        }));
    };
    DataView.prototype._getHotkeys = function () {
        var _this = this;
        if (this.config.keyNavigation) {
            if (this._edited) {
                if (this._navigationDestructor) {
                    this._navigationDestructor();
                }
            }
            else {
                var keyNavigation = this.config.keyNavigation;
                if (typeof this.config.keyNavigation !== "function") {
                    this._widgetInFocus = false;
                    keyNavigation = function () { return _this._widgetInFocus; };
                    this._documentClickDestuctor = core_1.detectWidgetClick(this._uid, function (isInnerClick) { return (_this._widgetInFocus = isInnerClick); });
                }
                var preventEvent = function (fn) { return function (e) {
                    e.preventDefault();
                    fn();
                }; };
                var handlers = {
                    arrowDown: preventEvent(function () {
                        return _this.setFocusIndex(_this._focusIndex + _this.config.itemsInRow);
                    }),
                    arrowUp: preventEvent(function () {
                        return _this.setFocusIndex(_this._focusIndex - _this.config.itemsInRow);
                    }),
                    arrowLeft: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - 1); }),
                    arrowRight: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + 1); }),
                    enter: function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id);
                        _this.events.fire(types_1.DataViewEvents.click, [id, e]);
                    },
                    "enter+shift": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, false, true);
                        _this.events.fire(types_1.DataViewEvents.click, [id, e]);
                    },
                    "enter+ctrl": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, true, false);
                        _this.events.fire(types_1.DataViewEvents.click, [id, e]);
                    },
                    "ctrl+a": function (e) {
                        if (_this.config.multiselection) {
                            e.preventDefault();
                            _this.selection.remove();
                            var ids = _this.data.map(function (i) { return i.id; });
                            ids.forEach(function (id) {
                                if (_this.config.multiselection === "ctrlClick") {
                                    _this.selection.add(id, true);
                                }
                                else {
                                    _this.selection.add(id);
                                }
                            });
                        }
                    },
                };
                if (html_1.isIE()) {
                    handlers = __assign({ up: handlers.arrowUp, down: handlers.arrowDown, right: handlers.arrowRight, left: handlers.arrowLeft }, handlers);
                    delete handlers.arrowUp;
                    delete handlers.arrowDown;
                    delete handlers.arrowRight;
                    delete handlers.arrowLeft;
                }
                this._navigationDestructor = Keymanager_1.addHotkeys(handlers, keyNavigation);
            }
        }
    };
    return DataView;
}(view_1.View));
exports.DataView = DataView;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ts_data_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(5);
var Keymanager_1 = __webpack_require__(18);
var view_1 = __webpack_require__(8);
var Selection_1 = __webpack_require__(32);
var html_1 = __webpack_require__(2);
var types_1 = __webpack_require__(20);
var editors_1 = __webpack_require__(84);
var helpers_1 = __webpack_require__(86);
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(node, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, node, core_1.extend({
            itemHeight: config.virtual ? 37 : config.itemHeight || null,
            keyNavigation: false,
            selection: true,
            multiselectionMode: config.multiselectionMode ? config.multiselectionMode : "click",
            editable: false,
        }, config)) || this;
        _this._events = {};
        _this._touch = {
            duration: 350,
            dblDuration: 300,
            timer: null,
            start: false,
            timeStamp: null,
        };
        if (_this.config.multiselectionMode === "ctrlClick") {
            _this.config.multiselection = "ctrlClick"; // TODO: remove suite_7.0
        }
        _this.config.editable = _this.config.editable || _this.config.editing; // TODO: remove suite_7.0
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
            _this.data.parse(_this.config.data);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.selection = new Selection_1.Selection({
            multiselection: _this.config.multiselection,
            disable: !_this.config.selection,
        }, _this.data);
        _this._focusIndex = !_this.config.selection && _this.config.keyNavigation ? 0 : undefined;
        _this._getHotkeys();
        var updater = function (updateObj) { return function (_a) {
            var source = _a.source, target = _a.target, start = _a.start;
            if (source && source instanceof Array && source.length > 1) {
                source.map(function (selectedId) { return _this.data.exists(selectedId) && _this.data.update(selectedId, updateObj); });
                return;
            }
            if (_this.data.exists(target)) {
                _this.data.update(target, updateObj);
            }
            if (_this.data.exists(start)) {
                _this.data.update(start, updateObj);
            }
        }; };
        _this.events.on(ts_data_1.DataEvents.change, function () {
            _this.paint();
        });
        _this.events.on(ts_data_1.DataEvents.beforeRemove, function (obj) {
            var delIndex = _this.data.getIndex(obj.id);
            if (delIndex < _this._focusIndex) {
                _this._focusIndex--;
            }
        });
        _this.events.on(ts_data_1.DataEvents.afterRemove, function () {
            var id = _this.selection.getId();
            if (!id && !_this._focusIndex) {
                return;
            }
            if (!id && _this._focusIndex) {
                id = _this.data.getId(_this._focusIndex);
                _this.setFocus(id);
                return;
            }
            _this.setFocus(id[id.length - 1]);
        });
        _this.events.on(ts_data_1.DataEvents.load, function () {
            if (_this.config.virtual) {
                _this._updateVirtual(0);
            }
            _this.data.map(function (item) {
                if (item.$selected) {
                    _this.selection.add(item.id);
                    _this.events.fire(types_1.ListEvents.click, [item.id, null]);
                }
            });
        });
        _this.events.on(ts_data_1.DragEvents.canDrop, updater({ $drophere: true }));
        _this.events.on(ts_data_1.DragEvents.cancelDrop, updater({ $drophere: undefined }));
        _this.events.on(ts_data_1.DragEvents.dragStart, updater({ $dragtarget: true }));
        _this.events.on(ts_data_1.DragEvents.afterDrag, updater({ $dragtarget: undefined }));
        _this.events.on(types_1.ListEvents.afterEditEnd, function (value, id) {
            var item = _this.data.getItem(id);
            _this.data.update(id, __assign(__assign({}, item), { value: value }));
            _this._edited = null;
            _this._getHotkeys();
            _this.paint();
        });
        _this._handlers = {
            onmousedown: function (e) {
                _this._dragStart(e);
            },
            ontouchstart: function (e) {
                _this._touch.timer = setTimeout(function () {
                    _this._dragStart(e);
                }, _this._touch.duration);
                if (!_this._touch.timeStamp) {
                    _this._touch.timeStamp = +e.timeStamp.toFixed();
                }
                else {
                    var dblTap = _this._touch.dblDuration >= _this._touch.timeStamp - +e.timeStamp.toFixed();
                    if (dblTap) {
                        e.preventDefault();
                        _this._dblClick(e);
                    }
                    _this._touch.timeStamp = null;
                }
                setTimeout(function () {
                    _this._touch.timeStamp = null;
                }, _this._touch.dblDuration);
            },
            ontouchmove: function (e) {
                _this._touch.start && e.preventDefault();
                _this._clearTouchTimer();
            },
            ontouchend: function () {
                _this._touch.start = false;
                _this._clearTouchTimer();
            },
            ondragstart: function () { return (_this.config.dragMode && !_this._edited ? false : null); },
            oncontextmenu: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                if (!id) {
                    return;
                }
                _this.events.fire(types_1.ListEvents.itemRightClick, [id, e]);
                _this.events.fire(types_1.ListEvents.contextmenu, [id, e]); // TODO: remove suite_7.0
            },
            onclick: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                if (!id) {
                    return;
                }
                _this.setFocus(id);
                _this.selection.add(id, e.ctrlKey || e.metaKey, e.shiftKey);
                _this.events.fire(types_1.ListEvents.click, [id, e]);
            },
            ondblclick: function (e) {
                _this._dblClick(e);
            },
            onscroll: function (e) {
                if (_this.config.virtual) {
                    // [TODO] Hide loading data to render
                    _this._lazyLoad(e);
                    _this._updateVirtual(e.target.scrollTop);
                }
            },
            onmouseover: function (e) {
                var id = !!html_1.locate(e) && _this.data.getItem(html_1.locate(e)).id;
                var element = html_1.locateNode(e, "dhx_id", "relatedTarget");
                if (!element && id) {
                    _this.events.fire(types_1.ListEvents.itemMouseOver, [id, e]);
                    return;
                }
                else if (!element) {
                    return;
                }
                var attr = element.getAttribute("dhx_id") ? element.getAttribute("dhx_id") : null;
                var prevId = attr ? attr : "";
                if (!id || id === prevId) {
                    return;
                }
                _this.events.fire(types_1.ListEvents.itemMouseOver, [id, e]);
            },
        };
        if (_this.config.dragMode) {
            ts_data_1.dragManager.setItem(_this._uid, _this);
        }
        if (_this.config.virtual) {
            _this._range = [0, 0];
            _this._topOffset = 0;
        }
        if (_this.config.eventHandlers) {
            for (var key in _this.config.eventHandlers) {
                if (_this.config.eventHandlers.hasOwnProperty(key)) {
                    var events = _this.config.eventHandlers[key];
                    _this._events[key] = html_1.eventHandler(function (e) { return html_1.locate(e, "dhx_id"); }, __assign({}, events));
                }
            }
        }
        var view = dom_1.create({
            render: function () { return (_this.config.virtual ? _this._renderVirtualList() : _this._renderList()); },
            hooks: {
                didMount: function (vm) {
                    if (!_this.config.height) {
                        var element = vm.node.el;
                        _this.config.height =
                            (element &&
                                element.parentNode &&
                                element.parentNode.offsetHeight) ||
                                "100%";
                    }
                    if (_this.config.virtual) {
                        _this._visibleHeight = _this.config.height;
                        _this._updateVirtual(0);
                    }
                    _this.paint();
                },
            },
        });
        _this.mount(node, view);
        return _this;
    }
    List.prototype.editItem = function (id) {
        this._edited = id;
        if (!this.data.getItem(this._edited) || !this.events.fire(types_1.ListEvents.beforeEditStart, [id])) {
            this._edited = null;
            return;
        }
        this._getHotkeys();
        this.paint();
        this.events.fire(types_1.ListEvents.afterEditStart, [id]);
    };
    List.prototype.getFocusItem = function () {
        return this.data.getItem(this.data.getId(this._focusIndex));
    };
    List.prototype.setFocus = function (id) {
        var index = this.data.getIndex(id);
        this._setFocusIndex(index);
    };
    List.prototype.getFocus = function () {
        var id = this.data.getId(this._focusIndex);
        if (id) {
            return id;
        }
    };
    List.prototype.destructor = function () {
        if (this._navigationDestructor) {
            this._navigationDestructor();
        }
        if (this._documentClickDestuctor) {
            this._documentClickDestuctor();
        }
        this.unmount();
    };
    // TODO: remove suite_7.0
    List.prototype.getFocusIndex = function () {
        return this._focusIndex;
    };
    // TODO: remove suite_7.0
    List.prototype.setFocusIndex = function (index) {
        this._setFocusIndex(index);
    };
    // TODO: remove suite_7.0
    List.prototype.edit = function (id) {
        this.editItem(id);
    };
    // TODO: remove suite_7.0
    List.prototype.disableSelection = function () {
        this.selection.disable();
        this.paint();
    };
    // TODO: remove suite_7.0
    List.prototype.enableSelection = function () {
        this.selection.enable();
        this.paint();
    };
    List.prototype._renderItem = function (item, index) {
        var html = (this.config.template && this.config.template(item)) || item.html;
        var focus = index === this._focusIndex;
        if (item.id === this._edited) {
            var editor = editors_1.getEditor(item, this);
            return editor.toHTML();
        }
        return html ? this._renderAsHtml(html, item, focus) : this._renderAsValue(item, focus);
    };
    List.prototype._renderAsHtml = function (html, item, focus) {
        var itemHeight = this.config.itemHeight;
        return dom_1.el("li", __assign(__assign({}, this._events), { class: "dhx_list-item" +
                (item.$selected ? " dhx_list-item--selected" : "") +
                (focus ? " dhx_list-item--focus" : "") +
                (item.$drophere && !this._edited ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget && !this._edited ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode && !this._edited ? " dhx_list-item--drag" : "") +
                // (this.selection.getItem() )
                (item.css ? " " + item.css : ""), dhx_id: item.id, _ref: item.id.toString(), style: {
                height: itemHeight,
            }, _key: item.id, ".innerHTML": html }));
    };
    List.prototype._renderAsValue = function (item, focus) {
        var itemHeight = this.config.itemHeight;
        return dom_1.el("li", {
            class: "dhx_list-item dhx_list-item--text" +
                (item.$selected ? " dhx_list-item--selected" : "") +
                (focus ? " dhx_list-item--focus" : "") +
                (item.$drophere && !this._edited ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget && !this._edited ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode && !this._edited ? " dhx_list-item--drag" : "") +
                (item.css ? " " + item.css : ""),
            dhx_id: item.id,
            _ref: item.id.toString(),
            style: {
                height: itemHeight,
            },
            _key: item.id,
        }, item.text || item.value);
    };
    List.prototype._renderList = function () {
        var _this = this;
        var kids = this.data.map(function (obj, index) { return _this._renderItem(obj, index); });
        return dom_1.el("ul.dhx_widget.dhx_list", __assign({ style: {
                "min-height": this.config.itemHeight,
                "max-height": this.config.height,
                position: "relative",
            }, class: (this.config.css ? this.config.css : "") +
                (this.config.multiselection && this.selection.getItem() ? " dhx_no-select--pointer" : ""), dhx_widget_id: this._uid }, this._handlers), kids);
    };
    List.prototype._renderVirtualList = function () {
        var _this = this;
        var kids = this.data.mapRange(this._range[0], this._range[1], function (obj, index) {
            return _this._renderItem(obj, index);
        });
        return dom_1.el(".dhx_widget.dhx_virtual-list-wrapper", __assign({ dhx_widget_id: this._uid, style: {
                "min-height": this.config.itemHeight,
                "max-height": this._visibleHeight,
            } }, this._handlers), [
            dom_1.el("ul.dhx_list.dhx_list--virtual", {
                class: (this.config.css ? this.config.css : "") +
                    (this.config.multiselection && this.selection.getItem()
                        ? " dhx_no-select--pointer"
                        : ""),
                style: {
                    height: this._getHeight() + helpers_1.defineUnit(this.config.itemHeight),
                    "padding-top": this._topOffset,
                },
            }, kids),
        ]);
    };
    List.prototype._dblClick = function (e) {
        var id = html_1.locate(e);
        if (!id) {
            return;
        }
        if (this.config.editable) {
            this.editItem(id);
        }
        this.events.fire(types_1.ListEvents.doubleClick, [id, e]);
    };
    List.prototype._clearTouchTimer = function () {
        if (this._touch.timer) {
            clearTimeout(this._touch.timer);
            this._touch.timer = null;
        }
    };
    List.prototype._dragStart = function (e) {
        var _this = this;
        this._touch.start = true;
        var itemsForGhost = [];
        var item = html_1.locateNode(e, "dhx_id");
        var itemId = item && item.getAttribute("dhx_id");
        var selectionIds = this.selection.getId();
        if (this.config.multiselection && selectionIds instanceof Array) {
            selectionIds.map(function (id) {
                if (id !== itemId && _this.getRootView().refs[id]) {
                    itemsForGhost.push(_this.getRootView().refs[id].el);
                }
            });
        }
        return this.config.dragMode && !this._edited
            ? ts_data_1.dragManager.onMouseDown(e, this.selection.getId() || itemId, itemsForGhost)
            : null;
    };
    List.prototype._setFocusIndex = function (index) {
        if (index < 0 || index > this.data.getLength() - 1) {
            return;
        }
        this._focusIndex = index;
        var rootView = this.getRootView();
        if (!rootView || !rootView.node || !rootView.node.el) {
            return;
        }
        var listEl = this.getRootNode();
        if (!listEl) {
            return;
        }
        if (this.config.virtual) {
            var position = index * helpers_1.defineValue(this.config.itemHeight);
            if (position >= helpers_1.defineValue(this._visibleHeight) + this._topOffset ||
                position < this._topOffset) {
                listEl.scrollTo(0, position);
            }
        }
        else {
            var listItem = listEl.children[index];
            if (!listItem) {
                return;
            }
            if (listItem.offsetTop >= listEl.scrollTop + listEl.clientHeight - listItem.clientHeight) {
                listEl.scrollTop = listItem.offsetTop - listEl.clientHeight + listItem.clientHeight;
            }
            else if (listItem.offsetTop < listEl.scrollTop) {
                listEl.scrollTop = listItem.offsetTop;
            }
        }
        this.events.fire(types_1.ListEvents.focusChange, [this._focusIndex, this.data.getId(this._focusIndex)]);
        this.paint();
    };
    List.prototype._updateVirtual = function (position) {
        var overscanCount = 5;
        var totalHeight = this._getHeight();
        if (position > totalHeight - helpers_1.defineValue(this._visibleHeight)) {
            position = totalHeight - helpers_1.defineValue(this._visibleHeight);
        }
        var count = Math.floor(helpers_1.defineValue(this._visibleHeight) / helpers_1.defineValue(this.config.itemHeight)) +
            overscanCount;
        var index = Math.floor(position / helpers_1.defineValue(this.config.itemHeight));
        this._range = [index, count + index];
        this._topOffset = position;
        this.paint();
    };
    List.prototype._getHeight = function () {
        return this.data.getLength() * helpers_1.defineValue(this.config.itemHeight);
    };
    List.prototype._getHotkeys = function () {
        var _this = this;
        if (this.config.keyNavigation) {
            if (this._edited) {
                if (this._navigationDestructor) {
                    this._navigationDestructor();
                }
            }
            else {
                var keyNavigation = this.config.keyNavigation;
                if (typeof this.config.keyNavigation !== "function") {
                    this._widgetInFocus = false;
                    keyNavigation = function () { return _this._widgetInFocus; };
                    this._documentClickDestuctor = core_1.detectWidgetClick(this._uid, function (isInnerClick) { return (_this._widgetInFocus = isInnerClick); });
                }
                var preventEvent = function (fn) { return function (e) {
                    e.preventDefault();
                    fn();
                }; };
                var handlers = {
                    arrowDown: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + 1); }),
                    arrowUp: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - 1); }),
                    enter: function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id);
                        _this.events.fire(types_1.ListEvents.click, [id, e]);
                    },
                    "enter+shift": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, false, true);
                        _this.events.fire(types_1.ListEvents.click, [id, e]);
                    },
                    "enter+ctrl": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, true, false);
                        _this.events.fire(types_1.ListEvents.click, [id, e]);
                    },
                    "ctrl+a": function (e) {
                        if (_this.config.multiselection) {
                            e.preventDefault();
                            _this.selection.remove();
                            var ids = _this.data.map(function (i) { return i.id; });
                            ids.forEach(function (id) {
                                if (_this.config.multiselection === "ctrlClick") {
                                    _this.selection.add(id, true);
                                }
                                else {
                                    _this.selection.add(id);
                                }
                            });
                        }
                    },
                };
                if (html_1.isIE()) {
                    handlers = __assign({ up: handlers.arrowUp, down: handlers.arrowDown }, handlers);
                    delete handlers.arrowUp;
                    delete handlers.arrowDown;
                }
                this._navigationDestructor = Keymanager_1.addHotkeys(handlers, keyNavigation);
            }
        }
    };
    List.prototype._lazyLoad = function (e) {
        var y = e.target.scrollTop;
        var from = Math.round(y / helpers_1.defineValue(this.config.itemHeight));
        var onScreenCount = this.config.height / helpers_1.defineValue(this.config.itemHeight);
        var proxy = this.data.dataProxy;
        if (proxy &&
            proxy.config &&
            !this.data.isDataLoaded(from, onScreenCount + from + proxy.config.prepare)) {
            proxy.updateUrl(null, { from: from, limit: proxy.config.limit });
            this.data.load(proxy);
        }
    };
    return List;
}(view_1.View));
exports.List = List;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputEditor_1 = __webpack_require__(85);
function getEditor(item, list) {
    return new InputEditor_1.InputEditor(item, list);
}
exports.getEditor = getEditor;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(20);
var InputEditor = /** @class */ (function () {
    function InputEditor(item, list) {
        var _this = this;
        this._list = list;
        this._config = list.config;
        this._item = item;
        this._list.events.on(types_1.ListEvents.focusChange, function (index, id) {
            if (_this._mode && id !== _this._item.id) {
                _this.endEdit();
            }
        });
        this._initHandlers();
    }
    InputEditor.prototype.endEdit = function () {
        if (this._input) {
            var value = this._input.value;
            if (this._list.events.fire(types_1.ListEvents.beforeEditEnd, [value, this._item.id])) {
                this._input.removeEventListener("blur", this._handlers.onBlur);
                this._input.removeEventListener("change", this._handlers.onChange);
                this._handlers = {};
                this._mode = false;
                this._list.events.fire(types_1.ListEvents.afterEditEnd, [value, this._item.id]);
            }
            else {
                this._input.focus();
            }
        }
    };
    InputEditor.prototype.toHTML = function () {
        this._mode = true;
        var itemHeight = this._config.itemHeight;
        return dom_1.el(".dhx_input__wrapper", {}, [
            dom_1.el("div.dhx_input__container", {}, [
                dom_1.el("input.dhx_input", {
                    class: this._item.css ? " " + this._item.css : "",
                    style: {
                        height: itemHeight,
                        width: "100%",
                        padding: "8px, 12px",
                    },
                    _hooks: {
                        didInsert: this._handlers.didInsert,
                    },
                    _key: this._item.id,
                    dhx_id: this._item.id,
                }),
            ]),
        ]);
    };
    InputEditor.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onBlur: function () {
                _this.endEdit();
            },
            onChange: function () {
                _this.endEdit();
            },
            didInsert: function (node) {
                var input = node.el;
                _this._input = input;
                input.focus();
                input.value = _this._item.value;
                input.setSelectionRange(0, input.value.length);
                input.addEventListener("change", _this._handlers.onChange);
                input.addEventListener("blur", _this._handlers.onBlur);
            },
        };
    };
    return InputEditor;
}());
exports.InputEditor = InputEditor;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function defineValue(property) {
    if (property) {
        var prop = property.toString().trim();
        if (!prop.includes("calc")) {
            return parseInt(prop.split(/\D+/g)[0], null);
        }
    }
}
exports.defineValue = defineValue;
function defineUnit(property) {
    if (property) {
        var prop = property.toString().trim();
        if (!prop.includes("calc")) {
            return prop.slice(prop.split(/\D+/g)[0].length);
        }
    }
}
exports.defineUnit = defineUnit;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputEditor_1 = __webpack_require__(88);
function getEditor(item, dataView) {
    return new InputEditor_1.InputEditor(item, dataView);
}
exports.getEditor = getEditor;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(21);
var InputEditor = /** @class */ (function () {
    function InputEditor(item, dataView) {
        var _this = this;
        this._dataView = dataView;
        this._config = dataView.config;
        this._item = item;
        this._dataView.events.on(types_1.DataViewEvents.focusChange, function (index, id) {
            if (_this._mode && id !== _this._item.id) {
                _this.endEdit();
            }
        });
        this._initHandlers();
    }
    InputEditor.prototype.endEdit = function () {
        if (this._input) {
            var value = this._input.value;
            if (this._dataView.events.fire(types_1.DataViewEvents.beforeEditEnd, [value, this._item.id])) {
                this._input.removeEventListener("blur", this._handlers.onBlur);
                this._input.removeEventListener("change", this._handlers.onChange);
                this._handlers = {};
                this._mode = false;
                this._dataView.events.fire(types_1.DataViewEvents.afterEditEnd, [value, this._item.id]);
            }
            else {
                this._input.focus();
            }
        }
    };
    InputEditor.prototype.toHTML = function (isLastItemInRow) {
        this._mode = true;
        var _a = this._config, itemsInRow = _a.itemsInRow, gap = _a.gap;
        var gapWithPx = function (gapSize) { return parseFloat(gapSize); };
        return dom_1.el(".dhx_input__wrapper", {
            style: {
                width: "calc(" + 100 / itemsInRow + "% - " + gapWithPx(gap) + " * " + (itemsInRow - 1) /
                    itemsInRow + "px)",
                maxWidth: "calc(" + 100 / itemsInRow + "% - " + gapWithPx(gap) + " * " + (itemsInRow - 1) /
                    itemsInRow + "px)",
                marginRight: isLastItemInRow ? "" : gap,
            },
        }, [
            dom_1.el("div.dhx_input__container", {
                style: {
                    height: "100%",
                },
            }, [
                dom_1.el("input.dhx_input", {
                    class: (this._item.css ? " " + this._item.css : "") +
                        (isLastItemInRow ? " dhx_dataview-item--last-item-in-row" : ""),
                    style: {
                        padding: "8px, 12px",
                        width: "100%",
                        height: "100%",
                    },
                    _hooks: {
                        didInsert: this._handlers.didInsert,
                    },
                    _key: this._item.id,
                    dhx_id: this._item.id,
                }),
            ]),
        ]);
    };
    InputEditor.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onBlur: function () {
                _this.endEdit();
            },
            onChange: function () {
                _this.endEdit();
            },
            didInsert: function (node) {
                var input = node.el;
                _this._input = input;
                input.focus();
                input.value = _this._item.value;
                input.setSelectionRange(0, input.value.length);
                input.addEventListener("change", _this._handlers.onChange);
                input.addEventListener("blur", _this._handlers.onBlur);
            },
        };
    };
    return InputEditor;
}());
exports.InputEditor = InputEditor;


/***/ })
/******/ ]);
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }
