import {
  ADD_CAMPAIGN_MONITORING_DATA_FAIL,
  ADD_CAMPAIGN_MONITORING_DATA_REQUEST,
  ADD_CAMPAIGN_MONITORING_DATA_RESET,
  ADD_CAMPAIGN_MONITORING_DATA_SUCCESS,
  CAMPAIGN_MONITORING_PICS_FAIL,
  CAMPAIGN_MONITORING_PICS_REQUEST,
  CAMPAIGN_MONITORING_PICS_SUCCESS,
  GENERATE_MONITORING_PPT_FAIL,
  GENERATE_MONITORING_PPT_REQUEST,
  GENERATE_MONITORING_PPT_RESET,
  GENERATE_MONITORING_PPT_SUCCESS,
  GET_MONITORING_PPT_JOB_STATUS_FAIL,
  GET_MONITORING_PPT_JOB_STATUS_REQUEST,
  GET_MONITORING_PPT_JOB_STATUS_RESET,
  GET_MONITORING_PPT_JOB_STATUS_SUCCESS,
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

export function generateMonitoringPptReducer(state = [], action) {
  switch (action.type) {
    case GENERATE_MONITORING_PPT_REQUEST:
      return { loading: true };
    case GENERATE_MONITORING_PPT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GENERATE_MONITORING_PPT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GENERATE_MONITORING_PPT_RESET:
      return {};
    default:
      return state;
  }
}

export function getMonitoringPptJobStatusReducer(state = [], action) {
  switch (action.type) {
    case GET_MONITORING_PPT_JOB_STATUS_REQUEST:
      return { loading: true };
    case GET_MONITORING_PPT_JOB_STATUS_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_MONITORING_PPT_JOB_STATUS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_MONITORING_PPT_JOB_STATUS_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignMonitoringPicsGetReducer(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_MONITORING_PICS_REQUEST:
      return { loading: true };
    case CAMPAIGN_MONITORING_PICS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CAMPAIGN_MONITORING_PICS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}
