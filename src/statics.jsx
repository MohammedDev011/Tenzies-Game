import { useState, useEffect } from "react";

export default function Statics({ rolls, tenzies, time, setTime }) {
  const [bestTime, setBestTime] = useState(
    ()=> localStorage.getItem('bestTime') || Infinity
    );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!tenzies) {
        setTime((prevTime) => (prevTime += 1));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tenzies]);

  useEffect(() => {
    if (tenzies) {
        if(time < bestTime){
            setBestTime(time);
            localStorage.setItem('bestTime', time)
        }
    }
  }, [tenzies]);

  return (
    <nav>
      <div className="roll">Rolls : {rolls}</div>
      <div className="time">
          Time :
          {` ${time / 60 < 10 ? "0" : ""}${Math.floor(time / 60)} :
        ${time % 60 < 10 ? "0" : ""}${time % 60}`}  
      </div>
      <div className="best">
        Best Time :
        {bestTime == Infinity ? " 00 : 00" :
        ` ${bestTime / 60 < 10 ? "0" : ""}${Math.floor(bestTime / 60)} :
        ${bestTime % 60 < 10 ? "0" : ""}${bestTime % 60}`}
      </div>
    </nav>
  );
}
