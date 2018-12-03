import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';

class App extends Component {
  state = {
    sessionLength: '25:00',
    breakLength: '5:00',
    timeLeft: '25:00',
    title: 'Pomodoro Clock'
  };

  /* Helper function to get the minutes of a full length */
  getMins = length => {
    return Number(length.slice(0, length.indexOf(':')));
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
      this.setState({ sessionLength: `${valCurrent}:00` });
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
      this.setState({ sessionLength: `${valCurrent}:00` });
    }
  };

  /* Click the Start Button */
  startClickHandler = () => {
    this.setState({ title: 'Session' });
  };

  /* Click the Reset Button */
  resetClickHandler = () => {
    this.setState({
      sessionLength: '25:00',
      breakLength: '5:00',
      title: 'Pomodoro Clock'
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
                    <div className="card-title">{this.state.title}</div>
                    <h1 id="time-left">{this.state.timeLeft}</h1>
                    <button
                      id="start_stop"
                      className="btn"
                      onClick={this.startClickHandler}
                    >
                      Start
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
