const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addUserBack,
  getUserBack,
} = require("../users");

const notificationSocket = (io, socket) => {
  io.on("connect", (socket) => {
    socket.on("connectNew", ({ username, userId }, callback) => {
      socket.join("users");
      addUserBack({ id: socket.id, username, userId });
      callback();
    });

    socket.on(
      "notifReceiver",
      ({ id_user1, id_user2, type, username }, callback) => {
        const user = getUserBack(id_user2);
        if (!user) {
          console.log(
            "This user is not online so we can't send the notification"
          );
        } else {
          console.log(user);
          io.to(user.id).emit("notifPusher", {
            id_user1: id_user1,
            username: username,
            type: type,
          });
        }

        callback();
      }
    );

    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);
      let sql = `SELECT user.username, message.message, message.date FROM message INNER JOIN user ON user.id = message.id_user1 WHERE id_room = ${db.escape(
        user.room
      )}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        socket.emit("messages", { result });
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

    socket.on("sendMessage", (userId, room, message, callback) => {
      const user = getUser(socket.id);
      let sql = `INSERT INTO message (id_user1, id_room, message, date) VALUES (${db.escape(
        userId
      )}, ${db.escape(room)}, ${db.escape(message)}, NOW())`;
      db.query(sql, (err, result) => {});
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
};

exports.notificationSocket = notificationSocket;
