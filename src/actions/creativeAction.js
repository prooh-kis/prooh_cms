import axios from "axios";
import {
  GET_CREATIVES_ERROR,
  GET_CREATIVES_REQUEST,
  GET_CREATIVES_SUCCESS,
  UPLOAD_CREATIVES_ERROR,
  UPLOAD_CREATIVES_REQUEST,
  UPLOAD_CREATIVES_SUCCESS,
} from "../constants/creativeConstants";
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/creatives`;


export const uploadCreativesMediaAction = (requestBody) => async (dispatch, getState) => {
  
  dispatch({
    type: UPLOAD_CREATIVES_REQUEST,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    const { data } = await axios.post(`${backendURL2}/create`, requestBody, {
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

export const getCreativesMediaAction = ({userId}) => async (dispatch, getState) => {
  
  dispatch({
    type: GET_CREATIVES_REQUEST,
    payload: userId,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();
    // console.log(userInfo)
    const { data } = await axios.post(`${backendURL2}/getCreatives`, {userId}, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

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
