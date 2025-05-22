import {
    CHANGE_CONTACT_QUERY_STATUS_FAIL,
    CHANGE_CONTACT_QUERY_STATUS_REQUEST,
    CHANGE_CONTACT_QUERY_STATUS_RESET,
    CHANGE_CONTACT_QUERY_STATUS_SUCCESS,
    GET_ALL_CONTACT_QUERIES_FAIL,
    GET_ALL_CONTACT_QUERIES_REQUEST,
    GET_ALL_CONTACT_QUERIES_RESET,
    GET_ALL_CONTACT_QUERIES_SUCCESS
} from "../constants/queriesContants";

export function getAllContactQueriesReducer(state = [], action) {
    switch (action.type) {
        case GET_ALL_CONTACT_QUERIES_REQUEST:
            return { loading: true };
        case GET_ALL_CONTACT_QUERIES_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true,
            };
        case GET_ALL_CONTACT_QUERIES_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
            };
        case GET_ALL_CONTACT_QUERIES_RESET:
            return {};
        default:
            return state;
    }
}


export function changeContactQueryStatusReducer(state = [], action) {
    switch (action.type) {
        case CHANGE_CONTACT_QUERY_STATUS_REQUEST:
            return { loading: true };
        case CHANGE_CONTACT_QUERY_STATUS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true,
            };
        case CHANGE_CONTACT_QUERY_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
            };
        case CHANGE_CONTACT_QUERY_STATUS_RESET:
            return {};
        default:
            return state;
    }
}