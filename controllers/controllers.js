const { selectTopics } = require("../models/selectTopics");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result });
    })
    .catch(next);
};
