import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';

const SESSION_LENGTH = '25:00';
const BREAK_LENGTH = '05:00';
let timerInterval;

class App extends Component {
  state = {
    sessionLength: SESSION_LENGTH,
    breakLength: BREAK_LENGTH,
    timeLeft: SESSION_LENGTH,
    title: 'Pomodoro Clock',
    running: 0,
    btnLabel: 'Start',
    isBreak: 0
  };

  /* Helper function to get the minutes in numerical format */
  getMins = length => {
    return Number(length.slice(0, length.indexOf(':')));
  };

  /* Helper function to get the seconds in numerical format */
  getSecs = length => {
    return Number(length.slice(length.indexOf(':') + 1));
  };

  /* Increase a duration on a controller */
  lengthIncreaseHandler = cat => {
    if (cat === 'Break Length') {
      let valCurrent = this.getMins(this.state.breakLength);
      if (valCurrent === 60) {
        return;
      }
      valCurrent += 1;
      this.setState({ breakLength: `${valCurrent}:00` });
    } else if (cat === 'Session Length') {
      let valCurrent = this.getMins(this.state.sessionLength);
      if (valCurrent === 60) {
        return;
      }
      valCurrent += 1;
      this.setState({
        sessionLength: `${valCurrent}:00`,
        timeLeft: `${valCurrent}:00`
      });
    }
  };

  /* Decrease a duration on a controller */
  lengthDecreaseHandler = cat => {
    if (cat === 'Break Length') {
      let valCurrent = this.getMins(this.state.breakLength);
      if (valCurrent === 1) {
        return;
      }
      valCurrent -= 1;
      this.setState({ breakLength: `${valCurrent}:00` });
    } else if (cat === 'Session Length') {
      let valCurrent = this.getMins(this.state.sessionLength);
      if (valCurrent === 1) {
        return;
      }
      valCurrent -= 1;
      this.setState({
        sessionLength: `${valCurrent}:00`,
        timeLeft: `${valCurrent}:00`
      });
    }
  };

  /* Click the Start Button */
  startClickHandler = () => {
    if (this.state.running === 0) {
      if (this.state.isBreak === 1) {
        this.setState({
          title: 'Break',
          running: 1,
          btnLabel: 'Pause'
        });
      } else {
        this.setState({
          title: 'Session',
          running: 1,
          btnLabel: 'Pause'
        });
      }

      let timer =
        this.getMins(this.state.timeLeft) * 60 +
        this.getSecs(this.state.timeLeft);

      /* the timer itself */
      timerInterval = setInterval(() => {
        if (timer === 0 && this.state.isBreak === 0) {
          console.log('break time');
          this.setState({
            isBreak: 1,
            timeLeft: this.state.breakLength,
            title: 'Break'
          });
          timer =
            this.getMins(this.state.timeLeft) * 60 +
            this.getSecs(this.state.timeLeft) +
            1;
        } else if (timer === 0 && this.state.isBreak === 1) {
          console.log('next session');
          this.setState({
            isBreak: 0,
            timeLeft: this.state.sessionLength,
            title: 'Session'
          });
          timer =
            this.getMins(this.state.timeLeft) * 60 +
            this.getSecs(this.state.timeLeft) +
            1;
        }
        timer -= 1;
        let mins = Math.floor(timer / 60);
        mins = mins < 10 ? `0${mins}` : mins;
        let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
        this.setState({
          timeLeft: `${mins}:${secs}`
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
      this.setState({
        title: 'Paused',
        running: 0,
        btnLabel: 'Resume'
      });
    }
  };

  /* Click the Reset Button */
  resetClickHandler = () => {
    clearInterval(timerInterval);

    this.setState({
      sessionLength: SESSION_LENGTH,
      breakLength: BREAK_LENGTH,
      timeLeft: SESSION_LENGTH,
      title: 'Pomodoro Clock',
      running: 0,
      btnLabel: 'Start'
    });
  };

  render() {
    return (
      <div className="App">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col s12 m8 offset-m2">
                <div className="card">
                  <div className="card-content">
                    <div id="timer-label" className="card-title">
                      {this.state.title}
                    </div>
                    <h1 id="time-left">{this.state.timeLeft}</h1>
                    <button
                      id="start_stop"
                      className="btn"
                      onClick={this.startClickHandler}
                    >
                      {this.state.btnLabel}
                    </button>
                    <button
                      id="reset"
                      className="btn red"
                      onClick={this.resetClickHandler}
                    >
                      Reset
                    </button>
                    <div className="row">
                      <Controller
                        title="Break Length"
                        id="break"
                        length={this.state.breakLength}
                        lengthDecreased={this.lengthDecreaseHandler}
                        lengthIncreased={this.lengthIncreaseHandler}
                      />
                      <Controller
                        title="Session Length"
                        id="session"
                        length={this.state.sessionLength}
                        lengthDecreased={this.lengthDecreaseHandler}
                        lengthIncreased={this.lengthIncreaseHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
