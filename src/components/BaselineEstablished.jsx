import Button from "./Button.jsx";
import loading from "../assets/images/icon-restart.svg";
import StarGold from "../assets/images/pattern-star-1.svg";
import StarRed from "../assets/images/pattern-star-2.svg";
import Confetti from "../assets/images/pattern-confetti.svg";
import { useState } from "react";

export default function BaselineEstablished({
  icons,
  header,
  subheader,
  wpm = 0,
  accuracy = 0,
  correctChars = 0,
  incorrectChars = 0,
  onRestart,
}) {
  // Once Star is true, confetti should be false and v.v
  const [starConfetti, setStarConfetti] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-2">
        <img src={icons} alt="Completed-icon" />
        <h2 className="font-bold text-4xl mt-5">{header}</h2>
        <p className="font-light text-lg text-darktext">{subheader}</p>
        <div className="mt-8 flex gap-4 mb-8">
          <BaslineBox header="WPM:" score={wpm} isScore={true} />
          <BaslineBox header="Accuracy:" accuracy={accuracy} isAccuracy={true} />
          <BaslineBox
            header="Characters"
            characters={correctChars}
            wrongCharacters={incorrectChars}
            isCharacters={true}
          />
        </div>
        <div
          onClick={onRestart}
          className="cursor-pointer bg-white text-black p-3 pr-4 rounded-sm font-medium text-md border-none flex gap-2"
        >
          <Button btn="Play Again" />
          {/* <Loading /> Removed loading for now as logic handled in parent */}
        </div>
      </div>

      {starConfetti ? (
        <img src={Confetti} alt="Pattern confetti" className="fixed bottom-0" />
      ) : (
        <>
          <img src={StarRed} alt="StarGold" className="fixed left-20 top-50" />
          <img
            src={StarGold}
            alt="StarGold"
            className="fixed right-20 bottom-100"
          />
        </>
      )}
    </>
  );
}

function BaslineBox({
  header,
  score,
  isScore,
  accuracy,
  isAccuracy,
  characters,
  wrongCharacters,
  isCharacters,
}) {
  return (
    <div className="flex flex-col gap-1 border-2 w-42 p-4 border-neutral rounded-md">
      <p className="text-neutral text-[1.25rem]">{header}</p>
      {isScore && <p className="font-medium text-2xl">{score}</p>}
      {isAccuracy && (
        <p className="font-medium text-2xl text-incorrect">{accuracy}%</p>
      )}
      {isCharacters && (
        <p className="font-medium text-2xl text-darktext">
          <span className="text-correct">{characters}</span>/
          <span className="text-incorrect">{wrongCharacters}</span>
        </p>
      )}
    </div>
  );
}

function Loading() {
  return <img src={loading} alt="loading Icon" className="brightness-0 " />;
}

// animate-spin
