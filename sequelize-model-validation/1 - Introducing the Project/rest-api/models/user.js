'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: 'Please provide a name'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // will ensure that each entry is unique in the db
      unique: {
        msg: 'The email you entered already exists'
      },
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        },
      },
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A birthday is required'
        },
        isDate: {
          msg: 'Please provide a valid date'
        },
      },
    },
    password: {
      // set a virtual field that only Sequalize populates but doesn't get inserted as a column in the DB table,
      // This way we don't store an un-hashed password in the database
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide a password'
        },
        len: {
          // when you set a validator to an object, you can pass arguments to it via an args property
          // here, we're saying the length must be between 8 and 20 characters
          args: [8, 20],
          msg: 'The password should be between 8 and 20 characters in length'
        },
      },
    },
    confirmedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      // Defining a custom setter for the model with set() 
      // set() receives the value, val, to set confirmedPassword
      set(val) {
        // if values are the same...
        if ( val === this.password ) {
          // hash the confirmed password with bcrypt.hashSync()
          const hashedPassword = bcrypt.hashSync(val, 10);
          // setDataValue() is a Sequelize method used inside setters to update the underlying data value
          this.setDataValue('confirmedPassword', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        }
      }
    }
  }, { sequelize });

  return User;
};