const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;

router.post("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const comment = await Comment.create({ text: req.body.text, user: _id });
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.body.recipeId, {
    $push: { comments: comment._id }
  }, {new: true});
  res.json(updatedRecipe);
});

router.get("/:recipeId", isAuthenticated, async (req, res)=> {
  const  { recipeId } = req.params;
  const recipe = await Recipe.findById(recipeId).populate("comments");
  const recipeComments = recipe.comments;
  res.json(recipeComments);
});

// router.put("/:recipe")


module.exports = router;
/*Ver si falta por añadir más metodos de delete, put. */