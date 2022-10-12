import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk("BOOKS", () => {

  return axios.get(`/api/book`)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

export const searchBooksByTitle = createAsyncThunk("BOOKS_BY_TITLE", (bookTitle) => {

  return axios.get(`/api/book/find/${bookTitle}`)
  .then((res) => res.data)
  .catch(err=> console.log(err))
});

const booksReducer = createReducer([], {
  [getBooks.fulfilled]: (state, action) => action.payload,
  [searchBooksByTitle.fulfilled]: (state, action) => action.payload,

});

export default booksReducer;