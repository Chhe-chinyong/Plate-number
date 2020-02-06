const Jimp = require("jimp");
const QRcode = require("./QRcode.js");
var fileName = "./img/index.jpg";
const qr = QRcode("asd");
let a;
// qr.then(function(qr) {
//   a = qr;
//   console.log(a);
// });
//////////QR code//////////
qr.then(function(qr) {
  a = qr;
  console.log(a);
});

const writeImg1 = function writeImg(newName) {
  Jimp.read(fileName)
    .then(function(image) {
      loadedImage = image;
      return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    })
    .then(function(font) {
      var textWidth = Jimp.measureText(font, newName);
      var textHight = Jimp.measureTextHeight(font, newName);
      loadedImage
        .print(
          font,
          loadedImage.bitmap.width / 2 - textWidth / 2,
          loadedImage.bitmap.height / 2 - textHight / 2,
          { text: newName },
          textWidth,
          textHight
        )

        .write("./img-temp/hello.jpg");
    })
    .catch(function(err) {
      console.error(err);
    });
};

const writeImg2 = function writeImg(newName, url) {
  Jimp.read(fileName)
    .then(function(image) {
      loadedImage = image;
      return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    })
    .then(function(font) {
      var textWidth = Jimp.measureText(font, newName);
      var textHight = Jimp.measureTextHeight(font, newName);
      loadedImage
        .print(
          font,
          loadedImage.bitmap.width / 2 - textWidth / 2,
          loadedImage.bitmap.height / 2 - textHight / 2,
          { text: newName },
          textWidth,
          textHight
        )

        .write("./img-temp/hello.jpg");
    })
    .catch(function(err) {
      console.error(err);
    });
};

module.exports.writeImg1 = writeImg1;
module.exports.writeImg2 = writeImg2;
