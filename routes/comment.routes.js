const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;

router.post("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const comment = await Comment.create({ description: req.body.description, author: _id });
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.body.recipeId, {
    $push: { comments: comment._id }
  }, {new: true});
  res.json(updatedRecipe);
});

module.exports = router;
