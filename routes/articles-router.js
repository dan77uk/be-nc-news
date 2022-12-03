const {
  getArticles,
  getArticleComments,
  getArticleById,
  patchArticleVotes,
  postComment,
  postArticle,
  deleteArticle,
} = require("../controllers/controllers");
const articlesRouter = require("express").Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id/comments", getArticleComments);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleVotes);
articlesRouter.post("/", postArticle);
articlesRouter.post("/:article_id/comments", postComment);
articlesRouter.delete("/:article_id", deleteArticle);

module.exports = articlesRouter;
