'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReferralLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReferralLink.init({
    upLinkId: DataTypes.INTEGER,
    downLinkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReferralLink',
  });
  return ReferralLink;
};