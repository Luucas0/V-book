import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const deleteUser = createAsyncThunk("DELETE_USER", (userId) => {
  return axios
    .delete(`/api/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const promoteUser = createAsyncThunk("PROMOTE_USER", (userId) => {
  return axios
    .put(`/api/user/promote/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const demoteUser = createAsyncThunk("DEMOTE_USER", (userId) => {
  return axios
    .put(`/api/user/demote/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const userAdminActionsReducer = createReducer('', {
    [deleteUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userAdminActionsReducer;