import {
  CREATE_COUPON_FAIL,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_RESET,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_RESET,
  DELETE_COUPON_SUCCESS,
  GET_COUPON_LIST_FAIL,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_RESET,
  GET_COUPON_LIST_SUCCESS,
  TOGGLE_COUPON_STATUS_FAIL,
  TOGGLE_COUPON_STATUS_REQUEST,
  TOGGLE_COUPON_STATUS_RESET,
  TOGGLE_COUPON_STATUS_SUCCESS,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_RESET,
  UPDATE_COUPON_SUCCESS,
} from "../constants/couponConstants";

export function getCouponListReducer(state = [], action) {
  switch (action.type) {
    case GET_COUPON_LIST_REQUEST:
      return { loading: true };
    case GET_COUPON_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_COUPON_LIST_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_COUPON_LIST_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function createCouponReducer(state = [], action) {
  switch (action.type) {
    case CREATE_COUPON_REQUEST:
      return { loading: true };
    case CREATE_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case CREATE_COUPON_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_COUPON_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function updateCouponReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_COUPON_REQUEST:
      return { loading: true };
    case UPDATE_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case UPDATE_COUPON_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_COUPON_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function deleteCouponReducer(state = [], action) {
  switch (action.type) {
    case DELETE_COUPON_REQUEST:
      return { loading: true };
    case DELETE_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case DELETE_COUPON_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_COUPON_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function toggleStatusCouponReducer(state = [], action) {
  switch (action.type) {
    case TOGGLE_COUPON_STATUS_REQUEST:
      return { loading: true };
    case TOGGLE_COUPON_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case TOGGLE_COUPON_STATUS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case TOGGLE_COUPON_STATUS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}
