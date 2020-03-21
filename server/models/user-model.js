
const insertUser = (pseudo, email, password, callBack) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}" OR pseudo = "${pseudo}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Pseudo or Email already taken", null);
    }
    sql = `INSERT INTO user (pseudo, mail , password) VALUES ('${pseudo}', '${email}', '${password}')`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

exports.insertUser = insertUser;
