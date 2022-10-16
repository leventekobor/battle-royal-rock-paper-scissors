let s;
let scl = 20;
let player;

const socket = io("ws://localhost:8080", { autoConnect: false });
const username = window.localStorage.getItem('username');
socket.auth = { username };
socket.connect();

socket.on("connect_error", err => {
  if (err.message === "invalid username") {
    console.log('we are fucked');
  }
});


function setup() {
  createCanvas(600, 600);
  if (username) {
    player = new Player(100, 100, username);
  } else {
    player = new Player();
  }
}

socket.on("users", coordinates => {
  console.log(coordinates);
});

socket.on("message", coordinates => {
  console.log(coordinates);
  player.update(coordinates.move[0], coordinates.move[1]);
});

function draw() {
  background(51);
  player.update(0, 0);
  player.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    //player.update(0, -1);
    socket.emit("message", {
      'user': 'Mario',
      'type': player.type,
      'move': [0, -1]
    });
  } else if (keyCode === DOWN_ARROW) {
    //player.update(0, 1);
    socket.emit("message", {
      user: player.username,
      type: player.type,
      move: [0, 1]
    });
  } else if (keyCode === RIGHT_ARROW) {
    //player.update(1, 0);
    socket.emit("message", {
      user: player.username,
      type: player.type,
      move: [1, 0]
    });
  } else if (keyCode === LEFT_ARROW) {
    //player.update(-1, 0);
    socket.emit("message", {
      user: player.username,
      type: player.type,
      move: [-1, 0]
    });
  }
}

