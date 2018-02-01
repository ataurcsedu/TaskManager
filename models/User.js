/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  
  var User =  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'userName',
      validate: {
        len: {
            args: 3,
            msg: "User Name must be atleast 3 characters in length"
        },
        isAlphanumeric: {
          msg: "Only Alphanumeric is allowed for user name."
        }
      }
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'password',
      validate: {
        len: {
            args: 5,
            msg: "Password must be atleast 5 characters in length"
        }
      }
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'firstName'
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'lastName'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        isEmail: {
          msg: "Email address must be valid."
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'phone',
      validate: {
        len: {
            args: 11,
            msg: "Mobile number must be 11 characters in length"
        },
        // will only allow digit
        is: ["^[0-9]+$",'i']
      }
    },
    designation: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'designation'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 1,
      field: 'status'
    }
  }, {
    tableName: 'user'
  });

  return User;
};
