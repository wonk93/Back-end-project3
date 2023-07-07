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

router.put("/", isAuthenticated, (req, res, next) => {
  const { email } = req.payload;
  const { newImage, newNickName } = req.body;
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      const userToUpdate = {
        ...foundUser,
        nickName: newNickName,
        image: newImage,
      };
      const updatedUser = User.findByIdAndUpdate(foundUser._id, userToUpdate, {
        new: true,
      });
      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ message: "User doesn't exist." });
    }
  });
});

module.exports = router;
