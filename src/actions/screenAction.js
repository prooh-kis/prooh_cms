import axios from "axios";
import { GET_ALL_SCREENS_DATA_FAIL, GET_ALL_SCREENS_DATA_REQUEST, GET_ALL_SCREENS_DATA_SUCCESS, GET_SCREEN_CAMPAIGNS_DATA_FAIL, GET_SCREEN_CAMPAIGNS_DATA_REQUEST, GET_SCREEN_CAMPAIGNS_DATA_SUCCESS, GET_SCREEN_DATA_FAIL, GET_SCREEN_DATA_REQUEST, GET_SCREEN_DATA_SUCCESS } from "../constants/screenConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;

export const getAllScreensDetailsAction = ({userId}) => async (dispatch) => {
  
  dispatch({
    type: GET_ALL_SCREENS_DATA_REQUEST,
    payload: userId,
  });
  try {
    const { data } = await axios.post(`${url}/all`, {userId});
    dispatch({
      type: GET_ALL_SCREENS_DATA_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_ALL_SCREENS_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getScreenDetailsAction = ({screenId}) => async (dispatch) => {
  
  dispatch({
    type: GET_SCREEN_DATA_REQUEST,
    payload: screenId,
  });
  try {
    const { data } = await axios.post(`${url}/screenDetails`, {screenId});
    dispatch({
      type: GET_SCREEN_DATA_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_SCREEN_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getScreenCampaignsDetailsAction = ({screenId, status}) => async (dispatch) => {
  
  dispatch({
    type: GET_SCREEN_CAMPAIGNS_DATA_REQUEST,
    payload: {screenId, status},
  });
  try {
    const { data } = await axios.post(`${url}/screenCampaignsDetails`, {screenId, status});
    dispatch({
      type: GET_SCREEN_CAMPAIGNS_DATA_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_SCREEN_CAMPAIGNS_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}