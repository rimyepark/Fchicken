'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      CardId: {
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
      columnId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Columns',
          key:'ColumnId',
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cardState: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cardColor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
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
    await queryInterface.dropTable('Cards');
  }
};