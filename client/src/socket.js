import io from "socket.io-client";

export const socket = io.connect("http://localhost:5000");

socket.on("test", msg => {
  console.log(msg);
});

export function test() {
  socket.emit("test");
}
