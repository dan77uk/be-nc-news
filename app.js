const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  postComment,
} = require("./controllers/controllers");
const { handle404Error } = require("./errors/index");
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.post("/api/articles/:article_id/comments", postComment);
app.all("*", handle404Error);
app.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
