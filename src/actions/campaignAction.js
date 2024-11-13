import axios from "axios";
import { CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST, CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS, GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL, GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST, GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST, GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS } from "../constants/campaignConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;
const url2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;


export const createCampaignCreationByScreenOwnerAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_REQUEST,
    payload: input,
  })
  try {
    const { data } = await axios.post(`${url}/createCampaignByScreenOwner`, input);

    dispatch({
      type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_CAMPAIGN_FOR_SCREEN_OWNER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getAllScreensForScreenOwnerCampaignCreationAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}/getAllScreensForScreenOwner`);

    dispatch({
      type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_SUCCESS,
      payload: data,
    });
  
  } catch (error) {
    dispatch({
      type: GET_SCREENS_CAMPAIGN_CREATIONS_FOR_SCREEN_OWNER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getScreenDataUploadCreativeAction = ({id}) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREEN_DATA_UPLOAD_CREATIVE_REQUEST,
    payload: {id}
  });
  try {
    const { data } = await axios.post(`${url2}/screenDataUploadCreativePage`, {id});

    dispatch({
      type: GET_SCREEN_DATA_UPLOAD_CREATIVE_SUCCESS,
      payload: data,
    });
  
  } catch (error) {
    dispatch({
      type: GET_SCREEN_DATA_UPLOAD_CREATIVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}