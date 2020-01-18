const faker = require("faker");
const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const writeText = "add-text-to-image";
const bodyParser = require("body-parser");
const colors = require('colors');
const cors = require("cors");
const writeImg=require('./fn/writeImg');
const QRCode = require('qrcode');
const validator=require("./validator/word_validation");
const port = 3000;


QRCode.toDataURL('I am a pony!', function (err, url) {
  console.log(url)
});


  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

  // naming route
app.post("/name", async(req, res) => {
  const newName = {name: req.body.name};
  const name=newName.name;
  const check=validator.validation(newName.name);
  console.log(check);
  if(check){
    //`${name} is bad word`;
    return res.status(400).json({ bad_name: name});
  }
  
 else{
  writeImg(name.toUpperCase());
 }
  
  setTimeout(() => {
    res.sendFile(path.join(__dirname + "/img-temp/hello.jpg"));
  }, 5000);
 
});


//Listen on port 3000
app.listen(port, () => {
  console.log(chalk.bold.underline.greenBright("http://localhost:"+port));
})