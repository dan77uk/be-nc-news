const db = require("../db/connection");

exports.insertTopic = ({ slug, description }) => {
  if (slug === undefined || description === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }

  return db
    .query(
      "INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;",
      [slug, description]
    )
    .then((result) => {
      return result.rows[0];
    });
};
