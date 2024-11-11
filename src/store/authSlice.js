import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  loginTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(state);
      // console.log(action);

      state.userInfo = action.payload.userInfo;
      state.isLoggedIn = true;
      state.loginTime = action.payload.loginTime;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.loginTime = null;
      state.userSignin = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;