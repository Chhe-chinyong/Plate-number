const QRCode = require('qrcode');



const generateQR = async text => {
    try {
      console.log(await QRCode.toString(text, {type: 'terminal'}))
    } catch (err) {
      console.error(err)
    }
  }
  generateQR("HelloWordl")