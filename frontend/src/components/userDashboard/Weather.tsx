import React from 'react';
import Widget from './Widget';

const Weather = () => (
  <Widget className="weather">
    <div>
      <h5>Pogoda</h5>
      <p className="text-muted">dnia osiemnastki</p>
    </div>
    <div className="d-flex">
      <img src="https://openweathermap.org/img/w/01d.png" alt="weather icon" />
      <p className="weather__temperature">23°C</p>
    </div>
  </Widget>
);

export default Weather;
