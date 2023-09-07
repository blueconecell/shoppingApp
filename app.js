const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});