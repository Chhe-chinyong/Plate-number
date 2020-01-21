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

///////////initialize////////////////
dotenv.config();
const PORT = process.env.port || 3000;
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
app.listen(PORT, () => {
  console.log(chalk.bold.underline.greenBright("http://localhost:3000"));
});
