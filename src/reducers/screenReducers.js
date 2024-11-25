import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
import { EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL, EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST, EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET, EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS, GET_ALL_SCREENS_DATA_FAIL, GET_ALL_SCREENS_DATA_REQUEST, GET_ALL_SCREENS_DATA_SUCCESS, GET_SCREEN_CAMPAIGNS_DATA_FAIL, GET_SCREEN_CAMPAIGNS_DATA_REQUEST, GET_SCREEN_CAMPAIGNS_DATA_SUCCESS, GET_SCREEN_DATA_FAIL, GET_SCREEN_DATA_REQUEST, GET_SCREEN_DATA_SUCCESS, SCREEN_CAMPAIGN_MONITORING_FAIL, SCREEN_CAMPAIGN_MONITORING_RESET, SCREEN_CAMPAIGN_MONITORING_SUCCESS, SCREEN_CAMPAIGN_MONITORING_REQUEST, SET_CAMPAIGNS_LOOP_FOR_SCREEN_FAIL, SET_CAMPAIGNS_LOOP_FOR_SCREEN_REQUEST, SET_CAMPAIGNS_LOOP_FOR_SCREEN_RESET, SET_CAMPAIGNS_LOOP_FOR_SCREEN_SUCCESS, SCREEN_REFRESH_REQUEST, SCREEN_REFRESH_SUCCESS, SCREEN_REFRESH_FAIL, UPDATE_SCREENS_DATA_IN_REDIS_REQUEST, UPDATE_SCREENS_DATA_IN_REDIS_SUCCESS, UPDATE_SCREENS_DATA_IN_REDIS_FAIL, SCREEN_CODE_CHANGE_REQUEST, SCREEN_CODE_CHANGE_SUCCESS, SCREEN_CODE_CHANGE_FAIL, SCREEN_CODE_CHANGE_RESET, GET_SCREEN_LOGS_REQUEST, GET_SCREEN_LOGS_SUCCESS, GET_SCREEN_LOGS_FAIL } from "../constants/screenConstants";
import { ALL_SCREENS_LIST } from "../constants/localStorageConstants";


export function allScreensDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SCREENS_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_SCREENS_DATA_SUCCESS:
      const d = {
        time: new Date(),
        list: action.payload
      }
      saveDataOnLocalStorage(ALL_SCREENS_LIST, d);
      return {...state, loading: false, success: true, data: action.payload };
    case GET_ALL_SCREENS_DATA_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


export function screenDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_SUCCESS:
      return {...state, loading: false, success: true, data: action.payload };
    case GET_SCREEN_DATA_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenCampaignsDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_CAMPAIGNS_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_CAMPAIGNS_DATA_SUCCESS:
      return {...state, loading: false, success: true, data: action.payload };
    case GET_SCREEN_CAMPAIGNS_DATA_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


export function setCampaignsLoopForScreenReducer(state = {}, action) {
  switch (action.type) {
    case SET_CAMPAIGNS_LOOP_FOR_SCREEN_REQUEST:
      return { loading: true };
    case SET_CAMPAIGNS_LOOP_FOR_SCREEN_SUCCESS:
      return {...state, loading: false, success: true, data: action.payload };
    case SET_CAMPAIGNS_LOOP_FOR_SCREEN_FAIL:
      return {...state, loading: false, error: action.payload };
    case SET_CAMPAIGNS_LOOP_FOR_SCREEN_RESET:
      return {};
    default:
      return state;
  }
}


export function changeCampaignCreativeEndDateReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST:
      return { loading: true };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS:
      return {loading: false, success: true, data: action.payload };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL:
      return {loading: false, error: action.payload };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET:
      return {};
    default:
      return state;
  }
}

export function screenCampaignMonitoringReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_CAMPAIGN_MONITORING_REQUEST:
      return { loading: true };
    case SCREEN_CAMPAIGN_MONITORING_SUCCESS:
      return {loading: false, success: true, data: action.payload };
    case SCREEN_CAMPAIGN_MONITORING_FAIL:
      return {loading: false, error: action.payload };
    case SCREEN_CAMPAIGN_MONITORING_RESET:
      return {};
    default:
      return state;
  }
}


export function screenCodeChangeReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_CODE_CHANGE_REQUEST:
      return { loading: true };
    case SCREEN_CODE_CHANGE_SUCCESS:
      return {loading: false, success: true, data: action.payload };
    case SCREEN_CODE_CHANGE_FAIL:
      return {loading: false, error: action.payload };
    case SCREEN_CODE_CHANGE_RESET:
      return {};
    default:
      return state;
  }
}



export function screenRefreshReducer(state = {}, action) {
  switch (action.type) {
    case SCREEN_REFRESH_REQUEST:
      return { loading: true };
    case SCREEN_REFRESH_SUCCESS:
      return {loading: false, success: true, data: action.payload };
    case SCREEN_REFRESH_FAIL:
      return {loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenDataUpdateRedisReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_SCREENS_DATA_IN_REDIS_REQUEST:
      return { loading: true };
    case UPDATE_SCREENS_DATA_IN_REDIS_SUCCESS:
      return {loading: false, success: true, data: action.payload };
    case UPDATE_SCREENS_DATA_IN_REDIS_FAIL:
      return {loading: false, error: action.payload };
    default:
      return state;
  }
}


export function screenLogsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_LOGS_REQUEST:
      return { loading: true };
    case GET_SCREEN_LOGS_SUCCESS:
      return {loading: false, data: action.payload };
    case GET_SCREEN_LOGS_FAIL:
      return {loading: false, error: action.payload };
    default:
      return state;
  }
}

