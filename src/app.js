const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//MODELS
const errors = require("./routes/errors");
const searchLogs = require("./routes/searchLogs");

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("CONNECTED");
});

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use("/errors", errors);
app.use("/searchLogs", searchLogs);

module.exports = app;
module.exports.handler = serverless(app);
