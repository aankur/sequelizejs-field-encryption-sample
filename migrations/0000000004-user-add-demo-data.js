'use strict';
const data = [{
  firstName: 'John2',
  lastName: 'Doe2',
  createdAt: new Date(),
  updatedAt: new Date()
}];
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', data, {});
  }
};
