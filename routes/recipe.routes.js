const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

router.post("/recipe-create", isAuthenticated, async (req, res) => {
    const { body } = req;
    const { author: authorId } = req.body;
    console.log(body);
    // ToDo: Consultar si se cambia con el profesor.
    // const { currentUser } = req.session;  
    const recipe = await Recipe.create(body);
    await User.findByIdAndUpdate(authorId, { $push: { recipes: recipe._id } });
    res.redirect("/");
  });

  router.get("/recipes/byAuthor", isAuthenticated, async (req, res) => {
    const { currentUser } = req.session; 
    // ToDo: Consultar si se cambia con el profesor.
    // OPCION 1
    // const recipes = await Recipe.find();
    // return recipes.where(author = currentUser._id);
    // OPCION 2
    // return await Recipe.where( author = currentUser._id);
    // OPCION 3
    return await Recipe.find( recipe => recipe.author == currentUser._id);
  });

  router.get("/recipes/byName/:recipeName", isAuthenticated, async (req, res) => {
    return await Recipe.find( recipe => recipe.name == req.params.recipeName);
  });


module.exports = router;