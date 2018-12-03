import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';

let timerInterval;

class App extends Component {
  state = {
    sessionLength: '25:00',
    breakLength: '5:00',
    timeLeft: '25:00',
    title: 'Pomodoro Clock',
    running: 0,
    btnLabel: 'Start'
  };

  /* Helper function to get the minutes of a full length */
  getMins = length => {
    return Number(length.slice(0, length.indexOf(':')));
  };

  /* Helper function to get the seconds of a full length */
  getSecs = length => {
    return Number(length.slice(length.indexOf(':') + 1));
  };

  /* Increase a duration on a controller */
  lengthIncreaseHandler = cat => {
    if (cat === 'Break Length') {
      let valCurrent = this.getMins(this.state.breakLength);
      if (valCurrent === 59) {
        return;
      }
      valCurrent += 1;
      this.setState({ breakLength: `${valCurrent}:00` });
    }
    if (cat === 'Session Length') {
      let valCurrent = this.getMins(this.state.sessionLength);
      if (valCurrent === 59) {
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
    }
    if (cat === 'Session Length') {
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
      this.setState({
        title: 'Session',
        running: 1,
        btnLabel: 'Pause'
      });

      let timer =
        this.getMins(this.state.timeLeft) * 60 +
        this.getSecs(this.state.timeLeft);

      timerInterval = setInterval(() => {
        timer -= 1;
        let mins = Math.floor(timer / 60);
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
      sessionLength: '25:00',
      breakLength: '5:00',
      timeLeft: '25:00',
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
                      className="btn"
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
