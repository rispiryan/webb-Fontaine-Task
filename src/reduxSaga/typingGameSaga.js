import {
    BEERS_REDUCER_ACTION_TYPES,
    TEXT_REDUCER_ACTION_TYPES,
    TYPING_REDUCER_ACTION_TYPES
} from "../store/actions/typingGameActions";
import {call, takeLatest, all, put} from "redux-saga/effects";
import {constructUrl} from "../API/helper";
import {request} from "../services/requestService.js";
import {
    changeLoadingState,
    getTextSucceed, postedNewWPMSucceed
} from "../store/actions-creators/typingGameActionCreator";
import {apiConsts} from "../API/apiConsts";
import {getUserSucceed} from "../store/actions-creators/usersActionCreator";

function* getText() {
    try {
        yield put(changeLoadingState("getText", true));
        const queryParams = {
            type: "meat-and-filler",
        };

        const {data} = yield call(request, "GET", constructUrl([apiConsts.url], queryParams));

        yield put(getTextSucceed(data[0]));
        yield put(changeLoadingState("getText", false));
    } catch (error) {
        console.log(error);
    }
}

function* postText({payload: {newData}}) {
    try {
        const {data} = yield call(request, "PUT", constructUrl([apiConsts.urlForData, newData.get("id")], {}), newData);

        const lastResult = newData.getIn(["history", newData.get("history").size - 1]);

        yield put(postedNewWPMSucceed(lastResult));
        yield put(getUserSucceed(newData))
    } catch (error) {
        console.log(error);
    }
}

export function* typingGameSaga() {
    yield all([
        takeLatest(TEXT_REDUCER_ACTION_TYPES.GET_TEXT, getText),
        takeLatest(TYPING_REDUCER_ACTION_TYPES.POST_TYPING, postText),
    ])
}
