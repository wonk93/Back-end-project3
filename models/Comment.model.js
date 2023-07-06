const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  description: {
    type: String,
    maxLength: 300,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
