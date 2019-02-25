import {certainUserSelector, isLoadingUserSelector} from "../store/selectors/usersSelector";
import {getUserRequest} from "../store/actions-creators/usersActionCreator";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React from "react";

class History extends React.Component {
    componentDidMount() {
        const {getUserRequest, certainUser, history} = this.props;
        let id = certainUser.get("id");

        if (!id) {
            if (sessionStorage.id) {
                getUserRequest(sessionStorage.id)
            } else {
                history.push("/login")
            }
        }
    }

    render() {
        const {certainUser, isLoading} = this.props;

        return (
            <React.Fragment>
                <button className="startButton" onClick={() => this.props.history.push("/home")} style={{margin: "10px 0 20px 10px"}}>
                    To Home
                </button>
                {isLoading ?
                    <div className="lds-hourglass" style={{width: "100%"}}/>:
                    <table className="table" style={{marginLeft: "5%"}}>
                        <thead style={{backgroundColor: "forestgreen"}}>
                        <tr className="headerOfTable">
                            <td className="itemOfHeaderOfTable">
                                Complated (%)
                            </td>
                            <td className="itemOfHeaderOfTable">
                                WPM
                            </td>
                            <td className="itemOfHeaderOfTable">
                                Minutes
                            </td>
                            <td className="itemOfHeaderOfTable">
                                Seconds
                            </td>
                        </tr>
                        </thead>
                        <tbody  style={{backgroundColor: "yellowgreen"}}>
                        {certainUser.get("history").map((result, index) => (
                            <tr key={index}>
                                <td className="itemOfBodyOfTable">
                                    {result.get("percent")}
                                </td>
                                <td className="itemOfBodyOfTable">
                                    {result.get("wpm")}
                                </td>
                                <td className="itemOfBodyOfTable">
                                    {result.get("minutes")}
                                </td>
                                <td className="itemOfBodyOfTable">
                                    {result.get("seconds")}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    certainUser: certainUserSelector(state),
    isLoading: isLoadingUserSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(History);
