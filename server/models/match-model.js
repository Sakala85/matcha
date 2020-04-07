const addLike = (matcher, liked, callBack) => {
  let sql = `INSERT INTO user_like (id_user1, id_user2) VALUES ('${matcher}', '${liked}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return callBack(null, null);
  });
};

exports.addLike = addLike;
