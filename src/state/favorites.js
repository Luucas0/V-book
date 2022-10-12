import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const addFavorite = createAsyncThunk(
  "ADD_FAVORITE",
  (bookId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .post(`/api/favorites/${bookId}`)
      .then((res) => {
        return res.data})
      .catch((error) => console.log(error));
  }
);

export const removeFavorite = createAsyncThunk(
  "REMOVE_FAVORITE",
  (bookId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .delete(`/api/favorites/${bookId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);



export const getAllFavoritesFromUser = createAsyncThunk(
  "GET_FAVORITES_FROM_USER",
  () => {
    return axios
      .get(`/api/favorites/`)
      .then((res) => {
        return res.data})
      .catch((error) => console.log(error));
  }
);


export const searchFavoritesByTitle = createAsyncThunk("FAVORITES_BY_TITLE", (bookTitle) => {

  return axios.get(`/api/favorites/find/${bookTitle}`)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});


const favoritesReducer = createReducer([], {
  [addFavorite.fulfilled]: (state, action) => {
    if(typeof action.payload !== "string")  state.push(action.payload);
  },
  [removeFavorite.fulfilled]: (state, action) => {
    state = state.filter((book) => {
      return book.bookId !== action.payload.id;
    });
  },
  [getAllFavoritesFromUser.fulfilled]: (state, action) => action.payload,
  [searchFavoritesByTitle.fulfilled]: (state, action) => action.payload,

});

export default favoritesReducer;
