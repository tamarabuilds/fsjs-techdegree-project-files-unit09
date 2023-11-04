'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, { sequelize });

  Movie.associate = (models) => {
    // TODO Add associations.
    // Tells Sequelize that a movie can be associated with only one person
    Movie.belongsTo(models.Person, { 
      as: 'director',     // alias
      foreignKey: {
        fieldName: 'directorPersonId',
        allowNull: false,
      }
     });
  };

  return Movie;
};
