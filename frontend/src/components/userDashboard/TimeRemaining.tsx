import React, { useEffect, useState } from 'react';
import Widget from './Widget';

const TimeRemaining = () => {
  const partyDay = new Date('08/28/2021 18:00:00');
  const todayDate = new Date();
  const [seconds, setSeconds] = useState(
    (partyDay.getTime() - todayDate.getTime()) / 1000
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((oldSeconds) => oldSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeRemaining = (secondsLeft: number) => {
    const days = Math.floor(secondsLeft / 86400);
    const hours = Math.floor((secondsLeft % 86400) / 3600);
    const minutes = Math.floor(((secondsLeft % 86400) % 3600) / 60);
    const calculatedSeconds = Math.floor(((secondsLeft % 86400) % 3600) % 60);

    const addLeadingZero = (num: number) => (num < 10 ? `0${num}` : num);
    const numbers = [days, hours, minutes, calculatedSeconds];
    const formattedNumbers = numbers.map(addLeadingZero);

    const timeRemainingString = formattedNumbers.join(':');
    return timeRemainingString;
  };

  return (
    <Widget className="time-remaining">
      <div>
        <h5>Zostało jeszcze</h5>
      </div>
      <div>
        <p>{timeRemaining(seconds)}</p>
      </div>
    </Widget>
  );
};

export default TimeRemaining;
