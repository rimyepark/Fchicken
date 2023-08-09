"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CardInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        // Users 모델에게 N:1 관계 설정을 합니다.
        sourceKey: "UserId",
        foreignKey: "userId",
      });

      this.belongsTo(models.Cards, {
        // Boards 모델에게 N:1 관계 설정을 합니다.
        sourceKey: "CardId",
        foreignKey: "cardId",
      });
    }
  }
  CardInfos.init(
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "UserId",
        },
      },
      cardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Cards",
          key: "CardId",
        },onDelete: 'CASCADE',
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
      },
    },
    {
      sequelize,
      modelName: "CardInfos",
    }
  );
  return CardInfos;
};
