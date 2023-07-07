const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  description: {
    type: String,
    maxLength: 300,
    required: true,
    unique: false,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
