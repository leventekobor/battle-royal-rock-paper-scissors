const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" }
});


/*
io.on("connection", socket => {
  console.log("a user connected");

  socket.on("message", message => {
    console.log(message.move);
    //io.emit("message", `${socket.id.substr(0, 2)} moved ${message}`);
    io.emit("message", {
      'user': message.user,
      'move': message.move
    })
  });
});
*/

function generateRandomUser() {
  return "guest_" + (Math.random() + 1).toString(36).substring(7);
}

io.use((socket, next) => {
  let username = socket.handshake.auth.username;
  console.log('foobar', username);
  if (username) {
    username = generateRandomUser()
  }
  socket.username = username;
  next();
});


io.on("connection", socket => {
  console.log("a user connected");
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    
    users.push({
      userID: id,
      username: socket.username,
      startpos: [randomInt(30, 90), randomInt(30, 90)],
    });
  }
  console.log('users', users);
  socket.emit("users", users);
  
  socket.on("message", message => {
    console.log(message.move);
    //io.emit("message", `${socket.id.substr(0, 2)} moved ${message}`);
    io.emit("message", {
      user: message.user,
      move: message.move
    });
  });
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



http.listen(8080, () => console.log("listening on http://localhost:8080"));
