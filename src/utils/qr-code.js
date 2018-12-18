import QRCode from 'qrcode'

export function generateQRCode (url) {
  console.log(url)
  try {
    return QRCode.toDataURL(url)
  } catch (err) {
    console.error(err)
    return null
  }
}
