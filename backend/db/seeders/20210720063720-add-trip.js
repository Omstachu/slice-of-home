'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Trips', [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date(2021, 11, 24),
          endDate: new Date(2021, 11, 31),

        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date(2022, 3, 1),
          endDate: new Date(2022, 3, 8),

        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date(2021, 10, 20),
          endDate: new Date(2021, 10, 21),


        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Trips', null, {});
  }
};
