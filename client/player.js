let paperImg;
let rockImg;
let scissorImg;
let types;

function preload() {
  types = [
    paperImg = loadImage("assets/paper.jpeg"),
    rockImg = loadImage("assets/rock.jpeg"),
    scissorImg = loadImage("assets/scissor.jpeg"),
  ];
}

class Player {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
    this.xdir = 0;
    this.ydir = 0;
    this.image = types[randomInt(0, 2)];
  }
  
  update(xdir, ydir) {
    this.x += xdir;
    this.y += ydir;
    //socket.emit("message", [this.x, this.y]);
  }

  show() {
    fill(255, 204, 0);
    image(this.image, this.x, this.y, 20, 20);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
