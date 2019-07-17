'use strict';
var crypto = require('crypto');
const TAG = '__ENC__';
const REGEX_TAG = new RegExp(`^${TAG}`, 'g');
const ENCODING = 'base64';
const IV_SIZE = 16;
const IV_REGEX = /(^.*)\./gm;
class EncryptionHelper {
  constructor () {
    this._key = Buffer.alloc(16);
    this._cipherAlgorithm = 'aes-128-cbc';
  }

  encryptText (text) {
    if (text.startsWith(TAG)) {
      return text;
    }
    const iv = Buffer.alloc(IV_SIZE);
    crypto.randomFillSync(iv);
    const cipher = crypto.createCipheriv(this._cipherAlgorithm, this._key, iv);
    let result = cipher.update(text, 'utf8', ENCODING);
    result += cipher.final(ENCODING);
    return `${TAG}${iv.toString(ENCODING)}.${result}`;
  }

  decryptText (text) {
    if (!text.startsWith(TAG)) {
      return text;
    }
    text = text.replace(REGEX_TAG, '');
    const match = IV_REGEX.exec(text);
    if (match.length !== 2) {
      return text;
    }
    const iv = Buffer.from(match[1], ENCODING);
    text = text.replace(IV_REGEX, '');
    const decipher = crypto.createDecipheriv(this._cipherAlgorithm, this._key, iv);
    let result = decipher.update(text, ENCODING);
    result += decipher.final();
    return result;
  }
}
const encryptionHelper = new EncryptionHelper();
module.exports = encryptionHelper;
