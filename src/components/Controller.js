import React from 'react';
import './Controller.css';

const Controller = props => {
  let lengthNum = props.length;
  lengthNum = lengthNum.slice(0, lengthNum.indexOf(':'));

  return (
    <div className="col s6">
      <h5 id={`${props.id}-label`}>{props.title}</h5>
      <div className="controller">
        <button className="btn-arrow">
          <i
            id={`${props.id}-decrement`}
            className="fas fa-arrow-down"
            onClick={() => props.lengthDecreased(props.title)}
          />
        </button>
        <span className="length">{lengthNum}</span>
        <button className="btn-arrow">
          <i
            className="fas fa-arrow-up"
            onClick={() => props.lengthIncreased(props.title)}
          />
        </button>
      </div>
    </div>
  );
};

export default Controller;
