const QRCode = require("qrcode");

const generateQR = async text => {
  try {
    const qr = await QRCode.toString(text, { errorCorrectionLevel: "M" });
    return qr;
  } catch (err) {
    console.error(err);
  }
};

////////////

// generateQR(
//   "http://localhost:3000QR/?_userId=1&buyer_name=yong&plate_number=111111"
// );

module.exports = generateQR;
