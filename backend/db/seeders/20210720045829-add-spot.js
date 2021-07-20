'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Spots', [
        {
          userId: 1,
          cityId: 1,
          address: " 3 Chome-5-1 Okubo, Shinjuku City, Tokyo 169-0072, Japan",
          lat: 35.80590298866809,
          lng: 139.6842019495111,
          name: "Toyama Park",
          description: "The Most Haunted Place in the Heart of Tokyo"
        },

        {
          userId: 2,
          cityId: 2,
          address: "P.za del Duomo, 20122 Milano MI, Italy",
          lat: 45.46409840270799,
          lng: 9.191926916634985,
          name: "Milan Cathedral",
          description: "The seat of the Archbishop of Milan: Mario Delpini"
        },

        {
          userId: 3,
          cityId: 3,
          address: "Budapest, Erzsébet híd, 1013 Hungary",
          lat: 47.49191252440675,
          lng: 19.04897425517805,
          name: "Elisabeth Bridge",
          description: "Elisabeth Bridge is the third newest bridge of Budapest, Hungary, connecting Buda and Pest across the River Danube. The bridge is situated at the narrowest part of the Danube in the Budapest area, spanning only 290 m."
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Spots', null, {});
  }
};
