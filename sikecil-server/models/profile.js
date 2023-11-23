"use strict";
const { Model } = require("sequelize");
const { hashing } = require("../helpers");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Profile.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name must not be empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address must not be empty",
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email must not be empty",
          },
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password must not be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role must not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  Profile.beforeCreate((instance) => {
    let hashingResult = hashing(instance.password);
    instance.password = hashingResult;
  });

  return Profile;
};
