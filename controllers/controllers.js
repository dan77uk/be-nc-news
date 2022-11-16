const { selectTopics } = require("../models/selectTopics");
const { selectArticles } = require("../models/selectArticles");
const { selectArticleComments } = require("../models/selectArticleComments");
const { selectArticleById } = require("../models/selectArticleById");
const { insertComment } = require("../models/insertComment");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((result) => {
      res.status(200).send({ articles: result });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleComments(article_id)
    .then((result) => {
      res.status(200).send({ comments: result });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  insertComment(article_id, req.body)
    .then((result) => {
      res.status(201).send({ comment: result });
    })
    .catch(next);
};
