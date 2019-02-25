import {initialiseTypingGameState} from "../store/actions-creators/typingGameActionCreator";
import {initialiseUsersState} from "../store/actions-creators/usersActionCreator";
import {getUserRequest} from "../store/actions-creators/usersActionCreator";
import {certainUserSelector} from "../store/selectors/usersSelector";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

import "../css/styles.css";

class Home extends React.Component {
    initialiseStore = (event) => {
        const {initialiseTypingGameState, initialiseUsersState, history} = this.props;

        event.preventDefault();

        sessionStorage.setItem("id", "");

        initialiseTypingGameState();
        initialiseUsersState();

        history.push("/login")

    };


    componentDidMount() {
        const {getUserRequest, certainUser, history} = this.props;
        let id = certainUser.get("id");

        if (!id) {
            id = sessionStorage.id;

            if (typeof id !== "undefined" && id) {
                getUserRequest(id)
            } else {
                history.push("/login")
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.certainUser.get("id") !== this.props.certainUser.get("id")) {
            sessionStorage.setItem("id", this.props.certainUser.get("id"))
        }
    }

    render() {
        return (
            <div className="container">
                <div className="mainContent" style={{flexDirection: "row", justifyContent: "center", paddingBottom: "10%", paddingTop: "10%"}}>
                    <Link className="logOut" to="/login" onClick={this.initialiseStore}>
                        Log Out
                    </Link>
                    <Link className="mainButtons" to="/gameOfTyping">
                        Lets Play
                    </Link>
                    <Link className="mainButtons" to="/history">
                        Your History
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    certainUser: certainUserSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initialiseUsersState,
    initialiseTypingGameState,
    getUserRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
