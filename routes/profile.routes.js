const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const uploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
  const { email } = req.payload;
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      return res.status(400).json({ message: "User doesn't exist." });
    }
  });
});
//Crear una ruta get donde se le pase el Id del usuario

router.put("/edit-profile", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { imageURL } = req.body;
  const updatedUser = await User.findByIdAndUpdate(_id, {imageURL}, {
    new: true,
  });
  res.json(updatedUser)
});

module.exports = router;
