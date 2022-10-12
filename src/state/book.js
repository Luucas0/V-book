import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBook = createAsyncThunk("BOOK", (bookId) => {
  return axios
    .get(`/api/book/${bookId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const postBook = createAsyncThunk("CREATE_BOOK", (objBook) => {
  return axios
    .post(`/api/book`, objBook)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const deleteBook = createAsyncThunk("DELETE_BOOK", (bookId) => {
  return axios
    .delete(`/api/book/${bookId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const editBook = createAsyncThunk("EDIT_BOOK", (objBook) => {
  console.log(objBook);
  const bookId = objBook.bookId;
  const payload = {
    author: objBook.author,
    description: objBook.description,
    idGenre: objBook.idGenre,
    posterURL: objBook.posterURL,
    price: objBook.price,
    publisher: objBook.publisher,
    rating: objBook.rating,
    releaseDate: objBook.releaseDate,
    title: objBook.title,
  };

  return axios
    .put(`/api/book/${bookId}`, payload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const bookReducer = createReducer(
  {},
  {
    [getBook.fulfilled]: (state, action) => action.payload,
    [postBook.fulfilled]: (state, action) => action.payload,
    [deleteBook.fulfilled]: (state, action) => action.payload,
    [editBook.fulfilled]: (state, action) => action.payload,
  }
);

export default bookReducer;
