const db = require("../db/connection");
const { checkTopicExists } = require("../utils/checkTopicExists");
const { checkUserExists } = require("../utils/checkUserExists");

exports.insertArticle = (postedBody) => {
  const { username, body, title, topic } = postedBody;
  if (
    username === undefined ||
    body === undefined ||
    title === undefined ||
    topic === undefined
  ) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }

  return Promise.all([checkUserExists(username), checkTopicExists(topic)]).then(
    (result) => {
      return db
        .query(
          "INSERT INTO articles (author, body, title, topic) VALUES ($1, $2, $3, $4) RETURNING article_id;",
          [username, body, title, topic]
        )
        .then((result) => {
          return db.query(`SELECT articles.*,
    COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = ${result.rows[0].article_id}
    GROUP BY articles.article_id;`);
        })
        .then((result) => {
          return result.rows[0];
        });
    }
  );
};
