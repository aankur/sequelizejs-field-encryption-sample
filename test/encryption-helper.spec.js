'use strict';
const assert = require('chai').assert;
const EncryptionHelper = require('./../encryption-helper');

const TAG = '__ENC__';
const REGEX_TAG = new RegExp(`^${TAG}`, 'g');

describe('encryption-helper', () => {
  describe('encryption', () => {
    const str = '12345678';
    it('should not throw error', () => {
      EncryptionHelper.encryptText(str);
    });

    it('should return a string', () => {
      const result = EncryptionHelper.encryptText(str);
      assert.isString(result);
      assert.isNotEmpty(result);
    });

    it('should not try to encrypt already encrypted data', () => {
      const result1 = EncryptionHelper.encryptText(str);
      const result2 = EncryptionHelper.encryptText(result1);
      assert.strictEqual(result1, result2);
    });

    it('running it with multiple times with same input should produce diffrent result', () => {
      const result1 = EncryptionHelper.encryptText(str);
      const result2 = EncryptionHelper.encryptText(str);
      assert.notEqual(result1, result2);
    });

    it('should start with __ENC__', () => {
      const result = EncryptionHelper.encryptText(str);
      assert.match(result, REGEX_TAG);
    });
  });

  describe('decryption', () => {
    const str = '12345678';
    const encryptedData = EncryptionHelper.encryptText(str);
    it('should not throw error', () => {
      EncryptionHelper.decryptText(encryptedData);
    });

    it('should return a string', () => {
      const result = EncryptionHelper.decryptText(encryptedData);
      assert.isString(result);
      assert.isNotEmpty(result);
    });

    it('should not try to decrypt already decrypted data', () => {
      const result1 = EncryptionHelper.decryptText(encryptedData);
      const result2 = EncryptionHelper.decryptText(result1);
      assert.strictEqual(result1, result2);
    });

    it('should not try to decrypt if "iv" is not present', () => {
      const text = '__ENC__asdasd';
      const result1 = EncryptionHelper.decryptText(text);
      assert.strictEqual(text, result1);
    });

    it('running it with multiple times with same input should produce same result', () => {
      const eResult1 = EncryptionHelper.encryptText(str);
      const dResult1 = EncryptionHelper.decryptText(eResult1);
      assert.strictEqual(str, dResult1);

      const dResult2 = EncryptionHelper.decryptText(encryptedData);
      assert.strictEqual(str, dResult2);
    });
  });
});
