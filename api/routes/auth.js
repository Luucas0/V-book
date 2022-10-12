const express = require("express");
const { User, Favorite } = require("../models");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const AuthController = require("../controllers/auth");

router.post("/login", AuthController.userLogin);

router.get("/login", AuthController.loginWithGitHub);

router.post("/signin", AuthController.userSignUp);

router.post("/logout", AuthController.logOut);

router.get("/me", validateAuth, async (req, res) => {
  const user = await User.findOne({
    where: req.user,
    include: [
      {
        model: Favorite,
      },
    ],
  });
  res.send(user);
});

module.exports = router;
