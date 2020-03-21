const insertUser = (username, email, password, callBack) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}" OR username = "${username}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    console.log(result);
    if (result > 0) {
      return callBack("Username or Email already taken", null);
    }
    sql = `INSERT INTO user (username, mail , password) VALUES ('${username}', '${email}', '${password}')`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

const isUser = (email, password, callBack) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}" AND password = "${password}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, null);
    }
    return callBack("Email or Password Incorect", null);
  });
};

exports.isUser = isUser;
exports.insertUser = insertUser;
