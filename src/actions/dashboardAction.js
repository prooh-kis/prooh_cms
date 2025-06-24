import axios from "axios";
import {
  GET_ALL_LOGS_FOR_POPUP_FAIL,
  GET_ALL_LOGS_FOR_POPUP_REQUEST,
  GET_ALL_LOGS_FOR_POPUP_SUCCESS,
  GET_ALL_SITE_MONITORING_DATA_FAIL,
  GET_ALL_SITE_MONITORING_DATA_REQUEST,
  GET_ALL_SITE_MONITORING_DATA_SUCCESS,
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
  GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
  GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_BASED_DATA_ON_LOGS_PAGE_FAIL,
  GET_SITE_BASED_DATA_ON_LOGS_PAGE_REQUEST,
  GET_SITE_BASED_DATA_ON_LOGS_PAGE_SUCCESS,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_MONITORING_PICS_PERCENTAGE_ERROR,
  GET_SITE_MONITORING_PICS_PERCENTAGE_REQUEST,
  GET_SITE_MONITORING_PICS_PERCENTAGE_SUCCESS,
  GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";
import { dashboardURL } from "../constants/urlConstants";

export const getBasicDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getBasicDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getCampaignCreationsDetails =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
      payload: { id },
    });

    try {
      const { data } = await axios.get(
        `${campaignV2}/campaignDetailsByCampaignCreationId?id=${id}`
      );
      dispatch({
        type: GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSlotDeliveryGraphDateWiseForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSlotDeliveryGraphDateWiseForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getAudienceDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getAudienceDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getHardwarePerformanceDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getHardwarePerformanceDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSpotDeliveryDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSpotDeliveryDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getCostDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getCostDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSiteLevelPerformanceForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSiteLevelPerformanceForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSiteLevelPerformanceTabWiseForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSiteLevelPerformanceTabWiseForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSitesDataMapViewForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSitesDataMapViewForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSiteMonitoringPicsPercentage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_MONITORING_PICS_PERCENTAGE_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSiteMonitoringPicsPercentage`,
        input
      );
      dispatch({
        type: GET_SITE_MONITORING_PICS_PERCENTAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_MONITORING_PICS_PERCENTAGE_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getAllSitesMonitoringData =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_SITE_MONITORING_DATA_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getAllSitesMonitoringData`,
        input
      );
      dispatch({
        type: GET_ALL_SITE_MONITORING_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SITE_MONITORING_DATA_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSiteBasedDataOnLogsPageAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_BASED_DATA_ON_LOGS_PAGE_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getSiteBasedDataOnLogsPage`,
        input
      );
      dispatch({
        type: GET_SITE_BASED_DATA_ON_LOGS_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_BASED_DATA_ON_LOGS_PAGE_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getFiltersAndDataForAllLogsPopupAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_LOGS_FOR_POPUP_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${dashboardURL}/getFiltersAndDataForAllLogsPopup`,
        input
      );
      dispatch({
        type: GET_ALL_LOGS_FOR_POPUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_LOGS_FOR_POPUP_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };
