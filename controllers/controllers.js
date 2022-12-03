const { selectTopics } = require("../models/selectTopics");
const { selectArticles } = require("../models/selectArticles");
const { selectArticleComments } = require("../models/selectArticleComments");
const { selectArticleById } = require("../models/selectArticleById");
const { insertComment } = require("../models/insertComment");
const { updateArticleVotes } = require("../models/updateArticleVotes");
const { selectUsers } = require("../models/selectUsers");
const { deleteCommentById } = require("../models/deleteCommentById");
const { readEndpoints } = require("../models/readEndpoints");
const { selectUserById } = require("../models/selectUserById");
const { updateComment } = require("../models/updateComment");
const { insertArticle } = require("../models/insertArticle");
const { insertTopic } = require("../models/insertTopic");
const { deleteArticleById } = require("../models/deleteArticleById");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, limit, p } = req.query;
  selectArticles(sort_by, order, topic, limit, p)
    .then((result) => {
      res.status(200).send({ articles: result, total_count: result.length });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const { limit, p } = req.query;
  selectArticleComments(article_id, limit, p)
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
  deleteCommentById(comment_id)
    .then((result) => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getEndpoints = (req, res, next) => {
  readEndpoints()
    .then((result) => {
      res.status(200).send({ endpoints: result });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes)
    .then((result) => {
      res.status(201).send({ comment: result });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  insertArticle(req.body)
    .then((result) => {
      res.status(201).send({ article: result });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  insertTopic(req.body)
    .then((result) => {
      [res.status(201).send({ topic: result })];
    })
    .catch(next);
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticleById(article_id)
    .then((result) => {
      res.status(204).send();
    })
    .catch(next);
};
