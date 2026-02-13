import Header from "../Components/Header.jsx";
import StatsBar from "../components/StatsBar.jsx";
import Difficulty from "../components/Difficulty.jsx";
import Mode from "../components/Mode.jsx";
import Body from "../components/Body.jsx";
import Button from "../components/Button.jsx";

export default function Home() {
  return (
    <div className="container m-auto">
      {/* Header Section */}
      <div className="mt-8 mb-18">
        <Header />
      </div>
      {/* Navigation Section */}
      <div className="w-full flex justify-between items-center border-b-2 border-borderline pb-2">
        {/* Left Section */}
        <div className="w-fit flex flex-row gap-8">
          {/* WPM Section */}
          <div className="pr-4 border-r-2 border-r-borderline">
            <StatsBar src="WPM:" numb={0} />
          </div>
          {/* Accuracy Section */}
          <div className="pr-4 border-r-2 border-r-borderline">
            <StatsBar src="Accuracy:" numb="100%" />
          </div>
          {/* Time Section */}
          <div>
            <StatsBar src="Time:" numb="0:60" />
          </div>
        </div>
        {/* Right Section */}
        <div className="w-fit flex items-end gap-8">
          <div className="pr-4 border-r-2 border-r-borderline">
            <Difficulty
              src="Difficulty:"
              easy="Easy"
              medium="Medium"
              hard="Hard"
            />
          </div>
          <div>
            <Mode src="Mode:" timed="Timed (60s)" passage="Passage" />
          </div>
        </div>
      </div>
      {/* Body Section */}
      <div className="my-8">
        <Body />
      </div>
      {/* Restart Section */}
      <div className="w-full flex justify-center pt-6 border-t-2 border-borderline">
        <Button btn="Restart Test" />
      </div>
    </div>
  );
}
