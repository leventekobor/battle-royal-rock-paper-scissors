let s;
let scl = 20;
let player;

function setup() {
  createCanvas(600, 600);
  player = new Player(20, 20);
}

function draw() {
  background(51);
  player.update(0, 0);
  player.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.update(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    player.update(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    player.update(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    player.update(-1, 0);
  }
}

