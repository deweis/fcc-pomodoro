import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';

class App extends Component {
  state = {
    sessionLength: '25:00',
    breakLength: '5:00'
  };

  lengthIncreaseHandler = cat => {
    if (cat === 'Break Length') {
      console.log('break up clicked');
    }
    if (cat === 'Session Length') {
      console.log('session up clicked');
    }
  };

  lengthDecreaseHandler = cat => {
    if (cat === 'Break Length') {
      console.log('break down clicked');
    }
    if (cat === 'Session Length') {
      console.log('session down clicked');
    }
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
                    <div className="card-title">Pomodoro Clock</div>
                    <h1>00:00</h1>
                    <button className="btn">Start</button>
                    <div className="row">
                      <Controller
                        title="Break Length"
                        length={this.state.breakLength}
                        lengthDecreased={this.lengthDecreaseHandler}
                        lengthIncreased={this.lengthIncreaseHandler}
                      />
                      <Controller
                        title="Session Length"
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
