const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return db
    .query("SELECT * from articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows === 0) {
        return Promise.reject({
          status: 204,
          msg: "No content",
        });
      }
      return result.rows[0];
    });
};
