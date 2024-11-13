import {
  GET_CREATIVES_ERROR,
  GET_CREATIVES_REQUEST,
  GET_CREATIVES_RESET,
  GET_CREATIVES_SUCCESS,
  UPLOAD_CREATIVES_ERROR,
  UPLOAD_CREATIVES_REQUEST,
  UPLOAD_CREATIVES_RESET,
  UPLOAD_CREATIVES_SUCCESS,
} from "../constants/creativeConstants";

export function uploadCreativesReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case UPLOAD_CREATIVES_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case UPLOAD_CREATIVES_ERROR:
      return { loading: false, error: action.payload };
    case UPLOAD_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}

export function getCreativesReducer(state = {}, action) {
  switch (action.type) {
    case GET_CREATIVES_REQUEST:
      return { loading: true };
    case GET_CREATIVES_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_CREATIVES_ERROR:
      return { loading: false, error: action.payload };
    case GET_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}
