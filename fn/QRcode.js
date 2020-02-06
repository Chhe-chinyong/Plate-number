const QRCode = require("qrcode");
const generateQR = async text => {
  try {
    console.log(await QRCode.toString(text, { type: "terminal" }));
  } catch (err) {
    console.error(err);
  }
};
generateQR("http://localhost:3000/QR/?key1=value1&key2=value2&key3=value3");
