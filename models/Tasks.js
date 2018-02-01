/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Tasks =  sequelize.define('tasks', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    taskTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'taskTitle'
    },
    taskDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'taskDescription'
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'createdBy'
    },
    assigneeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'assigneeId'
    },
    assignedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'assignedBy'
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'progress'
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'creationDate'
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updatedDate'
    },
    versionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'versionId'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1',
      field: 'status'
    }
  }, {
    tableName: 'tasks'
  });

  return Tasks;
};
