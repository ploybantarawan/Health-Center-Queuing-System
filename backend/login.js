const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "This is the login page. Use POST request to submit the login form."
  );
});

router.post("/submit", (req, res) => {
  const data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    const formData = Buffer.concat(data).toString();
    const parsedFormData = new URLSearchParams(formData);

    const username = parsedFormData.get("username");
    const password = parsedFormData.get("password");

    // Add your authentication logic here
    // For simplicity, we'll just check if the username and password are not empty
    if (username && password) {
      res.send(
        `Login successful. Username: ${username}, Password: ${password}`
      );
    } else {
      res.status(400).send("Invalid login credentials");
    }
  });
});

module.exports = router;
