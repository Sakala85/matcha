const {
  removeUser,
  getUsersInRoom,
  addUserBack,
  getUserBack,
  getUserBackByName,
  disconnectUser,
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
          io.to(user.id).emit("notifPusher", {
            id_user1: id_user1,
            username: username,
            type: type,
          });
        }

        callback();
      }
    );

    socket.on("join", ({ name, room, roomName }, callback) => {
      socket.join(room);
      let sql = `SELECT user.username, message.message, message.date 
      FROM message INNER JOIN user ON user.id = message.id_user1 
      WHERE id_room = ${db.escape(room)} ORDER BY message.date ASC`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        socket.emit("messages", { result });
      });
      io.to(room).emit("roomData", {
        room: room,
        users: getUserBackByName(roomName),
      });
      callback();
    });

    socket.on("sendMessage", (userId, room, message, callback) => {
      const user = getUserBack(userId);
      let sql = `INSERT INTO message (id_user1, id_room, message, date) VALUES (${db.escape(
        userId
      )}, ${db.escape(room)}, ${db.escape(message)}, NOW())`;
      db.query(sql, (err, result) => {});
      io.to(room).emit("message", { user: user.username, text: message });

      callback();
    });

    socket.on("disconnect", (userId) => {
      if (userId) {

      } else {

      }
      userId = disconnectUser(socket.id);
      let sql = `SELECT id
      FROM user_match 
      WHERE id_user1 = ${db.escape(userId)} OR id_user2 = ${db.escape(userId)}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        result.map((room) => {
          io.to(room).emit("roomData", {
            room: room,
            users: null,
          });
        });
      });

      //   const user = removeUser(socket.id);

      //   if (user) {
      //     io.to(user.room).emit("roomData", {
      //       room: user.room,
      //       users: getUsersInRoom(user.room),
      //     });
      //   }
    });
  });
};

exports.notificationSocket = notificationSocket;
