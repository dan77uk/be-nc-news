const { selectTopics } = require("../models/selectTopics");
const { selectArticles } = require("../models/selectArticles");
const { selectArticleComments } = require("../models/selectArticleComments");
const { selectArticleById } = require("../models/selectArticleById");
const { insertComment } = require("../models/insertComment");
const { updateArticleVotes } = require("../models/updateArticleVotes");
const { selectUsers } = require("../models/selectUsers");
const { deleteCommentById } = require("../models/deleteCommentById");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectArticles(sort_by, order, topic)
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

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  updateArticleVotes(article_id, req.body)
    .then((result) => {
      res.status(201).send({ article: result });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((result) => {
      res.status(200).send({ users: result });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id).then((result) => {
    res.status(204).send();
  });
};
