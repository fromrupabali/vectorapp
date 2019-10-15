'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("logos", "URL",{
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn("logos", "URL");
  }
};
