'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Images', [
        {
          spotId: 1,
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Toyama_Park%2C_Shinjuku.jpg/1280px-Toyama_Park%2C_Shinjuku.jpg"
        },
        {
          spotId: 2,
          url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg"
        },
        {
          spotId: 3,
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/View_from_Citadella_on_Budapest_2005_154.jpg/1200px-View_from_Citadella_on_Budapest_2005_154.jpg"
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Images', null, {});
  }
};
