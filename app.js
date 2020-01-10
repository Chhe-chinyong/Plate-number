const faker = require("faker");
const express = require("express");
const chalk = require("chalk");
var Filter = require("bad-words"),
  filter = new Filter();
const app = express();
const path = require("path");
const writeText = "add-text-to-image";
const bodyParser = require("body-parser");
var cors = require("cors");

var Jimp = require("jimp");
var fileName = "./img/index.png";
var loadedImage;

function writeImg(newName) {
  Jimp.read(fileName)
    .then(function(image) {
      loadedImage = image;
      return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    })
    .then(function(font) {
      loadedImage
        .print(
          font,
          100,
          50,
          {
            text: newName,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },
          50,
          60
        )
        .write("./img-temp/hello.png" );
    })
    .catch(function(err) {
      console.error(err);
    });
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/name", (req, res) => {
  const newName = {name: req.body.name};
  console.log(newName.name)
  writeImg(newName.name);

  setTimeout(() => {
    res.sendFile(path.join(__dirname + "/img/index.png"));
  }, 5000);
});
app.listen(3000, () => {
  console.log(chalk.bold.underline.greenBright("http://localhost:3000"));
});
