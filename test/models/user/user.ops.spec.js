const assert = require('chai').assert;
const sinon = require('sinon');
const UserModel = require('../../../models').User;
const EncryptionHelper = require('./../../../encryption-helper');

describe('models/User/Ops', () => {
  beforeEach(() => {
    sinon.spy(EncryptionHelper, 'encryptText');
    UserModel.destroy({
      truncate: true
    });
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should save the data', async () => {
    const user = await UserModel.create({ firstName: 'John Doe', privatedata: 'this is supposed to be encrypted 1' });
    assert.strictEqual(user.privatedata, 'this is supposed to be encrypted 1');
    sinon.assert.calledOnce(EncryptionHelper.encryptText);
    sinon.assert.calledWith(EncryptionHelper.encryptText, 'this is supposed to be encrypted 1');
  });

  it('should update the data', async () => {
    let user = await UserModel.create({ firstName: 'John Doe', privatedata: 'this is supposed to be encrypted 2' });
    sinon.assert.calledOnce(EncryptionHelper.encryptText);
    user.privatedata = null;
    user = await user.save();
    assert.strictEqual(user.privatedata, null);
    sinon.assert.calledOnce(EncryptionHelper.encryptText);
    user.privatedata = 'new encrypted data';
    user = await user.save();
    assert.strictEqual(user.privatedata, 'new encrypted data');
    user = await user.save();
    sinon.assert.calledTwice(EncryptionHelper.encryptText);
    sinon.assert.calledWith(EncryptionHelper.encryptText, 'new encrypted data');
    assert.strictEqual(user.privatedata, 'new encrypted data');
  });
});
