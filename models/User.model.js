const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      minlength: [3, "Name must have at least 3 characters"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
    //image, array de recetas (para crear), array de modelo recetas, 
  },
  {
     
    timestamps: true
  }
);



module.exports = model("User", userSchema);
