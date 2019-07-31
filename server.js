const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", () => {
  /* … */
});

server.listen(5000);
