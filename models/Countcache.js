/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countcache', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    countKey: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'count_key'
    },
    countValue: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      field: 'count_value'
    }
  }, {
    tableName: 'countcache'
  });
};
