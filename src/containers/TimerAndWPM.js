import {postNewWPMRequest} from "../store/actions-creators/typingGameActionCreator";
import {certainUserSelector} from "../store/selectors/usersSelector";
import {resultsSelector} from "../store/selectors/typingGameSelector";
import CarLogo from "../resources/2714749.png"
import {fromJS} from "immutable";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React from "react";

class TimerAndWPM extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wpm: 0,
            minutes: "00",
            seconds: "00",
            intervalId: null,
        };
    }

    startTyping = () => {
        const {intervalId} = this.state;

        if (!intervalId) {
            const {results, startCalculating} = this.props;

            if ((results.get("showResults") && !startCalculating) || startCalculating) {
                const {startNewGame} = this.props;

                startNewGame();
            } else {
                this.calculate();
            }
        }
    };

    calculate = () => {
        const {focusingInput} = this.props;

        focusingInput(false);

        this.setState({
            ...this.state,
            intervalId: setInterval(() => {
                let {minutes, seconds} = this.state;

                if (+(seconds) + 1 === 60) {
                    minutes = `${+minutes + 1}`;
                    seconds = `${0}`;
                } else {
                    seconds = `${+seconds + 1}`
                }

                if (minutes.length < 2) {
                    minutes = "0" + minutes
                }

                if (seconds.length < 2) {
                    seconds = "0" + seconds
                }

                this.setState({
                    ...this.state,
                    minutes: minutes,
                    seconds: seconds,
                });

                this.calculateWpm();

                if (minutes === "03") {
                    const {focusingInput} = this.props;

                    clearInterval(this.state.intervalId);

                    focusingInput(true);

                    this.finishTyping();
                }}, 1000)
        })
    };

    calculateWpm = () => {
        const {writtenText} = this.props;
        const {minutes, seconds} = this.state;
        let wpm = Math.round((writtenText.length / 5) / ((+minutes) + (+seconds) / 60));

        if ((+minutes) + (+seconds) === 0) {
            wpm = "max"
        }

        this.setState({
            ...this.state,
            wpm: wpm,
        });

        return wpm
    };

    finishTyping = () => {
        const {postNewWPMRequest, carPosition, certainUser} = this.props;
        const {minutes, seconds, intervalId} = this.state;
        const wpm = this.calculateWpm();
        const newHistory = {
            wpm,
            minutes,
            seconds,
            percent: Math.round((+carPosition) * 10) / 10
        };
        let newCertainUSer = certainUser.get("history").push(fromJS(newHistory));

        clearInterval(intervalId);

        newCertainUSer = certainUser.set("history", fromJS(newCertainUSer));
        postNewWPMRequest(newCertainUSer);

        this.setState({
            wpm: 0,
            minutes: "00",
            seconds: "00",
            intervalId: null,
        })
    };

    componentDidUpdate(prevProps) {
        if (prevProps.writtenText !== this.props.writtenText) {
            this.calculateWpm();
        }

        if (prevProps.statusIsDone === false && this.props.statusIsDone === true) {
            this.finishTyping();
        }

        if (prevProps.startCalculating === false && this.props.startCalculating === true) {
            this.calculate();
        }
    }

    render() {
        const {wpm, minutes, seconds} = this.state;
        const {carPosition} = this.props;

        return (
            <React.Fragment>
                <div className="race">
                    <img src={CarLogo} className="carLogo" style={{marginLeft: `${carPosition*0.8}%`}}/>
                </div>
                <p className="percentageOfRace">
                    {Math.round((+carPosition) * 10) / 10}%
                </p>
                <p className="percentageOfRace">
                    {wpm} WPM
                </p>
                <p className="percentageOfRace">
                    {minutes} : {seconds}
                </p>
                <button onClick={this.startTyping} className="startButton"
                        disabled={minutes !== "00" || seconds !== "00"}
                        style={minutes !== "00" || seconds !== "00" ? {backgroundColor: "gray"} : {}}>
                    START
                </button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    certainUser: certainUserSelector(state),
    results: resultsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    postNewWPMRequest
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimerAndWPM);
