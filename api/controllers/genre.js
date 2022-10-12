const { Book, Genre } = require("../models");

class genreController {
  static getAllGenres = async (req, res) => {
    res.send(await Genre.findAll({
      order: [
        ["id", "DESC"]
      ],
    }));
  };


  static getGenreById = async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    res.send(genre);
  };


  static addGenre = async (req, res) => {
    //const newgenre = await Genre.create(req.body)
    const [newGenre, created] = await Genre.findOrCreate({ where: req.body });
    created
      ? res.send(newGenre)
      : res.status(300).send("this genre already exists");
    //res.send(newGenre);
  };

  static getProductByGenre = async (req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id)
    const genreBooks = await Book.findAll({
      where: { idGenre: id },
    });
    res.send({genreBooks, genre});
  };

  static getProductByTitle = async (req, res) => {
    const { title } = req.body;
    const titleBook = await Book.findAll({ where: { title: title } });
    res.send(titleBook);
  };

  static editGenre = async (req, res) => {
    try {
      const { id } = req.params;
      let { genreName } = req.body;
      const editedGenre = await Genre.update({ genreName }, { where: { id } });
      res.send(editedGenre);
    } catch (error) {
      res.send(error.message);
    }
  };

  static deleteGenre = async (req, res) => {
    try {
      const books = await Book.findAll({
        where:{idGenre: req.params.id}
      })
      console.log('primero')
      if(books.length) return res.send("Aún hay libros en este género.")
      console.log('segundo')

      const { id } = req.params;
      const deleted = await Genre.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      res.send(error.message);
    }
  };
}


module.exports = genreController;