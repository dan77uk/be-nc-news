const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleComments,
  getArticleById,
  postComment,
  patchArticleVotes,
  getUsers,
  deleteComment,
} = require("./controllers/controllers");
const { handle404Error } = require("./errors/index");
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/articles/:article_id", getArticleById);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticleVotes);
app.get("/api/users", getUsers);
app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", handle404Error);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid text representation" });
  } else {
    res.status(500).send({ msg: "server error!" });
  }
});

module.exports = app;
