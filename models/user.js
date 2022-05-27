'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Labourer)
      this.hasOne(models.Profile)

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username harus diisi"
        },
        notEmpty: {
          msg: "Username harus diisi"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password harus diisi"
        },
        notEmpty: {
          msg: "Password harus diisi"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (instance, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

      }
    },
    sequelize,
    modelName: 'User',
    
  });
  return User;
};