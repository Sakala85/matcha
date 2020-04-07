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

const createNotification = (userId, id_user2, type, callBack) => {
  let sql = `INSERT INTO notification (id_user1, id_user2, type, date) VALUES ('${userId}', '${id_user2}', '${type}', NOW())`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

exports.createNotification = createNotification;
exports.getNotification = getNotification;
