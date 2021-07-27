import React from 'react';
import Widget from './Widget';

const TimeRemaining = () => (
  <Widget className="time-remaining">
    <div>
      <h5>Zostało jeszcze</h5>
    </div>
    <div>
      <p>3:12:20:34</p>
    </div>
  </Widget>
);

export default TimeRemaining;
