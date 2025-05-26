import {
  ADD_CAMPAIGN_MONITORING_DATA_FAIL,
  ADD_CAMPAIGN_MONITORING_DATA_REQUEST,
  ADD_CAMPAIGN_MONITORING_DATA_RESET,
  ADD_CAMPAIGN_MONITORING_DATA_SUCCESS,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_FAIL,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_REQUEST,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_RESET,
  GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_SUCCESS,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_FAIL,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_REQUEST,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_RESET,
  GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_SUCCESS,
  GET_CAMPAIGN_MONITORING_DATA_FAIL,
  GET_CAMPAIGN_MONITORING_DATA_REQUEST,
  GET_CAMPAIGN_MONITORING_DATA_RESET,
  GET_CAMPAIGN_MONITORING_DATA_SUCCESS,
} from "../constants/monitoringConstants";

export function getCampaignMonitoringDataReducer(state = [], action) {
  switch (action.type) {
    case GET_CAMPAIGN_MONITORING_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_MONITORING_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_CAMPAIGN_MONITORING_DATA_FAIL:
      return {
        success: true,
        loading: false,
        error: action.payload,
      };
    case GET_CAMPAIGN_MONITORING_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function addCampaignMonitoringDataReducer(state = [], action) {
  switch (action.type) {
    case ADD_CAMPAIGN_MONITORING_DATA_REQUEST:
      return { loading: true };
    case ADD_CAMPAIGN_MONITORING_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case ADD_CAMPAIGN_MONITORING_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case ADD_CAMPAIGN_MONITORING_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function getActiveCampaignListForMonitoringReducer(state = [], action) {
  switch (action.type) {
    case GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_REQUEST:
      return { loading: true };
    case GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ACTIVE_CAMPAIGN_LIST_FOR_MONITORING_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function getActiveCampaignListScreenWiseForMonitoringReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_REQUEST:
      return { loading: true };
    case GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ACTIVE_CAMPAIGN_LIST_SCREEN_WISE_FOR_MONITORING_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}
