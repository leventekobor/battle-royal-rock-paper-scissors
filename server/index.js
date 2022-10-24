const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

const users = [];

io.use((socket, next) => {
  let username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});


io.on("connection", socket => {
  console.log("a user connected");
  for (let [id, socket] of io.of("/").sockets) {
    if (!users.some(user => user.username === socket.handshake.auth.username)) {
      users.push({
        userID: id,
        username: socket.username,
        startpos: [randomInt(30, 90), randomInt(30, 90)],
        type: randomInt(0, 2)
      });
    }
  }
  socket.emit("users", users);
  socket.broadcast.emit("users", users);

  socket.on("movement", movement => {
    io.emit("movement", {
      user: movement.user,
      move: movement.move
    });
  });
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

http.listen(8080, () => console.log("listening on http://localhost:8080"));
