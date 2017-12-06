'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
	function Vector2() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Vector2);

		this.x = x;
		this.y = y;
	}

	_createClass(Vector2, [{
		key: 'add',
		value: function add(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		}
	}, {
		key: 'multiplyScalar',
		value: function multiplyScalar(s) {
			this.x *= s;
			this.y *= s;
			return this;
		}
	}, {
		key: 'clone',
		value: function clone() {
			return new Vector2(this.x, this.y);
		}
	}]);

	return Vector2;
}();

var Time = function () {
	function Time() {
		_classCallCheck(this, Time);

		var now = Time.now();

		this.delta = 0;
		this.elapsed = 0;
		this.start = now;
		this.previous = now;
	}

	_createClass(Time, [{
		key: 'update',
		value: function update() {
			var now = Time.now();

			this.delta = now - this.previous;
			this.elapsed = now - this.start;
			this.previous = now;
		}
	}], [{
		key: 'now',
		value: function now() {
			return Date.now() / 1000;
		}
	}]);

	return Time;
}();

var Particle = function () {
	function Particle(position) {
		var velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector2();
		var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';
		var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
		var lifetime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
		var mass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

		_classCallCheck(this, Particle);

		this.position = position;
		this.velocity = velocity;
		this.color = color;
		this.radius = radius;
		this.lifetime = lifetime;
		this.mass = mass;

		this.isInCanvas = true;
		this.createdOn = Time.now();
	}

	_createClass(Particle, [{
		key: 'update',
		value: function update(time) {
			if (!this.getRemainingLifetime()) {
				return;
			}

			this.velocity.add(Particle.GRAVITATION.clone().multiplyScalar(this.mass));
			this.position.add(this.velocity.clone().multiplyScalar(time.delta));
		}
	}, {
		key: 'render',
		value: function render(canvas, context) {
			var remainingLifetime = this.getRemainingLifetime();

			if (!remainingLifetime) return;

			var radius = this.radius * remainingLifetime;

			context.globalAlpha = remainingLifetime;
			context.globalCompositeOperation = 'lighter';
			context.fillStyle = this.color;

			context.beginPath();
			context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
			context.fill();
		}
	}, {
		key: 'getRemainingLifetime',
		value: function getRemainingLifetime() {
			var elapsedLifetime = Time.now() - this.createdOn;
			return Math.max(0, this.lifetime - elapsedLifetime) / this.lifetime;
		}
	}]);

	return Particle;
}();

Particle.GRAVITATION = new Vector2(0, 9.81);

var Trail = function (_Particle) {
	_inherits(Trail, _Particle);

	function Trail(childFactory, position) {
		var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector2();
		var lifetime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
		var mass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

		_classCallCheck(this, Trail);

		var _this = _possibleConstructorReturn(this, (Trail.__proto__ || Object.getPrototypeOf(Trail)).call(this, position, velocity));

		_this.childFactory = childFactory;
		_this.children = [];
		_this.lifetime = lifetime;
		_this.mass = mass;

		_this.isAlive = true;
		return _this;
	}

	_createClass(Trail, [{
		key: 'update',
		value: function update(time) {
			_get(Trail.prototype.__proto__ || Object.getPrototypeOf(Trail.prototype), 'update', this).call(this, time);

			// Add a new child on every frame
			if (this.isAlive && this.getRemainingLifetime()) {
				this.children.push(this.childFactory(this));
			}

			// Remove particles that are dead
			this.children = this.children.filter(function (child) {
				if (child instanceof Trail) {
					return child.isAlive;
				}

				return child.getRemainingLifetime();
			});

			// Kill trail if all particles fade away
			if (!this.children.length) {
				this.isAlive = false;
			}

			// Update particles
			this.children.forEach(function (child) {
				child.update(time);
			});
		}
	}, {
		key: 'render',
		value: function render(canvas, context) {
			// Render all children
			this.children.forEach(function (child) {
				child.render(canvas, context);
			});
		}
	}]);

	return Trail;
}(Particle);

