import axios from "axios";
import { GET_ALL_SCREENS_DATA_FAIL, GET_ALL_SCREENS_DATA_REQUEST, GET_ALL_SCREENS_DATA_SUCCESS } from "../constants/screenConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;
export const getAllScreensDetailsAction = ({userId}) => async (dispatch) => {
  dispatch({
    type: GET_ALL_SCREENS_DATA_REQUEST,
    payload: userId,
  });
  try {
    const { data } = await axios.post(`${url}/all`, {userId});
    dispatch({
      type: GET_ALL_SCREENS_DATA_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_ALL_SCREENS_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}