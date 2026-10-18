export const CONTROL =
  'w-full rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-inner';

export function TextInput({ label, hint, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block mb-1 text-xs font-bold text-slate-700">{label}</label>}
      <input className={CONTROL} {...props} />
      {hint && <p className="mt-1 text-[10.5px] text-slate-500">{hint}</p>}
    </div>
  );
}

export function TextArea({ label, hint, rows = 3, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block mb-1 text-xs font-bold text-slate-700">{label}</label>}
      <textarea rows={rows} className={`${CONTROL} resize-y`} {...props} />
      {hint && <p className="mt-1 text-[10.5px] text-slate-500">{hint}</p>}
    </div>
  );
}

export function Select({ label, options = [], hint, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block mb-1 text-xs font-bold text-slate-700">{label}</label>}
      <select className={`${CONTROL} cursor-pointer`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-[10.5px] text-slate-500">{hint}</p>}
    </div>
  );
}

export function Toggle({ label, hint, defaultChecked, onChange, className = '' }) {
  return (
    <label className={`flex items-start justify-between gap-3 cursor-pointer group ${className}`}>
      <div>
        <span className="block text-xs font-bold text-slate-700 group-hover:text-blue-900 transition-colors">
          {label}
        </span>
        {hint && <span className="block text-[10.5px] text-slate-500">{hint}</span>}
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="relative w-8 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-600 shrink-0" />
    </label>
  );
}
