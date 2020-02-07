const Jimp = require("jimp");
const QRcode = require("./QRcode.js");
var fileName = "./img/index.png";
//import mergeImg from "merge-img";
const mergeImg = require("merge-img");
var fs = require("fs");
const mergeImages = require("merge-images");
var images = require("images");

//let a = fs.readFile("/Users/user/Desktop/Plate-number/public/img/qr.png");

// qr.then(function(qr) {
//   a = qr;
//   console.log(a);
// });
// const a = fs.readFile(
//   "/Users/user/Desktop/Plate-number/public/img/qr.png",
//   (err, data) => {
//     console.log(data);
//   }
// );
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

const writeImg2 = function writeImg(newName, url) {
  //////////QR code//////////

  // console.log(url);
  // const qr = QRcode(url);
  // qr.then(function(qr) {
  //   a = qr;
  images(fileName) //Load image from file
    //加载图像文件
    .size(1000) //Geometric scaling the image to 400 pixels width
    //等比缩放图像到400像素宽
    .draw(
      images("/Users/user/Desktop/Plate-number/public/img/qr.png"),
      700,
      100
    ) //Drawn logo at coordinates (10,10)
    //在(10,10)处绘制Logo
    .save("/Users/user/Desktop/Plate-number/img-temp/hello.png", {
      //Save the image to a file, with the quality of 50
      quality: 1000 //保存图片到文件,图片质量为50
    });
  //Read 1
  Jimp.read("/Users/user/Desktop/Plate-number/img-temp/hello.png")
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
        .write("/Users/user/Desktop/Plate-number/img-temp/hello.png");
    });
};

/* mergeImages([
        {
          src: "/Users/user/Desktop/Plate-number/img-temp/hello.png",
          x: 0,
          y: 80,
          opacity: 0.7,
          direction: true
        },
        {
          src: "/Users/user/Desktop/Plate-number/public/img/qr copy.png",
          x: 0,
          y: 30,
          opacity: 0.7,
          direction: true
        }
      ]).then(img => {
        // Save image as file
        console.log(img);
        img.write("/Users/user/Desktop/Plate-number/img-temp/hello.png", () =>
          console.log("done")
        );
      });*/

//Again
/*
    Jimp.read("/Users/user/Desktop/Plate-number/img-temp/hello.jpg").then(
      function(image) {
        console.log(image);
        image
          .composite(
            "/Users/user/Desktop/Plate-number/public/img/qr.png",
            100,
            0
          )
          .write("./img-temp/hello.jpg");
      
    );
  });
};*/

/*Jimp.read(fileName)
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
;*/

/*
 images("/Users/user/Desktop/Plate-number/img-temp/hello.png") //Load image from file
    //加载图像文件
    .size(1000) //Geometric scaling the image to 400 pixels width
    //等比缩放图像到400像素宽
    .draw(
      images("/Users/user/Desktop/Plate-number/public/img/qr.png"),
      700,
      100
    ) //Drawn logo at coordinates (10,10)
    //在(10,10)处绘制Logo
    .save(
      "/Users/user/Desktop/Plate-number/img-temp/hello.png",
      {
        //Save the image to a file, with the quality of 50
        quality: 1000 //保存图片到文件,图片质量为50
      },
      () => {
        console.log("Sucess");
      }
    );
*/
module.exports.writeImg1 = writeImg1;
module.exports.writeImg2 = writeImg2;
