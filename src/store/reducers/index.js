import {combineReducers} from "redux-immutable";
import typingGameReducer from "./typingGameReducer"
import usersReducer from "./usersReducer"

export default combineReducers({
    typingGameReducer,
    usersReducer
});
