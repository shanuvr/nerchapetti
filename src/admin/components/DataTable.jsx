export function Dot({ tone = 'blue' }) {
  const tones = {
    emerald: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]',
    amber: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]',
    rose: 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]',
    blue: 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]',
    slate: 'bg-slate-400',
  };

  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${tones[tone] ?? tones.slate}`} />;
}

export function Pill({ tone = 'blue', children }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/80',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold border ${
        tones[tone] ?? tones.slate
      }`}
    >
      <Dot tone={tone} />
      {children}
    </span>
  );
}

export function DataTable({ headers = [], rows = [], emptyMessage = 'No records found' }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
            {headers.map((h, i) => (
              <th key={i} className="py-2.5 px-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-8 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-2.5 px-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
