require("dotenv").config();
require("./db");


const express = require("express");
const app = express();
require("./config")(app);
const capitalize = require("./utils/capitalize");
const projectName = "backend-mealdb";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.use('/api', require('./routes'))

require("./error-handling")(app);

// const indexRoutes = require("./routes");
// app.use("/", indexRoutes);

/*app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});*/






module.exports = app;
