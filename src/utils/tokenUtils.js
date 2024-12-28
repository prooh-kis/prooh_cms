// utils/tokenUtils.ts
import { jwtDecode } from "jwt-decode";
import { getDataFromLocalStorage } from "./localStorageUtils";
import store from "../store";
import { login, logout } from "../store/authSlice";
import { SIGN_IN } from "../../routes/routes";

export const getTokenExpirationTime = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000; // Convert to milliseconds
};

export const isTokenExpired = (token) => {
  console.log("token : ", token);
  if (token === "") return true;
  const expirationTime = getTokenExpirationTime(token);
  console.log("expire time : ", expirationTime, Date.now() > expirationTime);
  return Date.now() > expirationTime;
};

export const setupAutoLogout = () => {
  console.log("setupAutoLogout called!");
  const user = getDataFromLocalStorage("userInfo");
  if (user) {
    const token = user?.token;
    if (token && !isTokenExpired(token)) {
      console.log(
        "user id there , time remail ",
        getTokenExpirationTime(token)
      );
      const expirationTime = getTokenExpirationTime(token);
      const timeUntilExpiration = expirationTime * 1000 - Date.now(); // Time remaining in ms
      // Set a timeout to logout the user before the token expires
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
        localStorage.clear();
        store.dispatch(logout());
        window.location.href = SIGN_IN; // Redirect to login page
      }, timeUntilExpiration - 60000); // Logout 1 minute before expiration
    }
  } else {
    console.log("setupAutoLogout else part");
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      localStorage.clear();
      store.dispatch(logout());
      window.location.href = SIGN_IN; // Redirect to login page
    }, 0);
  }
};
