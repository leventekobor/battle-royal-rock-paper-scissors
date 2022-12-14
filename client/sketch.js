let s;
let scl = 5;
let player;
let enemies = [];
let ready = false;

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
  frameRate(30);
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
  console.log(index);
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
    let enemy = new Player(
      players[i].startpos[0],
      players[i].startpos[1],
      players[i].username,
      players[i].type
    );
    enemies.push(enemy);
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

socket.on("movement", movement => {
  console.log(enemies);

  if(movement.user === username) {
    if(intersectEnemy()) {
      player.dir(movement.move[0], movement.move[1]);
      player.update();
    } else {
      alert('foo')
            player.dir(movement.move[0], movement.move[1]);
            player.update();
    }
  } else {
    const index = enemies.findIndex(
      player => player.username === movement.user
    );
    enemies[index].dir(movement.move[0], movement.move[1]);
  }
});

function keyPressed() {
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

function intersectEnemy() {
  if (enemies.length < 2) {
    return true;
  } 
  // If one rectangle is on left side of other
  if (player.x > enemies[1]?.x + 20 || enemies[1]?.x > player.x + 20) {
    console.log("case1");
    return false;
  }
  // If one rectangle is above other
  if (player.y - 20 > enemies[1]?.y || enemies[1]?.y - 20 > player.y) {
    console.log("case2");
    return false;
  }
  return true;
}

