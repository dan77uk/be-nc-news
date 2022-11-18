const { getEndpoints } = require("../controllers/controllers");
const apiRouter = require("express").Router();
const articlesRouter = require("./articles-router");
const usersRouter = require("./users-router");
const topicsRouter = require("./topics-router");

apiRouter.get("/", getEndpoints);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
