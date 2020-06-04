const bcrypt = require("bcryptjs");

const insertUser = (
  username,
  firstname,
  lastname,
  email,
  password,
  token_email,
  lat,
  lon,
  callBack
) => {
  let sql = `SELECT * FROM user WHERE email = ${db.escape(
    email
  )} OR username = ${db.escape(username)}`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Username or Email already taken", null);
    }
    sql = `INSERT INTO user (username, email, password, firstname, lastname, token_email, online, last_visit, latitude, longitude) VALUES (${db.escape(
      username
    )}, ${db.escape(email)}, ${db.escape(password)}, ${db.escape(
      firstname
    )}, ${db.escape(lastname)}, ${db.escape(
      token_email
    )}, '1', NOW(), ${db.escape(lat)}, ${db.escape(lon)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      sql = `SELECT id, email, password, username, orientation, valid_profil, gender FROM user WHERE username = ${db.escape(
        username
      )}`;
      db.query(sql, (err, result) => {
        return callBack(null, result);
      });
    });
  });
};

function getPassword(username, callBack) {
  let sql = `SELECT id, email, password, username, orientation, valid_profil, gender FROM user WHERE username = ${db.escape(
    username
  )}`;
  db.query(sql, (err, result, data) => {
    sql = `UPDATE user SET last_visit = NOW(), online = 1 WHERE username = ${db.escape(
      username
    )}`;
    db.query(sql, (err, result, data) => {});
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
  let sql = `SELECT * FROM user WHERE email = ${db.escape(
    email
  )} AND id <> ${db.escape(userId)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack("Mail already taken", null);
    }
    // On update si le mail n'est pas pris
    sql = `UPDATE user SET username = ${db.escape(
      username
    )}, firstname = ${db.escape(firstname)}, lastname = ${db.escape(
      lastname
    )}, email = ${db.escape(email)}, bio = ${db.escape(bio)}, 
  gender = ${db.escape(gender)}, orientation = ${db.escape(
      orientation
    )} , age = ${db.escape(age)}, valid_profil = '1' WHERE id = ${db.escape(
      userId
    )}`;
    db.query(sql, () => {});
    return callBack(err, null);
  });
};

const setLocation = (lat, lon, userId) => {
  sql = `UPDATE user SET latitude = ${db.escape(lat)}, longitude = ${db.escape(
    lon
  )} WHERE id = ${db.escape(userId)}`;
  db.query(sql, () => {});
};

