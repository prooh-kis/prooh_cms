import axios from "axios";
import {
  GET_ALL_BRAND_AND_NETWORK_FAIL,
  GET_ALL_BRAND_AND_NETWORK_REQUEST,
  GET_ALL_BRAND_AND_NETWORK_SUCCESS,
  GET_CREATIVES_ERROR,
  GET_CREATIVES_REQUEST,
  GET_CREATIVES_SUCCESS,
  UPLOAD_CREATIVES_ERROR,
  UPLOAD_CREATIVES_REQUEST,
  UPLOAD_CREATIVES_SUCCESS,
} from "../constants/creativeConstants";

import { screenV2, creativeV2 } from "../constants/urlConsent";

export const uploadCreativesMediaAction =
  (requestBody) => async (dispatch, getState) => {
    dispatch({
      type: UPLOAD_CREATIVES_REQUEST,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(`${creativeV2}/create`, requestBody, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({
        type: UPLOAD_CREATIVES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: UPLOAD_CREATIVES_ERROR,
        payload: message,
      });
    }
  };

export const getCreativesMediaAction =
  ({ userId }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CREATIVES_REQUEST,
      payload: userId,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${creativeV2}/getCreatives`,
        { userId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: GET_CREATIVES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_CREATIVES_ERROR,
        payload: message,
      });
    }
  };

export const getAllBrandAndNetworkAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_BRAND_AND_NETWORK_REQUEST,
    payload: "",
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    const { data } = await axios.get(`${screenV2}/packageNetworkList`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: GET_ALL_BRAND_AND_NETWORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_ALL_BRAND_AND_NETWORK_FAIL,
      payload: message,
    });
  }
};
