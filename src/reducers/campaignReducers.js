import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
import {
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_FAIL,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET,
  CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
  CAMPAIGN_LOGS_FAIL,
  CAMPAIGN_LOGS_REQUEST,
  CAMPAIGN_LOGS_SUCCESS,
  CAMPAIGN_STATUS_CHANGE_FAIL,
  CAMPAIGN_STATUS_CHANGE_REQUEST,
  CAMPAIGN_STATUS_CHANGE_RESET,
  CAMPAIGN_STATUS_CHANGE_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_ERROR,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET,
  CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
  CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
  EDIT_ALL_SUB_CAMPAIGNS_FAIL,
  EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_RESET,
  EDIT_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
  GET_ALL_CAMPAIGNS_DATA_FAIL,
  GET_ALL_CAMPAIGNS_DATA_REQUEST,
  GET_ALL_CAMPAIGNS_DATA_SUCCESS,
  GET_CAMPAIGN_DATA_FAIL,
  GET_CAMPAIGN_DATA_REQUEST,
  GET_CAMPAIGN_DATA_SUCCESS,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_RESET,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS,
  GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL,
  GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST,
  GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS,
  GET_FULL_CAMPAIGN_DATA_FAIL,
  GET_FULL_CAMPAIGN_DATA_REQUEST,
  GET_FULL_CAMPAIGN_DATA_RESET,
  GET_FULL_CAMPAIGN_DATA_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST,
  GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST,
  GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS,
} from "../constants/campaignConstants";
import {
  ALL_CAMPAIGNS_LIST,
  ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER,
  CAMPAIGN_CREATIVES_TO_UPLOAD,
  FULL_CAMPAIGN_PLAN,
  UPLOAD_CREATIVE_SCREEN_DATA,
} from "../constants/localStorageConstants";
import cloneDeep from "lodash/cloneDeep";

export function createCampaignCreationByScreenOwnerReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS:
      const campaign = action.payload.campaignCreationRes;
      const saveData = {
        [campaign._id]: campaign,
      };
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES_TO_UPLOAD, {
        [campaign._id]: campaign.creatives.standardDayTimeCreatives,
      });
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);

      return {
        ...state,
        loading: false,
        success: true,
        data: cloneDeep(action.payload),
      };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET:
      return {};
    default:
      return state;
  }
}

export function editCampaignCreationByScreenOwnerReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case EDIT_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS:
      const campaign = action.payload.campaignCreationRes;
      const saveData = {
        [campaign._id]: campaign,
      };
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES_TO_UPLOAD, {
        [campaign._id]: campaign.creatives.standardDayTimeCreatives,
      });
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);

      return {
        ...state,
        loading: false,
        success: true,
        data: cloneDeep(action.payload),
      };
    case EDIT_CAMPAIGN_FOR_SCREEN_OWNER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_CAMPAIGN_FOR_SCREEN_OWNER_RESET:
      return {};
    default:
      return state;
  }
}

export function getAllScreensForScreenOwnerCampaignCreationReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS:
      saveDataOnLocalStorage(
        ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER,
        action.payload
      );
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenDataUploadCreativeGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS:
      // const myData = {...state, ...action.payload}
      // saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, myData);
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// const dateNow = new Date();
export function allCampaignsDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CAMPAIGNS_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_CAMPAIGNS_DATA_SUCCESS:
      const d = {
        // time: dateNow,
        list: action.payload,
      };
      saveDataOnLocalStorage(ALL_CAMPAIGNS_LIST, d);
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_ALL_CAMPAIGNS_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function campaignDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_DATA_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CAMPAIGN_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function campaignFullDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_FULL_CAMPAIGN_DATA_REQUEST:
      return { loading: true };
    case GET_FULL_CAMPAIGN_DATA_SUCCESS:
      const campaign = action.payload;
      const saveData = {
        [campaign._id]: campaign,
      };
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_FULL_CAMPAIGN_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_FULL_CAMPAIGN_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignCreatedScreensDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function campaignStatusChangeReducer(state = {}, action) {
  switch (action.type) {
    case CAMPAIGN_STATUS_CHANGE_REQUEST:
      return { loading: true };
    case CAMPAIGN_STATUS_CHANGE_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case CAMPAIGN_STATUS_CHANGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAMPAIGN_STATUS_CHANGE_RESET:
      return {};
    default:
      return state;
  }
}

export function editAllSubCampaignsReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_ALL_SUB_CAMPAIGNS_REQUEST:
      return { loading: true };
    case EDIT_ALL_SUB_CAMPAIGNS_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case EDIT_ALL_SUB_CAMPAIGNS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_ALL_SUB_CAMPAIGNS_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignLogsByCampaignIdReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_RESET:
      return {};
    default:
      return state;
  }
}

export function myCreateCampaignsVendorRequestsListGetReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST:
      return { loading: true };
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function campaignStatusChangeAfterVendorApprovalReducer(
  state = [],
  action
) {
  switch (action.type) {
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST:
      return { loading: true };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET:
      return {};
    default:
      return state;
  }
}

export function convertCreativesToRespectiveBitrateReducer(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST:
      return { loading: true };
    case CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CAMPAIGN_CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignLogsGetReducer(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_LOGS_REQUEST:
      return { loading: true, data: [] };
    case CAMPAIGN_LOGS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CAMPAIGN_LOGS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}

export function convertCreativesToRespectiveBitrateForScreenReducer(
  state = [],
  action
) {
  switch (action.type) {
    case CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_REQUEST:
      return { loading: true, data: [] };
    case CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CONVERT_CREATIVES_TO_RESPECTIVE_BITRATE_RESET:
      return state;
    default:
      return state;
  }
}
