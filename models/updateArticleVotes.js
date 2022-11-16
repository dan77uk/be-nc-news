const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkArticleExists");

exports.updateArticleVotes = (id, body) => {
  const { inc_votes } = body;

  if (inc_votes === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Invalid inc_votes key or value",
    });
  }
  return checkArticleExists(id).then(() => {
    return db
      .query(
        `UPDATE articles set votes = votes + $1 WHERE article_id = $2 RETURNING *`,
        [inc_votes, id]
      )
      .then((result) => {
        return result.rows[0];
      });
  });
};
