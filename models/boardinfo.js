"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardInfo extends Model {
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

      this.belongsTo(models.Boards, {
        // Boards 모델에게 N:1 관계 설정을 합니다.
        sourceKey: "BoardId",
        foreignKey: "boardId",
      });
    }
  }
  BoardInfo.init(
    {
      BoardInfoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "UserId",
        },
      },
      boardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Boards",
          key: "BoardId",
        },
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
      modelName: "BoardInfo",
    }
  );
  return BoardInfo;
};
