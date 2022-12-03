const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkArticleExists");

exports.selectArticleComments = (article_id, limit = 10, p) => {
  if (/[A-Za-z]/g.test(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid article id",
    });
  }

  if (p) {
    const offset = limit * (p - 1);
    return checkArticleExists(article_id).then(() => {
      return db
        .query(
          "SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;",
          [article_id, limit, offset]
        )
        .then((result) => {
          return result.rows;
        });
    });
  } else {
    return checkArticleExists(article_id).then(() => {
      return db
        .query(
          "SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC LIMIT $2;",
          [article_id, limit]
        )
        .then((result) => {
          return result.rows;
        });
    });
  }

  //   return checkArticleExists(article_id).then(() => {
  //     return db.query(strQuery, [article_id, limit]).then((result) => {
  //       return result.rows;
  //     });
  //   });
};
