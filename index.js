const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/drugstore");

const Drug = mongoose.model("Drug", {
  name: String,
  quantity: Number
});

app.listen(3005, () => {
  console.log("Server started");
});
