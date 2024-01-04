import { useState, useEffect } from "react";
import Die from "./Die";
import Confetti from 'react-confetti'
import Statics from "./statics";

function App() {
  const [dies, setDies] = useState(randomDies());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(()=>{
    winCheck();
  }, [dies])

  function newGame(){
    if(tenzies){
      setDies(randomDies());
      setTenzies(false);
      setRolls(0);
      setTime(0);
    }
  }

  function randomDies() {
    const arr = [];
    for (let i = 0; i <= 9; i++) {
      const die = {
        value: Math.ceil(Math.random() * 6),
        held: false,
        id: i + 1,
      };
      arr[i] = die;
    }
    return arr;
  }

  function rollUp() {
    setDies((preveDies) =>
      preveDies.map((die) => {
        return die.held ? die : { ...die, value: Math.ceil(Math.random() * 6) };
      })
    );
    setRolls(preveRoll => preveRoll+=1)
  }

  function dieHeld(id) {
    setDies((preveDies) =>
      preveDies.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  function winCheck() {
    // for (let i=0; i<dies.length; i++) {
    //   if (!dies[i].held) {
    //     return;
    //   }
    //   if(i!=dies.length-1 && dies[i].value !== dies[i+1].value){
    //     return;
    //   }
    //   else if(i == dies.length-1 && dies[i].value !== dies[0].value){
    //     return;
    //   }
    // }
    // setTenzies(true);
    const isWinning = dies.every((die,index) => {
      return die.held && 
      (
        index === dies.length-1 ? die.value === dies[0].value :
          die.value === dies[index+1].value 
        )
    })
    if(isWinning){
      setTenzies(true);
    }
  }

  const allDies = dies.map((die) => {
    return (

      <Die
        key={die.id}
        value={die.value}
        held={die.held}
        dieHeld={() => dieHeld(die.id)}
      />
    );
  });
  return (
    <main>
      {tenzies && <Confetti/>}
      <Statics rolls={rolls} tenzies={tenzies} time={time} setTime={setTime}/>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies-container">{allDies}</div>
      <button onClick={tenzies ? newGame : rollUp}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  );
}

export default App;
