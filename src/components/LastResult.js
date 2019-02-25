import {resultsSelector} from "../store/selectors/typingGameSelector";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React from "react";

class LastResult extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.results.get("lastResult").equals(nextProps.results.get("lastResult"));
    }

    render() {
        const results = this.props.results.get("lastResult");

        return (
            <React.Fragment>
                <h1>
                    Your last Result
                </h1>
                <div className="lastResult">
                    <table>
                        <tbody>
                            <tr>
                                <td className="firstColumnOfTable">
                                    Your WPM Score
                                </td>
                                <td className="secondColumnOfTable">
                                    {results.get("wpm")}
                                </td>
                            </tr>
                            <tr>
                                <td className="firstColumnOfTable">
                                    You Completed Text in
                                </td>
                                <td className="secondColumnOfTable">
                                    {results.get("percent")}%
                                </td>
                            </tr>
                            <tr>
                                <td className="firstColumnOfTable">
                                    You have finished text in
                                </td>
                                <td className="secondColumnOfTable">
                                    {results.get("minutes")} : {results.get("seconds")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    results: resultsSelector(state),
});

export default connect(mapStateToProps, null)(LastResult);
