const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  author: {
    type: String,
    trim: true,
    require: false,
    unique: false,
    toUpperCase: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
    unique: false,
    toUpperCase: true,
  },
  imageURL: {
    type: String,
    trim: true,
    unique: false,
  },
  
  instructions: {
    type: String,
    trim: true,
    required: true,
    unique: false,
    maxLength: 5000,
  },
  ingredients: {
    type: String,
    trim: true,
    required: false,
    unique: false,
    maxLength: 500,
  },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
