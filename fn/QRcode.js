const QRCode = require("qrcode");

const generateQR = async text => {
  try {
    console.log(await QRCode.toString(text, { type: "terminal" }));
  } catch (err) {
    console.error(err);
  }
};

generateQR(
  "http://thawing-anchorage-83767.herokuapp.com/name/QR/?key1=value1&key2=value2&key3=value3"
);

generateQR("HelloWordl");
