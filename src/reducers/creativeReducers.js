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


export function creativesMediaUploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case UPLOAD_CREATIVES_SUCCESS:
      return {...state, loading: false, success: true, data: action.payload };
    case UPLOAD_CREATIVES_ERROR:
      return {...state, loading: false, error: action.payload };
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
      return {...state, loading: false, success: true, data: action.payload };
    case GET_CREATIVES_ERROR:
      return {...state, loading: false, error: action.payload };
    case GET_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}
