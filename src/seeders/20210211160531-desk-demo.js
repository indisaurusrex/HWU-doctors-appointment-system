'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Desks', [
        {
            name: 'desk1',
            location: 'main space',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'desk2',
            location: 'main space',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'desk3',
            location: 'main space',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Desks', null, {});
  }
};
