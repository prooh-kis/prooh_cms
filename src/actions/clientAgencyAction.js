import axios from "axios";
import {
  ADD_CLIENT_AGENCY_DETAILS_FAIL,
  ADD_CLIENT_AGENCY_DETAILS_REQUEST,
  ADD_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_DETAILS_FAIL,
  GET_CLIENT_AGENCY_DETAILS_REQUEST,
  GET_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
  GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
  GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
} from "../constants/clientAgencyConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/clientAgency`;

export const getAllClientAgencyNames = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.get(`${url}/allClientAgencyName`);
    dispatch({
      type: GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

// { campaignCreationId, couponId } = input
export const getClientAgencyDetails =
  ({ clientAgencyName }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CLIENT_AGENCY_DETAILS_REQUEST,
      payload: { clientAgencyName },
    });
    try {
      const { data } = await axios.get(
        `${url}/getDetails?clientAgencyName=${clientAgencyName}`
      );
      dispatch({
        type: GET_CLIENT_AGENCY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CLIENT_AGENCY_DETAILS_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const addClientAgencyDetails =
  ({ clientAgencyName }) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_CLIENT_AGENCY_DETAILS_REQUEST,
      payload: { clientAgencyName },
    });
    try {
      const { data } = await axios.post(`${url}/add`, { clientAgencyName });
      dispatch({
        type: ADD_CLIENT_AGENCY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_CLIENT_AGENCY_DETAILS_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
