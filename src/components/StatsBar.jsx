export default function StatsBar({ src, numb }) {
  return (
    <div className="flex gap-2">
      <p className="text-darktext flex items-center gap-2">{src}</p>
      <span className="text-text font-medium">{numb}</span>
    </div>
  );
}
