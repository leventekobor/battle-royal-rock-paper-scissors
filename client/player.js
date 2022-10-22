let paperImg;
let rockImg;
let scissorImg;
let types;
const options = [(paper = "✋"), (rock = "🤘"), (scissor = "✌️")];

  /*
function preload() {

  types = [
    paperImg = loadImage("assets/paper.jpeg"),
    rockImg = loadImage("assets/rock.jpeg"),
    scissorImg = loadImage("assets/scissor.jpeg"),
  ];

  options = [
    paper = '✋',
    rock = '🤘',
    scissor = '✌️'
  ]
}
  */

class Player {
  constructor(x=100, y=100, username, type) {
    this.username = username;
    // window.localStorage.setItem('username', this.username);
    this.x = x;
    this.y = y;
    this.xdir = 0;
    this.ydir = 0;

    this.image = options[type];
  }
  
  update(xdir, ydir) {
    this.x += xdir;
    this.y += ydir;
  }

  show() {
    fill(255, 204, 0);
    textSize(10);
    text(this.username, this.x + 0, this.y + -20);
    textSize(20);
    text(this.image, this.x, this.y);
    // text('✋');
    // text('✌️');
    //image(this.image, this.x, this.y, 20, 20);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
