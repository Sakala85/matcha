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
  let sql = `SELECT * FROM user WHERE email = "${email}" OR username = "${username}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Username or Email already taken", null);
    }
    sql = `INSERT INTO user (username, email, password, firstname, lastname, token_email) VALUES ('${username}', '${email}', '${password}', '${firstname}', '${lastname}', '${token_email}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return callBack(null, {id: result.insertId, email: email});
    })
  });
};

function getPassword(email, callBack) {
  let sql = `SELECT id, email, password, username FROM user WHERE email = "${email}"`;
  db.query(sql, (err, result, data) => {
    if (!result[0]) {
      return callBack("No User Found", null);
    } else {
      return callBack(null, result[0]);
    }
  });
}

const isUser = (email, callBack) => {
  let sql = `SELECT * FROM user WHERE email = "${email}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, null);
    }
    return callBack("Email or Password Incorect", null);
  });
};

const updateUser = (
  firstname,
  lastname,
  email,
  bio,
  gender,
  orientation,
  userId,
  callBack
) => {
  if (!VALIDATOR_TYPE_REQUIRE(firstname)) {
    return callBack("One type is not valid", null);

  }
  let sql = `SELECT * FROM user WHERE email = "${email}" AND id <> '${userId}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Mail already taken", null);
    }
    // On update si le mail n'est pas pris
    let sql = `UPDATE user
  SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', bio = ${db.escape(bio)}, gender = '${gender}', orientation = '${orientation}'
  WHERE id = '${userId}'`;
    db.query(sql, () => {});
    return callBack(err, null);
  });
};

const updateUserPassword = (
  oldPassword,
  newPassword,
  repeatPassword,
  userId,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE id = "${userId}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    } else if (newPassword !== repeatPassword) {
      return callBack("These password are different please try again", null);
    } else if (bcrypt.compareSync(oldPassword, result[0].password) === false){
      return callBack("Wrong Password please try again", null);
    }
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    let sql = `UPDATE user
  SET password = '${hachedpassword}'
  WHERE id = '${userId}'`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};
const updateUserPicture = (picture, path, userId, callBack) => {
  let sql = `UPDATE user
  SET ${picture} = '${path}'
  WHERE id = '${userId}'`;
  db.query(sql, () => {});
  return callBack(null, null);
};

const getUser = (userId, callBack) => {
  let sql = `SELECT * FROM user WHERE id = "${userId}"`;
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
  let sql = `SELECT * FROM user_match INNER JOIN user ON user.id = user_match.id_user2 WHERE id_user1 = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, result);
  });
};


const updateValidEmail = (
  tokenEmail,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE token_email = '${tokenEmail}' AND valid_email = '0'`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      let sql = `UPDATE user SET valid_email = '1', token_email = NULL WHERE id = '${result[0].id}'`;
      db.query(sql, () => {});
      return callBack(null, result, data);
    } else {
      return callBack("incorrect token", null);
    }
  });
};

const updateTokenPassword = (email, tokenPassword, callBack) => {
  let sql = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      let sql = `UPDATE user SET token_password = '${tokenPassword}' WHERE id = '${result[0].id}'`;
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

  let sql = `SELECT * FROM user WHERE token_password= "${tokenPassword}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    }
    if (newPassword !== repeatPassword) {
      return callBack("These password are different please try again", null);
    } 
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    let sql = `UPDATE user SET password = '${hachedpassword}', token_password = NULL  WHERE id = '${result[0].id}'`;
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