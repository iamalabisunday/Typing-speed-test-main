export default function Button({ btn, isImg = false, img }) {
  return (
    <div className="w-fit flex gap-2 cursor-pointer">
      <button className="cursor-pointer">{btn}</button>
      {isImg && <img src={img} alt="Restart" className="w-4" />}
    </div>
  );
}
