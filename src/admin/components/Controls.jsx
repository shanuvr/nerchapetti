import { UploadCloud } from 'lucide-react';

export function Button({
  children,
  variant = 'secondary',
  icon: Icon,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-xs border border-blue-500/50',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-xs border border-rose-500/50',
  };

  return (
    <button className={`${base} ${variants[variant] ?? variants.secondary} ${className}`} {...props}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </button>
  );
}

export function UploadBox({ label, hint, onChange }) {
  return (
    <div>
      {label && <p className="mb-1.5 text-xs font-bold text-slate-700">{label}</p>}
      <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer text-center">
        <UploadCloud className="w-5 h-5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-700">Click to upload or drag & drop</span>
        {hint && <span className="text-[10.5px] text-slate-400">{hint}</span>}
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
