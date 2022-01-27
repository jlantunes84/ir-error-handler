const mongoose = require("mongoose");

const ErrorSchema = mongoose.Schema({
  user: { type: String, require: true },
  version: { type: String, require: true },
  timestamp: { type: Date, require: true },
  pk: { type: String, require: true },
  solved: { type: Boolean },
  payload: { type: String, require: true },
});

module.exports = mongoose.model("Errors", ErrorSchema);
