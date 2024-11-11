import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,
  USER_SIGNUP_RESET,
  USER_EMAIL_VERIFICATION_ERROR,
  USER_EMAIL_VERIFICATION_REQUEST,
  USER_EMAIL_VERIFICATION_SUCCESS,
  USER_EMAIL_VERIFICATION_RESET,
  SEND_EMAIL_TO_RESET_PASSWORD_REQUEST,
  SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_TO_RESET_PASSWORD_RESET,
  SEND_EMAIL_TO_RESET_PASSWORD_ERROR,
  SEND_EMAIL_FOR_CONFIRMATION_REQUEST,
  SEND_EMAIL_FOR_CONFIRMATION_SUCCESS,
  SEND_EMAIL_FOR_CONFIRMATION_RESET,
  SEND_EMAIL_FOR_CONFIRMATION_ERROR,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR,
  SEND_EMAIL_FOR_VENDOR_CONFIRMATION_RESET,

} from "../constants/userConstants";

export function userSignupReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
}

export function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
}


export function userUpdatePasswordReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
}

// userEmailVerification

export function userEmailVerificationReducer(state = {}, action) {
  switch (action.type) {
    case USER_EMAIL_VERIFICATION_REQUEST:
      return { loading: true };
    case USER_EMAIL_VERIFICATION_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case USER_EMAIL_VERIFICATION_ERROR:
      return { loading: false, error: action.payload };
    case USER_EMAIL_VERIFICATION_RESET:
      return {};
    default:
      return state;
  }
}

export function userSendEmailToResetPasswordReducer(state = {}, action) {
  switch (action.type) {
    case SEND_EMAIL_TO_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SEND_EMAIL_TO_RESET_PASSWORD_ERROR:
      return { loading: false, error: action.payload };
    case SEND_EMAIL_TO_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
}

export function emailSendForConfirmationReducer(state = {}, action) {
  switch (action.type) {
    case SEND_EMAIL_FOR_CONFIRMATION_REQUEST:
      return { loading: true };
    case SEND_EMAIL_FOR_CONFIRMATION_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SEND_EMAIL_FOR_CONFIRMATION_ERROR:
      return { loading: false, error: action.payload };
    case SEND_EMAIL_FOR_CONFIRMATION_RESET:
      return {};
    default:
      return state;
  }
}

export function emailSendForVendorConfirmationReducer(state = {}, action) {
  switch (action.type) {
    case SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST:
      return { loading: true };
    case SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR:
      return { loading: false, error: action.payload };
    case SEND_EMAIL_FOR_VENDOR_CONFIRMATION_RESET:
      return {};
    default:
      return state;
  }
}