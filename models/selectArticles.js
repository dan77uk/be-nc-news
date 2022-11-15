const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query("ALTER TABLE articles ADD COLUMN comment_count INT DEFAULT 0;")
    .then(() => {
      return db.query(
        "SELECT article_id, COUNT(article_id)::INT as count FROM comments GROUP BY article_id;"
      );
    })
    .then(({ rows }) => {
      const update = rows.map(({ article_id, count }) => {
        const queryStr = `UPDATE articles SET comment_count = $1 WHERE article_id = $2`;
        return db.query(queryStr, [count, article_id]);
      });
      return update;
    })
    .then((result) => {
      return Promise.all(result);
    })
    .then((result) => {
      return db.query(`SELECT * FROM articles ORDER BY created_at DESC;`);
    })
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 204,
          msg: "No Content",
        });
      }
      return result.rows;
    });
};
