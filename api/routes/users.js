const express = require("express");
const router = express.Router();
const { validateAuth, validateAdmin } = require("../middleware/auth");
const {
  editUser,
  promoteUser,
  demoteUser,
  deleteUser,
  getUsers,
  getAllUsers,
} = require("../controllers/users");

router.put("/editUser", validateAuth, editUser);

router.put("/promote/:id", validateAuth, validateAdmin, promoteUser);

router.put("/demote/:id", validateAuth, validateAdmin, demoteUser);

router.delete("/:id", validateAuth, validateAdmin, deleteUser);

//para traer todos los usuarios
router.get("/getAll", validateAuth, validateAdmin, getUsers);

//para traer todos los usuarios menos el logueado
router.get("/getAllUsers", validateAuth, validateAdmin, getAllUsers);

module.exports = router;
