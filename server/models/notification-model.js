const getNotification = (userId, callBack) => {
  let sql = `SELECT notification.id, type, date, username, picture1 FROM notification INNER JOIN user ON notification.id_user1 = user.id WHERE notification.id_user2 = ${db.escape(
    userId
  )} ORDER BY date DESC`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, result, data);
    }
    return callBack("You have no friends :(", null);
  });
};

const createNotification = (userId, id_user2, type, callBack) => {
  let sql = `INSERT INTO notification (id_user1, id_user2, type, date) VALUES (${db.escape(
    userId
  )}, ${db.escape(id_user2)}, ${db.escape(type)}, NOW())`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

const countNotification = (userId, callBack) => {
  let sql = `SELECT COUNT(*) AS notifNumber FROM notification WHERE id_user2 = ${db.escape(
    userId
  )} AND readed = 0`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(err, result);
  });
};

const readNotification = (userId, callBack) => {
  let sql = `UPDATE notification SET readed = 1 WHERE id_user2 = ${db.escape(
    userId
  )} AND readed = 0`;
  db.query(sql, (err) => {
    if (err) throw err;
    return callBack(err, null);
  });
};

exports.readNotification = readNotification;
exports.countNotification = countNotification;
exports.createNotification = createNotification;
exports.getNotification = getNotification;
