const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkHookDefined
} = require('sequelize-test-helpers');
const UserModel = require('../../../models/user');
describe('models/User', () => {
  const Model = UserModel(sequelize, dataTypes);
  const instance = new Model();
  checkModelName(Model)('User');

  describe('properties', () => {
    ['firstName', 'lastName', 'email', 'title', 'privatedata'].forEach(checkPropertyExists(instance));
  });

  describe('hooks', () => {
    [
      'beforeCreate',
      'beforeUpdate'
    ].forEach(checkHookDefined(instance));
  });
});
