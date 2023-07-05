const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    toUpperCase: true,
  },
  image: {
    type: String,
    trim: true,
    requiered: true, 
    unique: true, 
  }
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;