const express = require("express");
const router = express.Router();
const app = express();
const validator = require("../validator/validation");
const writeImg = require("../fn/writeImg");
const path = require("path");
const auth = require("../validator/verifyToken");
const buy = require("../fn/generate.js");
app.set("view engine", "ejs");
let name;
let price;
// home page
router.get("/", (req, res) => {
  //console.log(path.join(__dirname, "..", "index.html"));
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// naming route
router.post("/name", async (req, res) => {
  const newName = { name: req.body.name };
  name = newName.name;
  const check = validator.wordValidation(newName.name);
  if (check.check) {
    return res.status(400).json(check.error);
  } else {
    writeImg(name.toUpperCase());
    price = buy(name);
    console.log(price);
  }
  setTimeout(() => {
    //redirect to other HTML with image
    return res.sendFile(path.join(__dirname, "..", "img-temp/hello.jpg"));
  }, 500);
});

router.post("/buy", auth, (req, res) => {});

module.exports = router;
