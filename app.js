require("dotenv").config();
require("./db");


const express = require("express");
const app = express();
require("./config")(app);
const capitalize = require("./utils/capitalize");
const projectName = "backend-mealdb";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.use('/api', require('./routes'))

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/comment", commentRoutes);

const cloudinaryRoutes = require("./routes/cloudinary.routes");
app.use("/cloudinary", cloudinaryRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/recipe", recipeRoutes);

require("./error-handling")(app);


// const indexRoutes = require("./routes");
// app.use("/", indexRoutes);




module.exports = app;
