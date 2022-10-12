const { Op} = require('sequelize')
const User = require("../models/User");

function editUser(req, res, next) {
  User.update(req.body, { where: { id: req.user.id } }).then(() => {
    res.send("updated");
  });
}
function promoteUser(req, res, next) {
  User.update({ role: "admin" }, { where: { id: Number(req.params.id) } }).then(
    () => {
      res.send("updated");
    }
  );
}
//añadida función para quitarle privilegios de ADMIN a un usuario. Imposibilita quitarse los privilegios a uno mismo.
function demoteUser(req, res, next) {
  if (req.user.id === Number(req.params.id)) {
    res.send("You can't revoke permissions yourself!");
  } else {
    User.update(
      { role: "user" },
      { where: { id: Number(req.params.id) } }
    ).then(() => {
      res.send("updated");
    });
  }
}
function deleteUser(req, res, next) {
  if (req.user.id === Number(req.params.id)) {
    res.send("You can't delete yourself!");
  } else {
    User.destroy({where: { id: Number(req.params.id) }}).then(() => {  //cambie delete por destroy y agregue el where
      res.send("deleted user");
    });
  }
}
function getUsers(req, res, next) {
  User.findAll({
    order: [
      ["id", "DESC"]
    ]
  }).then((usuarios) => {
    res.send(usuarios);
  });
}

function getAllUsers(req, res, next) {
  User.findAll({
  
    where:{
      id: {
        [Op.ne]: req.user.id,
      },
    },
    order: [
      ["id", "DESC"]
    ],
  }).then((users) => {
    res.send(users)
  });
}
module.exports = { editUser, promoteUser, demoteUser, deleteUser, getUsers, getAllUsers };
