/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    departmentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'department_id'
    },
    rollNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'roll_number'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'student'
  }
  );
};
