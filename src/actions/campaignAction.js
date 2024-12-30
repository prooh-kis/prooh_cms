import axios from "axios";
import {
  CAMPAIGN_STATUS_CHANGE_FAIL,
  CAMPAIGN_STATUS_CHANGE_REQUEST,
  CAMPAIGN_STATUS_CHANGE_SUCCESS,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
  EDIT_ALL_SUB_CAMPAIGNS_FAIL,
  EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
  EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
  GET_ALL_CAMPAIGNS_DATA_FAIL,
  GET_ALL_CAMPAIGNS_DATA_REQUEST,
  GET_ALL_CAMPAIGNS_DATA_SUCCESS,
  GET_CAMPAIGN_DATA_FAIL,
  GET_CAMPAIGN_DATA_REQUEST,
  GET_CAMPAIGN_DATA_SUCCESS,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS,
  GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL,
  GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST,
  GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS,
  GET_FULL_CAMPAIGN_DATA_FAIL,
  GET_FULL_CAMPAIGN_DATA_REQUEST,
  GET_FULL_CAMPAIGN_DATA_SUCCESS,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS,
} from "../constants/campaignConstants";

import { campaignV2, screenV2, analyticsV1 } from "../constants/urlConsent";

export const createCampaignCreationByScreenOwnerAction =
  (input) => async (dispatch) => {
    dispatch({
      type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/createCampaignByScreenOwner`,
        input
      );

      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editCampaignCreationByScreenOwnerAction =
  (input) => async (dispatch) => {
    dispatch({
      type: EDIT_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/editCampaignByScreenOwner`,
        input
      );

      dispatch({
        type: EDIT_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllScreensForScreenOwnerCampaignCreationAction =
  () => async (dispatch, getState) => {
    dispatch({
      type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `${campaignV2}/getAllScreensForScreenOwner`
      );

      dispatch({
        type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getScreenDataUploadCreativeAction =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(
        `${screenV2}/screenDataUploadCreativeForCms`,
        { id }
      );

      dispatch({
        type: GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllCampaignsDetailsAction = (input) => async (dispatch) => {
  dispatch({
    type: GET_ALL_CAMPAIGNS_DATA_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${campaignV2}/all`, input);
    dispatch({
      type: GET_ALL_CAMPAIGNS_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CAMPAIGNS_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCampaignDetailsAction =
  ({ campaignId }) =>
  async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGN_DATA_REQUEST,
      payload: campaignId,
    });
    try {
      const { data } = await axios.post(`${campaignV2}/campaignDetails`, {
        campaignId,
      });
      dispatch({
        type: GET_CAMPAIGN_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getFullCampaignDetailsAction =
  (campaignId) => async (dispatch) => {
    dispatch({
      type: GET_FULL_CAMPAIGN_DATA_REQUEST,
      payload: campaignId,
    });
    try {
      const { data } = await axios.get(
        `${campaignV2}/campaignDetailsByCampaignCreationId?id=${campaignId}`
      );
      dispatch({
        type: GET_FULL_CAMPAIGN_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_FULL_CAMPAIGN_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignCreatedScreensDetailsAction =
  ({ screenIds }) =>
  async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST,
      payload: { screenIds },
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/campaignCreatedScreensDetails`,
        { screenIds }
      );
      dispatch({
        type: GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const changeCampaignStatusAction = (input) => async (dispatch) => {
  dispatch({
    type: CAMPAIGN_STATUS_CHANGE_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(
      `${campaignV2}/changeCampaignStatus`,
      input
    );
    dispatch({
      type: CAMPAIGN_STATUS_CHANGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAMPAIGN_STATUS_CHANGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editAllSubCampaignsAction = (input) => async (dispatch) => {
  dispatch({
    type: EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.put(
      `${campaignV2}/updateCampaignCreationAndItsAllSubCampaigns`,
      input
    );
    dispatch({
      type: EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ALL_SUB_CAMPAIGNS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const campaignLogsByCampaignIdAction =
  (campaignId) => async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST,
      payload: campaignId,
    });
    try {
      const { data } = await axios.get(
        `${analyticsV1}/getAllCampaignLogs?campaignId=${campaignId}`
      );
      dispatch({
        type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
