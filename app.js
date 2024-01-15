const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.URI;
// console.log(uri);
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const homeRouter = require("./backend/home");
const formRouter = require("./backend/form");
const loginRouter = require("./backend/login");

app.use("/", homeRouter);
app.use("/form", formRouter);
app.use("/login", loginRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
