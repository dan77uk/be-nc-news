const db = require("../db/connection");
const { checkCommentExists } = require("../utils/checkCommentExists");

exports.updateComment = (id, votes) => {
  if (votes === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  return checkCommentExists(id).then(() => {
    return db
      .query(
        `UPDATE comments set votes = votes + $1 WHERE comment_id = $2 RETURNING *`,
        [votes, id]
      )
      .then((result) => {
        return result.rows[0];
      });
  });
};
