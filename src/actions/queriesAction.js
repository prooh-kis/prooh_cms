import { queriesV2, userV1 } from "../constants/urlConstants";
import {
    APPROVE_DATA_HERO_ACCOUNT_FAIL,
    APPROVE_DATA_HERO_ACCOUNT_REQUEST,
    APPROVE_DATA_HERO_ACCOUNT_SUCCESS,
    CHANGE_CONTACT_QUERY_STATUS_FAIL, CHANGE_CONTACT_QUERY_STATUS_REQUEST, CHANGE_CONTACT_QUERY_STATUS_SUCCESS, GET_ALL_CONTACT_QUERIES_FAIL,
    GET_ALL_CONTACT_QUERIES_REQUEST,
    GET_ALL_CONTACT_QUERIES_SUCCESS,
    GET_ALL_DMP_CONTACT_QUERIES_FAIL,
    GET_ALL_DMP_CONTACT_QUERIES_REQUEST,
    GET_ALL_DMP_CONTACT_QUERIES_SUCCESS
} from "../constants/queriesContants";
import axios from "axios";


export const getAllContactQueries = (input) => async (dispatch, getState) => {
    dispatch({
        type: GET_ALL_CONTACT_QUERIES_REQUEST,
        payload: input,
    });
    try {
        const {
            auth: { userInfo },
        } = getState();

        const { data } = await axios.post(
            `${queriesV2}/getAllContactDetailsQueries`,
            input,
            { headers: { authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({
            type: GET_ALL_CONTACT_QUERIES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_CONTACT_QUERIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changeContactQueryStatus = (input) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_CONTACT_QUERY_STATUS_REQUEST,
        payload: input,
    });
    try {
        const {
            auth: { userInfo },
        } = getState();

        const { data } = await axios.post(
            `${queriesV2}/changeContactQueryStatus`,
            input,
            { headers: { authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({
            type: CHANGE_CONTACT_QUERY_STATUS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHANGE_CONTACT_QUERY_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getAllDmpContactQueries = (input) => async (dispatch, getState) => {
    dispatch({
        type: GET_ALL_DMP_CONTACT_QUERIES_REQUEST,
        payload: input,
    });
    try {
        const {
            auth: { userInfo },
        } = getState();

        const { data } = await axios.post(
            `${queriesV2}/getAllContactDetailsQueriesDmp`,
            input,
            { headers: { authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({
            type: GET_ALL_DMP_CONTACT_QUERIES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_DMP_CONTACT_QUERIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const approveDataHeroAccount = (input) => async (dispatch, getState) => {
    dispatch({
        type: APPROVE_DATA_HERO_ACCOUNT_REQUEST,
        payload: input,
    });
    try {
        const {
            auth: { userInfo },
        } = getState();

        const { data } = await axios.post(
            `${userV1}/approveDataHeroAccount`, input, { headers: { authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({
            type: APPROVE_DATA_HERO_ACCOUNT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: APPROVE_DATA_HERO_ACCOUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}