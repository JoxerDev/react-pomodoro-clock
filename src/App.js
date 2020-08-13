import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* --- Variables ----*/

/* --- Components ---*/

class Timer extends React.Component {
  render() {
    return (
      <div className="row h-100 align-items-center justify-content-center text-center">
        <div className="col-sm-4">
          <h3 id="timer-label">
            {this.props.isSession === true ? "Session" : "Break"}
          </h3>
          <h1 id="time-left" className="display-2">
            <span>
              {this.props.timerMinute === 0
                ? "00"
                : this.props.timerMinute < 10
                ? "0" + this.props.timerMinute
                : this.props.timerMinute}
            </span>
            <span>:</span>
            <span>
              {this.props.timerSecond === 0
                ? "00"
                : this.props.timerSecond < 10
                ? "0" + this.props.timerSecond
                : this.props.timerSecond}
            </span>
          </h1>
        </div>
      </div>
    );
  }
}

class BreakControl extends React.Component {
  render() {
    return (
      <div className="col-8 col-sm-4 col-md-3">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <h4 id="break-label">Break Length</h4>
          <div className="col-12" id="break-length">
            <button
              className="btn mr-2 btn-outline-dark"
              id="break-increment"
              onClick={this.props.incrementBreakLength}
            >
              <i class="fas fa-arrow-circle-up fa-2x"></i>
            </button>
            {this.props.breakLength}
            <button
              className="btn ml-2 btn-outline-dark"
              id="break-decrement"
              onClick={this.props.decrementBreakLength}
            >
              <i class="fas fa-arrow-circle-down fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class SessionControl extends React.Component {
  render() {
    return (
      <div className="col-8 col-sm-4 col-md-3">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <h4 id="session-label">Session Length</h4>
          <div className="col-12" id="session-length">
            <button
              className="btn mr-2 btn-outline-dark"
              id="session-increment"
              onClick={this.props.incrementSessionLength}
            >
            <i class="fas fa-arrow-circle-up fa-2x"></i></button>
            {this.props.sessionLength}
            <button
              className="btn ml-2 btn-outline-dark"
              id="session-decrement"
              onClick={this.props.decrementSessionLength}
            >
              <i class="fas fa-arrow-circle-down fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div className="row h-100 align-items-center justify-content-center text-center my-2 my-sm-5">
        <div className="col-sm-6">
          <button
            className="btn btn-outline-dark"
            id="reset"
            onClick={this.props.resetTimer}
          >
            <i class="fas fa-sync-alt fa-2x"></i>
          </button>
          <button
            className="btn btn-outline-dark btn-lg ml-2 mr-2"
            id="start_stop"
            onClick={this.props.playTimer}
          >
            <i class="fas fa-play fa-2x"></i>
          </button>
          <button
            className="btn btn-outline-dark"
            id="start_stop"
            onClick={this.props.stopTimer}
          >
            <i class="fas fa-stop fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      timerSecond: 0,
      isSession: true,
      intervalId: 0,
      isPlay: false
    };

    this.incrementSessionLength = this.incrementSessionLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
    this.updateTimerMinute = this.updateTimerMinute.bind(this);
    this.updateTimerOnReset = this.updateTimerOnReset.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }
  incrementSessionLength = () => {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timerMinute: this.state.timerMinute + 1
      });
    }
  };

  decrementSessionLength = () => {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timerMinute: this.state.timerMinute - 1
      });
    }
  };

  incrementBreakLength = () => {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  };

  decrementBreakLength = () => {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  };

  updateTimerMinute = () => {
    this.setState(prevState => {
      return {
        timerMinute: prevState.timerMinute - 1
      };
    });
  };

  updateTimerOnReset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      intervalId: 0
    });
  };

  onToggleInterval = isSession => {
    if (isSession) {
      this.setState({
        timerMinute: this.state.sessionLength
      });
    } else {
      this.setState({
        timerMinute: this.state.breakLength
      });
    }
  };

  playTimer = () => {
    if (!this.state.isPlay) {
      let intervalId = setInterval(this.decreaseTimer, 1000);
      this.setState({
        intervalId: intervalId,
        isPlay: true
      });
    }
  };

  decreaseTimer = () => {
    switch (this.state.timerSecond) {
      case 0:
        if (this.state.timerMinute === 0) {
          if (this.state.isSession) {
            this.setState({
              isSession: false
            });
            this.onToggleInterval(this.state.isSession);
          } else {
            this.setState({
              isSession: true
            });
            this.onToggleInterval(this.state.isSession);
          }
        } else {
          this.updateTimerMinute();
          this.setState({
            timerSecond: 59
          });
        }
        break;

      default:
        this.setState(prevState => {
          return {
            timerSecond: prevState.timerSecond - 1
          };
        });
        break;
    }
  };

  stopTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      isPlay: false
    });
  };

  resetTimer = () => {
    this.stopTimer();
    this.updateTimerOnReset();
    this.setState({
      timerSecond: 0,
      isSession: true,
      isPlay: false
    });
  };

  render() {
    return (
      <div className="container-fluid align-self-center">
        <Timer
          isSession={this.state.isSession}
          timerMinute={this.state.timerMinute}
          timerSecond={this.state.timerSecond}
          updateTimerMinute={this.state.updateTimerMinute}
          onToggleInterval={this.state.onToggleInterval}
        />
        <Controls
          playTimer={this.playTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
        />
        <div className="row justify-content-center">
          <BreakControl
            isPlay={this.state.isPlay}
            breakLength={this.state.breakLength}
            incrementBreakLength={this.incrementBreakLength}
            decrementBreakLength={this.decrementBreakLength}
          />
          <SessionControl
            isPlay={this.state.isPlay}
            sessionLength={this.state.sessionLength}
            incrementSessionLength={this.incrementSessionLength}
            decrementSessionLength={this.decrementSessionLength}
          />
        </div>
      </div>
    );
  }
}

export default App;
