import { Server } from "socket.io";

export const registerSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Connected Socket ID: ", socket.id);

    socket.on("join_room", (roomID) => {
      socket.join(roomID);
      console.log(`User ${socket.id} joined the room ${roomID}`);
    });

    socket.on("send_message", ({ roomID, author, message, time }) => {
      console.log(roomID, author, message, time);

      socket.to(roomID).emit("receive_message", { roomID, author, message, time });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnect: ", socket.id);
    });
  });
};
