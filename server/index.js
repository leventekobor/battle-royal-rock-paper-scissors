const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

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

http.listen(8080, () => console.log("listening on http://localhost:8080"));
