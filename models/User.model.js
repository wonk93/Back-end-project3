const mongoose = require("mongoose");
const { Schema, model } = mongoose;



const userSchema = new Schema(
  {
    userName: {
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
      unique: false,
    },
    nickName: {
      type: String,
      required: false,
      unique: false,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    biography: {
      type: String,
      default: '',
      maxlength: 250
    },
    birthday: {
      type: Date
    },
    image: {
      type: String,
      requiered: false,
      unique: false,
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
