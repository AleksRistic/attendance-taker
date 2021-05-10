export function _arrayBufferToBase64(buffer) {
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  const STRING_CHAR = bytes.reduce((data, byte) => {
    return data + String.fromCharCode(byte)
  }, '')
  return btoa(STRING_CHAR)
}
