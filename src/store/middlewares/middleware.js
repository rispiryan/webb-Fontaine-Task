import {call, all} from "redux-saga/effects";
import {typingGameSaga} from "../../reduxSaga/typingGameSaga";
import {usersSaga} from "../../reduxSaga/usersSaga";

export default function* middleware() {

    yield all([
        call(typingGameSaga),
        call(usersSaga),
    ]);
}
