import {certainUserSelector, isLoadingUserSelector} from "../store/selectors/usersSelector";
import {connect} from "react-redux";
import React from "react";

class HistoryOfResults extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.isLoading !== nextProps.isLoading || !this.props.certainUser.equals(nextProps.certainUser);
    }

    render() {
        const {certainUser, isLoading} = this.props;

        return (
            <React.Fragment>
                {isLoading ?
                    <div className="lds-hourglass" style={{width: "100%", height: "160px"}}/> :
                    <table className="table">
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
                        <tbody style={{backgroundColor: "yellowgreen"}}>
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

export default connect(mapStateToProps, null)(HistoryOfResults);
