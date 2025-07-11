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
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_FAIL,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
  CAMPAIGN_LOGS_REQUEST,
  CAMPAIGN_LOGS_SUCCESS,
  CAMPAIGN_LOGS_FAIL,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_ERROR,
  GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_REQUEST,
  GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_SUCCESS,
  GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_ERROR,
  APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_REQUEST,
  APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_SUCCESS,
  APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_FAIL,
  APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_REQUEST,
  APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_SUCCESS,
  APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_FAIL,
  GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_REQUEST,
  GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_SUCCESS,
  GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_ERROR,
} from "../constants/campaignConstants";

import {
  campaignV2,
  screenV2,
  analyticsV1,
  analyticsURL,
} from "../constants/urlConstants";

export const createCampaignCreationByScreenOwnerAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/createCampaignByScreenOwner`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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
  (input) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/editCampaignByScreenOwner`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/getAllScreensForScreenOwner`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${screenV2}/screenDataUploadCreativeForCms`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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

export const getAllCampaignsDetailsAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_CAMPAIGNS_DATA_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(`${campaignV2}/all`, input, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
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
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_DATA_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/campaignDetails`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
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

export const changeCampaignStatusAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CAMPAIGN_STATUS_CHANGE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/changeCampaignStatus`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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

export const editAllSubCampaignsAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `${campaignV2}/updateCampaignCreationAndItsAllSubCampaigns`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
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

export const getMyCreateCampaignsVendorRequestsList =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/getCampaignRequestListForScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getCampaignCreationDetailsForScreenVendor =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/getCampaignRequestBudgetDetailsForScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_REQUEST_BUDGET_DETAILS_FOR_SCREEN_VENDOR_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
export const getCampaignRequestCreativeDetailsForScreenVendor =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/getCampaignRequestCreativeDetailsForScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_REQUEST_CREATIVE_DETAILS_FOR_SCREEN_VENDOR_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
export const approveCampaignBudgetScreenVendor =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/approveCampaignBudgetScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPROVE_CAMPAIGN_BUDGET_SCREEN_VENDOR_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
export const approveCampaignCreativeScreenVendor =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/approveCampaignCreativeScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPROVE_CAMPAIGN_CREATIVE_SCREEN_VENDOR_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const changeCampaignStatusAfterVendorApproval =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/approveCampaignScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const convertCreativesToRespectiveBitrate =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/convertCreativesToRespectiveBitrate`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({
        type: CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const GetCampaignLogsAction =
  ({ campaignId, date }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CAMPAIGN_LOGS_REQUEST,
      payload: { campaignId, date },
    });
    try {
      const { data } = await axios.get(
        `${analyticsURL}/getCampaignLogsDateWise?campaignId=${campaignId}&date=${date}`
      );
      dispatch({
        type: CAMPAIGN_LOGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAMPAIGN_LOGS_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const convertCreativesToRespectiveBitrateForScreen =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(
        `${analyticsURL}/convertCreativesToRespectiveBitrateForScreen`,
        { id }
      );
      dispatch({
        type: CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
