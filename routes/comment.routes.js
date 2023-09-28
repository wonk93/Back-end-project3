const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
// const saltRounds = 10;

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

router.put("/:recipeId", isAuthenticated, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      recipeId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error("Error en la actualización del comentario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.delete("/:recipeId", isAuthenticated, async (req, res) => {
  try {
    const { recipeId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(recipeId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error en la eliminación del comentario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;


