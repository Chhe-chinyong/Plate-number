const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const writeText = "add-text-to-image";
const bodyParser = require("body-parser");
const cors = require("cors");
const QRCode = require('qrcode');

const PORT = process.env.port || 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',require('./routes/post'));


app.listen(PORT,()=>{
  console.log(chalk.bold.underline.greenBright("http://localhost:3000"));
})
