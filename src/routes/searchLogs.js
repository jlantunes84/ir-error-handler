const express = require("express");
const router = express.Router();
const SearchLog = require("../models/SearchLog");

//GET ALL SearchLogS
router.get("/", async (req, res) => {
  try {
    const searchLogs = await SearchLog.find();
    res.json(searchLogs);
  } catch (error) {
    res.json({ message: error });
  }
});

//GET ONE SearchLog
router.get("/:searchLogId", async (req, res) => {
  try {
    const searchLog = await SearchLog.findById(req.params.searchLogId);
    res.json(searchLog);
  } catch (error) {
    res.json({ message: error });
  }
});

//ADD ONE SearchLog
router.post("/", async (req, res) => {
  const searchLog = new SearchLog({
    user: req.body.user,
    version: req.body.version,
    timestamp: new Date().toISOString(),
    navigator: req.body.navigator,
    payload: req.body.payload,
  });

  const canAdd = !!searchLog.user || !!searchLog.version || !!searchLog.payload;

  if (canAdd) {
    try {
      const addSearchLog = await searchLog.save();
      res.json(addSearchLog);
    } catch (error) {
      res.json({ message: error });
    }
  } else {
    res.json({ message: "Can not add a void SearchLog" });
  }
});

//UPDATE ONE SearchLog
router.patch("/:searchLogId", async (req, res) => {
  try {
    const searchLog = await SearchLog.findOneAndUpdate(
      { _id: req.params.searchLogId },
      {
        $set: req.body,
      }
    );
    const updatedSearchLog = await SearchLog.findById(req.params.searchLogId);
    res.send({ status: "SUCESS", data: updatedSearchLog });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
