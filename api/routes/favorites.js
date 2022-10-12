const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const {
  addToFavorites,
  deleteFavorite,
  getFavoriteByTitle,
  getAllFavoritesFromUser,
} = require("../controllers/favorites");

router.get("/", validateAuth, getAllFavoritesFromUser);

router.post("/:id", validateAuth, addToFavorites);

router.delete("/:id", validateAuth, deleteFavorite);

router.get("/find/:title", validateAuth, getFavoriteByTitle);

module.exports = router;
