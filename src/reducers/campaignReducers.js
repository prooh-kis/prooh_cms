import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS, GET_ALL_CAMPAIGNS_DATA_FAIL, GET_ALL_CAMPAIGNS_DATA_REQUEST, GET_ALL_CAMPAIGNS_DATA_SUCCESS, GET_CAMPAIGN_DATA_FAIL, GET_CAMPAIGN_DATA_REQUEST, GET_CAMPAIGN_DATA_SUCCESS, GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL, GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST, GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS, GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL, GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST, GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS } from "../constants/campaignConstants";
import { ALL_CAMPAIGNS_LIST, ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, FULL_CAMPAIGN_PLAN, UPLOAD_CREATIVE_SCREEN_DATA } from "../constants/localStorageConstants";
import cloneDeep from 'lodash/cloneDeep';


export function createCampaignCreationByScreenOwnerReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS:
      const campaign = action.payload.campaignCreationRes;
      const saveData = {
        [campaign._id]: campaign
      };
      saveData[campaign._id] = campaign;
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);

      return {loading: false, success: true, data: cloneDeep(action.payload) };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET:
      return {};
    default:
      return state;
  }
}


export function getAllScreensForScreenOwnerCampaignCreationReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS:
      saveDataOnLocalStorage(ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, action.payload);
      return { loading: false, success: true, data: action.payload };
    case GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenDataUploadCreativeGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS:
      const myData = action.payload
      saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, myData);
      return { loading: false, success: true, data: action.payload };
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export function allCampaignsDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CAMPAIGNS_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_CAMPAIGNS_DATA_SUCCESS:
      const d = {
        time: new Date(),
        list: action.payload
      }
      saveDataOnLocalStorage(ALL_CAMPAIGNS_LIST, d);
      return { loading: false, success: true, data: action.payload };
    case GET_ALL_CAMPAIGNS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export function campaignDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_DATA_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_CAMPAIGN_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export function campaignCreatedScreensDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGNCREATED_SCREENS_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGNCREATED_SCREENS_DATA_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_CAMPAIGNCREATED_SCREENS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
