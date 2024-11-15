import { GET_ALL_SCREENS_DATA_FAIL, GET_ALL_SCREENS_DATA_REQUEST, GET_ALL_SCREENS_DATA_SUCCESS } from "../constants/screenConstants";


export function allScreensDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SCREENS_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_SCREENS_DATA_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_ALL_SCREENS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
