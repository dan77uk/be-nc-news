const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkArticleExists");
const { checkUserExists } = require("../utils/checkUserExists");

exports.insertComment = (article_id, content) => {
  const { username, body } = content;

  if (username === undefined || body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }
  const checkUser = checkUserExists(username);
  const checkArticle = checkArticleExists(article_id);

  return Promise.all([checkArticle, checkUser]).then((result) => {
    return db
      .query(
        "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
        [body, username, article_id]
      )
      .then((result) => {
        return result.rows[0];
      });
  });
};
