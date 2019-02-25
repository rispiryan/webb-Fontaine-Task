import {render} from 'react-dom';
import Router from "./services/router";
import store from "./store/store";
import {Provider} from "react-redux";
import * as React from "react";

function App() {
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    )
}

render(<App/>, document.getElementById('root'));
