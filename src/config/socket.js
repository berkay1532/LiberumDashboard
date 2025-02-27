const { Server } = require("socket.io");
const searchSocketHandler = require("../sockets/searchSocket");
// const visitSocketHandler = require("../sockets/visitSocket");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Yeni kullanıcı bağlandı:", socket.id);

    // Burada farklı event handler'ları çağırıyoruz
    searchSocketHandler(socket);
    // visitSocketHandler(socket);

    socket.on("disconnect", () => {
      console.log("Kullanıcı ayrıldı:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
