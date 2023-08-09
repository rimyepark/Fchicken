'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Columns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.BoardInfos, { //  1:N 관계 설정을 합니다.
        targetKey: 'BoardInfoId', 
        foreignKey: 'boardInfoId', 
      });
      this.hasOne(models.Cards, { // 1:N 관계 설정을 합니다.
        sourceKey: 'ColumnId', 
        foreignKey: 'columnId', 
      });
    }
  }
  Columns.init({
    ColumnId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    boardInfoId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'BoardInfos',
        key:'BoardInfoId',
      },onDelete: 'CASCADE',
    },
    columnName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    columnIndex: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
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
    modelName: 'Columns',
  });
  return Columns;
};