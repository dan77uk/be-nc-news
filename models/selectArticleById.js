const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  if (/[A-Za-z]/g.test(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid article id",
    });
  }

  return db
    .query(
      "SELECT articles.*, COUNT(comments.comment_id)::INT as comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id",
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return result.rows[0];
    });
};
