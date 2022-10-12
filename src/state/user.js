import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("USER", () => {
  return axios
    .get("/api/auth/me")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const postUser = createAsyncThunk("NEW_USER", (userObj, thunkAPI) => {
  return axios
    .post("/api/auth/signin", userObj) //no hace falta poner http://localhost:3001 ,probablemnte necesitabas poner esto porq habias intentado hacer npm start cuando ya estaba el serv corriendo en otro lado y se monto en el 3001, pero el proxy es el q se encarga de agregar para hacer el pedido al endpoint correcto
    .then((res) => res.data);
});

export const postLoginUser = createAsyncThunk(
  "LOGIN_USER",
  (userObj, thunkAPI) => {
    return axios
      .post("/api/auth/login", userObj, { withCredentials: true }) //para que se monte correctamente la cookie tuve que agregar el withCredentials: true
      .then((res) => res.data)
      .catch((err) => err.response.data);
  }
);

export const postLogoutUser = createAsyncThunk("LOGOUT_USER", () => {
  return axios
    .post("/api/auth/logout", {})
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
});

const userReducer = createReducer({}, {
    [getUser.fulfilled]: (state, action) => action.payload,
    [postUser.fulfilled]: (state, action) => action.payload,
    [postLoginUser.fulfilled]: (state, action) => action.payload,
    [postLogoutUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
