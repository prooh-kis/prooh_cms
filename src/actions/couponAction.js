import axios from "axios";
import {
  CREATE_COUPON_FAIL,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  GET_COUPON_LIST_FAIL,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_SUCCESS,
} from "../constants/couponConstants";
import { COUPON_ADD_CMS } from "../constants/userConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/coupon`;

export const getCouponList = () => async (dispatch, getState) => {
  dispatch({
    type: GET_COUPON_LIST_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.post(`${url}/getAll`);
    dispatch({
      type: GET_COUPON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COUPON_LIST_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};
export const updateCouponAction = (coupon) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_COUPON_REQUEST,
    payload: coupon,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    const { data } = await axios.post(`${url}/edit?id=${coupon?._id}`, coupon, {
      params: { event: COUPON_ADD_CMS },
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: UPDATE_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COUPON_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const createCouponAction = (coupon) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_COUPON_REQUEST,
    payload: coupon,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    const { data } = await axios.post(`${url}/add`, coupon, {
      params: { event: COUPON_ADD_CMS },
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: CREATE_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COUPON_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const deleteCouponAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_COUPON_REQUEST,
    payload: id,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `${url}/delete?id=${id}`,
      {},
      {
        params: { event: COUPON_ADD_CMS },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};
