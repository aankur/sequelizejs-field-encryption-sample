const assert = require('chai').assert;
const UserModel = require('../../../models').User;

describe('models/User/Ops', () => {
  it('should save the data', async () => {
    const user = await UserModel.create({ firstName: 'John Doe', privatedata: 'this is supposed to be encrypted' });
    assert.strictEqual(user.privatedata, 'this is supposed to be encrypted');
  });

  it('should update the data', async () => {
    let user = await UserModel.create({ firstName: 'John Doe', privatedata: 'this is supposed to be encrypted' });
    user.privatedata = '';
    user = await user.save();
    assert.strictEqual(user.privatedata, '');
    user.privatedata = 'new encrypted data';
    user = await user.save();
    assert.strictEqual(user.privatedata, 'new encrypted data');
    user = await user.save();
    assert.strictEqual(user.privatedata, 'new encrypted data');
  });
});
