const server = require("http").createServer();
const io = require("socket.io")(server);
const fetch = require("node-fetch");

io.on("connection", client => {
  client.on("test", () => {
    io.emit("test", "successful socket.io connection...");
  });

  client.on("get_thought", handleGetThought);
});

let attempts = 0;
const handleGetThought = () => {
  // rate limit pdq api access to 1 at a time
  if (attempts) return;

  (fetchThought = () => {
    // make no more than 10 attempts
    if (attempts > 10) {
      io.emit("error", "API unresponsive");
      return;
    }
    attempts++;
    io.emit("loading");
    fetch("https://pdqweb.azurewebsites.net/api/brain")
      .then(res => res.json())
      .then(data => {
        io.emit("thought", data);
        attempts = 0;
      })
      // try again should the attempt fail
      .catch(err => fetchThought());
  })();
};

server.listen(5000);
