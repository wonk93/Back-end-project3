const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

router.post("/", isAuthenticated, async (req, res) => {
  const { _id } = req.payload;
  const newRecipe = await Recipe.create(req.body);
  await User.findByIdAndUpdate(_id, { $push: { recipes: newRecipe._id } });

  return res.status(200).json(newRecipe);
});

router.get("/", isAuthenticated, async (req, res) => {
  const recipe = await Recipe.find();
  res.json(recipe);
});

router.get("/:author", isAuthenticated, async (req, res) => {
  const { author } = req.params;
  const recipe = await Recipe.find();
  const recipeComments = recipe.filter((recipe) => recipe.author === author);
  res.json(recipeComments);
});

router.post("/byName", isAuthenticated, async (req, res) => {
  const { recipeQuery } = req.body;
  const recipes = await Recipe.find({ title: new RegExp(recipeQuery, "i") }) //*Se le pasa a traves de un objeto,  de todos los objetos se le pide que le pase un valor
    .populate("ingredients")
    .populate("comments");
  return res.status(200).json(recipes);
});

router.get("/byAuthor", isAuthenticated, async (req, res) => {
  const { userName } = req.payload;
  const recipes = await Recipe.find()
    .populate("ingredients")
    .populate("comments");
  let result = recipes.filter(
    (r) => r.author.toLowerCase() == userName.toLowerCase()
  );
  return res.status(200).json(result);
});

router.get("/getOneBy/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la receta" });
  }
});

router.put("/editRecipe/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la receta" });
  }
});

router.delete("/deleteRecipe/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json({ message: "Receta eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la receta" });
  }
});

module.exports = router;
