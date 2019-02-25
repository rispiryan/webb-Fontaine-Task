import {
    INITIALISE_TYPING_REDUCER_ACTION_TYPES,
    LOADING_STATE_REDUCER_ACTION_TYPES,
    TYPING_REDUCER_ACTION_TYPES,
    TEXT_REDUCER_ACTION_TYPES,
} from "../actions/typingGameActions";

export function getTextRequest() {
    return {type: TEXT_REDUCER_ACTION_TYPES.GET_TEXT, payload: {}};
}

export function getTextSucceed(data) {
    return {type: TEXT_REDUCER_ACTION_TYPES.GET_TEXT_SUCCEED, payload: {data}};
}

export function postNewWPMRequest(newData) {
    return {type: TYPING_REDUCER_ACTION_TYPES.POST_TYPING, payload: {newData}};
}

export function postedNewWPMSucceed(data) {
    return {type: TYPING_REDUCER_ACTION_TYPES.POST_TYPING_SUCCEED, payload: {data}};
}

export function changeLoadingState(key, value) {
    return {type: LOADING_STATE_REDUCER_ACTION_TYPES.LOADING_STATE, payload: {key, value}};
}

export function initialiseTypingGameState() {
    return {type: INITIALISE_TYPING_REDUCER_ACTION_TYPES.INITIALISE_STORE, payload: {}};
}

export function initialiseResults() {
    return {type: INITIALISE_TYPING_REDUCER_ACTION_TYPES.INITIALISE_RESULTS, payload: {}};
}
