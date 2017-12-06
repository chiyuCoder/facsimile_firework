(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stTool = {
    rand: function rand() {
        var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var max = arguments[1];

        min = parseInt(min);
        max = parseInt(max);
        if (max) {
            if (max < min) {
                var tmp = min;
                min = max;
                max = tmp;
            }
            return Math.floor(Math.random() * (min + 1)) + max - min;
        } else {
            return Math.floor(Math.random() * (min + 1));
        }
    },
    getRandomClr: function getRandomClr() {
        var colorFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "rgb";
        var ranges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [255, 255, 255];

        var len = colorFormat.length,
            colorLetter = colorFormat.split(''),
            colorFunc = colorFormat + "(";
        for (var c = 0; c < len; c++) {
            var dot = ", ";
            if (c == 0) {
                dot = "";
            }
            colorFunc += dot + stTool.rand(ranges[c]);
        }
        colorFunc += ")";
        return colorFunc;
    }
};

var Vertex = function () {
    function Vertex() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Vertex);

        this.x = x;
        this.y = y;
    }

    _createClass(Vertex, [{
        key: "clone",
        value: function clone() {
            return new Vertex(this.x, this.y);
        }
    }]);

    return Vertex;
}();

var Track = function () {
    function Track() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vertex();
        var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vertex();
        var saveLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

        _classCallCheck(this, Track);

        this.startPoint = start;
        this.nowPoint = start;
        this.endPoint = end;
        this.traced = [];
        for (var p = 0; p < saveLength; p++) {
            this.traced.push(start.clone());
        }
    }

    _createClass(Track, [{
        key: "forward",
        value: function forward() {}
    }]);

    return Track;
}();

var Firework = function (_Track) {
    _inherits(Firework, _Track);

    function Firework(start, end, ground) {
        _classCallCheck(this, Firework);

        var _this = _possibleConstructorReturn(this, (Firework.__proto__ || Object.getPrototypeOf(Firework)).call(this, start, end));

        _this.ground = ground;
        _this.color = stTool.getRandomClr();
        return _this;
    }

    _createClass(Firework, [{
        key: "fire",
        value: function fire() {}
    }]);

    return Firework;
}(Track);

var Ground = function () {
    function Ground(selector) {
        _classCallCheck(this, Ground);

        this.groundId = selector;
        this.canvas = document.querySelector(selector);
        this.drawer = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.fireworks = [];
    }

    _createClass(Ground, [{
        key: "prepare",
        value: function prepare() {
            var drawer = this.drawer,
                ground = this;
            drawer.globalCompositeOperation = "destination-over";
            drawer.fillStyle = "rgba(0,0,0,.5)";
            drawer.fillRect(0, 0, ground.width, ground.height);
        }
    }, {
        key: "installFireworks",
        value: function installFireworks() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var ground = this;
            while (num--) {
                var startPoint = new Vertex(ground.width + stTool.rand(-60, 60), ground.height),
                    endPoint = new Vertex(stTool.rand(0, ground.width), stTool.rand(ground.height * 0.2));
                this.fireworks.push(new Firework(startPoint, endPoint, ground));
            }
        }
    }]);

    return Ground;
}();

var celebrateGround = new Ground("#bg");

/***/ })
/******/ ]);
});
//# sourceMappingURL=firework2.js.map