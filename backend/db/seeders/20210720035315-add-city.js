'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Cities', [
        {
          name: "Tokyo",
          country: "Japan",
          region:"Kanto"
        },
        {
          name: "Milan",
          country: "Italy",
          region: "Lombardy"

        },
        {
          name: "Budapest",
          country: "Hungary",
          region: "Central Hungary"
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Cities', null, {});
  }
};
