const Jimp = require("jimp");
const QRcode = require("./QRcode.js");
var fileName = "./img/index.png";
const mergeImg = require("merge-img");
var fs = require("fs");
const mergeImages = require("merge-images");
var images = require("images");

let a;
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

const writeImg2 = async function writeImg(newName, url, userID) {
  //////////QR code//////////

  console.log(url);
  const qr = await QRcode(url, userID);

  // qr.then(function(qr) {
  //  console.log(qr);
  // }

  images(fileName) //Load image from file
    //加载图像文件
    .size(1000) //Geometric scaling the image to 400 pixels width
    //等比缩放图像到400像素宽
    .draw(
      images(`/Users/user/Desktop/Plate-number/public/img/${userID}.png`),
      700,
      100
    ) //Drawn logo at coordinates (10,10)
    //在(10,10)处绘制Logo
    .save(`/Users/user/Desktop/Plate-number/img-temp/${userID}.png`, {
      //Save the image to a file, with the quality of 50
      quality: 1000 //保存图片到文件,图片质量为50
    });
  //Read 1
  Jimp.read(`/Users/user/Desktop/Plate-number/img-temp/${userID}.png`)
    .then(function(image) {
      loadedImage = image;
      return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    })
    .then(function(font) {
      var textWidth = Jimp.measureText(font, newName);
      var textHight = Jimp.measureTextHeight(font, newName);
      //console.log(a);
      loadedImage
        .print(
          font,
          loadedImage.bitmap.width / 2 - textWidth / 2,
          loadedImage.bitmap.height / 2 - textHight / 2,
          { text: newName },
          textWidth,
          textHight
        )
        .write(`/Users/user/Desktop/Plate-number/img-temp/${userID}.png`);
    });
};

module.exports.writeImg1 = writeImg1;
module.exports.writeImg2 = writeImg2;
