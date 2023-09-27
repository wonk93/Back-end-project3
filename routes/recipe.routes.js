const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

router.post("/", isAuthenticated, async (req, res) => {
  console.log(req)
  const { _id } = req.payload;
  const newRecipe = await Recipe.create(req.body);
  await User.findByIdAndUpdate(_id, { $push: { recipes: newRecipe._id } });


  return res.status(200).json(newRecipe);
});

router.get("/byName/:recipeName", isAuthenticated, async (req, res) => {
  const recipes = await Recipe.find()
    .populate("ingredients")
    .populate("comments");
  let result = recipes.filter(
    (r) => r.title.toLowerCase() == req.params.recipeName.toLowerCase()
  );
  return res.status(200).json(result);
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

module.exports = router;

// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ message: 'Receta no encontrada' });
//     }
//     res.json(recipe);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al obtener la receta' });
//   }
// });

// module.exports = router;
