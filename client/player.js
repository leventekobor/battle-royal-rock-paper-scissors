const options = [(paper = "✋"), (rock = "🤘"), (scissor = "✌️")];

class Player {
  constructor(x=100, y=100, username, type) {
    this.username = username;
    this.x = x;
    this.y = y;
    this.xdir = 0;
    this.ydir = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.image = options[type];
  }
  
  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  update() {
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  show() {
    fill(255, 204, 0);
    textSize(10);
    text(this.username, this.x + 0, this.y + -20);
    textSize(20);
    text(this.image, this.x, this.y);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - m7in + 1) + min);
}
