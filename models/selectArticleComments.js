const db = require("../db/connection");

exports.selectArticleComments = (article_id) => {
  if (/[A-Za-z]/g.test(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid article id",
    });
  }
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments where article_id = $1",
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return result.rows;
    });
};
