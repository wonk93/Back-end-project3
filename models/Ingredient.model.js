const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  imageURL: {
    type: String,
    trim: true,
    unique: false,
  },

  ingredients: {
    type: String,
    trim: true,
    required: true,
    unique: false,
    maxLength: 20,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
