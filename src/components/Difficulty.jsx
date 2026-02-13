export default function Difficulty({ src, easy, medium, hard }) {
  return (
    <div className="flex gap-2">
      <p className="text-darktext flex items-center gap-2">{src}</p>
      <button className="btn-border">{easy}</button>
      <button className="btn-border">{medium}</button>
      <button className="btn-border">{hard}</button>
    </div>
  );
}
