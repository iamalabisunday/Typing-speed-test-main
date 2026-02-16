export default function StatsBar({
  src,
  numb,
  isSrcNumb,
  isDifficulty,
  easy,
  medium,
  hard,
  currentDifficulty,
  onSelect,
  isMode,
  timed,
  passage,
  currentMode,
}) {
  return (
    <>
      {/* WPM, Accouracy and Time */}
      {isSrcNumb && (
        <div className="flex gap-2">
          <p className="text-darktext flex items-center gap-2">{src}</p>
          <span className="text-text font-medium">{numb}</span>
        </div>
      )}
      {/* Difficulty Section */}
      {isDifficulty && (
        <div className="flex flex-row items-center gap-2">
          <p className="font-light text-darktext">{src}</p>
          <div className="flex gap-2 text-text font-normal">
            <button
              onClick={() => onSelect("easy")}
              className={`btn-border ${currentDifficulty === "easy" ? "text-primblue border-primblue" : ""}`}
            >
              {easy}
            </button>
            <button
              onClick={() => onSelect("medium")}
              className={`btn-border ${currentDifficulty === "medium" ? "text-primblue border-primblue" : ""}`}
            >
              {medium}
            </button>
            <button
              onClick={() => onSelect("hard")}
              className={`btn-border  ${currentDifficulty === "hard" ? "text-primblue border-primblue" : ""}`}
            >
              {hard}
            </button>
          </div>
        </div>
      )}
      {/* Mode Section */}
      {isMode && (
        <div className="flex flex-row items-center gap-2">
          <p className="font-light text-darktext">{src}</p>
          <div className="flex gap-2 text-text font-normal">
            <button
              onClick={() => onSelect("timed")}
              className={`btn-border ${currentMode === "timed" ? "text-primblue border-primblue" : ""}`}
            >
              {timed}
            </button>
            <button
              onClick={() => onSelect("passage")}
              className={`btn-border ${currentMode === "passage" ? "text-primblue border-primblue" : ""}`}
            >
              {passage}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
