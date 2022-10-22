let s;
let scl = 20;
let player;
let enemies = [];
let ready = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomUser() {
  const username =
    "guestClient_" + (Math.random() + 1).toString(36).substring(7);
    window.localStorage.setItem("username", username);
  return username;
}

const socket = io("ws://localhost:8080", { autoConnect: false });
const username = window.localStorage.getItem("username") || generateRandomUser();
socket.auth = { username };
socket.connect();



function setup() {
  createCanvas(600, 600);
}

function draw() {
  if(ready) {
    background(51);
    player.update(0, 0);
    player.show();
  }
  if(enemies.length > 0) {
    enemies.forEach(enemy => {
      enemy.update(0, 0);
      enemy.show();
    })
  }
}

socket.on("users", players => {
  console.log("getting new players");
  const index = players.findIndex(player => player.username === username);
  player = new Player(
    players[index].startpos[0],
    players[index].startpos[1],
    username,
    players[index].type
  );
  if (index >= 0) {
    players.splice(index, 1);
  }

  for (let i = 0; i < players.length; i++) {
    let a = new Player(
      players[i].startpos[0],
      players[i].startpos[1],
      players[i].username,
      players[i].type
    );
    enemies.push(a);
  }
  ready = true;
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("connect_error", err => {
  if (err.message === "invalid username") {
    console.log('we are fucked');
  }
});

socket.on("movement", coordinates => {
  console.log(coordinates);
  player.update(coordinates.move[0], coordinates.move[1]);
});

function keyPressed() {
  console.log('doing it');
  if (keyCode === UP_ARROW) {
    //player.update(0, -1);
    socket.emit("movement", {
      user: player.username,
      type: player.type,
      move: [0, -1]
    });
  } else if (keyCode === DOWN_ARROW) {
    //player.update(0, 1);
    socket.emit("movement", {
      user: player.username,
      type: player.type,
      move: [0, 1]
    });
  } else if (keyCode === RIGHT_ARROW) {
    //player.update(1, 0);
    socket.emit("movement", {
      user: player.username,
      type: player.type,
      move: [1, 0]
    });
  } else if (keyCode === LEFT_ARROW) {
    //player.update(-1, 0);
    socket.emit("movement", {
      user: player.username,
      type: player.type,
      move: [-1, 0]
    });
  }
}

