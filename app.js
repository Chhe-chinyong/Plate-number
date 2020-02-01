const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const writeText = "add-text-to-image";
const bodyParser = require("body-parser");
const cors = require("cors");
const QRCode = require("qrcode");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var url = require("url");

///////////initialize////////////////
dotenv.config();
const PORT = process.env.PORT || process.env.IP || 3000;
app.use(express.json());
//////////Connect to database /////////////
try {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log(chalk.black.bgGreen("Connected to DB"));
    }
  );
} catch (err) {
  console.log(chalk.black.bgRed("CANOT CONNECT TO DATABASE"));
}
////////////Middleware///////////////
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/post"));
app.use("/", require("./routes/auth"));

////////////Listening///////////////
app.listen(PORT, (req, res) => {
  console.log(chalk.bold.underline.greenBright(`http://localhost:${PORT}`));

  // req.fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
});
// var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
//console.log(chalk.bold.underline.greenBright(fullUrl));
