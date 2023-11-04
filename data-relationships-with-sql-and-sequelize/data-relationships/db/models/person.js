'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, { sequelize });

  Person.associate = (models) => {
    // TODO Add associations.
    // Person can be associated with one or more movies
    Person.hasMany(models.Movie, {
      as: 'director',   // alias
      foreignKey: {
        fieldName: 'directorPersonId',
        allowNull: false,
      },
    });
  };

  return Person;
};
