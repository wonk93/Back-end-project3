const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const uploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
  const { currentUser } = req.session;
  return User.findById(currentUser._id);
});

router.get("/edit", isAuthenticated, (req, res, next) => {
  const { currentUser } = req.session;
  User.findById(currentUser._id).then(user => {
    res.render("profile/edit-profile", user);
  });
});

router.post("/edit", isAuthenticated, uploader.single("image"), (req, res, next) => {
  const { currentUser } = req.session;
  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }
  User.findByIdAndUpdate(currentUser._id, data).then(() => {
    res.redirect("/profile");
  });
});



module.exports = router;