const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    toUpperCase: true,
  },
  image: {
    type: Image,
    trim: true,
    requiered: true, 
    unique: true, 
  },
  instructions: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxLength: 500,
  },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;