import {
  ALL_BRAND_LIST,
  ALL_NETWORK_LIST,
  ALL_PACKAGE_LIST,
} from "../constants/localStorageConstants";
import {
  GET_ALL_BRAND_AND_NETWORK_FAIL,
  GET_ALL_BRAND_AND_NETWORK_REQUEST,
  GET_ALL_BRAND_AND_NETWORK_SUCCESS,
  GET_CREATIVES_ERROR,
  GET_CREATIVES_REQUEST,
  GET_CREATIVES_RESET,
  GET_CREATIVES_SUCCESS,
  UPLOAD_CREATIVES_ERROR,
  UPLOAD_CREATIVES_REQUEST,
  UPLOAD_CREATIVES_RESET,
  UPLOAD_CREATIVES_SUCCESS,
} from "../constants/creativeConstants";
import { saveDataOnLocalStorage } from "../utils/localStorageUtils";

export function creativesMediaUploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case UPLOAD_CREATIVES_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case UPLOAD_CREATIVES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPLOAD_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}

export function creativesMediaGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CREATIVES_REQUEST:
      return { loading: true };
    case GET_CREATIVES_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CREATIVES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}

export function getAllBrandAndNetworkReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_BRAND_AND_NETWORK_REQUEST:
      return { loading: true };
    case GET_ALL_BRAND_AND_NETWORK_SUCCESS:
      saveDataOnLocalStorage(ALL_NETWORK_LIST, action.payload.networkArray);
      saveDataOnLocalStorage(ALL_BRAND_LIST, action.payload.brandArray);
      saveDataOnLocalStorage(ALL_PACKAGE_LIST, action.payload.packageArray);
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_ALL_BRAND_AND_NETWORK_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_BRAND_AND_NETWORK_FAIL:
      return {};
    default:
      return state;
  }
}
