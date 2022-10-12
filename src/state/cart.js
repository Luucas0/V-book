import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "ADD_TO_CART",
  (productId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .post(`/api/cart`, {productId})
      .then((res) =>  res.data)
      .catch((error) => console.log(error));
  }
);

export const removeFromCart = createAsyncThunk(
  "REMOVE_FROM_CART",
  (productId, thunkAPI) => {
    const { user } = thunkAPI.getState();
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .delete(`/api/cart/${productId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);



const cartReducer = createReducer([], {
  [addToCart.fulfilled]: (state, action) => {
    state.push(action.payload)
  },
  [removeFromCart.fulfilled]: (state, action) => {
    state = state.filter((book) => {
      return book?.id !== action.payload.id;
    });
  },
});

export default cartReducer;
