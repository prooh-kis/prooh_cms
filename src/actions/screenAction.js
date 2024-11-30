import axios from "axios";
import {
  EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS,
  GET_ALL_SCREENS_DATA_FAIL,
  GET_ALL_SCREENS_DATA_REQUEST,
  GET_ALL_SCREENS_DATA_SUCCESS,
  GET_SCREEN_CAMPAIGNS_DATA_FAIL,
  GET_SCREEN_CAMPAIGNS_DATA_REQUEST,
  GET_SCREEN_CAMPAIGNS_DATA_SUCCESS,
  GET_SCREEN_DATA_FAIL,
  GET_SCREEN_DATA_REQUEST,
  GET_SCREEN_DATA_SUCCESS,
  SCREEN_CAMPAIGN_MONITORING_FAIL,
  SCREEN_CAMPAIGN_MONITORING_SUCCESS,
  SCREEN_CAMPAIGN_MONITORING_REQUEST,
  SET_CAMPAIGNS_LOOP_FOR_SCREEN_FAIL,
  SET_CAMPAIGNS_LOOP_FOR_SCREEN_REQUEST,
  SET_CAMPAIGNS_LOOP_FOR_SCREEN_SUCCESS,
  SCREEN_REFRESH_REQUEST,
  SCREEN_REFRESH_SUCCESS,
  SCREEN_REFRESH_FAIL,
  UPDATE_SCREENS_DATA_IN_REDIS_REQUEST,
  UPDATE_SCREENS_DATA_IN_REDIS_SUCCESS,
  UPDATE_SCREENS_DATA_IN_REDIS_FAIL,
  SCREEN_CODE_CHANGE_REQUEST,
  SCREEN_CODE_CHANGE_SUCCESS,
  SCREEN_CODE_CHANGE_FAIL,
  GET_SCREEN_LOGS_REQUEST,
  GET_SCREEN_LOGS_SUCCESS,
  GET_SCREEN_LOGS_FAIL,
  CHANGE_DEFAULT_SCREEN_MEDIA_REQUEST,
  CHANGE_DEFAULT_SCREEN_MEDIA_SUCCESS,
  CHANGE_DEFAULT_SCREEN_MEDIA_FAIL,
  GET_SCREEN_CAMPAIGN_MONITORING_REQUEST,
  GET_SCREEN_CAMPAIGN_MONITORING_SUCCESS,
  GET_SCREEN_CAMPAIGN_MONITORING_FAIL,
} from "../constants/screenConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;
const url2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;
const url3 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;

export const getAllScreensDetailsAction =
  ({ userId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_ALL_SCREENS_DATA_REQUEST,
      payload: userId,
    });
    try {
      const { data } = await axios.post(`${url}/all`, { userId });
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
  };

export const getScreenDetailsAction =
  ({ screenId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_SCREEN_DATA_REQUEST,
      payload: screenId,
    });
    try {
      const { data } = await axios.post(`${url}/screenDetails`, { screenId });
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
  };

export const getScreenCampaignsDetailsAction =
  ({ screenId, status }) =>
  async (dispatch) => {
    dispatch({
      type: GET_SCREEN_CAMPAIGNS_DATA_REQUEST,
      payload: { screenId, status },
    });
    try {
      const { data } = await axios.post(`${url}/screenCampaignsDetails`, {
        screenId,
        status,
      });
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
  };

export const setCampaignsLoopForScreenAction = (input) => async (dispatch) => {
  dispatch({
    type: SET_CAMPAIGNS_LOOP_FOR_SCREEN_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url2}/changeLoopIndex`, input);
    dispatch({
      type: SET_CAMPAIGNS_LOOP_FOR_SCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_CAMPAIGNS_LOOP_FOR_SCREEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCampaignCreativesEndDateAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(`${url2}/changeDateAndCreative`, input);
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// add
export const screenCampaignsMonitoringAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: SCREEN_CAMPAIGN_MONITORING_REQUEST,
      payload: input,
    });
    try {
      console.log("screenCampaignsMonitoringAction : ", input);
      const { data } = await axios.post(
        `${url2}/addCampaignMonitoringData`,
        input
      );
      dispatch({
        type: SCREEN_CAMPAIGN_MONITORING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SCREEN_CAMPAIGN_MONITORING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// get screenCampaignsMonitoringAction
export const getScreenCampaignsMonitoringAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_CAMPAIGN_MONITORING_REQUEST,
      payload: input,
    });
    try {
      console.log("getScreenCampaignsMonitoringAction : ", input);
      const { data } = await axios.get(
        `${url2}/getCampaignMonitoringData?screenId=${input?.screenId}&campaignId=${input?.campaignId}&date=${input?.date}`
      );
      dispatch({
        type: GET_SCREEN_CAMPAIGN_MONITORING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_CAMPAIGN_MONITORING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const screenCodeChangeAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_CODE_CHANGE_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/changeScreenCode`, input);
    dispatch({
      type: SCREEN_CODE_CHANGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCREEN_CODE_CHANGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const screenRefreshAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: SCREEN_REFRESH_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/restartScreen`, input);
    dispatch({
      type: SCREEN_REFRESH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCREEN_REFRESH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const screenDataUpdateRedisAction =
  ({ ids }) =>
  async (dispatch, getState) => {
    dispatch({
      type: UPDATE_SCREENS_DATA_IN_REDIS_REQUEST,
      payload: { ids },
    });
    try {
      const { data } = await axios.post(`${url}/updateRedisData`, { ids });
      dispatch({
        type: UPDATE_SCREENS_DATA_IN_REDIS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SCREENS_DATA_IN_REDIS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getScreenLogsAction =
  ({ screenId, start, limit }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_LOGS_REQUEST,
      payload: { screenId, start, limit },
    });
    try {
      const { data } = await axios.get(
        `${url3}/getScreenlogs?screenId=${screenId}&start=${start}&limit=${limit}?`
      );
      dispatch({
        type: GET_SCREEN_LOGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_LOGS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const changeDefaultScreenMedia =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CHANGE_DEFAULT_SCREEN_MEDIA_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(`${url2}/addDefaultCampaign`, input);
      dispatch({
        type: CHANGE_DEFAULT_SCREEN_MEDIA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_DEFAULT_SCREEN_MEDIA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
