const Sequelize = require("sequelize");
const db = require("../db");

class Book extends Sequelize.Model {}
Book.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    posterURL: {
      type: Sequelize.STRING,
      defaultValue: "https://edit.org/photos/img/blog/wdn-editar-portadas-de-libros-gratis.jpg-840.jpg"
      
    },
    releaseDate: {
        type: Sequelize.DATE,
        
    },
    publisher: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.FLOAT,
        defaultValue: 4
    },
    idGenre: {
      type: Sequelize.INTEGER
    }
  },
  { sequelize: db, modelName: "book" }
);


module.exports = Book;