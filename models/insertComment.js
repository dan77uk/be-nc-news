const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkArticleExists");

exports.insertComment = (article_id, content) => {
  const { username, body } = content;
  // if (/[A-Za-z]/g.test(article_id)) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Invalid article id",
  //   });
  // }
  // if (username === undefined || body === undefined) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Missing required fields",
  //   });
  // }

  return checkArticleExists(article_id).then(() => {
    return db
      .query(
        "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *",
        [body, author, article_id]
      )
      .then((result) => {
        console.log(result.rows[0]);
        return result.rows[0];
      });
  });
};
