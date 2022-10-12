const User = require("./User");
const Book = require("./Book");
const Genre = require("./Genre");
const Cart = require("./Cart");
const Order = require("./Order");
const Favorite = require("./Favorite");
const Reviews = require('./Reviews');
const BoughtItems = require('./BoughtItems')
const { getNextKeyDef } = require('@testing-library/user-event/dist/keyboard/getNextKeyDef');

//Una orden pertenece a UN usuario
Order.belongsTo(User);
//Un usuario puede tener muchas ordenes
User.hasMany(Order);

//Un carro pertenece a UNA orden
Cart.belongsTo(Order);
//Una orden puede tener muchos carritos
Order.hasMany(Cart);

//Un genero pertenece a varios libros

Book.belongsTo(Genre)
//Un producto pertenece a una categoría
Genre.hasMany(Book)

//Un usuario tiene muchos favoritos
User.hasMany(Favorite)
//Cada favorito pertenece a UN usuario
Favorite.belongsTo(User)

//UNA review pertenece a UN libro
Reviews.belongsTo(Book);
//Un libro puede tener muchas reviews
Book.hasMany(Reviews);

//UNA review pertenece a UN user
Reviews.belongsTo(User);
//Un user puede tener muchas reviews
User.hasMany(Reviews);

//UN BoughtItems pertenece a UN user
BoughtItems.belongsTo(User)
//UN useer puede tener MUCHOS Bought Items
User.hasMany(BoughtItems)



module.exports = {Book, User, Genre, Cart, Order, Favorite, Reviews, BoughtItems};
