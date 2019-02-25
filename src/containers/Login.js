import {createNewUserRequest, getAllUsersRequest} from "../store/actions-creators/usersActionCreator";
import {allUsersSelector, isLoadingUserSelector} from "../store/selectors/usersSelector";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "../css/styles.css";
import React from "react";

class Login extends React.Component {
    state = {
        statusOfToolTip: false,
        textForToolTip: "",
        password: "",
        login: ""
    };

    handleChange = ({currentTarget: {name, value}}) => {
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.checkUser()
        }
    };

    checkUser = () => {
        const {allUsers, history} = this.props;
        const {login, password} = this.state;

        if (login && password && allUsers.has(login) && allUsers.getIn([login, "password"]) === password) {
            sessionStorage.setItem("id", allUsers.getIn([login, "id"]));
            history.push("/home")
        } else {
            this.setState({
                ...this.state,
                statusOfToolTip: true,
                textForToolTip: "Login or Password is incorrect"
            });

            setTimeout(() => {
                this.setState({
                    ...this.state,
                    statusOfToolTip: false,
                    textForToolTip: ""
                });
            }, 3000)
        }
    };

    registerNewUser = () => {
        const {createNewUserRequest, allUsers} = this.props;
        const {login, password} = this.state;
        const newUser = {
            history: [],
            userName: login
        };

        if (allUsers.has(login) && (login.length < 1 || password.length < 1)) {
            this.setState({
                ...this.state,
                statusOfToolTip: true,
                textForToolTip: "Please try another UserName"
            });

            setTimeout(() => {
                this.setState({
                    ...this.state,
                    statusOfToolTip: false,
                    textForToolTip: ""
                });
            }, 3000)
        } else {
            createNewUserRequest(allUsers, newUser, password)
        }
    };

    componentDidMount() {
        if (sessionStorage.id && sessionStorage.id !== "") {
            const {history} = this.props;

            history.push("/home")
        } else {
            const {getAllUsersRequest} = this.props;

            getAllUsersRequest()
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.allUsers.equals(this.props.allUsers) && prevProps.allUsers.size !== 0) {
            this.setState({
                ...this.state,
                statusOfToolTip: true,
                textForToolTip: "Now You Can Log In"
            });

            setTimeout(() => {
                this.setState({
                    ...this.state,
                    statusOfToolTip: false,
                    textForToolTip: ""
                });
            }, 3000)
        }
    }

    render() {
        const {login, password, statusOfToolTip, textForToolTip} = this.state;
        const {isLoading} = this.props;

        return (
            <div className="container">
                {isLoading ?
                    <div className="lds-hourglass" style={{marginLeft: 0}}/> :
                    <div className="contentOfLogin">
                        <div className="inputsFields">
                            <input value={login} name="login" onChange={this.handleChange} placeholder="Your UserName"
                                   className="inputsLogin" onKeyPress={this.handleKeyPress}/>
                            <input type="password" value={password} name="password" onChange={this.handleChange}
                                   placeholder="Your password" onKeyPress={this.handleKeyPress}
                                   className="inputsLogin"/>
                        </div>
                        <button onClick={this.checkUser} className="buttonsOfLogin">
                            Log In
                        </button>
                        <button onClick={this.registerNewUser} className="buttonsOfRegister">
                            Register
                        </button>
                        {statusOfToolTip && (
                            <div className="toolTip">
                                {textForToolTip}
                            </div>
                        )}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingUserSelector(state),
    allUsers: allUsersSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewUserRequest,
    getAllUsersRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
