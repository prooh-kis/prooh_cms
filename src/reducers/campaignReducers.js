import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_RESET, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS, GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL, GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST, GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS } from "../constants/campaignConstants";
import { ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, FULL_CAMPAIGN_PLAN, UPLOAD_CREATIVE_SCREEN_DATA } from "../constants/localStorageConstants";


export function createCampaignCreationByScreenOwnerReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST:
      return { loading: true };
    case CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS:
      const campaign = action.payload.campaignCreationRes;
      const saveData = {};
      saveData[campaign._id] = campaign;
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);
      return { loading: false, success: true, data: action.payload };
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
      saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, action.payload);
      return { loading: false, success: true, data: action.payload };
    case GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}