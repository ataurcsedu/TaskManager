/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calendar', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    day: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'day'
    },
    month: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'month'
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      field: 'year'
    },
    dates: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'dates'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1',
      field: 'status'
    }
  }, {
    tableName: 'calendar'
  });
};
