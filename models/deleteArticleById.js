const db = require("../db/connection");

exports.deleteArticleById = (id) => {
  return db
    .query(`DELETE FROM articles WHERE article_id = $1 RETURNING *;`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "not found",
        });
      }
      return result.rows[0];
    });
};
