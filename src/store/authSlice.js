import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    loginAction(state, { payload }) {
      const tokenPayload = jwtDecode(payload);
      if (tokenPayload) {
        state.token = payload;
        state.payload = tokenPayload;
        state.error = false;
      }
    },
    logout() {
      return {};
    },
    resetError(state) {
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (!payload.login) {
          state.error = true;
        }
      }
    )
  },
});

function jwtDecode(token) {
  try {
    const tokenArr = token.split(".");
    const tokenJsonStr = atob(tokenArr[1]);
    const tokenJson = JSON.parse(tokenJsonStr);
    return tokenJson;
  }
  catch (error) { }
}

export const { loginAction, logout, resetError } = authSlice.actions;