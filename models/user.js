'use strict';
const EncryptionHelper = require('./../encryption-helper');
function encryptData (user, options) {
  user.privatedata = user.privatedata && user.privatedata !== '' ? EncryptionHelper.encryptText(user.privatedata) : '';
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    privatedata: {
      type: DataTypes.TEXT,
      get () {
        return EncryptionHelper.decryptText(this.getDataValue('privatedata'));
      }
    }
  }, {});

  User.beforeCreate((user, options) => {
    console.log('beforeCreate');
    encryptData(user, options);
  });
  User.beforeUpdate((user, options) => {
    console.log('beforeUpdate');
    if (user.changed('privatedata')) {
      encryptData(user, options);
    }
  });
  return User;
};
