'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
        {
            deskid: 2,
            userid: 1,
            start: new Date('February 1, 2021 10:00:00'),
            end: new Date('March 1, 2021 10:00:00'),
            cost: 150,
            status: 'confirmed',
            paid: 'yes',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            deskid: 1,
            userid: 1,
            start: new Date('January 1, 2021 10:00:00'),
            end: new Date('January 25, 2021 10:00:00'),
            cost: 130,
            status: 'confirmed',
            paid: 'yes',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {})
  }
};
