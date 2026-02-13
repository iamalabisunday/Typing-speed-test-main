import Logo from "../assets/images/logo-large.svg";
import ChampionCup from "../assets/images/icon-personal-best.svg";

export default function Header() {
  let numb = 92;
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {/* Left Section */}
      <img src={Logo} alt="logo" />
      {/* Right Section */}
      <div className="flex flex-row items-center gap-2">
        <img src={ChampionCup} alt="Champion Cup" />
        <p className="font-light text-darktext">
          Personal best: <span className="text-text">{numb} WPM</span>
        </p>
      </div>
    </div>
  );
}
