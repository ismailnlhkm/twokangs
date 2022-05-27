'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
     return queryInterface.addColumn('Labourers', 'skill',Sequelize.STRING, {});
  },

  down (queryInterface, Sequelize) {
     return queryInterface.removeColumn('Labourers', 'skill', {});
  }
};
