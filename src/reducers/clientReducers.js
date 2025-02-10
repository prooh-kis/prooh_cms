import {
  ADD_CLIENT_AGENCY_DETAILS_FAIL,
  ADD_CLIENT_AGENCY_DETAILS_REQUEST,
  ADD_CLIENT_AGENCY_DETAILS_RESET,
  ADD_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_DETAILS_FAIL,
  GET_CLIENT_AGENCY_DETAILS_REQUEST,
  GET_CLIENT_AGENCY_DETAILS_RESET,
  GET_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
  GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
  GET_CLIENT_AGENCY_NAMES_LIST_RESET,
  GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
} from "../constants/clientAgencyConstants";

export function allClientAgencyNamesListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_CLIENT_AGENCY_NAMES_LIST_REQUEST:
      return { loading: true };
    case GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CLIENT_AGENCY_NAMES_LIST_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CLIENT_AGENCY_NAMES_LIST_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function clientAgencyDetailsGetReducer(state = [], action) {
  switch (action.type) {
    case GET_CLIENT_AGENCY_DETAILS_REQUEST:
      return { loading: true };
    case GET_CLIENT_AGENCY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CLIENT_AGENCY_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CLIENT_AGENCY_DETAILS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function clientAgencyDetailsAddGetReducer(state = [], action) {
  switch (action.type) {
    case ADD_CLIENT_AGENCY_DETAILS_REQUEST:
      return { loading: true };
    case ADD_CLIENT_AGENCY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case ADD_CLIENT_AGENCY_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_CLIENT_AGENCY_DETAILS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}
