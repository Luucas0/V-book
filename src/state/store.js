import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user";
import usersReducer from "./users";
import userAdminActionsReducer from "./userAdminActions";
import bookReducer from "./book";
import booksReducer from "./books";
import favoritesReducer from "./favorites";
import cartReducer from "./cart";
import boughtItemsReducer from "./boughtItems";
import genresReducer from "./genres";
import genreReducer from "./genre";
import orderReducer from "./order";
import ordersReducer from "./orders";
import reviewReducer from "./review";
import reviewsReducer from "./reviews";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    users: usersReducer,
    userAdminActions: userAdminActionsReducer,
    book: bookReducer,
    books: booksReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    order:orderReducer,
    orders: ordersReducer,
    boughtItems: boughtItemsReducer,
    genre: genreReducer,
    genres: genresReducer,
    review: reviewReducer,
    reviews: reviewsReducer,
  },
});

export default store;