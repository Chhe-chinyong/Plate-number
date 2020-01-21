const express = require("express");
const router = express.Router();
const app=express();
const validator=require("../validator/word_validation");
const writeImg=require('../fn/writeImg');

const path='/Users/user/Desktop/yong1/'
app.set('view engine',"ejs");

// home page
router.get("/", (req, res) => {
  res.sendFile(path+'index.html');
 });

 // naming route
router.post("/name", async(req, res) => {
    const newName = {name: req.body.name};
    const name=newName.name;
    const check=validator.wordValidation(newName.name);
    if(check){
      return res.status(400).json({ bad_name: name});
    }
    
   else{
    writeImg(name.toUpperCase());
      
    };
    setTimeout(() => {
     
      return res.sendFile(path+'/img-temp/hello.jpg');
    }, 5000);


  
    
  });

  router.get('/hello',(req,res)=>{
    res.render("hello");
  });
  

  module.exports=router;