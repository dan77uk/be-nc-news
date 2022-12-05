const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const apiRouter = require("./routes/api-router");
const { handle404Error } = require("./errors/index");
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).send({ msg: "server up and running" });
});

app.use("/api", apiRouter);

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
