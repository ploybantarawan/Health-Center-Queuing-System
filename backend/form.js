const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the form page. Use POST request to submit the form.");
});

router.post("/submit", (req, res) => {
  const { name, email } = req.body;
  res.send(`Form submitted with Name: ${name}, Email: ${email}`);
});

module.exports = router;
