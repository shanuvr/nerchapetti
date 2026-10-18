export default function StatCard({ title, value, change, icon: Icon, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        {Icon && (
          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${tones[tone]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <p className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 mt-2">{value}</p>
      {change && <p className="text-[10.5px] font-medium text-emerald-600 mt-1">{change}</p>}
    </div>
  );
}
