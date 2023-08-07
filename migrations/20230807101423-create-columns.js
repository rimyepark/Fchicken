'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Columns', {
      Columnid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'UserId',
        },
      },
      boardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Boards',
          key:'BoardId',
        },
      },
      columnName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      columnState: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Columns');
  }
};