/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('macAddress', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    mac: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
      field: 'mac'
    }
  }, {
    tableName: 'mac_address'
  });
};
