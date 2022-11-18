const {
  getArticles,
  getArticleComments,
  getArticleById,
  patchArticleVotes,
  postComment,
} = require("../controllers/controllers");
const articlesRouter = require("express").Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id/comments", getArticleComments);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleVotes);
articlesRouter.post("/:article_id/comments", postComment);

module.exports = articlesRouter;
