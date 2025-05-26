import { campaignV2, monitoringV2 } from "../constants/urlConstants";
import axios from "axios";
import {
  ADD_CAMPAIGN_MONITORING_DATA_FAIL,
  ADD_CAMPAIGN_MONITORING_DATA_REQUEST,
  ADD_CAMPAIGN_MONITORING_DATA_SUCCESS,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_FAIL,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_REQUEST,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_SUCCESS,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_FAIL,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_REQUEST,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_SUCCESS,
  GET_CAMPAIGN_MONITORING_DATA_FAIL,
  GET_CAMPAIGN_MONITORING_DATA_REQUEST,
  GET_CAMPAIGN_MONITORING_DATA_SUCCESS,
} from "../constants/monitoringConstants";
import { CAMPAIGN_MONITORING_DATA_ADD_CMS } from "../constants/userConstants";

export const addCampaignMonitoringDataAction =
  ({ campaignId, monitoringData }) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_CAMPAIGN_MONITORING_DATA_REQUEST,
      payload: { campaignId, monitoringData },
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/addCampaignMonitoringData`,
        { campaignId, monitoringData },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
          params: { event: CAMPAIGN_MONITORING_DATA_ADD_CMS },
        }
      );

      dispatch({
        type: ADD_CAMPAIGN_MONITORING_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_CAMPAIGN_MONITORING_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignMonitoringDataAction =
  ({ campaignId }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_MONITORING_DATA_REQUEST,
      payload: campaignId,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${campaignV2}/getCampaignMonitoringData?campaignId=${campaignId}`,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({
        type: GET_CAMPAIGN_MONITORING_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_MONITORING_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignDetailsListForMonitoring =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${monitoringV2}/getCampaignDetailsListForMonitoring`,
        input,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getActiveCampaignListScreenWiseForMonitoring =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(`${monitoringV2}/all`, input, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
