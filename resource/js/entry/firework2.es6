let stTool = {
    rand: (min = 0, max) => {
        min = parseInt(min);
        max = parseInt(max);
        if (max) {
            if (max < min) {
                let tmp = min;
                min = max;
                max = tmp;
            }
            return Math.floor(Math.random() * (min + 1)) + max - min;
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
    }
};

class Vertex{
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vertex(this.x, this.y);
    }
}

class Track{
    constructor(start = new Vertex, end = new Vertex, saveLength = 6) {
        this.startPoint = start;
        this.nowPoint = start;
        this.endPoint = end;
        this.traced = [];
        for (let p = 0; p < saveLength; p ++) {
            this.traced.push(start.clone());
        }
    }
    forward() {
        
    }
}

class Firework extends Track{
    constructor(start, end, ground) {
        super(start, end);       
        this.ground = ground;
        this.color = stTool.getRandomClr();
    }
    fire() {

    }
}

class Ground{
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
        drawer.globalCompositeOperation = "destination-over";
        drawer.fillStyle = "rgba(0,0,0,.5)";
        drawer.fillRect(0, 0, ground.width, ground.height);
    }
    installFireworks(num = 1) {
        let ground = this;
        while(num --) {
            let startPoint = new Vertex(ground.width + stTool.rand(-60, 60), ground.height),
                endPoint = new Vertex(stTool.rand(0, ground.width), stTool.rand(ground.height * 0.2));
            this.fireworks.push(new Firework(startPoint, endPoint, ground));
        }
    }
}

let celebrateGround = new Ground("#bg");

