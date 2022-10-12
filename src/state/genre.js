import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBooksOfGenre = createAsyncThunk("GENRES_OF_BOOK", (bookId) => {
  return axios
    .get(`/api/genres/${bookId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const addGenre = createAsyncThunk("ADD_GENRE", (objGenre) => {
  return axios
    .post(`/api/genres`, objGenre)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const editGenre = createAsyncThunk("EDIT_GENRE", (obj) => {

  const genreId = obj.genreId;
  const objGenre = {genreName: obj.genreName}
  return axios
    .put(`/api/genres/${genreId}`, objGenre)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const deleteGenre = createAsyncThunk("DELETE_GENRE", (genreId) => {
  return axios
    .delete(`/api/genres/${genreId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const genreReducer = createReducer(
  {},
  {
    [getBooksOfGenre.fulfilled]: (state, action) => action.payload,
    [addGenre.fulfilled]: (state, action) => action.payload,
    [editGenre.fulfilled]: (state, action) => action.payload,
    [deleteGenre.fulfilled]: (state, action) => action.payload,
  }
);

export default genreReducer;