const updateUserPassword = (oldPassword, newPassword, userId, callBack) => {
  let sql = `SELECT * FROM user WHERE id = ${db.escape(userId)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    } else if (bcrypt.compareSync(oldPassword, result[0].password) === false) {
      return callBack("Wrong Password please try again", null);
    }
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    sql = `UPDATE user SET password = ${db.escape(
      hachedpassword
    )} WHERE id = ${db.escape(userId)}`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

const updateUserPicture = (picture, path, userId, callBack) => {
  let sql = `UPDATE user SET ${picture}= '${path}' WHERE id = ${db.escape(
    userId
  )}`;
  db.query(sql, () => {});
  sql = `SELECT popularity from user WHERE id = ${db.escape(userId)}`;
  db.query(sql, (err, result) => {
    const newPop = +result[0].popularity + 1;
    var n = newPop.toString();
    sql = `UPDATE user SET popularity = ${db.escape(n)} 
    WHERE id = ${db.escape(userId)}`;
    db.query(sql, () => {});
  });
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

const getMatch = (matchId, orientation, gender, callBack) => {
  let sql;
  if (orientation === "Both") {
    sql = `SELECT user.id, username, firstname, lastname, picture1, picture2, picture3, picture4, picture5, bio, gender, orientation, age, popularity, online, latitude, longitude, last_visit, user_like.id AS liked
   FROM user
  LEFT JOIN user_match ON (user_match.id_user1 = user.id AND user_match.id_user2 = ${db.escape(
    matchId
  )})
  LEFT JOIN user_like ON (user_like.id_user2 = user.id AND user_like.id_user1 = ${db.escape(
    matchId
  )})
  OR (user_match.id_user2 = user.id AND user_match.id_user1 = ${db.escape(
    matchId
  )})
  LEFT JOIN user_dislike ON (user_dislike.id_user1 = user.id AND user_dislike.id_user2 = ${db.escape(
    matchId
  )})
  OR (user_dislike.id_user2 = user.id AND user_dislike.id_user1 = ${db.escape(
    matchId
  )})
  LEFT JOIN blocked ON (blocked.id_user1 = user.id AND blocked.id_user2 = ${db.escape(
    matchId
  )})
  OR (blocked.id_user2 = user.id AND blocked.id_user1 = ${db.escape(matchId)})
  WHERE user.id <> ${matchId} AND user_match.id IS NULL AND user_dislike.id IS NULL AND blocked.id IS NULL AND orientation = ${db.escape(
      gender
    )}`;
  } else {
    sql = `SELECT user.id, username,  firstname, lastname, picture1, picture2, picture3, picture4, picture5, bio, gender, orientation, age, popularity, online, latitude, longitude, last_visit, user_like.id AS liked
    FROM user
   LEFT JOIN user_match ON (user_match.id_user1 = user.id AND user_match.id_user2 = ${db.escape(
     matchId
   )})
   LEFT JOIN user_like ON (user_like.id_user2 = user.id AND user_like.id_user1 = ${db.escape(
     matchId
   )})
   OR (user_match.id_user2 = user.id AND user_match.id_user1 = ${db.escape(
     matchId
   )})
   LEFT JOIN user_dislike ON (user_dislike.id_user1 = user.id AND user_dislike.id_user2 = ${db.escape(
     matchId
   )})
   OR (user_dislike.id_user2 = user.id AND user_dislike.id_user1 = ${db.escape(
     matchId
   )})
   LEFT JOIN blocked ON (blocked.id_user1 = user.id AND blocked.id_user2 = ${db.escape(
     matchId
   )})
   OR (blocked.id_user2 = user.id AND blocked.id_user1 = ${db.escape(matchId)})
   WHERE user.id <> ${matchId} AND user_match.id IS NULL AND user_dislike.id IS NULL AND blocked.id IS NULL AND gender = ${db.escape(
      orientation
    )} AND orientation = ${db.escape(gender)}`;
  }
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      return callBack(null, result, data);
    }
    return callBack("Email or Password Incorrect", null);
  });
};

const getUserMatch = (userId, callBack) => {
  let sql = `SELECT user_match.id, user.username, user.picture1 FROM user_match 
  INNER JOIN user ON (user.id = user_match.id_user2 OR user.id = user_match.id_user1) AND user.id <> ${db.escape(
    userId
  )}
  WHERE ((id_user1 = ${db.escape(userId)}) 
  OR (id_user2 = ${db.escape(userId)}))`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, result);
  });
};

const updateValidEmail = (tokenEmail, callBack) => {
  let sql = `SELECT * FROM user WHERE token_email = ${db.escape(
    tokenEmail
  )} AND valid_email = '0'`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      sql = `UPDATE user SET valid_email = '1', token_email = NULL WHERE id = ${db.escape(
        result[0].id
      )}`;
      db.query(sql, () => {});
      sql = `SELECT popularity from user WHERE id = ${db.escape(result[0].id)}`;
      db.query(sql, (err, result) => {
        const newPop = +result[0].popularity + 1;
        var n = newPop.toString();
        sql = `UPDATE user SET popularity = ${db.escape(n)} 
        WHERE id = ${db.escape(result[0].id)}`;
        db.query(sql, () => {});
      });
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
      sql = `UPDATE user SET token_password = ${db.escape(
        tokenPassword
      )} WHERE id = ${db.escape(result[0].id)}`;
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
  let sql = `SELECT * FROM user WHERE token_password= ${db.escape(
    tokenPassword
  )}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      return callBack("User not Found", null);
    }
    if (newPassword !== repeatPassword) {
      return callBack("These password are different please try again", null);
    }
    hachedpassword = bcrypt.hashSync(newPassword, 8);

    sql = `UPDATE user SET password = ${db.escape(
      hachedpassword
    )}, token_password = NULL  WHERE id = ${db.escape(result[0].id)}`;
    db.query(sql, () => {});
    return callBack(null, null);
  });
};

const getProfileExceptBlocked = (username, userId, callBack) => {
  let sql = `SELECT user.id, username, firstname, lastname, picture1, picture2, picture3, picture4, picture5, bio, gender, orientation, age, popularity, online, latitude, longitude, last_visit, blocked.id_user1, blocked.id_user2, user_like.id AS liked
  FROM user
  LEFT JOIN blocked ON (user.id = blocked.id_user1 OR user.id = blocked.id_user2)
  LEFT JOIN user_like ON (user_like.id_user2 = user.id AND user_like.id_user1 = ${db.escape(
    userId
  )})
  WHERE username = ${db.escape(username)} AND blocked.id IS NULL OR 
  (username = ${db.escape(username)}
  AND ((blocked.id_user1 <> ${db.escape(
    userId
  )} AND blocked.id_user2 = user.id) 
  OR (blocked.id_user2 <> ${db.escape(
    userId
  )} AND blocked.id_user1 = user.id)))`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, result);
  });
};

exports.getUserMatch = getUserMatch;
exports.getProfileExceptBlocked = getProfileExceptBlocked;
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
exports.setLocation = setLocation;
exports.updateTokenPassword = updateTokenPassword;
