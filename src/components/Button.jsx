import RestartIcon from "../assets/images/icon-restart.svg";

export default function Button({ btn }) {
  return (
    <div className="w-fit btn flex gap-2">
      <button>{btn}</button>
      <img src={RestartIcon} alt="Restart" className="w-4" />
    </div>
  );
}
