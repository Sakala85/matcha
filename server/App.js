const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./routes/router");
const matchRoutes = require("./routes/match-routes");
const userRoutes = require("./routes/user-routes");
const interestRoutes = require("./routes/interest-routes");
const notifRoutes = require("./routes/notification-routes");
const chatRoutes = require("./routes/chat-routes");
const configRoutes = require("./config/configDatabase");
const HttpError = require("./models/http-error");
const app = express();
global.db = require("./connexionDB");

app.use(bodyParser.json());

app.use("/uploads/img", express.static(path.join("uploads", "img")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//CHAT
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connect", (socket) => {

  socket.on("connectNew", ({ name }, callback) => {
    socket.join("notification");

    console.log(name + " Is Connected");
    callback();
  });

  socket.on("notifReceiver", ({ user1, user2, type }, callback) => {
    const user = getUser(socket.id);

    // socket.broadcast
    //   .to("notification")
    //   .emit("notifPusher", { });

    console.log("Notif received");
    // socket.emit("notifPusher", {
    //   user: "admin",
    // });
    io.to("notification").emit("notifPusher", { });

    
    callback();
  });
  
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use("/api/user", userRoutes);
app.use("/api/user/match", matchRoutes);
app.use("/api/user/notification", notifRoutes);
app.use("/api/user/interest", interestRoutes);
app.use("/api/user/:uid/chat", chatRoutes);
app.use("/api/config", configRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured !" });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
