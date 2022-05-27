'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labourer extends Model {

    rate() {
      if (this.age < 22) {
        return 150000
      } else if (this.age >= 22 && this.age <= 29 ) {
        return 175000
      } else if (this.age > 30) {
        return 200000
      }
    }

    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Labourer.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    skill: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Labourer',
  });
  return Labourer;
};