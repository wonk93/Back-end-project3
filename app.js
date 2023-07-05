require("dotenv").config();
require("./db");
//require("./config")(app);
//require("./error-handling")(app);

const express = require("express");
const app = express();
const capitalize = require("./utils/capitalize");
const projectName = "backend-mealdb";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.use('/api', require('./routes'))

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const profileRoutes = require("./routes/comment.routes");
app.use("/comment", profileRoutes);

const profileRoutes = require("./routes/recipe.routes");
app.use("/recipe", profileRoutes);

const indexRoutes = require("./routes");
app.use("/", indexRoutes);




module.exports = app;
