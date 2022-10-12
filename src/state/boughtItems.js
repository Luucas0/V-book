import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBoughtItems = createAsyncThunk(
  "GET_BOUGHT_ITEMS",
  () => {
    return axios
      .get('/api/bought/getAll')
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

const boughtItemsReducer = createReducer([], {
  [getBoughtItems.fulfilled]: (state, action) => action.payload,
});

export default boughtItemsReducer;