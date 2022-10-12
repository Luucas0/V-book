import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk("GET_REVIEWS", () => {
  return axios
    .get(`/api/reviews/getAll`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
});

export const getReviewsOfBook = createAsyncThunk("GET_REVIEWS_OF_BOOK", (bookId) => {
  return axios
    .get(`/api/reviews/getBooksReviews/${bookId}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
});

const reviewsReducer = createReducer([],{
    [getReviews.fulfilled]: (state, action) => action.payload,
    [getReviewsOfBook.fulfilled]: (state, action) => action.payload,

  }
);

export default reviewsReducer;
