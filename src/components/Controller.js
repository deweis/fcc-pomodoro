import React from 'react';
import './Controller.css';

const Controller = props => {
  let lengthNum = props.length;
  lengthNum = lengthNum.slice(0, lengthNum.indexOf(':'));

  return (
    <div className="col s6">
      <h5>{props.title}</h5>
      <div className="controller">
        <i
          className="fas fa-arrow-down"
          onClick={() => props.lengthDecreased(props.title)}
        />
        <span className="length">{lengthNum}</span>
        <i
          className="fas fa-arrow-up"
          onClick={() => props.lengthIncreased(props.title)}
        />
      </div>
    </div>
  );
};

export default Controller;
