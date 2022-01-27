const express = require("express");
const router = express.Router();
const Error = require("../models/Error");

//GET ALL ERRORS
router.get("/", async (req, res) => {
  try {
    const errors = await Error.find();
    res.json(errors);
  } catch (error) {
    res.json({ message: error });
  }
});

//GET ONE ERROR
router.get("/:errorId", async (req, res) => {
  try {
    const error = await Error.findById(req.params.errorId);
    res.json(error);
  } catch (error) {
    res.json({ message: error });
  }
});

//ADD ONE ERROR
router.post("/", async (req, res) => {
  const error = new Error({
    user: req.body.user,
    version: req.body.version,
    timestamp: req.body.timestamp,
    pk: req.body.pk,
    solved: false,
    comment: req.body.comment,
    payload: req.body.payload,
  });

  const canAdd =
    !!error.user ||
    !!error.version ||
    !!error.timestamp ||
    !!error.payload ||
    !!error.pk;

  if (canAdd) {
    try {
      const addError = await error.save();
      res.json(addError);
    } catch (error) {
      res.json({ message: error });
    }
  } else {
    res.json({ message: "Can not add a void error" });
  }
});

//UPDATE ONE ERROR
router.patch("/:errorId", async (req, res) => {
  try {
    const error = await Error.findOneAndUpdate(
      { _id: req.params.errorId },
      {
        $set: req.body,
      }
    );
    const updatedError = await Error.findById(req.params.errorId);
    res.send({ status: "SUCESS", data: updatedError });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
