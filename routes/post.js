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

const { Buyer, User } = models;
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
  console.log(name);
  //find in database plate_number
  const found = await Buyer.findOne({ plate_number: name });
  if (found) return res.status(400).send(name + " Is " + " Not available");

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

router.post("/buy", auth, async (req, res) => {
  const token = req.header("auth-token");
  var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decoded);
  const user = await User.findOne({ _id: decoded._id });
  console.log(user);
  const buyer = new Buyer({
    _userId: user._id,
    buyer_name: user.username,
    plate_number: name,
    price: price,
    phone: user.phone,
    DOB: user.DOB
  });
  try {
    const save_buyer = await buyer.save();
    return res.send(save_buyer);
    throw "error save to database";
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
