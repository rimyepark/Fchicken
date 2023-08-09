'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Columns', {
      ColumnId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      boardInfoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'BoardInfos',
          key:'BoardInfoId',
        },
        onDelete: 'CASCADE',
      },
      columnName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      columnIndex: {
        allowNull: false,
        unique: true ,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Columns');
  }
};