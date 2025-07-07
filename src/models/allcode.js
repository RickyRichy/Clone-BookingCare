'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  allCode.init({
    typeCode: DataTypes.STRING,
    keyRole: DataTypes.STRING,
    valueEN: DataTypes.STRING,
    valueVI: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allCode',
  });
  return allCode;
};