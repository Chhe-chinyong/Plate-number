const express = require("express");
const router = express.Router();
const app = express();
const validator = require("../validator/validation");
const writeImg = require("../fn/writeImg");
const path = "/Users/user/Desktop/Plate-number/";
app.set("view engine", "ejs");

// home page
router.get("/", (req, res) => {
  res.sendFile(path + "index.html");
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
    return res.sendFile("/Users/user/Desktop/Plate-number/img-temp/hello.jpg");
  }, 400);
});

router.get("/hello", (req, res) => {
  res.render("hello");
});

module.exports = router;
