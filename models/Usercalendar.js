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
    checkinTimes: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'checkin_times'
    },
    checkedStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'checked_status'
    },
    checkoutTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'checkout_time'
    },
    checkoutStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'checkout_status'
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
