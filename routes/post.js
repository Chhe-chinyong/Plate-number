const express = require("express");
const router = express.Router();
const app = express();
const validator = require("../validator/validation");
const writeImg = require("../fn/writeImg");
const path = require("path");
const auth = require("../validator/verifyToken");
const generate = require("../fn/generate.js");
const models = require("../model/user");
const jwt = require("jsonwebtoken");

const { Buyer } = models;
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
    price = generate(name);
    console.log(price);
  }
  setTimeout(() => {
    //redirect to other HTML with image
    return res.sendFile(path.join(__dirname, "..", "img-temp/hello.jpg"));
  }, 500);
});

router.post("/buy", auth, (req, res) => {
  const token = req.header("auth-token");
  var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decoded);
  res.send(decoded);
  /* const buyer=new Buyer({
    buyer_name:,
    plate_number:,
    price: ,
    phone:  ,
  })*/
});

module.exports = router;
