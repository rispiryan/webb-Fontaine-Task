import {BrowserRouter, Route, Switch} from "react-router-dom";
import GameOfTyping from "../../containers/GameOfTyping";
import History from "../../containers/History";
import Login from "../../containers/Login";
import Home from "../../containers/Home";
import * as React from "react";


export default class Router extends React.Component {
    render() {

        return (
            <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/(login||)/" component={Login}/>
                        <Route exact path="/gameOfTyping" component={GameOfTyping}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/history" component={History}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}
