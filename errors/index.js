exports.handle404Error = (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
};
