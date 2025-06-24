import {
  GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
  GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
  GET_CAMPAIGN_CREATIONS_DETAILS_RESET,
  GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
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
  GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_RESET,
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

export function campaignCreationsDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CAMPAIGN_CREATIONS_DETAILS_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CAMPAIGN_CREATIONS_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}

export function getBasicDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSlotDeliveryGraphDateWiseForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SLOT_DELIVERY_DATA_DAYWISE_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getAudienceDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getHardwarePerformanceDataForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSpotDeliveryDataForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getCostDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteLevelPerformanceForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteLevelPerformanceTabWiseForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_TAB_WISE_FOR_PLANNER_DASHBOARD_RESET:
      return {};
    default:
      return state;
  }
}

export function getSitesDataMapViewForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteMonitoringPicsPercentageReducer(state = {}, action) {
  switch (action.type) {
    case GET_SITE_MONITORING_PICS_PERCENTAGE_REQUEST:
      return { loading: true };
    case GET_SITE_MONITORING_PICS_PERCENTAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_MONITORING_PICS_PERCENTAGE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getAllSitesMonitoringDataReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SITE_MONITORING_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_SITE_MONITORING_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_SITE_MONITORING_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteBasedDataOnLogsPageReducer(state = {}, action) {
  switch (action.type) {
    case GET_SITE_BASED_DATA_ON_LOGS_PAGE_REQUEST:
      return { loading: true };
    case GET_SITE_BASED_DATA_ON_LOGS_PAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_BASED_DATA_ON_LOGS_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getFiltersAndDataForAllLogsPopupReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_LOGS_FOR_POPUP_REQUEST:
      return { loading: true };
    case GET_ALL_LOGS_FOR_POPUP_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_ALL_LOGS_FOR_POPUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
