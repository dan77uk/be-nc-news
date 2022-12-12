const db = require("../db/connection");
const { checkTopicExists } = require("../utils/checkTopicExists");

exports.selectArticles = (
  sort_by = "created_at",
  order = "DESC",
  topic,
  limit,
  p
) => {
  const validSortColumns = [
    "created_at",
    "title",
    "article_id",
    "topic",
    "votes",
    "author",
    "comment_count",
  ];

  const regexNumCheck = /^\d+$/g;

  if (!regexNumCheck.test(limit)) {
    limit = 10;
  }

  const promiseArray = [];

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

  let queryStr =
    "SELECT articles.*, COUNT(comments.comment_id)::INT as comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  const topicValue = [];
  if (topic) {
    promiseArray.push(checkTopicExists(topic));
    topicValue.push(topic);
    queryStr += " WHERE articles.topic = $1";
  }

  const countQuery = `${queryStr} GROUP BY articles.article_id;`;
  // promiseArray.push(db.query(countQuery, topicValue));

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order} LIMIT ${limit}`;

  if (p) {
    if (regexNumCheck.test(p)) {
      const offset = limit * (p - 1);
      queryStr += ` OFFSET ${offset}`;
    }
  }
  queryStr += ";";

  // promiseArray.push(db.query(queryStr, topicValue));

  // return db
  //   .query(countQuery, topicValue)
  //   .then((result) => {
  //     return result.rows.length;
  //   })
  //   .then((count) => {
  //     return Promise.all(promiseArray).then((result) => {
  //       if (result[1] === undefined) {
  //         // If no topic is passed
  //         return { articles: result[0].rows, count: count };
  //       } else {
  //         return { articles: result[1].rows, count: count };
  //       }
  //     });
  //   });

  promiseArray.push(db.query(countQuery, topicValue));
  promiseArray.push(db.query(queryStr, topicValue));
  return Promise.all(promiseArray).then((result) => {
    if (result[2] === undefined) {
      return { articles: result[1].rows, count: result[0].rows.length };
    } else {
      return { articles: result[2].rows, count: result[1].rows.length };
    }
  });
};
