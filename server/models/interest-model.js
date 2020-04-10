const instertInterest = (interest, userId, callBack) => {
  let interestValid = db.escape(interest)
  console.log(interestValid)
  let sql = `SELECT * FROM interest_list WHERE interest = ${interestValid}`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    if (result.length > 0) {
      let id_interest = result[0].id;
      sql = `SELECT * FROM interest WHERE id_interest_list = "${id_interest}"`;
      db.query(sql, (err, result, data) => {
        if (result.length === 0) {
          sql = `INSERT INTO interest (id_user, id_interest_list) VALUES ('${userId}', '${id_interest}')`;
          db.query(sql, (err, result, data) => {});
        }
      });
      return callBack(err, null);
    } else {
      sql = `INSERT INTO interest_list (interest) VALUES (${interestValid})`;
      db.query(sql, (err, result, data) => {});
      sql = `SELECT * FROM interest_list WHERE interest = ${interestValid}`;
      db.query(sql, (err, result, data) => {
        if (result.length > 0) {
          sql = `INSERT INTO interest (id_user, id_interest_list) VALUES ('${userId}', '${result[0].id}')`;
          db.query(sql, () => {});
        }
      });
      return callBack(err, null);
    }
  });
};

const getInterest = (userId, callBack) => {
  let sql = `SELECT interest.id, interest_list.interest FROM interest INNER JOIN interest_list ON interest.id_interest_list = interest_list.id WHERE id_user = "${userId}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    return callBack(err, result);
  });
};

const deleteInterestDB = (interestId, callBack) => {
  let sql = `DELETE FROM interest WHERE id = "${interestId}"`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    return callBack(err, result);
  });
};

exports.instertInterest = instertInterest;
exports.getInterest = getInterest;
exports.deleteInterestDB = deleteInterestDB;
