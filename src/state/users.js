import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("USERS", () => {
  return axios
    .get("/api/user/getAllUsers")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const usersReducer = createReducer([],{
    [getUsers.fulfilled]: (state, action) => action.payload,
  }
);

export default usersReducer;
