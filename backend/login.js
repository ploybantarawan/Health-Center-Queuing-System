const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Use body-parser middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

// Handle the login form submission
router.post("/submit", (req, res) => {
  const { username, password } = req.body;

  // Add your authentication logic here
  // For simplicity, we'll just check if the username and password are not empty
  if (username && password) {
    res.send(`Login successful. Username: ${username}, Password: ${password}`);
  } else {
    res.status(400).send("Invalid login credentials");
  }
});

module.exports = router;
