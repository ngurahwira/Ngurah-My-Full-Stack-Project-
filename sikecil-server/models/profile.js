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
    static associate(models) {
      Profile.hasMany(models.Bid, { foreignKey: "ProfileId" });
    }
  }
  Profile.init(
    {
      fullname: DataTypes.STRING,
      address: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
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
