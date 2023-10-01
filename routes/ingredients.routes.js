const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;
const User = require("../models/User.model");
const Ingredient = require("../models/Ingredient.model");

router.post("/", isAuthenticated ,async (req, res) => {
  const { _id } = req.payload;
  const newIngredient = await Ingredient.create({...req.body, user:_id});
 
  return res.status(200).json(newIngredient);
});

router.get("/", isAuthenticated, async (req, res)=> {
  const ingredient = await Ingredient.find();
  res.json(ingredient);
});


router.get("/userIngredients", isAuthenticated, async (req, res)=> {
    const { _id } = req.payload;
    const ingredient = await Ingredient.find({user:_id});
    res.json(ingredient);
  });

module.exports = router;