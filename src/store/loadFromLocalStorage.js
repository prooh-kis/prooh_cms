import store from "../store";
import { login, logout } from "./authSlice";

const loadUserFromLocalStorage = () => {
  const userDetails = localStorage.getItem('user');
  if (userDetails) {
    const parsedUserInfo = JSON.parse(userDetails);
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - parsedUserInfo.loginTime;

    if (timeElapsed < 720 * 60 * 1000) { // 720 minutes in milliseconds
      store.dispatch(login(parsedUserInfo));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      localStorage.clear();
      store.dispatch(logout());
    }
  }
};

export default loadUserFromLocalStorage;