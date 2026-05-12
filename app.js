const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello message");
});

app.listen(3000, () => {
  console.log("project has started at port 3000");
});
