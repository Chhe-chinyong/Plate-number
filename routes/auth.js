const express = require("express");
const router = express.Router();
const models = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User, Token } = models;
const {
  registerValidation,
  loginValidation
} = require("../validator/validation");

//set up negotiation
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//Register
router.post("/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(422).json({ error1: error.details[0].message });
  }

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).send("Your email is exist");
  }

  const phoneExist = await User.findOne({ phone: req.body.phone });

  if (phoneExist) {
    return res.status(400).json({ error: "Your phoneNumber is exist" });
  }

  // Make sure the user has been verified
  // if (!User.isVerified)
  // return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

  const salt = await bcrypt.genSalt(12);
  const hash_pass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    phone: req.body.phone,
    password: hash_pass,
    email: req.body.email,
    address: req.body.address,
    DOB: req.body.DOB,
    username: req.body.username
  });
  try {
    //save to database
    const saveuser = await user.save();
    res.send(saveuser);
  } catch (err) {
    res.status(400).send(err);
  }

  const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d"
  });
  var token_save = new Token({
    _userId: user._id,
    tokenUser: token
  }).save();

  //Email verification
  var link =
    req.protocol + "://" + req.get("host") + "/confirmation?id=" + token;
  console.log(link);
  mailOptions = {
    to: req.body.email,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("Email Sent");
    }
  });
});

//Login

router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check email
  const check = await User.findOne({ email: req.body.email });
  if (!check)
    return res.status(400).send("The Username you’ve entered is incorrect.");

  //check password
  const match = await bcrypt.compare(req.body.password, check.password);
  if (!match)
    return res.status(400).send("The password you’ve entered is incorrect");

  //check email verification
  const email_verify = check.isVerified;
  if (email_verify == false)
    return res.status(400).send("pls verify your email");
  const token = jwt.sign({ _id: check._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token); // auth-token is name whatever u want
});

// comfirmation
router.get("/confirmation", async (req, res) => {
  const token = await Token.findOne({ tokenUser: req.query.id });
  if (!token) {
    res.status(404).send("unable to find a valid token");
  }
  console.log(token._userId);
  const user = await User.findOne({ _id: token._userId });
  try {
    user.isVerified = true;
    user.save();
  } catch (er) {
    res.send(er);
  }
  console.log(user.confirmed);
});

module.exports = router;
