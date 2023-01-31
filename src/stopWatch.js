import React, { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const minuteRef = useRef();
  const secondRef = useRef();

  const handleOnStart = () => {
    const min = minuteRef?.current?.value;
    const sec = secondRef?.current?.value;
    const totalSec = getTotalSeconds(min, sec);
    setTotalTime(totalSec);
    setIsRunning(true);
  };

  const getTotalSeconds = (minutesStr, secondsStr) => {
    const s = Math.floor(secondsStr / 60);
    const seconds = Math.floor(secondsStr % 60);
    const minutes = Math.floor(minutesStr % 60) + s;
    const totalSec = minutes * 60 + seconds;

    return totalSec;
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setTimeout(() => {
        setTotalTime(totalTime - 1);
      }, 1000);
      return () => {
        clearTimeout(intervalId);
      };
    }
  }, [totalTime, isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = Math.floor(totalTime % 60);
    return (
      (minutes > 9 ? minutes : "0" + minutes) +
      " : " +
      (seconds > 9 ? seconds : "0" + seconds)
    );
  };

  const handleOnPause = () => {
    setIsRunning(!isRunning);
  };

  const handleOnReset = () => {
    setIsRunning(false);
    setTotalTime(0);
  };
  return (
    <>
      <label>
        <input ref={minuteRef} type="number" />
        Minutes
      </label>
      <label>
        <input ref={secondRef} type="number" />
        Seconds
      </label>

      <button onClick={handleOnStart}>START</button>
      <button onClick={handleOnPause}>PAUSE / RESUME</button>
      <button onClick={handleOnReset}>RESET</button>

      <h1>{formatTime()}</h1>
    </>
  );
};

export default StopWatch;
