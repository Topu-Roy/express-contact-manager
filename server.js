const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use("/api/contacts", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("<h1>Home page...!!</h1>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
