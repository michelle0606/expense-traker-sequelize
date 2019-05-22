'use strict'
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    'Record',
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      date: DataTypes.DATE,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  )
  Record.associate = function(models) {
    Record.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Record
}
