import React, { useEffect, useState } from 'react';
import ConfettiPopOut from 'react-dom-confetti';
import ConfettiRain from 'react-confetti';
import { useWindowSize } from 'react-use';
import { CSSTransition } from 'react-transition-group';
import Widget from './Widget';

const getWindowHeight = () => {
  const { body } = document;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return height;
};

const CustomConfettiRain = ({ active }: { active: boolean }) => {
  const { width } = useWindowSize();
  const height = getWindowHeight();

  return (
    <CSSTransition in={active} timeout={2000} classNames="fade" unmountOnExit>
      <ConfettiRain width={width} height={height} />
    </CSSTransition>
  );
};

const TimeRemaining = () => {
  const partyDay = new Date('08/28/2021 18:00:00');
  const todayDate = new Date();
  const timeRemainingInSeconds =
    (partyDay.getTime() - todayDate.getTime()) / 1000;
  const [seconds, setSeconds] = useState(
    timeRemainingInSeconds < 0 ? 0 : timeRemainingInSeconds
  );

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((oldSeconds) => {
        if (oldSeconds > 1) {
          return oldSeconds - 1;
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (secondsLeft: number) => {
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
    <>
      <Widget className="time-remaining">
        <div>
          <h5>Zostało jeszcze</h5>
        </div>
        <CustomConfettiRain active={showConfetti} />
        <ConfettiPopOut active={showConfetti} />
        <div>
          <p>{calculateTimeRemaining(seconds)}</p>
        </div>
      </Widget>
    </>
  );
};

export default TimeRemaining;
