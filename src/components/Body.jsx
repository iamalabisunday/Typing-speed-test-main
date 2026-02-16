export default function Body({ targetText, typedText }) {
  return (
    <div className="font-normal text-[1.5rem] text-darktext leading-11">
      {targetText.split("").map((char, index) => {
        let color = "text-darktext";
        if (index < typedText.length) {
          color = typedText[index] === char ? "text-text" : "text-incorrect";
        } else if (index === typedText.length) {
          color = "text-primblue bg-primblue/20 animate-pulse"; // Cursor indication
        }

        return (
          <span key={index} className={`${color}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
