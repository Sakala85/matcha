const jwt = require("jsonwebtoken");
const notificationModel = require("../models/notification-model");
const {
  removeUser,
  getUsersInRoom,
  addUserBack,
  getUserBack,
  isOnline,
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
          console.log("Notif sent to ", user.id);
          io.to(user.id).emit("notifPusher", {
            id_user1: id_user1,
            username: username,
            type: type,
          });
        }

        callback();
      }
    );

    socket.on("join", ({ name, room, roomName, token }, callback) => {
      const decodedToken = jwt.verify(token, "motdepassesupersecret");
      if (!token || decodedToken.username !== name) {
        socket.emit("ERROR", { error: "This room doesn't exist anymore" });
      } else {
        socket.join(room);
        let sql = `SELECT * FROM user_match
      INNER JOIN user ON (user.id = user_match.id_user1 OR user.id = user_match.id_user2)
      WHERE user_match.id = ${db.escape(room)} AND (user.username = ${db.escape(
          name
        )} OR user.username = ${db.escape(roomName)})`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          if (result[0] && result[1]) {
            if (
              (result[0].username === name &&
                result[1].username === roomName) ||
              (result[0].username === roomName && result[1].username === name)
            ) {
              sql = `SELECT user.username, message.message, message.date 
            FROM message INNER JOIN user ON user.id = message.id_user1 
            WHERE id_room = ${db.escape(room)} ORDER BY message.date ASC`;
              db.query(sql, (err, result) => {
                if (err) throw err;
                socket.emit("messages", { result });
              });
              const userId = isOnline(roomName);
              if (userId) {
                io.to(userId).emit("roomData", {
                  room: room,
                  users: isOnline(roomName),
                });
              }
            } else {
              socket.emit("ERROR", {
                error: "This room doesn't exist anymore",
              });
            }
          } else {
            socket.emit("ERROR", { error: "This room doesn't exist anymore" });
          }
        });
        callback();
      }
    });

    socket.on("sendMessage", (userId, room, message, callback) => {
      const user = getUserBack(userId);
      let sql = `INSERT INTO message (id_user1, id_room, message, date) VALUES (${db.escape(
        userId
      )}, ${db.escape(room)}, ${db.escape(message)}, NOW())`;
      db.query(sql, (err, result) => {});
      sql = `SELECT user.username, user.id FROM user_match INNER JOIN user 
      ON user.id = user_match.id_user1 OR user.id = user_match.id_user2 
      WHERE user_match.id = ${db.escape(room)} AND user.id <> ${db.escape(
        userId
      )}`;
      io.to(room).emit("message", { user: user.username, text: message });
      db.query(sql, (err, result) => {
        if (result[0].username) {
          io.to(isOnline(result[0].username)).emit("notifPusher", {
            id_user1: userId,
            username: user.username,
            type: "message",
          });
          notificationModel.createNotification(
            userId,
            result[0].id,
            "Chat",
            (err, result) => {}
          );
        }
      });

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
