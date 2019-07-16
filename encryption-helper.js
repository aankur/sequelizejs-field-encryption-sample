'use strict';
var crypto = require('crypto');
const TAG = '__ENC__';
const REGEX_TAG = new RegExp(`^${TAG}`, 'g');
const ENCODING = 'base64';
class EncryptionHelper {
  constructor () {
    this._iv = Buffer.alloc(16);
    this._key = Buffer.alloc(16);
    this._cipherAlgorithm = 'aes-128-cbc';
  }

  encryptText (text) {
    if (text.startsWith(TAG)) {
      return text;
    }
    const cipher = crypto.createCipheriv(this._cipherAlgorithm, this._key, this._iv);
    let result = cipher.update(text, 'utf8', ENCODING);
    result += cipher.final(ENCODING);
    return TAG + result;
  }

  decryptText (text) {
    if (!text.startsWith(TAG)) {
      return text;
    }
    text = text.replace(REGEX_TAG, '');
    const decipher = crypto.createDecipheriv(this._cipherAlgorithm, this._key, this._iv);
    let result = decipher.update(text, ENCODING);
    result += decipher.final();
    return result;
  }
}
const encryptionHelper = new EncryptionHelper();
module.exports = encryptionHelper;
