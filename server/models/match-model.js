const addLike = (matcher, liked, callBack) => {
  let sql = `SELECT * FROM user_like WHERE id_user1 = "${liked}" AND id_user2 = "${matcher}"`;
  db.query(sql, (err, result) => {
    if (!result[0]) {
      let sql = `INSERT INTO user_like (id_user1, id_user2) VALUES ('${matcher}', '${liked}')`;
      db.query(sql, (err, result) => {});
    return callBack(err, {message: "like"});
    }
    else {
      let sql = `INSERT INTO user_match (id_user1, id_user2) VALUES ('${matcher}', '${liked}')`;
      db.query(sql, (err, result) => {});
      sql = `INSERT INTO user_match (id_user1, id_user2) VALUES ('${liked}', '${matcher}')`;
      db.query(sql, (err, result) => {});
    return callBack(err, {message: "match"});
    }
  });
};

const addDislike = (matcher, disliked, callBack) => {
  let sql = `INSERT INTO user_dislike (id_user1, id_user2) VALUES ('${matcher}', '${disliked}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

const deleteMatch = (unmatcher, unmatched, callBack) => {
let sql = `DELETE FROM user_match WHERE id_user1 = '${unmatcher}' AND id_user2 = '${unmatched}' `
  db.query(sql, (err, result) => {});
sql = `DELETE FROM user_match WHERE id_user1 = '${unmatched}' AND id_user2 = '${unmatcher}' `;
  db.query(sql, (err, result) => {});
  console.log(unmatcher + "okok" + unmatched)
return callBack (null, null);
};

exports.addLike = addLike;
exports.addDislike = addDislike;
exports.deleteMatch = deleteMatch;
