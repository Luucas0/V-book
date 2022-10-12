import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getOrder = createAsyncThunk("GET_ORDER", () => {
  return axios
    .get(`/api/order`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
});
export const continueOrder = createAsyncThunk("CONTINUE_ORDER", () => {
  return axios
    .put(`/api/order`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
});

export const payOrder = createAsyncThunk(
  "PAY_ORDER",
  ({ direction, paymentMethod }) => {
    return axios
      .put(`/api/order/pay`, { direction, paymentMethod })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

export const modifyOrder = createAsyncThunk(
  "MODIFY_ORDER",
  ({ state, orderId }) => {
    return axios
      .put(`/api/order/admin/${state}/${orderId}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

export const deleteOrder = createAsyncThunk("DELETE_ORDER", (orderId) => {
  return axios
    .delete(`/api/order/${orderId}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
});

const orderReducer = createReducer(
  {},
  {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [continueOrder.fulfilled]: (state, action) => action.payload,
    [payOrder.fulfilled]: (state, action) => action.payload,
    [modifyOrder.fulfilled]: (state, action) => action.payload,
    [deleteOrder.fulfilled]: (state, action) => action.payload,
  }
);

export default orderReducer;
