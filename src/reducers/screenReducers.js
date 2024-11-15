import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
import { GET_ALL_SCREENS_DATA_FAIL, GET_ALL_SCREENS_DATA_REQUEST, GET_ALL_SCREENS_DATA_SUCCESS, GET_SCREEN_CAMPAIGNS_DATA_FAIL, GET_SCREEN_CAMPAIGNS_DATA_REQUEST, GET_SCREEN_CAMPAIGNS_DATA_SUCCESS, GET_SCREEN_DATA_FAIL, GET_SCREEN_DATA_REQUEST, GET_SCREEN_DATA_SUCCESS } from "../constants/screenConstants";
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
      return { loading: false, success: true, data: action.payload };
    case GET_ALL_SCREENS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export function screenDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_SCREEN_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenCampaignsDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_CAMPAIGNS_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_CAMPAIGNS_DATA_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_SCREEN_CAMPAIGNS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
