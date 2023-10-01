const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;
const User = require("../models/User.model");
const Ingredient = require("../models/Ingredient.model");

router.post("/", isAuthenticated, async (req, res) => {
  const { _id } = req.payload;
  const newIngredient = await Ingredient.create({ ...req.body, user: _id });

  return res.status(200).json(newIngredient);
});

router.get("/", isAuthenticated, async (req, res) => {
  const ingredient = await Ingredient.find();
  res.json(ingredient);
});

router.get("/getOneBy/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingrediente no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la ingrediente" });
  }
});

router.get("/userIngredients", isAuthenticated, async (req, res) => {
  const { _id } = req.payload;
  const ingredient = await Ingredient.find({ user: _id });
  res.json(ingredient);
});

module.exports = router;
