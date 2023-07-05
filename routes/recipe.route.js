const router = require("express").Router();
const jwt = require("jsonwebtoken");

const C = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");
const saltRounds = 10;

router.get("/recipe", (req, res, next) => {
    // if jwt is verified
    
    });

    router.post("/recipe", (req, res, next) => {
        // if jwt is verified
        
        });
            
module.exports = router;