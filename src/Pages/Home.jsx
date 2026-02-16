import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header.jsx";
import StatsBar from "../components/StatsBar.jsx";
import Body from "../components/Body.jsx";
import Button from "../components/Button.jsx";
import RestartIcon from "../assets/images/icon-restart.svg";
import BaselineEstablished from "../components/BaselineEstablished.jsx";
import IconCompleted from "../assets/images/icon-completed.svg";
import newPb from "../assets/images/icon-new-pb.svg";

const PASSAGES = {
  easy: [
    "The sun shines brightly in the clear blue sky.",
    "Cats love to sleep in warm sunny spots all day.",
    "A cool breeze blew through the open window.",
    "She baked a delicious chocolate cake for the party.",
    "Walk slowly and enjoy the beautiful nature around you.",
  ],
  medium: [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
    "Programming is the art of telling another human being what one wants the computer to do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  ],
  hard: [
    "The 5 boxing wizards jump quickly! imply_logic(x) && var_dump($result); // Check syntax.",
    "Quixotic jocks found wavering over a '12.5%' increase in zinc exports; however, judgement ceased.",
    "Sphinx of black quartz, judge my vow. (x^2 + y^2 = r^2) is the equation of a circle.",
    "Complexity is the enemy of execution! 0x1A4F varies directly with the @function call.",
  ],
};

const MODES = {
  TIMED: "timed",
  PASSAGE: "passage",
};

const TIME_LIMIT = 60; // seconds for timed mode

export default function Home() {
  // Settings
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState(MODES.TIMED);

  // Game State
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'finished'
  const [targetText, setTargetText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [mistakes, setMistakes] = useState(0);

  // Stats
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [hasBaseline, setHasBaseline] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Load High Score on Mount
  useEffect(() => {
    const storedHS = localStorage.getItem("typingHighScore");
    const storedBaseline = localStorage.getItem("typingBaseline");
    if (storedHS) setHighScore(parseInt(storedHS, 10));
    if (storedBaseline) setHasBaseline(true);

    // Set initial text
    setTargetText(getRandomPassage("easy"));
  }, []);

  // Timer Logic
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        if (mode === MODES.TIMED) {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              finishGame();
              return 0;
            }
            return prev - 1;
          });
          setTimeElapsed((prev) => prev + 1); // Track elapsed for WPM calc
        } else {
          // Passage Mode: Count up
          setTimeElapsed((prev) => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, mode]);

  // Check Game Over Conditions
  useEffect(() => {
    if (gameState === "playing") {
      // Check for passage completion
      if (typedText.length === targetText.length && targetText.length > 0) {
        finishGame();
      }

      // Update WPM and Accuracy live
      calculateStats();
    }
  }, [typedText, timeElapsed]);

  const getRandomPassage = (diff) => {
    const list = PASSAGES[diff];
    return list[Math.floor(Math.random() * list.length)];
  };

  const startGame = () => {
    const text = getRandomPassage(difficulty);
    setTargetText(text);
    setTypedText("");
    setMistakes(0);
    setWpm(0);
    setAccuracy(100);
    setIsNewHighScore(false);

    if (mode === MODES.TIMED) {
      setTimeLeft(TIME_LIMIT);
      setTimeElapsed(0);
    } else {
      setTimeLeft(0);
      setTimeElapsed(0);
    }

    setGameState("playing");
    // Focus the container to capture keys immediately
    setTimeout(() => containerRef.current?.focus(), 10);
  };

  const resetGame = () => {
    setGameState("start");
    // Generate new text based on current difficulty
    setTargetText(getRandomPassage(difficulty));
    if (mode === MODES.TIMED) {
      setTimeLeft(TIME_LIMIT);
    } else {
      setTimeLeft(0);
    }
    setTypedText(""); // Clear text visual
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameState("finished");

    // Calculate final stats
    const minutes = timeElapsed / 60;
    const words = typedText.length / 5;
    const finalWpm = minutes > 0 ? Math.round(words / minutes) : 0;

    // Save High Score
    if (finalWpm > highScore) {
      setHighScore(finalWpm);
      localStorage.setItem("typingHighScore", finalWpm);
      if (hasBaseline) {
        setIsNewHighScore(true);
      }
    }

    if (!hasBaseline) {
      localStorage.setItem("typingBaseline", "true");
      setHasBaseline(true);
    }
  };

  const calculateStats = () => {
    // WPM = (Characters / 5) / Minutes
    // Prevent divide by zero
    const durationInMinutes = timeElapsed > 0 ? timeElapsed / 60 : 0.5 / 60; // avoid 0 div
    const wordsTyped = typedText.length / 5;
    const currentWpm = Math.round(wordsTyped / durationInMinutes);
    setWpm(currentWpm < 0 ? 0 : currentWpm);

    // Accuracy = (Correct Characters / Total Typed inc. mistakes) * 100
    // Actually simplicity: (Current Length / (Current Length + Mistakes))
    // Or just (TypedLength - Mistakes) / TypedLength?
    // "Correct mistakes with backspace (original errors still count)"
    // Let's use: Accuracy = ((Total Keystrokes - Mistakes) / Total Keystrokes)
    // But mistakes accumulator tracks *every* error.

    const totalKeystrokes = typedText.length + mistakes;
    const calculatedAcc =
      totalKeystrokes > 0
        ? Math.round(((totalKeystrokes - mistakes) / totalKeystrokes) * 100)
        : 100;

    setAccuracy(calculatedAcc);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (gameState !== "playing") return;

      const { key } = e;

      // Ignore unrelated keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (key === "Shift" || key === "CapsLock" || key === "Tab") return;

      if (key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      // Typical printable characters
      if (key.length === 1) {
        if (typedText.length < targetText.length) {
          // Check correctness for stats
          const expectedChar = targetText[typedText.length];
          if (key !== expectedChar) {
            setMistakes((prev) => prev + 1);
          }
          setTypedText((prev) => prev + key);
        }
      }
    },
    [gameState, typedText, targetText],
  );

  // Focus Handlers
  const handleContainerClick = () => {
    if (gameState === "start") {
      startGame();
    } else {
      containerRef.current?.focus();
    }
  };

  return (
    <div
      className="container m-auto px-4 focus:outline-none"
      tabIndex={0}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {/* Header Section */}
      <div className="mt-8 mb-18">
        <Header highScore={highScore} />
      </div>

      {/* Result Section (Overlay) */}
      {gameState === "finished" && (
        <div>
          <div className="fixed inset-0 bg-black/80 z-40"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg shadow-xl grid place-items-center gap-3 border-borderline bg-darkbg w-[90%] md:w-auto">
            {isNewHighScore ? (
              <BaselineEstablished
                icons={newPb}
                header="High Score Smashed!"
                subheader="You're getting faster. That was incredible typing."
                wpm={wpm}
                accuracy={accuracy}
                correctChars={typedText.length} // Simplified: final length is roughly correct chars
                incorrectChars={mistakes}
                onRestart={resetGame}
              />
            ) : (
              <BaselineEstablished
                icons={IconCompleted}
                header={
                  hasBaseline ? "Test Completed!" : "Baseline Established!"
                }
                subheader={
                  hasBaseline
                    ? "Good run! Can you do better?"
                    : "You've set the bar. Now the real challenge begins."
                }
                wpm={wpm}
                accuracy={accuracy}
                correctChars={typedText.length}
                incorrectChars={mistakes}
                onRestart={resetGame}
              />
            )}
          </div>
        </div>
      )}

      {/* Start Overlay */}
      {gameState === "start" && (
        <div className="fixed inset-0 grid place-items-center bg-black/50">
          <div className="flex flex-col justify-center items-center gap-4">
            <div
              onClick={startGame}
              className="bg-primblue btn cursor-pointer animate-bounce fit"
            >
              <Button btn="Start Typing Test" isImg={false} />
            </div>
            <p className="text-white">Or click here to start typing</p>
          </div>
        </div>
      )}

      {/* Main Game Interface - Always functional for visibility */}
      <>
        {/* Navigation/Stats Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-b-2 border-borderline pb-2 gap-4 md:gap-0">
          {/* Left Section - Stats */}
          <div className="w-full md:w-fit flex flex-row justify-between md:justify-start gap-4 md:gap-8">
            <div className="pr-4 border-r-2 border-r-borderline">
              <StatsBar src="WPM:" numb={wpm} isSrcNumb={true} />
            </div>
            <div className="pr-4 border-r-2 border-r-borderline">
              <StatsBar
                src="Accuracy:"
                numb={`${accuracy}%`}
                isSrcNumb={true}
              />
            </div>
            <div>
              <StatsBar
                src="Time:"
                numb={
                  mode === MODES.TIMED
                    ? `0:${timeLeft < 10 ? "0" : ""}${timeLeft}`
                    : `${Math.floor(timeElapsed / 60)}:${timeElapsed % 60 < 10 ? "0" : ""}${timeElapsed % 60}`
                }
                isSrcNumb={true}
              />
            </div>
          </div>

          {/* Right Section - Settings */}
          <div className="w-full md:w-fit flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8">
            <div className="w-full md:w-fit md:pr-4 md:border-r-2 md:border-r-borderline">
              <StatsBar
                src="Difficulty:"
                easy="Easy"
                medium="Medium"
                hard="Hard"
                isDifficulty={true}
                currentDifficulty={difficulty}
                onSelect={(diff) => {
                  setDifficulty(diff);
                  setTargetText(getRandomPassage(diff));
                  setTypedText("");
                }}
              />
            </div>
            <div className="w-full md:w-fit">
              <StatsBar
                src="Mode:"
                timed="Timed (60s)"
                passage="Passage"
                isMode={true}
                currentMode={mode}
                onSelect={(m) => {
                  setMode(m);
                  if (m === MODES.TIMED) setTimeLeft(TIME_LIMIT);
                  else setTimeLeft(0);
                  setTypedText("");
                }}
              />
            </div>
          </div>
        </div>

        {/* Body Section (Typing Area) */}
        <div
          className={`my-8 min-h-130 relative ${gameState === "start" ? "blur-sm opacity-50" : "opacity-100"}`}
          onClick={handleContainerClick}
        >
          <Body targetText={targetText} typedText={typedText} />
        </div>

        {/* Restart Section */}
        <div className="w-full flex justify-center pt-6 border-t-2 border-borderline ">
          <div onClick={resetGame} className="w-fit btn">
            <Button btn="Restart Test" img={RestartIcon} isImg={true} />
          </div>
        </div>
      </>
    </div>
  );
}
