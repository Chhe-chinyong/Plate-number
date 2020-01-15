const faker = require("faker");
const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const writeText = "add-text-to-image";
const bodyParser = require("body-parser");
const colors = require('colors');
const cors = require("cors");
const Jimp = require("jimp");
const validator=require("./validator/word");
var fileName = "./img/index.jpg";
var loadedImage;

 function writeImg(newName) {
    Jimp.read(fileName)
    .then(function(image) {
      loadedImage = image;
      return (Jimp.loadFont(Jimp.FONT_SANS_32_BLACK));
    })
    .then(function(font) {
      var textWidth = Jimp.measureText(font, newName);
      var textHight = Jimp.measureTextHeight(font, newName);
      loadedImage
        .print(
          font,
          loadedImage.bitmap.width/2- textWidth/2,
          loadedImage.bitmap.height/2- textHight/2, 
          {text:newName,}, textWidth, textHight)
           
        
        .write("./img-temp/hello.jpg")  })
        .catch(function(err) {
      console.error(err);});
  }

  
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
    return res.status(400).json({ name: name});
  }
  

  writeImg(newName.name)

  
  setTimeout(() => {
    res.sendFile(path.join(__dirname + "/img-temp/hello.jpg"));
  }, 5000);
 
});





//Listen on port 3000
app.listen(3000, () => {
  console.log(chalk.bold.underline.greenBright("http://localhost:3000"));
});
