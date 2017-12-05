import '../../less/firework.less';

let win = {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    drawer =  document.getElementById("bg").getContext("2d"),
    stCanvas = {
        width:0,
        height:0,
        elm: document.getElementById("bg"),
        drawer: drawer,
        init: () => {
            stCanvas.setSize();
            stCanvas.fillStyle = "cyan";
            drawer.fillRect(0,0,stCanvas.elm.width, stCanvas.elm.height);
        },
        setSize: () => {
            stCanvas.width = win.width / 2;
            stCanvas.height = win.height / 2;         
            stCanvas.elm.style.width =  stCanvas.width + "px";
            stCanvas.elm.style.height =  stCanvas.height + "px";
        },
        initFirework: (n = 10) => {
            for(let a = 0; a < n; a ++) {
                let sx = Math.floor(Math.random() * win.width),
                    sy = win.height,
                    ex = Math.floor(Math.random() * win.width),
                    ey = Math.floor(Math.random() * win.height * 2 / 3);
                fireworks.push(new Firework(sx, sy, ex, ey));
            }
        }
    },
    fireworks = [],
    particles = [];
class Firework {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }
}
stCanvas.init();
stCanvas.initFirework();