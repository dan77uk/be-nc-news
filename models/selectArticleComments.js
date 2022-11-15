const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkArticleExists");

exports.selectArticleComments = (article_id) => {
  if (/[A-Za-z]/g.test(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid article id",
    });
  }

  return checkArticleExists(article_id).then(() => {
    return db
      .query(
        "SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC",
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
  });
};
