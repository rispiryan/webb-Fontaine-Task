import {loadingStateSelector, resultsSelector, textSelector} from "../store/selectors/typingGameSelector";
import {initialiseResults} from "../store/actions-creators/typingGameActionCreator";
import {getTextRequest} from "../store/actions-creators/typingGameActionCreator";
import {getUserRequest} from "../store/actions-creators/usersActionCreator";
import {certainUserSelector} from "../store/selectors/usersSelector";
import HistoryOfResults from "../components/HistoryOfResults";
import LastResult from "../components/LastResult";
import {bindActionCreators} from "redux";
import TimerAndWPM from "./TimerAndWPM";
import {connect} from "react-redux";
import React from "react";

import "../css/styles.css";

class GameOfTyping extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            indexOfUncorrectedChar: new Set(),
            carPosition: 0,
            textForWrite: [],
            writtenText: "",
            statusIsDone: false,
            startCalculating: false,
            isDisabled: true,
        };
    }

    handleChange = ({currentTarget: {value}}) => {
        const {indexOfUncorrectedChar, writtenText} = this.state;

        if (value.length < writtenText.length) {
            const carPosition = this.calculatePositionOfCar(value);

            indexOfUncorrectedChar.delete(`${writtenText.length - 1}`);

            this.setState(state => ({
                    ...state,
                    writtenText: value,
                    carPosition: carPosition,
                    indexOfUncorrectedChar: indexOfUncorrectedChar,
                }));
        } else if (indexOfUncorrectedChar.size === 0) {
            this.checkCorrection(value);
        }
    };

    checkCorrection = writtenText => {
        const {textForWrite} = this.state;
        const indexOfLastChar = writtenText.length - 1;
        const lastChar = writtenText.charAt(writtenText.length - 1);
        let {indexOfUncorrectedChar} = this.state;
        let {carPosition} = this.state;

        if (textForWrite[indexOfLastChar + 1]) {
            if (textForWrite[indexOfLastChar] !== lastChar) {
                indexOfUncorrectedChar.add(`${indexOfLastChar}`);
            } else {
                carPosition = this.calculatePositionOfCar(writtenText)
            }

            this.setState(state => ({
                    ...state,
                    writtenText: writtenText,
                    indexOfUncorrectedChar: indexOfUncorrectedChar,
                    carPosition: carPosition,
                }));
        } else {
            carPosition = this.calculatePositionOfCar(writtenText);

            this.setState({
                ...this.state,
                statusIsDone: true,
                carPosition: carPosition,
                writtenText: writtenText,
            });

            this.input.disabled = true;
        }
    };

    calculatePositionOfCar = writtenText => {
        const lengthOfText = this.props.text.length;
        let carPosition = writtenText.length / lengthOfText * 100 * 0.8;

        if (carPosition > 100) {
            carPosition = 100
        }

        return carPosition
    };

    checkCorrectClass = index => {
        const {indexOfUncorrectedChar, writtenText} = this.state;

        if (indexOfUncorrectedChar.has(`${index}`)) {
            return "overRiddenTextUnCorrect"
        } else if (writtenText.length > 0 && writtenText.length > index) {
            return "overRiddenTextCorrect"
        } else {
            return "simpleSpan"
        }
    };

    focusingInput = (isDisabled) => {
        this.setState(state => ({
            ...state,
            isDisabled: isDisabled
        }))
    };

    navigateToHome = () => {
        const {history, initialiseResults} = this.props;

        history.push("/home");
        initialiseResults()
    };

    startNewGame = () => {
        const {getTextRequest} = this.props;

        getTextRequest();

        this.setState(state =>({
            ...state,
            indexOfUncorrectedChar: new Set(),
            carPosition: 0,
            textForWrite: [],
            writtenText: "",
            statusIsDone: false,
            startCalculating: false,
            isDisabled: true,
        }))
    };

    componentDidMount() {
        const {getTextRequest, getUserRequest, certainUser, history} = this.props;
        let id = certainUser.get("id");

        getTextRequest();

        if (!id) {
            if (sessionStorage.id) {
                getUserRequest(sessionStorage.id)
            } else {
                history.push("/login")
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.text !== this.props.text) {
            const {text, results} = this.props;
            const tempArray = text.split("");

            this.setState(state => ({
                    ...state,
                    textForWrite: [...tempArray],
            }));

            if (results.get("showResults")) {
                this.setState(state => ({
                        ...state,
                        startCalculating: true,
                        isDisabled: false,
                }))
            }
        }

        if (prevState.isDisabled !== this.state.isDisabled && !this.state.isDisabled) {
            this.input.focus();
        }
    }

    render() {
        const {writtenText, indexOfUncorrectedChar, textForWrite, carPosition, statusIsDone, startCalculating, isDisabled} = this.state;
        const {loadingStates, results} = this.props;

        return (
            <div className="container">
                <div className="mainContent">
                    <button className="startButton" onClick={() => this.navigateToHome()} style={{marginBottom: "20px", height: "60px"}}>
                         To Home
                    </button>
                    <div className="raceWithPercent">
                        <TimerAndWPM writtenText={writtenText} focusingInput={this.focusingInput}
                                     startNewGame={this.startNewGame}
                                     statusIsDone={statusIsDone} carPosition={carPosition}
                                     startCalculating={startCalculating}/>
                    </div>
                    {loadingStates.get("getText") ?
                        <div className="lds-hourglass" style={{height: "160px"}}/> :
                        <div className="textBox">
                            {textForWrite.map((eachChar, index) => (
                                <span key={index}
                                      className={this.checkCorrectClass(index)}>
                                {eachChar}
                        </span>
                            ))}
                        </div>
                    }
                    <div className="fieldForTyping">
                        <textarea disabled={isDisabled} ref={input => this.input = input} className="inputField"
                                  value={writtenText} onChange={this.handleChange} style={indexOfUncorrectedChar.size > 0 ? {backgroundColor: "pink"}: {}}/>
                    </div>
                    <div className="results">
                        {results.get("showResults") &&
                            <LastResult/>
                        }
                        <h1>
                            History Of Results
                        </h1>
                        <HistoryOfResults/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loadingStates: loadingStateSelector(state),
    certainUser: certainUserSelector(state),
    results: resultsSelector(state),
    text: textSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initialiseResults,
    getUserRequest,
    getTextRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameOfTyping);
