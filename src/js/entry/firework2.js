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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var devTool = {
    debugInstances: {},
    debug: function debug() {
        var debugId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "__default__";
        var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (times <= 1) {
            debugger;
        } else {
            if (debugId in devTool.debugInstances) {
                devTool.debugInstances[debugId]++;
                if (times <= devTool.debugInstances[debugId]) {
                    debugger;
                    devTool.debugInstances[debugId] = 0;
                }
            } else {
                devTool.debugInstances[debugId] = 1;
            }
        }
    },
    log: function log(logValue) {
        var debugId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "__default__";
        var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        console.trace(logValue);
        devTool.debug(debugId, times);
    }
},
    stTool = {
    dev: devTool,
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
            return Math.floor(Math.random() * (max - min)) + min;
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
    },
    animate: function animate(callback) {
        var FPS = 1000 / 60;
        var ani = window.requestAnimationFrame || window.webkitRequestAnimationFrame || setTimeout(function (callBack) {
            callBack();
        }, FPS);
        ani(callback);
    }
};

var Vertex = function () {
    function Vertex() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

        _classCallCheck(this, Vertex);

        this.x = x;
        this.y = y;
        this.r = r;
    }

    _createClass(Vertex, [{
        key: "clone",
        value: function clone() {
            return new Vertex(this.x, this.y, this.r);
        }
    }, {
        key: "move",
        value: function move(x, y) {
            if (typeof y == 'undefined') {
                if ((typeof x === "undefined" ? "undefined" : _typeof(x)) == 'object') {
                    y = x.y;
                    x = x.x;
                } else {
                    y = 0;
                }
            }
            return new Vertex(this.x - x, this.y - y, this.r);
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
        this.angle = this.getAngle();
        this.trails = [];
        this.trailLength = saveLength;
        for (var p = 0; p < saveLength; p++) {
            this.trails.push(start.clone());
        }
    }

    _createClass(Track, [{
        key: "getDistance",
        value: function getDistance(startPoint, endPoint) {
            if (!startPoint) {
                startPoint = this.startPoint;
            }
            if (!endPoint) {
                endPoint = this.endPoint;
            }
            return Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(Math.pow(startPoint.y - endPoint.y, 2)));
        }
    }, {
        key: "getAngle",
        value: function getAngle(startPoint, endPoint) {
            if (!startPoint) {
                startPoint = this.startPoint;
            }
            if (!endPoint) {
                endPoint = this.endPoint;
            }
            return Math.atan2(startPoint.y - endPoint.y, startPoint.x - endPoint.x);
        }
    }, {
        key: "move",
        value: function move(deviant, angle) {
            if (typeof angle == 'undefined') {
                angle = this.angle;
            }
            if (this.nowPoint.y < this.endPoint.y) {
                this.end();
                return 'end';
            }
            this.nowPoint = this.nowPoint.move(deviant * Math.cos(angle), deviant * Math.sin(angle));
            this.trails.push(this.nowPoint.clone());
        }
    }, {
        key: "end",
        value: function end() {
            this.alive = false;
            console.log("end");
        }
    }]);

    return Track;
}();

var Firework = function (_Track) {
    _inherits(Firework, _Track);

    function Firework(start, end, ground) {
        _classCallCheck(this, Firework);

        var _this = _possibleConstructorReturn(this, (Firework.__proto__ || Object.getPrototypeOf(Firework)).call(this, start, end, 6));

        _this.tracedLength = 6;
        _this.ground = ground;
        _this.color = stTool.getRandomClr();
        _this.alive = true;
        _this.speed = 20;
        _this.acceleration = 0.002;
        return _this;
    }

    _createClass(Firework, [{
        key: "slide",
        value: function slide() {
            var firework = this;
            firework.describe();
            this.speed += this.acceleration;
            firework.move(firework.speed);
        }
    }, {
        key: "describe",
        value: function describe() {
            var firework = this,
                drawer = this.ground;
            drawer.fillStyle = firework.color;
            for (var a = 0, len = firework.trailLength; a < len; a++) {
                var drawerPoint = firework.trails[a];
                drawerPoint.r = drawerPoint.r / Math.floor((len - a) * 2);
                drawer.beginPath();
                drawer.arc(drawerPoint.x, drawerPoint.y, drawerPoint.r, 0, Math.PI * 2);
                drawer.fill();
            }
            debugger;
            firework.trails.shift();
        }
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
            drawer.clearRect(0, 0, ground.width, ground.height);

            drawer.globalCompositeOperation = "destination-over";
            drawer.fillStyle = "rgba(0,0,0,0)";
            drawer.beginPath();
        }
    }, {
        key: "installFireworks",
        value: function installFireworks() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var ground = this;
            while (num--) {
                var startPoint = new Vertex(ground.width / 2 + stTool.rand(-60, 60), ground.height),
                    endPoint = new Vertex(stTool.rand(0, ground.width), stTool.rand(ground.height * 0.2));
                this.fireworks.push(new Firework(startPoint, endPoint, ground.drawer));
            }
        }
    }, {
        key: "celebrate",
        value: function celebrate() {
            var ground = this,
                fireworks = this.fireworks,
                len = fireworks.length;
            ground.prepare();
            for (var n = 0; n < len; n++) {
                if (fireworks[n].alive) {
                    fireworks[n].slide();
                }
            }
            stTool.animate(function () {
                ground.celebrate();
            });
        }
    }]);

    return Ground;
}();

var celebrateGround = new Ground("#bg");

celebrateGround.installFireworks();
celebrateGround.celebrate();

/***/ })
/******/ ]);
});
//# sourceMappingURL=firework2.js.map