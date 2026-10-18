export default function Label({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-400/40" />
      <span className="drop-shadow-sm">{children}</span>
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-400/40" />
    </div>
  );
}
