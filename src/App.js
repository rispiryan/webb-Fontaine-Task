import Router from "./services/router";
import store from "./services/store";
import {Provider} from "react-redux";
import * as React from "react";

export default function App() {
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    )
}

