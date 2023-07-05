const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;

router.post("/recipe/:recipeId/comment", isAuthenticated, async (req, res, next) => {
  const { description, author } = req.body;
  // ToDo: comentar con profesor si obtener id asi o por body
  const { currentUser } = req.session;
  const comment = await Comment.create({ description, author: currentUser._id });
  await Recipe.findByIdAndUpdate(req.params.recipeId, {
    $push: { comments: comment._id }
  });
  res.redirect(`/recipe/${req.params.recipeId}`);
});

module.exports = router;