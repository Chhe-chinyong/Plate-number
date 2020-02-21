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
const { writeImg1, writeImg2 } = writeImg;
app.set("view engine", "ejs");
let name;
let price;
// home page
// router.get("/", (req, res) => {
//   //console.log(path.join(__dirname, "..", "index.html"));
//   res.sendFile(path.join(__dirname, "..", "index.html"));
// });

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
    writeImg.writeImg1(name.toUpperCase());
    price = generate(name);
    console.log(price);
  }
  setTimeout(() => {
    //redirect to other HTML with image
    return res.sendFile(path.join(__dirname, "..", "img-temp/hello.jpg"));
  }, 500);
});

router.post("/buy", auth, async (req, res) => {
  //testing only

  const token = req.header("auth-token");
  var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decoded);
  const user = await User.findOne({ _id: decoded._id });
  console.log(user);
  const check = await Buyer.findOne({ buyer_name: user.username });
  if (check)
    return res.send(
      `U have already bought one ${check.plate_number.toUpperCase()}`
    );
  //QRcode URL
  const qrURL = `http://localhost:3000/QR/?_userId=${user._id}&buyer_name=${user.username}&plate_number=${name}&phone=${user.phone}&DOB=${user.DOB}`;
  const userID = user._id;
  writeImg.writeImg2(name.toUpperCase(), qrURL, userID);
  const buyer = new Buyer({
    _userId: user._id,
    buyer_name: user.username,
    plate_number: name,
    price: price,
    phone: user.phone,
    DOB: user.DOB,
    img_path: `http://localhost:3000/public/img-temp/${userID}`
  });
  try {
    const save_buyer = await buyer.save();
    if (!save_buyer) throw "error save to database";
    return res.send(save_buyer);
  } catch (error) {
    res.send(error);
  }
});

router.get("/QR", (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  //res.send("hello");
  console.log(fullUrl);
  console.log(req.query);
  res.send(req.query);
});

module.exports = router;
