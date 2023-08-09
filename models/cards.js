"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Columns, {
        targetKey: "ColumnId",
        foreignKey: "columnId",
      });
      this.hasMany(models.Comments, {
        sourceKey: "CardId",
        foreignKey: "cardId",
      });
      this.hasMany(models.CardInfos, {
        sourceKey: "CardId",
        foreignKey: "cardId",
      });
      this.belongsTo(models.Users, {
        targetKey: "UserId",
        foreignKey: "userId",
      });
    }
  }
  Cards.init(
    {
      CardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      columnId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Columns",
          key: "ColumnId",
        },
        onDelete: "CASCADE",
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "UserId",
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cardIndex: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cardColor: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
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
      modelName: "Cards",
    }
  );
  return Cards;
};
