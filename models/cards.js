'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { //  1:N 관계 설정을 합니다.
        targetKey: 'UserId', 
        foreignKey: 'userId', 
      });
      this.belongsTo(models.Columns, { //  1:N 관계 설정을 합니다.
        targetKey: 'ColumnId', 
        foreignKey: 'columnId', 
      });
      this.hasOne(models.Comments, { // 1:N 관계 설정을 합니다.
        sourceKey: 'CardId', 
        foreignKey: 'cardId', 
      });
    }
  }
  Cards.init({
    CardId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'UserId',
      },
    },
    boardId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Boards',
        key:'BoardId',
      },
    },
    columnId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Columns',
        key:'ColumnId',
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cardState: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cardColor: {
      allowNull: false,
      type: DataTypes.STRING
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
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
    modelName: 'Cards',
  });
  return Cards;
};