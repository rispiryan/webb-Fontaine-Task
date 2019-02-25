import {
    INITIALISE_USERS_REDUCER_ACTION_TYPES,
    CERTAIN_USER_REDUCER_ACTION_TYPES,
    USERS_REDUCER_ACTION_TYPES,
} from "../actions/usersActions";
import {fromJS} from "immutable";

const initialState = fromJS({
    allUsers: {},
    certainUser: {
        history: [],
        id: null,
        username: "",
    },
    isLoading: false,
});

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case CERTAIN_USER_REDUCER_ACTION_TYPES.GET_CERTAIN_USER_SUCCEED:
            return state.set("certainUser", fromJS(payload.data));

        case USERS_REDUCER_ACTION_TYPES.GET_USERS_SUCCEED:
            return state.set("allUsers", fromJS(payload.data));

        case USERS_REDUCER_ACTION_TYPES.LOADING_STATE:
            return state.set("isLoading", fromJS(payload.isLoading));

        case INITIALISE_USERS_REDUCER_ACTION_TYPES.INITIALISE_STORE:
            return initialState;

        default:
            return state;
    }
}
