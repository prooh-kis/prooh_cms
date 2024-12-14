import Axios from "axios";
// import { logoutAfterTimeOut } from "../utils/utilityFunctions";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_EMAIL_VERIFICATION_ERROR,
  USER_EMAIL_VERIFICATION_SUCCESS,
  USER_EMAIL_VERIFICATION_REQUEST,
  SEND_EMAIL_TO_RESET_PASSWORD_REQUEST,
  SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_TO_RESET_PASSWORD_ERROR,
  SEND_EMAIL_FOR_CONFIRMATION_REQUEST,
  SEND_EMAIL_FOR_CONFIRMATION_SUCCESS,
  SEND_EMAIL_FOR_CONFIRMATION_ERROR,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR,
} from "../constants/userConstants";
import store from "../store";
import { login, logout } from "../store/authSlice";
import { removeDispatchData } from "../utils/dispatchUtils";
import { removeAllKeyFromLocalStorage } from "../utils/localStorageUtils";

import { userV1 } from "../constants/urlConsent";

export const signup = (reqBody) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: reqBody,
  });
  try {
    const { data } = await Axios.post(`${userV1}/signup`, reqBody);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

    const loginTime = new Date().getTime();
    const loginData = {
      userInfo: data,
      loginTime,
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    store.dispatch(login(loginData));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUser = (reqBody) => async (dispatch, getState) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: reqBody,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();

    const { data } = await Axios.post(`${userV1}/create`, reqBody, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post(`${userV1}/signin`, {
      email,
      password,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data));

    const loginTime = new Date().getTime();
    const loginData = {
      userInfo: data,
      loginTime,
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    store.dispatch(login(loginData));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("carts");
  removeDispatchData(dispatch);
  localStorage.removeItem("user");
  store.dispatch(logout());
  removeAllKeyFromLocalStorage();
  dispatch({
    type: USER_SIGNOUT,
  });
};

export const userEmailVerification = (token) => async (dispatch) => {
  dispatch({
    type: USER_EMAIL_VERIFICATION_REQUEST,
    payload: { token },
  });
  try {
    const { data } = await Axios.get(`${userV1}/verify/email?token=${token}`);
    dispatch({
      type: USER_EMAIL_VERIFICATION_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data));

    const loginTime = new Date().getTime();
    const loginData = {
      userInfo: data,
      loginTime,
    };
    localStorage.setItem("user", JSON.stringify(loginData));
    store.dispatch(login(loginData));
  } catch (error) {
    dispatch({
      type: USER_EMAIL_VERIFICATION_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendEmailToResetPassword = (email) => async (dispatch) => {
  dispatch({
    type: SEND_EMAIL_TO_RESET_PASSWORD_REQUEST,
    payload: { email },
  });
  try {
    const { data } = await Axios.get(`${userV1}/sendEmail?email=${email}`);
    dispatch({
      type: SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_EMAIL_TO_RESET_PASSWORD_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserPassword =
  (email, password) => async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await Axios.put(`${userV1}/updatePassword`, {
        email,
        password,
      });
      dispatch({
        type: USER_UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_UPDATE_PASSWORD_FAIL,
        payload: message,
      });
    }
  };

export const googleSignupSignin =
  ({ name, email, avatar }) =>
  async (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { name, email, avatar },
    });
    try {
      const { data } = await Axios.post(`${userV1}/googleSignupSignin`, {
        name,
        email,
        avatar,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));

      const loginTime = new Date().getTime();
      const loginData = {
        userInfo: data,
        loginTime,
      };
      localStorage.setItem("user", JSON.stringify(loginData));
      store.dispatch(login(loginData));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sendEmailForConfirmation =
  (formData) => async (dispatch, getState) => {
    dispatch({
      type: SEND_EMAIL_FOR_CONFIRMATION_REQUEST,
      // payload: ,
    });
    try {
      const { data } = await Axios.post(
        `${userV1}/sendEmailForConfirmation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: SEND_EMAIL_FOR_CONFIRMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEND_EMAIL_FOR_CONFIRMATION_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sendEmailForVendorConfirmation =
  (emailData) => async (dispatch, getState) => {
    dispatch({
      type: SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST,
      // payload: ,
    });
    try {
      const { data } = await Axios.post(
        `${userV1}/sendEmailForVendorConfirmation`,
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
