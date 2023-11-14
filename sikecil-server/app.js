const express = require("express");
const router = require("./routers/router");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

module.exports = app;
