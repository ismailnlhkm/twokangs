'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {

    static greetings (value) {
      return `Halo ${value}!`
    }
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama harus diisi"
        },
        notEmpty: {
          msg: "Nama harus diisi"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number harus diisi"
        },
        notEmpty: {
          msg: "Phone number harus diisi"
        }
      }
    },
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};