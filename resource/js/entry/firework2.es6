let devTool = {
        debugInstances: {},
        debug: (debugId = "__default__", times = 0) => {
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
        log: (logValue, debugId = "__default__", times = 0) => {
            console.trace(logValue);
            devTool.debug(debugId, times);
        }
    },
    stTool = {
        dev: devTool,
        rand: (min = 0, max) => {
            min = parseInt(min);
            max = parseInt(max);
            if (max) {
                if (max < min) {
                    let tmp = min;
                    min = max;
                    max = tmp;
                }
                return Math.floor(Math.random() * (max - min)) + min;
            } else {
                return Math.floor(Math.random() * (min + 1));
            }
        },
        getRandomClr: (colorFormat = "rgb", ranges = [255, 255, 255]) => {
            let len = colorFormat.length,
                colorLetter = colorFormat.split(''),
                colorFunc = colorFormat + "(";
            for (let c = 0; c < len; c++) {
                let dot = ", ";
                if (c == 0) {
                    dot = "";
                }
                colorFunc += dot + stTool.rand(ranges[c]);
            }
            colorFunc += ")";
            return colorFunc;
        },
        animate: (callback) => {
            const FPS = 1000 / 60;
            let ani = window.requestAnimationFrame || window.webkitRequestAnimationFrame || setTimeout(function(callBack) {
                callBack();
            }, FPS);
            ani(callback);
        }
    };
class Vertex {
    constructor(x = 0, y = 0, r = 5) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    clone() {
        return new Vertex(this.x, this.y, this.r);
    }
    move(x, y) {
        if (typeof y == 'undefined') {
            if (typeof x == 'object') {
                y = x.y;
                x = x.x;
            } else {
                y = 0;
            }
        }
        return new Vertex(this.x - x, this.y - y, this.r);
    }
}

class Track {
    constructor(start = new Vertex, end = new Vertex, saveLength = 6) {
        this.startPoint = start;
        this.nowPoint = start;
        this.endPoint = end;
        this.angle = this.getAngle();
        this.trails = [];
        this.trailLength = saveLength;
        for (let p = 0; p < saveLength; p++) {
            this.trails.push(start.clone());
        }
    }
    getDistance(startPoint, endPoint) {
        if (!startPoint) {
            startPoint = this.startPoint;
        }
        if (!endPoint) {
            endPoint = this.endPoint;
        }
        return Math.sqrt(Math.pow((startPoint.x - endPoint.x), 2) + Math.pow(Math.pow((startPoint.y - endPoint.y), 2)));
    }
    getAngle(startPoint, endPoint) {
        if (!startPoint) {
            startPoint = this.startPoint;
        }
        if (!endPoint) {
            endPoint = this.endPoint;
        }
        return Math.atan2((startPoint.y - endPoint.y), (startPoint.x - endPoint.x));
    }
    move(deviant, angle) {
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
    end() {
        this.alive = false;
        console.log("end");
    }
}

class Firework extends Track {
    constructor(start, end, ground) {
        super(start, end, 6);
        this.tracedLength = 6;
        this.ground = ground;
        this.color = stTool.getRandomClr();
        this.alive = true;
        this.speed = 20;
        this.acceleration = 0.002;
    }
    slide() {
        let firework = this;
        firework.describe();
        this.speed += this.acceleration;
        firework.move(firework.speed);
    }
    describe() {
        let firework = this,
            drawer = this.ground;
        drawer.fillStyle = firework.color;
        for (let a = 0, len = firework.trailLength; a < len; a++) {
            let drawerPoint = firework.trails[a];
            drawerPoint.r = drawerPoint.r / Math.floor((len - a) * 2);
            drawer.beginPath();
            drawer.arc(drawerPoint.x, drawerPoint.y, drawerPoint.r, 0, Math.PI * 2);
            drawer.fill();
        }
        debugger;
        firework.trails.shift();
    }
}

class Ground {
    constructor(selector) {
        this.groundId = selector;
        this.canvas = document.querySelector(selector);
        this.drawer = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.fireworks = [];
    }
    prepare() {
        let drawer = this.drawer,
            ground = this;
        drawer.clearRect(0, 0, ground.width, ground.height);

        drawer.globalCompositeOperation = "destination-over";
        drawer.fillStyle = "rgba(0,0,0,0)";
        drawer.beginPath();
    }
    installFireworks(num = 1) {
        let ground = this;
        while (num--) {
            let startPoint = new Vertex(ground.width / 2 + stTool.rand(-60, 60), ground.height),
                endPoint = new Vertex(stTool.rand(0, ground.width), stTool.rand(ground.height * 0.2));
            this.fireworks.push(new Firework(startPoint, endPoint, ground.drawer));
        }
    }
    celebrate() {
        let ground = this,
            fireworks = this.fireworks,
            len = fireworks.length;
        ground.prepare();
        for (let n = 0; n < len; n++) {
            if (fireworks[n].alive) {
                fireworks[n].slide();
            }
        }
        stTool.animate(function() {
            ground.celebrate();
        });
    }
}

let celebrateGround = new Ground("#bg");

celebrateGround.installFireworks();
celebrateGround.celebrate();