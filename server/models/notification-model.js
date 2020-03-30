const getNotification = (userId, callBack) => {
    let sql = `SELECT * FROM notification WHERE id_user2 = "${userId}"`;
    db.query(sql, (err, result, data) => {
      if (err) throw err;
      if (result.length > 0) {
        return callBack(null, result, data);
      }
      return callBack("User not found", null);
    });
  };
exports.getNotification = getNotification;
  