const addLike = (matcher, liked, room_id, callBack) => {
  let sql = `SELECT * FROM user_like WHERE id_user1 = ${db.escape(liked)} AND id_user2 = ${db.escape(matcher)}`;
  db.query(sql, (err, result) => {
    if (!result[0]) {
      let sql = `INSERT INTO user_like (id_user1, id_user2) VALUES (${db.escape(matcher)}, ${db.escape(liked)}, ${db.escape(room_id)})`;
      db.query(sql, (err, result) => {});
    return callBack(err, {message: "like"});
    }
    else {
      let sql = `INSERT INTO user_match (id_user1, id_user2) VALUES (${db.escape(matcher)}, ${db.escape(liked)})`;
      db.query(sql, (err, result) => {});
      sql = `INSERT INTO user_match (id_user1, id_user2) VALUES (${db.escape(liked)}, ${db.escape(matcher)})`;
      db.query(sql, (err, result) => {});
    return callBack(err, {message: "match"});
    }
  });
};

const addDislike = (matcher, disliked, callBack) => {
  let sql = `INSERT INTO user_dislike (id_user1, id_user2) VALUES (${db.escape(matcher)}, ${db.escape(disliked)})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

const deleteMatch = (unmatcher, unmatched, callBack) => {
let sql = `DELETE FROM user_match WHERE id_user1 = ${db.escape(unmatcher)} AND id_user2 = ${db.escape(unmatched)}`
  db.query(sql, (err, result) => {});
sql = `DELETE FROM user_match WHERE id_user1 = ${db.escape(unmatched)} AND id_user2 = ${db.escape(unmatcher)}`;
  db.query(sql, (err, result) => {});
  console.log(unmatcher + "okok" + unmatched)
return callBack (null, null);
};


const reportProfil = (reporter, reported, callBack) => {
  let sql = `INSERT INTO report (id_user1, id_user2) VALUES (${db.escape(reporter)}, ${db.escape(reported)})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

const blockProfil = (blocker, blocked, callBack) => {
  let sql = `INSERT INTO blocked (id_user1, id_user2) VALUES (${db.escape(blocker)}, ${db.escape(blocked)})`;
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
