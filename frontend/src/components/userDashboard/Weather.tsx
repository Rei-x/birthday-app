import React from 'react';
import Widget from './Widget';

const Weather = () => (
  <Widget className="weather">
    <div>
      <h5>Pogoda</h5>
      <p className="text-muted">dnia osiemnastki</p>
    </div>
    <div className="d-flex">
      <img
        className="weather__icon"
        src="https://i.imgur.com/Boclt0J.png"
        alt="weather icon"
      />
      <p className="weather__temperature">19°C</p>
    </div>
  </Widget>
);

export default Weather;
