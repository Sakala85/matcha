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
          socket.join("notification");
          const { error, user } = addUserBack({ id: socket.id, username, userId });
          console.log(username + " Is Connected");
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
              io.to(`${user.id}`).emit("notifPusher", {
                id_user1: id_user1,
                username: username,
                type: type,
              });
            }
      
            callback();
          }
        );
      
        socket.on("join", ({ name, room, id_user1, id_user2 }, callback) => {
          const { error, user } = addUser({ id: socket.id, name, room });
      
          if (error) return callback(error);
      
          socket.join(user.room);
      
          let sql = `SELECT * FROM message WHERE id_user1 = ${id_user1} AND id_user2 = ${id_user2}`;
          db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
          socket.emit("messages", {result});
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
}

exports.notificationSocket = notificationSocket;