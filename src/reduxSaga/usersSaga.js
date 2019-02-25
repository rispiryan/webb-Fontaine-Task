import {all, call, put, takeLatest} from "redux-saga/effects";
import {request} from "../services/requestService";
import {apiConsts} from "../API/apiConsts";
import {constructUrl} from "../API/helper";
import {CERTAIN_USER_REDUCER_ACTION_TYPES, USERS_REDUCER_ACTION_TYPES} from "../store/actions/usersActions";
import {
    changeLoadingStateUsers, createNewUserSucceed, getAllUsersSucceed,
    getUserSucceed
} from "../store/actions-creators/usersActionCreator";
import {fromJS} from "immutable";

function* getAllUsers() {
    try {
        const {data} = yield call(request, "GET", constructUrl([apiConsts.urlForData, apiConsts.id], {}));

        yield put(getAllUsersSucceed(data));
    } catch (error) {
        console.log(error);
    }
}

function* getCertainUser({payload:{id}}) {
    try {
        yield put(changeLoadingStateUsers(true));

        const {data} = yield call(request, "GET", constructUrl([apiConsts.urlForData, id], {}));
        const dataForSend = {...data};

        dataForSend["id"] = id;

        yield put(getUserSucceed(dataForSend));
        yield put(changeLoadingStateUsers(false));
    } catch (error) {
        console.log(error);
    }
}

function* createNewUser({payload:{allUsers, newUser, password}}) {
    try {
        yield put(changeLoadingStateUsers(true));

        const {data} = yield call(request, "POST", constructUrl([apiConsts.urlForData], {}), newUser);
        const id = data.uri.substr(data.uri.lastIndexOf("/") + 1, data.uri.length + 1);
        const userForAdd = allUsers.set(newUser["userName"], fromJS({id: id, userName: newUser["userName"], password: password}));

        yield put(createNewUserSucceed(userForAdd));
        yield put(getUserSucceed(newUser));

        yield put(changeLoadingStateUsers(false));
    } catch (error) {
        console.log(error);
    }
}

function* editAllUsers({payload:{userForAdd}}) {
    try {
        const {data} = yield call(request, "PUT", constructUrl([apiConsts.urlForData, apiConsts.id], {}), userForAdd);


        yield put(getAllUsersSucceed(data));
    } catch (error) {
        console.log(error);
    }
}

export function* usersSaga() {
    yield all([
        takeLatest(USERS_REDUCER_ACTION_TYPES.GET_USERS, getAllUsers),
        takeLatest(CERTAIN_USER_REDUCER_ACTION_TYPES.GET_CERTAIN_USER, getCertainUser),
        takeLatest(CERTAIN_USER_REDUCER_ACTION_TYPES.POST_CERTAIN_USER, createNewUser),
        takeLatest(CERTAIN_USER_REDUCER_ACTION_TYPES.POST_CERTAIN_USER_SUCCEED, editAllUsers),
    ])
}
