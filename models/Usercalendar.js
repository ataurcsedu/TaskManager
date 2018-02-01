/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usercalendar', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'user_id'
    },
    calId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'calendar',
        key: 'id'
      },
      field: 'cal_id'
    },
    dates: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'dates'
    },
    times: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'times'
    },
    checkIn: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'check_in'
    },
    checkOut: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'check_out'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1',
      field: 'status'
    }
  }, {
    tableName: 'usercalendar'
  });
};
