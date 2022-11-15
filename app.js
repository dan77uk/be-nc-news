const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/controllers");
const { handle404Error } = require("./errors/index");

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.all("*", handle404Error);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
