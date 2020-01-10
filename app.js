const faker = require('faker');
const express=require('express');
var Filter = require('bad-words'),
    filter = new Filter();
const app=express();
const path=require('path');
const writeText = ('add-text-to-image');
const bodyParser=require('body-parser');
var cors = require('cors')

var Jimp = require("jimp");

var fileName = './index.png';
var imageCaption = 'Hello123';
var loadedImage;

function writeImg() {
    Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font,,60,
            {
             text:imageCaption,
             alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
             alignmentY:Jimp.VERTICAL_ALIGN_MIDDLE
        },50,60
        ).write(fileName);
    })
    .catch(function (err) {
        console.error(err);
    });
}




console.log(filter.clean("Don't be an boob")); 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/index.html'))
});

app.post('/price',(req,res)=>{
   
    res.send( writeImg());
})
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})