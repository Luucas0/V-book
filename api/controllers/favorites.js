const { Book, User, Favorite } = require("../models");

class favoritesController {
  static addToFavorites = async (req, res) => {
    const user = await User.findOne({
      where: req.user,
      include: [
        {
          model: Favorite,
        },
      ],
    });
    const book = await Book.findOne({ where: { id: req.params.id } });
    let notFavoriteAlready = true;
    user.favorites.forEach((favorite) => {
      if (favorite.bookId === book.id) {
        notFavoriteAlready = false;
      }
    });
    if (notFavoriteAlready) {
      const favorite = await Favorite.findOrCreate({
        where: {
          bookTitle: book.title,
          bookId: book.id,
          bookImage: book.posterURL,
          author: book.author,
          price: book.price,
          description: book.description,
        },
      });
      user.addFavorite(favorite[0]);
      res.send(favorite[0]);
    } else {
      res.send("that book is already in your list");
    }
  };

  static deleteFavorite = async (req, res) => {
    const favorite = await Favorite.findOne({
      where: { bookId: Number(req.params.id) },
    });
    console.log(favorite);
    Favorite.destroy({ where: { id: favorite.id } });
    res.status(204).send("deleted");
  };

  static getAllFavoritesFromUser = async (req,res)=>{
    const favorites = await Favorite.findAll({
      where:{ userId : req.user.id }
    })

    res.send(favorites)

  }


  static getFavoriteByTitle = async (req, res) => {
    const user = await User.findOne({
      where: req.user,
      include: [
        {
          model: Favorite,
        },
      ],
    });
    let filteredFavorites = [];
    user.favorites.forEach((favorite) => {
      if (
        favorite.bookTitle
          .toLowerCase()
          .includes(req.params.title.toLowerCase())
      ) {
        filteredFavorites.push(favorite);
      }
    });
    console.log(req.user);
    res.send(filteredFavorites)
  };
}

module.exports = favoritesController;
