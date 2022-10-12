const express = require("express");
const router = express.Router();
const { validateAuth, validateAdmin } = require("../middleware/auth");
const { validateReview } = require('../middleware/review')

const {
    getAllReviews,
    getReviewByBookId,
    getReviewByUserId,
    addReview,
    modifyReview,
    removeReview,
} = require("../controllers/reviews")

//rutas para recibir todas las reviews
router.get("/getAll",  validateAuth, getAllReviews);
//ruta para recibir la review de un usuario pasado por parámetro.
router.get("/getUserReviews/:id", validateAuth, validateAdmin, getReviewByUserId);
//ruta para recibir la review de un libro pasado por parámetro.
router.get("/getBooksReviews/:id", validateAuth, getReviewByBookId);

//ruta para que un usuario pueda añadir su reseña de un libro. recibe por parámetro la ID del libro.
router.post("/addReview/:id", validateAuth, validateReview, addReview);

//ruta para que el usuario pueda modificar su reseña. recibe por parámetro la ID del libro.
router.put("/modify/:id",  validateAuth, modifyReview);

//ruta para que el usuario pueda remover su reseña. recibe por parámetro la ID del libro.
router.delete("/removeReview/:id",  validateAuth, removeReview);



module.exports = router;