const getAllReport = (callBack) => {
  let sql = `SELECT * FROM report
  LEFT JOIN user ON id_user2 = user.id`;
  db.query(sql, (err, result, data) => {
    if (err) throw err;
    return callBack(err, result);
  });
};

exports.getAllReport = getAllReport;
