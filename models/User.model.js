const mongoose = require("mongoose");
const { Schema, model } = mongoose;



const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: [3, "Name must have at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Image,
      requiered: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
