const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["reset", "verifi"],
  },
});

module.exports = mongoose.model("Code", codeSchema);
