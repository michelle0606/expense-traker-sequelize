'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Records',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'User',
          key: 'id'
        }
      },
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'userId', {})
  }
}
