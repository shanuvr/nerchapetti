export default function SectionCard({ title, description, icon: Icon, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs ${className}`}>
      {(title || description || Icon) && (
        <div className="flex items-start gap-3 mb-4 pb-3 border-b border-slate-100">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            {title && <h2 className="text-xs sm:text-sm font-bold text-slate-900">{title}</h2>}
            {description && <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{description}</p>}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
