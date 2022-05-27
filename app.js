var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

var app = express();

require("./connections");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(usersRouter);
app.use(postsRouter);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((req, res, next) => {
  res.status(404).send({
    status: "false",
    message: "無此網站路由",
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({
    status: "false",
    message: "程式有些問題，請稍後嘗試",
  });
});

module.exports = app;
