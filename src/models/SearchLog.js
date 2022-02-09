const mongoose = require("mongoose");

const SearchLogSchema = mongoose.Schema({
  user: { type: String, require: true },
  version: { type: String, require: true },
  timestamp: { type: Date, require: true },
  navigator: { type: Object },
  payload: { type: Object, require: true },
});

module.exports = mongoose.model("SearchLogs", SearchLogSchema);
