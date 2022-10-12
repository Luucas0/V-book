const { Op } = require("sequelize");
const { Genre } = require("../models");
const Book = require("../models/Book");

async function addBook(req, res) {
  const book = await Book.create(req.body);
  const genre = await Genre.findByPk(req.body.idGenre);
  genre.addBook(book);
  res.sendStatus(200);
}

function updateBook(req, res) {
  Book.update(req.body, { where: { id: Number(req.params.id) } }).then(() => {
    res.send("updated");
  });
}
function deleteBook(req, res) {
  Book.destroy({ where: { id: Number(req.params.id) } }).then(() => {
    res.send("You have succesfully deleted this book");
  });
}

function getAllBooks(req, res) {
  Book.findAll({
    order: [
      ["id", "DESC"]
    ]
  })
    .then((book) => res.send(book))
    .catch((error) => res.send(error));
}

function getBookById(req, res) {
  const { id } = req.params;
  Book.findByPk(id)
    .then((book) => res.send(book))
    .catch((error) => res.send(error));
}

async function getBookByTitle(req, res) {
  const books = await Book.findAll()
  let filteredBooks = [];
    books.forEach((book) => {
      if (
        book.title
        .toLowerCase()
        .includes(req.params.title.toLowerCase())
      ) {
        filteredBooks.push(book);
      }
    });
    res.send(filteredBooks)
}

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
};
