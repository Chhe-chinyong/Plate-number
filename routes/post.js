const express = require("express");
const router = express.Router();
const app = express();
const validator = require("../validator/validation");
const writeImg = require("../fn/writeImg");
const path = require("path");
app.set("view engine", "ejs");

// home page
router.get("/", (req, res) => {
  //console.log(path.join(__dirname, "..", "index.html"));
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// naming route
router.post("/name", async (req, res) => {
  const newName = { name: req.body.name };
  const name = newName.name;
  const check = validator.wordValidation(newName.name);
  if (check.check) {
    return res.status(400).json(check.error);
  } else {
    writeImg(name.toUpperCase());
  }
  setTimeout(() => {
    console.log(path.join(__dirname, "..", "img-temp/hello.jpg"));
    return res.sendFile(path.join(__dirname, "..", "img-temp/hello.jpg"));
  }, 500);
});

router.get("/hello", (req, res) => {
  res.render("hello");
});

module.exports = router;
