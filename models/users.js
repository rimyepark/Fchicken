'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.BoardInfo, { // 1:N 관계 설정을 합니다.
        sourceKey: 'UserId', 
        foreignKey: 'userId', 
      });
      this.hasMany(models.Cards, { // 1:N 관계 설정을 합니다.
        sourceKey: 'UserId', 
        foreignKey: 'userId', 
      });
      this.hasMany(models.Comments, { // 1:N 관계 설정을 합니다.
        sourceKey: 'UserId', 
        foreignKey: 'userId', 
      });
    }
  }
  Users.init({
    UserId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};