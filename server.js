const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const port = process.env.PORT || 5000;
const app = express();

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Home page...!!</h1>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
