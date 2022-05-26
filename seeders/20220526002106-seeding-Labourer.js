'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const labourer = JSON.parse(fs.readFileSync('./data/labour.json'))
    labourer.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Labourers', labourer)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Labourers', null, {});
  }
};
