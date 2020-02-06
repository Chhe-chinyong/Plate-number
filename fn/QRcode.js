const QRCode = require("qrcode");

const generateQR = async text => {
  try {
    console.log(await QRCode.toString(text, { type: "terminal" }));
  } catch (err) {
    console.error(err);
  }
};

generateQR(
  "http://thawing-anchorage-83767.herokuapp.com/name/QR/?_userId=1&buyer_name=yong&plate_number=111111"
);

generateQR("HelloWordl");
