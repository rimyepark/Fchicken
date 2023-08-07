'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
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
      this.belongsTo(models.Cards, { //  1:N 관계 설정을 합니다.
        targetKey: 'CardId', 
        foreignKey: 'cardId', 
      });
    }
  }
  Comments.init({
    CommentId: {
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
    cardId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Cards',
        key:'CardId',
      },
    },
    content: {
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
    modelName: 'Comments',
  });
  return Comments;
};