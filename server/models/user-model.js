const bcrypt = require("bcryptjs");

const insertUser = (
  username,
  firstname,
  lastname,
  email,
  password,
  token,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}" OR username = "${username}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Username or Email already taken", null);
    }
    sql = `INSERT INTO user (username, mail, password, firstname, lastname, token) VALUES ('${username}', '${email}', '${password}', '${firstname}', '${lastname}', '${token}')`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

function getPassword(email, callBack) {
  let sql = `SELECT password FROM user WHERE mail = "${email}"`;
  db.query(sql, (err, result, data) => {
    if (!result[0]) {
      return callBack("No User Found", null);
    } else {
      return callBack(null, result[0]);
    }
  });
}

const isUser = (email, callBack) => {
  let sql = `SELECT * FROM user WHERE mail = "${email}"`;
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
  let sql = `SELECT * FROM user WHERE mail = "${email}" AND id <> '${userId}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Mail already taken", null);
    }
    // On update si le mail n'est pas pris
    let sql = `UPDATE user
  SET firstname = '${firstname}', lastname = '${lastname}', mail = '${email}', bio = '${bio}', gender = '${gender}', orientation = '${orientation}'
  WHERE id = '${userId}'`;
    db.query(sql, () => {});
    return callBack(null, null);
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

exports.isUser = isUser;
exports.insertUser = insertUser;
exports.getMatch = getMatch;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.updateUserPicture = updateUserPicture;
exports.getPassword = getPassword;
