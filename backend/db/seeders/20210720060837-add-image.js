'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Images', [
        {
          spotId: 1,
          url: "https://slice-of-home.s3.us-west-1.amazonaws.com/toyama-park-2.jpg"
        },
        {
          spotId: 2,
          url: "https://slice-of-home.s3.us-west-1.amazonaws.com/Duomo-di-Milano.jpg"
        },
        {
          spotId: 3,
          url: "https://slice-of-home.s3.us-west-1.amazonaws.com/Budapest_Elisabeth_bridge_2.jpg"
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Images', null, {});
  }
};
