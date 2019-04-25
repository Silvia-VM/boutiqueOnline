const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/boutiqueOnline", {
  useNewUrlParser: true
});

const routesDepartment = require("./route/routedepartment");
const routesCategory = require("./route/routecategory");
const routesProduct = require("./route/routeproduct");
const routesReview = require("./route/routereview");

app.use(routesDepartment);
app.use(routesCategory);
app.use(routesProduct);
app.use(routesReview);

app.listen(3000, () => {
  console.log("Server started");
});
