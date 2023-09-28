const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});
router.use("/auth", require("./auth.routes"));

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const commentRoutes = require("./comment.routes");
router.use("/comment", commentRoutes);

const cloudinaryRoutes = require("./cloudinary.routes");
router.use("/cloudinary", cloudinaryRoutes);

const recipeRoutes = require("./recipe.routes");
router.use("/recipe", recipeRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
