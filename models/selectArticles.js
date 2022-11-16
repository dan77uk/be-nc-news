const db = require("../db/connection");

exports.selectArticles = (sort_by = "created_at", order = "DESC", topic) => {
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
    .then(() => {
      // Validate any passed sort_by query
      const validSortColumns = [
        "created_at",
        "title",
        "article_id",
        "topic",
        "votes",
        "author",
        "comment_count",
      ];
      if (!validSortColumns.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "invalid sort query" });
      }

      // Validate any order query
      const validOrderQuery = ["asc", "ASC", "desc", "DESC"];
      if (!validOrderQuery.includes(order)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid order query",
        });
      }
      let queryStr = "SELECT * FROM articles";

      const topicValue = [];
      if (topic) {
        queryStr += ` where topic = $1`;
        topicValue.push(topic);
      }

      queryStr += ` ORDER BY ${sort_by} ${order};`;

      return db.query(queryStr, topicValue);
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
