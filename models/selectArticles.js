const db = require("../db/connection");

exports.selectArticles = () => {
  const queryStr = `SELECT * FROM articles;`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};
