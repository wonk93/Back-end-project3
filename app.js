require("dotenv").config();
require("./db");
require("./config")(app);
require("./error-handling")(app);

const express = require("express");
const app = express();
const capitalize = require("./utils/capitalize");
const projectName = "backend-mealdb";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.use('/api', require('./routes'))

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);




module.exports = app;
