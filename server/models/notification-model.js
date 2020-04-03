const getNotification = (userId, callBack) => {
    let sql = `SELECT notification.id, type, date, username, picture1 FROM notification INNER JOIN user ON notification.id_user1 = user.id WHERE notification.id_user2 = "${userId}"`;
    db.query(sql, (err, result, data) => {
      if (err) throw err;
      if (result.length > 0) {
        return callBack(null, result, data);
      }
      return callBack("You have no friends :(", null);
    });
  };
exports.getNotification = getNotification;
  