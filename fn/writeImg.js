const Jimp = require("jimp");
var fileName = "./img/index.jpg";
 module.exports=function writeImg(newName) {
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