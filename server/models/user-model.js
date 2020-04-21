const bcrypt = require("bcryptjs");

const insertUser = (
  username,
  firstname,
  lastname,
  email,
  password,
  token_email,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE email = ${db.escape(email)} OR username = ${db.escape(username)}`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Username or Email already taken", null);
    }
    sql = `INSERT INTO user (username, email, password, firstname, lastname, token_email) VALUES (${db.escape(username)}, ${db.escape(email)}, ${db.escape(password)}, ${db.escape(firstname)}, ${db.escape(lastname)}, ${db.escape(token_email)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return callBack(null, {id: result.insertId, email: email});
    })
  });
};

function getPassword(username, callBack) {
  let sql = `SELECT id, email, password, username FROM user WHERE username = ${db.escape(username)}`;
  db.query(sql, (err, result, data) => {
    if (!result[0]) {
      return callBack("No User Found", null);
    } else {
      return callBack(null, result[0]);
    }
  });
}

const isUser = (username, callBack) => {
  let sql = `SELECT * FROM user WHERE username = ${db.escape(username)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, null);
    }
    return callBack("Username or Password Incorect", null);
  });
};

const updateUser = (
  username,
  firstname,
  lastname,
  email,
  bio,
  gender,
  orientation,
  age,
  userId,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE email = ${db.escape(email)} AND id <> ${db.escape(userId)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Mail already taken", null);
    }
    // On update si le mail n'est pas pris
    sql = `UPDATE user SET username = ${db.escape(username)}, firstname = ${db.escape(firstname)}, lastname = ${db.escape(lastname)}, email = ${db.escape(email)}, bio = ${db.escape(bio)}, 
  gender = ${db.escape(gender)}, orientation = ${db.escape(orientation)} , age = ${db.escape(age)} WHERE id = ${db.escape(userId)}`;
    db.query(sql, () => {});
    return callBack(err, null);
  });
};

const updateUserPassword = (
  oldPassword,
  newPassword,
  userId,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE id = ${db.escape(userId)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    } else if (bcrypt.compareSync(oldPassword, result[0].password) === false){
      return callBack("Wrong Password please try again", null);
    }
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    sql = `UPDATE user SET password = ${db.escape(hachedpassword)} WHERE id = ${db.escape(userId)}`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

const updateUserPicture = (picture, path, userId, callBack) => {
  let sql = `UPDATE user SET ${picture}= '${path}' WHERE id = ${db.escape(userId)}`;
  db.query(sql, () => {});
  return callBack(null, null);
};

const getUser = (userId, callBack) => {
  let sql = `SELECT * FROM user WHERE id = ${db.escape(userId)}`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, result, data);
    }
    return callBack("User not found", null);
  });
};

const getMatch = (matchId, callBack) => {
  let sql = `SELECT * FROM user`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, result, data);
    }
    return callBack("Email or Password Incorrect", null);
  });
};

const getUserMatch = (userId, callBack) => {
  let sql = `SELECT * FROM user_match INNER JOIN user ON user.id = user_match.id_user2 WHERE id_user1 = ${db.escape(userId)}`;
 // ajouter le inner join pour mettre de cote la liste des user block 
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, result);
  });
};

const updateValidEmail = (
  tokenEmail,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE token_email = ${db.escape(tokenEmail)} AND valid_email = '0'`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      sql = `UPDATE user SET valid_email = '1', token_email = NULL WHERE id = ${db.escape(result[0].id)}`;
      db.query(sql, () => {});
      return callBack(null, result, data);
    } else {
      return callBack("incorrect token", null);
    }
  });
};

const updateTokenPassword = (email, tokenPassword, callBack) => {
  let sql = `SELECT * FROM user WHERE email = ${db.escape(email)}`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      sql = `UPDATE user SET token_password = ${db.escape(tokenPassword)} WHERE id = ${db.escape(result[0].id)}`;
      db.query(sql, () => {});
      return callBack(null, result, data);
    } else {
      return callBack("incorrect token", null);
    }
  });
};

const reinitializePassword = (
  tokenPassword,
  newPassword,
  repeatPassword,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE token_password= ${db.escape(tokenPassword)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    }
    if (newPassword !== repeatPassword) {
      return callBack("These password are different please try again", null);
    } 
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    sql = `UPDATE user SET password = ${db.escape(hachedpassword)}, token_password = NULL  WHERE id = ${db.escape(result[0].id)}`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

exports.getUserMatch = getUserMatch;
exports.isUser = isUser;
exports.insertUser = insertUser;
exports.getMatch = getMatch;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.updateUserPicture = updateUserPicture;
exports.getPassword = getPassword;
exports.updateValidEmail = updateValidEmail;
exports.reinitializePassword = reinitializePassword;
exports.updateTokenPassword = updateTokenPassword;