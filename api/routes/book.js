const express = require("express");
const router = express.Router();
const { validateAuth, validateAdmin } = require("../middleware/auth");
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
} = require("../controllers/book");

router.post("/", validateAuth, validateAdmin, addBook);

router.put("/:id", validateAuth, validateAdmin, updateBook);

router.delete("/:id", validateAuth, validateAdmin, deleteBook);

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.get("/find/:title", getBookByTitle);

module.exports = router;
