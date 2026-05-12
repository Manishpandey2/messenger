const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const name = "manish";
  const address = "sankhuwasabha";
  res.render("about", { data: name, address: address });
});

app.listen(3000, () => {
  console.log("project has started at port 3000");
});