var Rocket = function (_Trail) {
	_inherits(Rocket, _Trail);

	function Rocket(childFactory, explosionFactory, position) {
		var velocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Vector2();

		_classCallCheck(this, Rocket);

		var _this2 = _possibleConstructorReturn(this, (Rocket.__proto__ || Object.getPrototypeOf(Rocket)).call(this, childFactory, position, velocity));

		_this2.explosionFactory = explosionFactory;
		_this2.lifetime = 10;
		return _this2;
	}

	_createClass(Rocket, [{
		key: 'update',
		value: function update(time) {
			if (this.getRemainingLifetime() && this.velocity.y > 0) {
				this.explosionFactory(this);
				this.lifetime = 0;
			}

			_get(Rocket.prototype.__proto__ || Object.getPrototypeOf(Rocket.prototype), 'update', this).call(this, time);
		}
	}]);

	return Rocket;
}(Trail);

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var time = new Time();
var rockets = [];

var getTrustParticleFactory = function getTrustParticleFactory() {
	function getColor() {
		var hue = Math.floor(Math.random() * 15 + 30);
		return 'hsl(' + hue + ', 100%, 75%';
	}
	console.log(this);

	return function () {
		console.log(this);
		debugger;
		var position = this.position.clone();
		var velocity = this.velocity.clone().multiplyScalar(-.1);
		velocity.x += (Math.random() - .5) * 8;
		var color = getColor();
		var radius = 1 + Math.random();
		var lifetime = .5 + Math.random() * .5;
		var mass = .01;
		return new Particle(position, velocity, color, radius, lifetime, mass);
	};
};

var getExplosionFactory = function getExplosionFactory(baseHue) {
	function getColor() {
		var hue = Math.floor(baseHue + Math.random() * 15) % 360;
		var lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
		return 'hsl(' + hue + ', 100%, ' + lightness + '%';
	}

	function getChildFactory() {
		return function (parent) {
			var direction = Math.random() * Math.PI * 2;
			var force = 8;
			var velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
			var color = getColor();
			var radius = 1 + Math.random();
			var lifetime = 1;
			var mass = .1;

			return new Particle(parent.position.clone(), velocity, color, radius, lifetime, mass);
		};
	}

	function getTrail(position) {
		var direction = Math.random() * Math.PI * 2;
		var force = Math.random() * 128;
		var velocity = new Vector2(Math.cos(direction) * force, Math.sin(direction) * force);
		var lifetime = .5 + Math.random();
		var mass = .075;

		return new Trail(getChildFactory(), position, velocity, lifetime, mass);
	}

	return function (parent) {
		var trails = 32;
		while (trails--) {
			parent.children.push(getTrail(parent.position.clone()));
		}
	};
};

var addRocket = function addRocket() {
	var trustParticleFactory = getTrustParticleFactory();
	var explosionFactory = getExplosionFactory(Math.random() * 360);

	var position = new Vector2(Math.random() * canvas.width, canvas.height);
	var thrust = window.innerHeight * .75;
	var angle = Math.PI / -2 + (Math.random() - .5) * Math.PI / 8;
	var velocity = new Vector2(Math.cos(angle) * thrust, Math.sin(angle) * thrust);
	var lifetime = 3;

	rockets.push(new Rocket(trustParticleFactory, explosionFactory, position, velocity, lifetime));

	rockets = rockets.filter(function (rocket) {
		return rocket.isAlive;
	});
};

var render = function render() {
	requestAnimationFrame(render);

	time.update();
	context.clearRect(0, 0, canvas.width, canvas.height);

	rockets.forEach(function (rocket) {
		rocket.update(time);
		rocket.render(canvas, context);
	});
};

var resize = function resize() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
};

canvas.onclick = addRocket;
document.body.appendChild(canvas);

// window.onresize = resize;
resize();

// setInterval(addRocket, 2000);
render();
