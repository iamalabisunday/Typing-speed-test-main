export default function ({ src, timed, passage }) {
  return (
    <div className="flex gap-2">
      <p className="text-darktext flex items-center gap-2">{src}</p>
      <button className="btn-border">{timed}</button>
      <button className="btn-border">{passage}</button>
    </div>
  );
}
