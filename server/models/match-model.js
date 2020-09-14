const addLike = (matcher, liked, callBack) => {
  console.log("Like Seng");

  let sql = `SELECT * FROM user_like WHERE id_user1 = '${liked}' AND id_user2 = '${matcher}'`;
  db.query(sql, (err, result) => {
    if (!result[0]) {
      console.log(matcher, liked);
      sql = `SELECT * FROM user_like WHERE id_user2 = '${liked}' AND id_user1 = '${matcher}'`;
      db.query(sql, (err, result) => {
        if (!result[0]) {
          sql = `INSERT INTO user_like (id_user1, id_user2) VALUES ('${matcher}', '${liked}')`;
          db.query(sql, (err, result) => {});
        }
        sql = `DELETE from user_dislike WHERE id_user1 = ${db.escape(
          matcher
        )} AND id_user2 = ${db.escape(liked)}`;
        db.query(sql, (err, result) => {});
        return callBack(err, { message: "like" });
      });
    } else {
      sql = `INSERT INTO user_match (id_user1, id_user2) VALUES ('${matcher}', '${liked}')`;
      db.query(sql, (err, result) => {});
      return callBack(err, { message: "match" });
    }
  });
};

const addDislike = (matcher, disliked, callBack) => {
  let sql = `INSERT INTO user_dislike (id_user1, id_user2) VALUES (${db.escape(
    matcher
  )}, ${db.escape(disliked)})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    sql = `DELETE FROM user_like WHERE id_user1 = ${db.escape(
      matcher
    )} AND id_user2 = ${db.escape(disliked)}`;
    db.query(sql, (err, result) => {});
    return callBack(null, "user unmatched");
  });
};

const deleteMatch = (matchId, callBack) => {
  let sql = `DELETE FROM user_match WHERE id = ${db.escape(matchId)}`;
  db.query(sql, (err, result) => {});
  return callBack(null, null);
};

const reportProfil = (reporter, reported, callBack) => {
  let sql = `INSERT INTO report (id_user1, id_user2) VALUES (${db.escape(
    reporter
  )}, ${db.escape(reported)})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

const blockProfil = (blocker, blocked, callBack) => {
  let sql = `INSERT INTO blocked (id_user1, id_user2) VALUES (${db.escape(
    blocker
  )}, ${db.escape(blocked)})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

exports.addLike = addLike;
exports.addDislike = addDislike;
exports.deleteMatch = deleteMatch;
exports.reportProfil = reportProfil;
exports.blockProfil = blockProfil;
