import {
    INITIALISE_TYPING_REDUCER_ACTION_TYPES,
    LOADING_STATE_REDUCER_ACTION_TYPES,
    TYPING_REDUCER_ACTION_TYPES,
    TEXT_REDUCER_ACTION_TYPES,
} from "../actions/typingGameActions";
import {fromJS} from "immutable";

const initialState = fromJS({
   text: "",
    loadingStates: {
        getText: false,
    },
    results: {
        showResults: false,
        lastResult: {},
    }
});

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case TEXT_REDUCER_ACTION_TYPES.GET_TEXT_SUCCEED:
            return state.set("text", fromJS(payload.data));

        case LOADING_STATE_REDUCER_ACTION_TYPES.LOADING_STATE:
            return state.setIn(["loadingStates", payload.key], fromJS(payload.value));

        case TYPING_REDUCER_ACTION_TYPES.POST_TYPING_SUCCEED:
            return state.setIn(["results", "lastResult"], fromJS(payload.data)).setIn(["results", "showResults"], fromJS(true));

        case INITIALISE_TYPING_REDUCER_ACTION_TYPES.INITIALISE_STORE:
            return initialState;

        case INITIALISE_TYPING_REDUCER_ACTION_TYPES.INITIALISE_RESULTS:
            return state.setIn(["results", "showResults"], fromJS(false)).setIn(["results", "lastResult"], fromJS({}));

        default:
            return state;
    }
}
